import React, { useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  Bot,
  Loader2,
  Search,
  SendHorizontal,
  Trash2,
  UserRound,
  MessageSquareText,
  Menu,
  X,
} from "lucide-react";
import {
  apiDelete,
  apiGet,
  apiPost,
  getImageUrl,
} from "../services/api.config";
import { getCurrentUser } from "../services/auth.api";
import { useUser } from "../hooks/useUsers";
import ChatSidebar from "../components/ChatSidebar";

const quickActions = [
  {
    label: "Renew Subscription",
    prompt: "كيف يمكنني تجديد اشتراكي؟",
  },
  {
    label: "Borrow Status",
    prompt: "اعرض لي الكتب التي استعرتها حاليا ومواعيد إرجاعها.",
  },
  {
    label: "Recommendations",
    prompt: "هل يمكنك أن توصي لي ببعض الكتب؟",
  },
  {
    label: "New Books",
    prompt: "اعرض لي الكتب الجديدة المتاحة.",
  },
];

const STARTING_MESSAGE = {
  id: 1,
  sender: "bot",
  text: "مرحبا، أنا مساعد المكتبة. كيف يمكنني مساعدتك اليوم؟",
};

const getUserId = (user) => {
  if (!user || typeof user !== "object") return "";
  return String(user.user_id || user.userId || user.id || "").trim();
};

const getChatSessionsStorageKey = (userId) =>
  userId ? `chatSessions:${userId}` : null;

const getActiveChatSessionKey = (userId) =>
  userId ? `activeChatSessionId:${userId}` : null;

const getReplyText = (responsePayload) => {
  if (!responsePayload || typeof responsePayload !== "object") {
    return "لم أفهم طلبك بشكل واضح.";
  }

  return (
    responsePayload.reply ||
    responsePayload.response ||
    responsePayload.message ||
    responsePayload.answer ||
    "لم أفهم طلبك بشكل واضح."
  );
};

const getChatRequestConfig = (userId) => {
  if (!userId) {
    return {};
  }

  return {
    headers: {
      "X-User-Id": userId,
    },
  };
};

const getChatErrorMessage = (error) => {
  const rawMessage = String(error?.message || "").trim();

  if (error?.status === 400 && /user not found/i.test(rawMessage)) {
    return "جلسة حسابك غير صالحة. يرجى تسجيل الدخول مرة أخرى.";
  }

  if (error?.status === 401 || error?.status === 403) {
    return "انتهت جلستك. يرجى تسجيل الدخول مرة أخرى.";
  }

  if (rawMessage && rawMessage.length <= 220) {
    return rawMessage;
  }

  return "أواجه مشكلة في الاتصال بالخادم حاليا. يرجى المحاولة مرة أخرى لاحقا.";
};

function UserChatbot() {
  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([STARTING_MESSAGE]);
  const [sessions, setSessions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isInitialized, setIsInitialized] = useState(false);
  const [isChatSidebarOpen, setIsChatSidebarOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const currentLoadingIdRef = useRef(null);

  const localUser = getCurrentUser();
  const { data: userProfile } = useUser(localUser?.user_id);
  const currentUser =
    userProfile && userProfile.user_id ? userProfile : localUser;
  const activeUserId = getUserId(currentUser) || getUserId(localUser);
  const sessionsStorageKey = getChatSessionsStorageKey(activeUserId);

  useEffect(() => {
    if (!activeUserId) {
      setSessions([]);
      setSessionId(String(Date.now()));
      setMessages([STARTING_MESSAGE]);
      setIsInitialized(true);
      return;
    }

    const fetchHistory = async () => {
      if (!activeUserId) return [];
      try {
        const dbSessions = await apiGet(
          "/chat/sessions",
          getChatRequestConfig(activeUserId),
        );

        return dbSessions.map((s) => ({
          id: String(s.sessionId),
          title: s.title,
          createdAt: s.createdAt,
          messageCount: s.messageCount || 0,
        }));
      } catch (error) {
        console.error("Failed to fetch chat history:", error);
        return [];
      }
    };

    const initializeChat = async () => {
      // 1. Load from DB
      const dbHistory = await fetchHistory();

      // 2. Load from LocalStorage to find potential unsynced/local chats
      let localHistory = [];
      try {
        const saved = localStorage.getItem(sessionsStorageKey);
        localHistory = saved ? JSON.parse(saved) : [];
      } catch (e) {}

      // 3. Merge: Database is source of truth, but keep local ones not yet in DB
      const merged = [...dbHistory];
      localHistory.forEach((local) => {
        if (!merged.some((db) => String(db.id) === String(local.id))) {
          merged.push(local);
        }
      });

      // Sort by creation or update? Let's unshift new ones
      setSessions(merged);

      const activeSessionKey = getActiveChatSessionKey(activeUserId);
      const savedActiveId = localStorage.getItem(activeSessionKey);

      if (
        savedActiveId &&
        merged.some((s) => String(s.id) === String(savedActiveId))
      ) {
        loadSession(String(savedActiveId));
      } else if (merged.length > 0) {
        loadSession(String(merged[0].id));
      } else {
        handleNewChat();
      }
      setIsInitialized(true);
    };

    initializeChat();
  }, [activeUserId, sessionsStorageKey]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    // Only update local session titles if we are SURE the messages belong to this session
    // and we have at least one user message
    const userMsg = messages.find((m) => m.sender === "user");
    if (userMsg && sessionId && isInitialized) {
      setSessions((prev) => {
        const sidStr = String(sessionId);
        const existingIndex = prev.findIndex((s) => String(s.id) === sidStr);

        let newSessions = [...prev];
        const updatedTitle =
          userMsg.text.length > 30
            ? userMsg.text.substring(0, 30) + "..."
            : userMsg.text;

        if (existingIndex >= 0) {
          // Verify it's not a race condition (checking if title actually needs update)
          if (newSessions[existingIndex].title !== updatedTitle) {
            newSessions[existingIndex] = {
              ...newSessions[existingIndex],
              title: updatedTitle,
              messageCount: messages.length,
            };
          }
        } else {
          newSessions.unshift({
            id: sidStr,
            title: updatedTitle,
            messageCount: messages.length,
          });
        }
        return newSessions;
      });
    }
  }, [messages, sessionId, isInitialized]);

  useEffect(() => {
    if (!isInitialized || !sessionsStorageKey) return;
    localStorage.setItem(sessionsStorageKey, JSON.stringify(sessions));
  }, [sessions, sessionsStorageKey, isInitialized]);

  useEffect(() => {
    if (!isInitialized || !sessionId || !activeUserId) return;
    const key = getActiveChatSessionKey(activeUserId);
    if (key) {
      localStorage.setItem(key, String(sessionId));
    }
    const messagesKey = `chatSessionMessages:${activeUserId}:${sessionId}`;
    if (messages.length > 0) {
      localStorage.setItem(messagesKey, JSON.stringify(messages));
    }
  }, [sessionId, messages, activeUserId, isInitialized]);

  const chatMutation = useMutation({
    mutationFn: async ({ messageText, userId, sessionId }) => {
      const requestConfig = getChatRequestConfig(userId);
      const body = {
        message: messageText,
        userId: userId || undefined,
        sessionId: String(sessionId || Date.now()),
      };

      try {
        return await apiPost("/chat", body, requestConfig);
      } catch (error) {
        if (error?.status !== 404 && error?.status !== 405) {
          throw error;
        }

        return await apiPost("/librarian/ask", body, requestConfig);
      }
    },
    onSuccess: (data, variables) => {
      const botMsg = {
        id: Date.now(),
        sender: "bot",
        text: getReplyText(data),
      };

      // 1. Update localStorage for the specific session it belongs to
      if (activeUserId && variables.sessionId) {
        const messagesKey = `chatSessionMessages:${activeUserId}:${variables.sessionId}`;
        const savedMessages = localStorage.getItem(messagesKey);
        const currentMsgs = savedMessages
          ? JSON.parse(savedMessages)
          : messages;
        localStorage.setItem(
          messagesKey,
          JSON.stringify([...currentMsgs, botMsg]),
        );
      }

      // 2. Only update UI if the user is still looking at that same session
      if (String(sessionId) === String(variables.sessionId)) {
        setMessages((prev) => [...prev, botMsg]);
      }

      // Refresh sidebar list to show new session title from server
      if (activeUserId) {
        apiGet("/chat/sessions", getChatRequestConfig(activeUserId)).then(
          (dbSessions) => {
            setSessions((prev) => {
              const serverSessions = dbSessions.map((s) => ({
                id: String(s.sessionId),
                title: s.title,
                createdAt: s.createdAt,
                messageCount: s.messageCount || 0,
              }));

              // Merge again: Keep local ones that might have just been added
              const merged = [...serverSessions];
              prev.forEach((local) => {
                if (!merged.some((db) => String(db.id) === String(local.id))) {
                  merged.push(local);
                }
              });
              return merged;
            });
          },
        );
      }
    },
    onError: (error, variables) => {
      const errorMsg = {
        id: Date.now(),
        sender: "bot",
        text: getChatErrorMessage(error),
      };

      if (String(sessionId) === String(variables.sessionId)) {
        setMessages((prev) => [...prev, errorMsg]);
      }
      console.error("Chat error:", error);
    },
  });

  const deleteSessionMutation = useMutation({
    mutationFn: async (id) => {
      return apiDelete(
        `/chat/session/${id}`,
        getChatRequestConfig(activeUserId),
      );
    },
  });

  const handleSendMessage = (text) => {
    const normalizedText = String(text || "").trim();
    if (!normalizedText) return;

    const targetSessionId = String(sessionId || Date.now());

    if (!sessionId) {
      setSessionId(targetSessionId);
    }

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: "user",
        text: normalizedText,
      },
    ]);

    setInputValue("");
    chatMutation.mutate({
      messageText: normalizedText,
      userId: activeUserId,
      sessionId: targetSessionId,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    handleSendMessage(inputValue);
  };

  const handleNewChat = () => {
    currentLoadingIdRef.current = null;
    const newId = String(Date.now());
    setMessages([STARTING_MESSAGE]);
    setInputValue("");
    setSessionId(newId);
  };

  const loadSession = async (id) => {
    const idStr = String(id);
    currentLoadingIdRef.current = idStr;
    setSessionId(idStr);
    if (!activeUserId) return;

    try {
      const messagesKey = `chatSessionMessages:${activeUserId}:${idStr}`;
      // 1. Try local cache first for instant UI response
      const savedMessages = localStorage.getItem(messagesKey);
      if (savedMessages && currentLoadingIdRef.current === idStr) {
        setMessages(JSON.parse(savedMessages));
      }

      // 2. Sync with server for the authoritative history
      const dbMessages = await apiGet(`/chat/session/${idStr}/messages`, {
        ...getChatRequestConfig(activeUserId),
      });

      // CRITICAL: Only update if the user hasn't switched to a different chat while we were waiting
      if (currentLoadingIdRef.current === idStr) {
        // Always ensure the greeting is at the top
        const fullConversation = [STARTING_MESSAGE, ...dbMessages];
        setMessages(fullConversation);
        localStorage.setItem(messagesKey, JSON.stringify(fullConversation));
      }
    } catch (e) {
      console.error("Failed to load session messages:", e);
    }
  };

  const deleteSession = (event, id) => {
    event.stopPropagation();

    if (activeUserId) {
      localStorage.removeItem(`chatSessionMessages:${activeUserId}:${id}`);
      deleteSessionMutation.mutate(id);
    }

    const updatedSessions = sessions.filter((s) => s.id !== id);
    setSessions(updatedSessions);

    if (sessionId === id) {
      if (updatedSessions.length > 0) {
        loadSession(updatedSessions[0].id);
      } else {
        handleNewChat();
      }
    }
  };

  return (
    <div className="relative flex h-full w-full overflow-hidden">
      <main className="relative z-10 flex h-full flex-1 flex-col gap-3 px-5 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MessageSquareText
              className="text-[#000035] dark:text-[#D7D7D7]"
              size={22}
              strokeWidth={2}
            />
            <h1 className="text-3xl font-semibold text-[#000035] dark:text-[#D7D7D7]">
              Chatbot
            </h1>
          </div>

          {/* Scoped Sidebar Toggle - mobile only */}
          <button
            onClick={() => setIsChatSidebarOpen(!isChatSidebarOpen)}
            className="min-[62.5rem]:hidden flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-[#000035] text-[#000035] transition-colors hover:bg-[#000035]/5 dark:border-[#D7D7D7] dark:text-[#D7D7D7]"
          >
            {isChatSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* New divider between page title and chatbot section */}
        <div className="max-[62.5rem]:block my-1 hidden h-[0.0625rem] w-full bg-[#000035] dark:bg-[#D7D7D7]"></div>

        <section className="flex h-full gap-3 overflow-hidden">
          <ChatSidebar
            isOpen={isChatSidebarOpen}
            onClose={() => setIsChatSidebarOpen(false)}
            sessions={sessions}
            sessionId={sessionId}
            loadSession={loadSession}
            deleteSession={deleteSession}
            handleNewChat={handleNewChat}
            handleSendMessage={handleSendMessage}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            messages={messages}
            chatMutation={chatMutation}
            deleteSessionMutation={deleteSessionMutation}
            quickActions={quickActions}
          />

          <section className="max-[62.5rem]:border-none max-[62.5rem]:p-0 flex min-h-0 flex-1 flex-col rounded-lg border border-[#000035] p-4 dark:border-[#D7D7D7]">
            <div className="max-[62.5rem]:mb-4 flex items-center justify-between border-b border-[#000035] pb-3 dark:border-[#D7D7D7]">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#000035] text-white dark:bg-[#D7D7D7] dark:text-black">
                  <Bot size={18} />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-[#000035] dark:text-[#D7D7D7]">
                    Library Bot
                  </h2>
                  <div className="flex items-center gap-2 text-xs text-[#000035] opacity-70 dark:text-[#D7D7D7]">
                    <span className="h-2 w-2 rounded-full bg-green-500"></span>
                    Online
                  </div>
                </div>
              </div>

              <div className="text-xs text-[#000035] opacity-70 dark:text-[#D7D7D7]">
                {messages.length} messages
              </div>
            </div>

            <div className="max-[62.5rem]:mt-0 max-[62.5rem]:border-none max-[62.5rem]:p-0 mt-4 flex min-h-0 flex-1 flex-col rounded-lg border border-[#000035] p-4 dark:border-[#D7D7D7]">
              <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto pr-1">
                {messages.map((message) =>
                  message.sender === "bot" ? (
                    <div key={message.id} className="flex items-end gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#000035] text-white dark:bg-[#D7D7D7] dark:text-black">
                        <Bot size={18} />
                      </div>
                      <div
                        className="max-w-[70%] rounded-2xl rounded-bl-md bg-white px-4 py-3 text-sm text-[#000035] dark:border dark:border-[#D7D7D7]/30 dark:bg-transparent dark:text-[#D7D7D7]"
                        dir="auto"
                        style={{ unicodeBidi: "plaintext" }}
                      >
                        {message.text}
                      </div>
                    </div>
                  ) : (
                    <div key={message.id} className="flex justify-end">
                      <div className="flex max-w-[70%] items-end gap-3">
                        <div
                          className="rounded-2xl rounded-br-md bg-[#000035] px-4 py-3 text-sm text-white dark:bg-[#D7D7D7] dark:text-black"
                          dir="auto"
                          style={{ unicodeBidi: "plaintext" }}
                        >
                          {message.text}
                        </div>
                        {currentUser?.image_url ? (
                          <img
                            src={getImageUrl(currentUser.image_url)}
                            alt="User avatar"
                            className="h-10 w-10 shrink-0 rounded-full object-cover"
                          />
                        ) : (
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#D7D7D7]">
                            <UserRound className="h-6 w-6 text-[#000035]" />
                          </div>
                        )}
                      </div>
                    </div>
                  ),
                )}

                {chatMutation.isPending && (
                  <div className="flex items-end gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#000035] text-white dark:bg-[#D7D7D7] dark:text-black">
                      <Bot size={18} className="animate-pulse" />
                    </div>
                    <div className="flex items-center gap-1 rounded-2xl rounded-bl-md bg-white px-4 py-3 dark:border dark:border-[#D7D7D7]/30 dark:bg-transparent">
                      <span
                        className="h-2 w-2 animate-bounce rounded-full bg-[#6a6a8b]"
                        style={{ animationDelay: "0ms" }}
                      ></span>
                      <span
                        className="h-2 w-2 animate-bounce rounded-full bg-[#6a6a8b]"
                        style={{ animationDelay: "150ms" }}
                      ></span>
                      <span
                        className="h-2 w-2 animate-bounce rounded-full bg-[#6a6a8b]"
                        style={{ animationDelay: "300ms" }}
                      ></span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </div>

            <form
              className="mt-4 flex items-center gap-3"
              onSubmit={handleFormSubmit}
            >
              <div className="relative flex-1">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(event) => setInputValue(event.target.value)}
                  disabled={chatMutation.isPending}
                  placeholder="Type your message"
                  className="w-full rounded-lg border border-[#000035] py-2 pl-4 pr-12 text-sm transition-colors placeholder:text-[#000035] disabled:opacity-50 dark:border-[#D7D7D7] dark:text-[#D7D7D7] dark:placeholder:text-[#D7D7D7]"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || chatMutation.isPending}
                  className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center text-[#000035] transition-colors hover:opacity-75 disabled:cursor-not-allowed disabled:opacity-50 dark:text-[#D7D7D7] dark:hover:text-white"
                  aria-label="Send message"
                >
                  <SendHorizontal size={16} />
                </button>
              </div>
            </form>
          </section>
        </section>
      </main>
    </div>
  );
}

export default UserChatbot;
