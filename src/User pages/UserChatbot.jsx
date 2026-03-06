import React, { useState, useRef, useEffect } from "react";
import {
  Bot,
  MessageSquareText,
  Search,
  SendHorizontal,
  UserRound,
  Trash2,
} from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiPost, getImageUrl } from "../services/api.config";
import { useUser } from "../hooks/useUsers";
import { getCurrentUser } from "../services/auth.api";

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

function UserChatbot() {
  const [sessionId, setSessionId] = useState(() => Date.now());
  const [messages, setMessages] = useState([STARTING_MESSAGE]);
  const [sessions, setSessions] = useState(() => {
    const saved = localStorage.getItem("chatSessions");
    return saved ? JSON.parse(saved) : [];
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);

  const localUser = getCurrentUser();
  const { data: userProfile } = useUser(localUser?.user_id);
  const currentUser =
    userProfile && userProfile.user_id ? userProfile : localUser;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (messages.length > 1) {
      setSessions((prev) => {
        const title =
          messages.find((m) => m.sender === "user")?.text || "New Conversation";
        const existingIndex = prev.findIndex((s) => s.id === sessionId);

        let newSessions = [...prev];
        if (existingIndex >= 0) {
          newSessions[existingIndex] = {
            ...newSessions[existingIndex],
            messages,
            title,
          };
        } else {
          newSessions.unshift({ id: sessionId, title, messages });
        }
        return newSessions;
      });
    }
  }, [messages, sessionId]);

  useEffect(() => {
    localStorage.setItem("chatSessions", JSON.stringify(sessions));
  }, [sessions]);

  const chatMutation = useMutation({
    mutationFn: async (messageText) => {
      const endpoint = messageText.toLowerCase().includes("recommendation")
        ? "/librarian/ask"
        : "/chat";

      return apiPost(
        endpoint,
        {
          message: messageText,
        },
        {
          headers: {
            "X-User-Id": currentUser?.user_id || "",
          },
        },
      );
    },
    onSuccess: (data) => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: "bot",
          text: data?.reply || "I didn't quite understand that.",
        },
      ]);
    },
    onError: (error) => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: "bot",
          text: "I'm having trouble connecting to the server. Please try again later.",
        },
      ]);
      console.error("Chat error:", error);
    },
  });

  const handleSendMessage = (text) => {
    if (!text || !text.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: "user",
        text: text,
      },
    ]);

    setInputValue("");
    chatMutation.mutate(text);
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
      setMessages(session.messages);
      setSessionId(session.id);
    }
  };

  const deleteSession = (e, id) => {
    e.stopPropagation();
    const newSessions = sessions.filter((s) => s.id !== id);
    setSessions(newSessions);

    if (sessionId === id) {
      setMessages([STARTING_MESSAGE]);
      setSessionId(Date.now());
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center bg-[#e7e7e7] px-6 py-8 text-[#050549] transition-colors duration-300 lg:px-10 dark:bg-[#0b0d14] dark:text-[#ebebf0]">
      <div className="h-[800px] w-full">
        <div className="flex items-center gap-3">
          <MessageSquareText
            size={28}
            strokeWidth={2.4}
            className="text-[#00004f] dark:text-[#ebebf0]"
          />
          <h1 className="bebas-neue-regular text-[52px] leading-none tracking-[0.4px] text-[#050549] dark:text-[#ebebf0]">
            CHATBOT
          </h1>
        </div>

        <div className="flex items-stretch gap-[10%] pb-10">
          <div className="flex flex-1 flex-col gap-5">
            <section className="flex h-[450px] shrink-0 flex-col overflow-hidden rounded-[16px] border border-[#dedede] bg-[#f4f4f4] dark:border-[#babec6] dark:bg-[#dbdde1]">
              <div className="border-b border-[#8f8fb1] px-7 pb-4 pt-6 dark:border-[#8f93a4]">
                <h2 className="bebas-neue-regular text-[44px] leading-none text-[#050549] dark:text-[#121747]">
                  CONVERSATION
                </h2>
              </div>

              <div className="px-2 pb-2 pt-5">
                <div className="relative">
                  <Search
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#050549] dark:text-[#121747]"
                    size={16}
                  />
                  <input
                    type="text"
                    placeholder="Search Conversations"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-11 w-full rounded-[10px] border border-[#52558a] bg-transparent py-2 pl-10 pr-3 text-sm text-[#050549] outline-none placeholder:text-[#52558a] dark:border-[#555d80] dark:text-[#121747] dark:placeholder:text-[#555d80]"
                  />
                </div>
              </div>

              <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-4 py-4">
                {sessions.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    <MessageSquareText
                      size={48}
                      className="mb-3 text-[#8f8fb1] opacity-50"
                    />
                    <p className="text-lg font-medium text-[#8f8fb1]">
                      Your previous chat sessions will appear here soon.
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    {sessions
                      .filter((s) =>
                        s.title
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase()),
                      )
                      .map((session) => (
                        <div
                          key={session.id}
                          onClick={() => loadSession(session.id)}
                          className={`group flex cursor-pointer items-center justify-between rounded-[10px] px-4 py-3 transition-colors ${
                            session.id === sessionId && messages.length > 1
                              ? "bg-[#d9d9d9] font-bold text-[#050549] dark:bg-[#555d80] dark:text-[#ebebf0]"
                              : "text-[#52558a] hover:bg-[#e4e4e4] dark:text-[#8f93a4] dark:hover:bg-[#4a4f6d]"
                          }`}
                        >
                          <span className="truncate pr-2">{session.title}</span>
                          <button
                            type="button"
                            onClick={(e) => deleteSession(e, session.id)}
                            className={`shrink-0 transition-colors hover:text-red-500`}
                            aria-label="Delete chat"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                  </div>
                )}
              </div>

              <div className="border-t border-[#8f8fb1] px-4 py-4 dark:border-[#8f93a4]">
                <button
                  type="button"
                  onClick={handleNewChat}
                  className="bebas-neue-regular mx-auto flex h-10 min-w-[122px] items-center justify-center rounded-[12px] bg-[#00004f] px-6 text-[34px] leading-none text-white transition-colors hover:bg-[#161669] dark:bg-[#0d1130] dark:hover:bg-[#1d2142]"
                >
                  New Chat
                </button>
              </div>
            </section>

            <section className="shrink-0 rounded-[16px] border border-[#dedede] bg-[#f4f4f4] px-5 pb-5 pt-6 dark:border-[#babec6] dark:bg-[#dbdde1]">
              <h2 className="noto-sans-georgian-medium text-[44px] leading-none text-[#050549] dark:text-[#121747]">
                QUICK ACTION
              </h2>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {quickActions.map((action) => (
                  <button
                    key={action}
                    type="button"
                    onClick={() => handleSendMessage(action)}
                    disabled={chatMutation.isPending}
                    className="noto-sans-georgian-bold h-10 rounded-[12px] bg-[#00004f] px-3 text-[20px] leading-none text-white transition-colors hover:bg-[#161669] disabled:cursor-not-allowed disabled:opacity-50 dark:bg-[#0d1130] dark:hover:bg-[#1d2142]"
                  >
                    {action}
                  </button>
                ))}
              </div>
            </section>
          </div>

          <div className="relative min-w-0 flex-[2]">
            <section className="absolute inset-0 flex flex-col rounded-[16px] border border-[#dedede] bg-[#f4f4f4] px-6 pb-4 pt-6 lg:px-8 dark:border-[#babec6] dark:bg-[#dbdde1]">
              <div className="flex items-center justify-center gap-2 text-[#050549] dark:text-[#121747]">
                <Bot size={20} strokeWidth={2.1} />
                <h2 className="bebas-neue-regular text-[46px] leading-none">
                  LIBRARY BOT
                </h2>
                <span className="ml-2 mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                <span className="mt-1 text-sm text-[#4f4f4f] dark:text-[#60657a]">
                  Online
                </span>
              </div>

              <div className="mt-5 flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto rounded-[14px] bg-[#e1e1e1] p-5 lg:p-6 dark:bg-[#cfd2d7]">
                {messages.map((message) =>
                  message.sender === "bot" ? (
                    <div key={message.id} className="flex items-start gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#D7D7D7]">
                        <Bot
                          size={20}
                          strokeWidth={2.1}
                          className="text-[#050549] dark:text-[#121747]"
                        />
                      </span>
                      <div
                        dir="rtl"
                        className="max-w-[80%] rounded-bl-[12px] rounded-br-[12px] rounded-tr-[12px] bg-[#d9d9d9] px-4 py-3 text-[15px] font-semibold text-[#050549] dark:bg-[#e2e4e8] dark:text-[#121747]"
                      >
                        {message.text}
                      </div>
                    </div>
                  ) : (
                    <div key={message.id} className="flex justify-end">
                      <div className="flex items-start gap-3">
                        <div className="max-w-[80%] rounded-bl-[12px] rounded-br-[12px] rounded-tl-[12px] bg-[#00004f] px-4 py-3 text-[15px] font-semibold text-white dark:bg-[#1d2142] dark:text-white">
                          {message.text}
                        </div>
                        {currentUser?.image_url ? (
                          <img
                            src={getImageUrl(currentUser.image_url)}
                            alt="User avatar"
                            className="h-9 w-9 shrink-0 rounded-full object-cover"
                          />
                        ) : (
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#D7D7D7]">
                            <UserRound className="h-6 w-6 text-[#050549]" />
                          </div>
                        )}
                      </div>
                    </div>
                  ),
                )}

                {chatMutation.isPending && (
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#D7D7D7]">
                      <Bot
                        size={20}
                        strokeWidth={2.1}
                        className="animate-pulse text-[#050549] dark:text-[#121747]"
                      />
                    </span>
                    <div className="rounded-bl-[12px] rounded-br-[12px] rounded-tr-[12px] bg-[#d9d9d9] px-4 py-3 dark:bg-[#e2e4e8]">
                      <span className="flex h-full items-center gap-1">
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
                      </span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <form
                className="mt-4 flex items-center gap-3 rounded-[12px] border border-[#7d7d90] bg-[#f1f1f1] px-3 py-2 dark:border-[#84899a] dark:bg-[#dde0e5]"
                onSubmit={handleFormSubmit}
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  disabled={chatMutation.isPending}
                  placeholder="Type your message"
                  className="flex-1 bg-transparent text-lg text-[#050549] outline-none placeholder:text-[#7b7b8f] disabled:opacity-50 dark:text-[#121747] dark:placeholder:text-[#6c7184]"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || chatMutation.isPending}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-[#00004f] text-white transition-colors hover:bg-[#161669] disabled:cursor-not-allowed disabled:opacity-50 dark:bg-[#0d1130] dark:hover:bg-[#1d2142]"
                  aria-label="Send message"
                >
                  <SendHorizontal size={17} />
                </button>
              </form>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserChatbot;
