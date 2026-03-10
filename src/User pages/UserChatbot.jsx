import React, { useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  Bot,
  MessageSquareText,
  Search,
  SendHorizontal,
  Trash2,
} from "lucide-react";
import { apiPost, getImageUrl } from "../services/api.config";

const STORAGE_KEY = "chatSessions";

const quickActions = [
  "Renew Subscription",
  "Borrow Status",
  "Recommendations",
  "New Books",
];

const STARTING_MESSAGE = {
  id: 1,
  sender: "bot",
  text: "Hello, I'm Library Bot! How can I help you today?",
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
    return "I didn't quite understand that.";
  }

  return (
    responsePayload.reply ||
    responsePayload.response ||
    responsePayload.message ||
    responsePayload.answer ||
    "I didn't quite understand that."
  );
};

const getChatErrorMessage = (error) => {
  const rawMessage = String(error?.message || "").trim();

  if (
    error?.status === 400 &&
    /x-user-id|user id|header|required/i.test(rawMessage)
  ) {
    return "Your session is missing user identity. Please sign in again.";
  }

  if (error?.status === 401 || error?.status === 403) {
    return "Your session expired. Please sign in again.";
  }

  if (rawMessage && rawMessage.length <= 220) {
    return rawMessage;
  }

  return "I'm having trouble connecting to the server. Please try again later.";
};

function getStoredSessions() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function UserChatbot() {
  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([STARTING_MESSAGE]);
  const [sessions, setSessions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isInitialized, setIsInitialized] = useState(false);
  const messagesEndRef = useRef(null);

  const localUser = getCurrentUser();
  const { data: userProfile } = useUser(localUser?.user_id);
  const currentUser =
    userProfile && userProfile.user_id ? userProfile : localUser;
  const activeUserId = getUserId(currentUser) || getUserId(localUser);
  const sessionsStorageKey = getChatSessionsStorageKey(activeUserId);

  useEffect(() => {
    if (!activeUserId) {
      setSessions([]);
      setSessionId(Date.now());
      setMessages([STARTING_MESSAGE]);
      setIsInitialized(true);
      return;
    }

    try {
      const saved = localStorage.getItem(sessionsStorageKey);
      const parsed = saved ? JSON.parse(saved) : [];
      const loadedSessions = Array.isArray(parsed)
        ? parsed.filter(
            (entry) =>
              entry &&
              (typeof entry.id === "number" || typeof entry.id === "string"),
          )
        : [];

      setSessions(loadedSessions);

      const activeSessionKey = getActiveChatSessionKey(activeUserId);
      const savedActiveId = localStorage.getItem(activeSessionKey);
      const sessionToLoad = loadedSessions.find(
        (s) => String(s.id) === savedActiveId,
      );

      const loadMessagesForSession = (id, sessionObj) => {
        try {
          const messagesKey = `chatSessionMessages:${activeUserId}:${id}`;
          const savedMessages = localStorage.getItem(messagesKey);
          if (savedMessages) return JSON.parse(savedMessages);
          if (sessionObj && Array.isArray(sessionObj.messages))
            return sessionObj.messages;
        } catch (e) {}
        return [STARTING_MESSAGE];
      };

      if (sessionToLoad) {
        setSessionId(sessionToLoad.id);
        const msgs = loadMessagesForSession(sessionToLoad.id, sessionToLoad);
        setMessages(msgs.length > 0 ? msgs : [STARTING_MESSAGE]);
      } else if (savedActiveId) {
        setSessionId(
          isNaN(Number(savedActiveId)) ? savedActiveId : Number(savedActiveId),
        );
        const parsedId = isNaN(Number(savedActiveId))
          ? savedActiveId
          : Number(savedActiveId);
        const msgs = loadMessagesForSession(parsedId, null);
        setMessages(msgs.length > 0 ? msgs : [STARTING_MESSAGE]);
      } else if (loadedSessions.length > 0) {
        const latest = loadedSessions[0];
        setSessionId(latest.id);
        const msgs = loadMessagesForSession(latest.id, latest);
        setMessages(msgs.length > 0 ? msgs : [STARTING_MESSAGE]);
      } else {
        setSessionId(Date.now());
        setMessages([STARTING_MESSAGE]);
      }
      setIsInitialized(true);
    } catch {
      setSessions([]);
      setSessionId(Date.now());
      setMessages([STARTING_MESSAGE]);
      setIsInitialized(true);
    }
  }, [sessionsStorageKey, activeUserId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (messages.length > 1 && sessionId) {
      setSessions((prev) => {
        const title =
          messages.find((m) => m.sender === "user")?.text || "New Conversation";
        const existingIndex = prev.findIndex((s) => s.id === sessionId);

        let newSessions = [...prev];
        if (existingIndex >= 0) {
          newSessions[existingIndex] = {
            ...newSessions[existingIndex],
            title,
            messageCount: messages.length,
          };
          delete newSessions[existingIndex].messages;
        } else {
          newSessions.unshift({
            id: sessionId,
            title,
            messageCount: messages.length,
          });
        }
        return newSessions;
      });
    }
  }, [messages, sessionId]);

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
    mutationFn: async ({ messageText, userId }) => {
      const body = { message: messageText };
      const headers = { "X-User-Id": userId };

      try {
        return await apiPost("/chat", body, { headers });
      } catch (error) {
        if (error?.status !== 404 && error?.status !== 405) {
          throw error;
        }

        return await apiPost("/librarian/ask", body, { headers });
      }
    },
    onSuccess: (data) => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: "bot",
          text: getReplyText(data),
        },
      ]);
    },
    onError: (error) => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: "bot",
          text: getChatErrorMessage(error),
        },
      ]);
      console.error("Chat error:", error);
    },
  });

  const handleSendMessage = (text) => {
    const normalizedText = String(text || "").trim();
    if (!normalizedText) return;

    if (!activeUserId) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: "bot",
          text: "Please sign in again to continue chatting.",
        },
      ]);
      return;
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
    chatMutation.mutate({ messageText: normalizedText, userId: activeUserId });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    handleSendMessage(inputValue);
  };

  const handleNewChat = () => {
    setMessages([STARTING_MESSAGE]);
    setInputValue("");
    setSessionId(Date.now());
  };

  const loadSession = (id) => {
    const session = sessions.find((s) => s.id === id);
    if (session) {
      setSessionId(id);
      try {
        const messagesKey = `chatSessionMessages:${activeUserId}:${id}`;
        const savedMessages = localStorage.getItem(messagesKey);
        if (savedMessages) {
          setMessages(JSON.parse(savedMessages));
        } else if (session.messages) {
          setMessages(session.messages);
        } else {
          setMessages([STARTING_MESSAGE]);
        }
      } catch (e) {
        setMessages([STARTING_MESSAGE]);
      }
    }
  };

  const deleteSession = (event, id) => {
    event.stopPropagation();

    if (activeUserId) {
      localStorage.removeItem(`chatSessionMessages:${activeUserId}:${id}`);
    }

    if (sessionId === id) {
      setMessages([STARTING_MESSAGE]);
      setSessionId(Date.now());
    }

    setSessionId(Date.now());
    setMessages([STARTING_MESSAGE]);
    setInputValue("");
  };

  return (
    <div className="flex h-full w-full">
      <main className="flex h-full flex-1 flex-col gap-3 px-5 py-3">
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

        <section className="flex h-full gap-3 max-[980px]:flex-col">
          <aside className="flex w-full max-w-[360px] flex-col gap-3 max-[980px]:max-w-none">
            <section className="flex min-h-0 flex-1 flex-col rounded-lg border border-[#000035] p-4 dark:border-[#D7D7D7]">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-[#000035] dark:text-[#D7D7D7]">
                  Conversation
                </h2>
                <span className="text-xs text-[#000035] opacity-70 dark:text-[#D7D7D7]">
                  {sessions.length}
                </span>
              </div>

              <div className="relative mt-4">
                <Search
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#000035] dark:text-[#D7D7D7]"
                  size={16}
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search conversations"
                  className="w-full rounded-lg border border-[#000035] py-1.5 pl-10 pr-3.5 text-sm transition-colors placeholder:text-[#000035] dark:border-[#D7D7D7] dark:text-[#D7D7D7] dark:placeholder:text-[#D7D7D7]"
                />
              </div>

              <div className="mt-4 flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto pr-1">
                {sessions.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center rounded-lg border border-dashed border-[#000035] px-6 text-center text-sm text-[#000035] dark:border-[#D7D7D7] dark:text-[#D7D7D7]">
                    No saved conversations yet.
                  </div>
                ) : (
                  sessions
                    .filter((s) =>
                      String(s.title || "")
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()),
                    )
                    .map((session) => {
                      const isActive = session.id === sessionId;

                      return (
                        <button
                          key={session.id}
                          type="button"
                          onClick={() => loadSession(session.id)}
                          className={`flex items-center gap-3 rounded-lg border px-3 py-3 text-left transition-colors cursor-pointer ${
                            isActive && messages.length > 1
                              ? "border-[#000035] bg-white dark:border-[#D7D7D7] dark:bg-[#D7D7D7]"
                              : "border-[#000035] bg-transparent hover:bg-white/70 dark:border-[#D7D7D7] dark:hover:bg-[#D7D7D7]/10"
                          }`}
                        >
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0b0c28] text-white dark:bg-[#D7D7D7] dark:text-black">
                            <Bot size={18} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div
                              className={`truncate text-sm font-semibold ${
                                isActive && messages.length > 1
                                  ? "text-[#D7D7D7] dark:text-[#121317]"
                                  : "text-[#000035] dark:text-[#D7D7D7]"
                              }`}
                            >
                              {session.title}
                            </div>
                            <div
                              className={`mt-0.5 text-xs ${
                                isActive && messages.length > 1
                                  ? "text-[#D7D7D7] opacity-70 dark:text-[#121317]"
                                  : "text-[#121317] opacity-70 dark:text-[#D7D7D7]"
                              }`}
                            >
                              {session.messageCount ||
                                (session.messages
                                  ? session.messages.length
                                  : 0)}{" "}
                              messages
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={(event) =>
                              deleteSession(event, session.id)
                            }
                            className={`shrink-0 cursor-pointer ${
                              isActive && messages.length > 1
                                ? "text-[#D7D7D7] dark:text-[#121317]"
                                : "text-[#000035] dark:text-[#D7D7D7]"
                            } opacity-70 transition-colors hover:text-red-600`}
                            aria-label="Delete chat"
                          >
                            <Trash2 size={16} />
                          </button>
                        </button>
                      );
                    })
                )}
              </div>

              <button
                type="button"
                onClick={handleNewChat}
                className="mx-auto mt-4 min-w-[132px] rounded-xl border border-[#000035] bg-transparent px-5 py-2 text-sm font-bold text-[#000035] transition-colors hover:bg-[#000035]/5 dark:border-[#D7D7D7] dark:text-[#D7D7D7] dark:hover:bg-[#D7D7D7]/10 cursor-pointer"
              >
                New Chat
              </button>
            </section>

            <section className="rounded-lg border border-[#000035] p-4 dark:border-[#D7D7D7]">
              <h2 className="text-2xl font-semibold text-[#000035] dark:text-[#D7D7D7]">
                Quick Action
              </h2>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {quickActions.map((action) => (
                  <button
                    key={action}
                    type="button"
                    onClick={() => handleSendMessage(action)}
                    disabled={chatMutation.isPending}
                    className="rounded-xl cursor-pointer border border-[#000035] bg-transparent px-3 py-2 text-sm font-bold text-[#000035] transition-colors hover:bg-[#000035]/5 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[#D7D7D7] dark:text-[#D7D7D7] dark:hover:bg-[#D7D7D7]/10"
                  >
                    {action}
                  </button>
                ))}
              </div>
            </section>
          </aside>

          <section className="flex min-h-0 flex-1 flex-col rounded-lg border border-[#000035] p-4 dark:border-[#D7D7D7]">
            <div className="flex items-center justify-between border-b border-[#000035] pb-3 dark:border-[#D7D7D7]">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0b0c28] text-white dark:bg-[#D7D7D7] dark:text-black">
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

            <div className="mt-4 flex min-h-0 flex-1 flex-col rounded-lg border border-[#000035] p-4 dark:border-[#D7D7D7]">
              <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto pr-1">
                {messages.map((message) =>
                  message.sender === "bot" ? (
                    <div key={message.id} className="flex items-end gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0b0c28] text-white dark:bg-[#D7D7D7] dark:text-black">
                        <Bot size={18} />
                      </div>
                      <div className="max-w-[70%] rounded-2xl rounded-bl-md bg-white px-4 py-3 text-sm text-[#000035] dark:border dark:border-[#D7D7D7]/30 dark:bg-transparent dark:text-[#D7D7D7]">
                        {message.text}
                      </div>
                    </div>
                  ) : (
                    <div key={message.id} className="flex justify-end">
                      <div className="flex max-w-[70%] items-end gap-3">
                        <div className="rounded-2xl rounded-br-md bg-[#0b0c28] px-4 py-3 text-sm text-white dark:bg-[#D7D7D7] dark:text-black">
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
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0b0c28] text-white dark:bg-[#D7D7D7] dark:text-black">
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
                  className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center text-[#000035] transition-colors hover:opacity-75 disabled:cursor-not-allowed disabled:opacity-50 dark:text-[#D7D7D7] cursor-pointer dark:hover:text-white"
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
