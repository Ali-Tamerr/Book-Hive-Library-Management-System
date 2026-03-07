import React, { useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  Bot,
  MessageSquareText,
  Search,
  SendHorizontal,
  Trash2,
} from "lucide-react";

import { useUser } from "../hooks/useUsers";
import userAvatar from "../assets/img/testimonial-perfil-1.png";
import { getCurrentUser } from "../services/auth.api";
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
  text: "Hello, I'm Library Bot. How can I help you today?",
};

const INITIAL_MESSAGES = [
  {
    id: 1,
    sender: "bot",
    text: "Hello, I'm Library Bot. How can I help you today?",
  },
  {
    id: 2,
    sender: "user",
    text: "Show me new books this week.",
  },
  {
    id: 3,
    sender: "bot",
    text: "I can help with that. Ask for recommendations, category picks, or your borrowing status.",
  },
];

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
  const storedSessionsRef = useRef(getStoredSessions());
  const firstStoredSession = storedSessionsRef.current[0];

  const [sessions, setSessions] = useState(storedSessionsRef.current);
  const [sessionId, setSessionId] = useState(
    () => firstStoredSession?.id ?? Date.now(),
  );
  const [messages, setMessages] = useState(() =>
    firstStoredSession?.messages?.length
      ? firstStoredSession.messages
      : INITIAL_MESSAGES,
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);

  const localUser = getCurrentUser();
  const { data: userProfile } = useUser(localUser?.user_id);
  const currentUser =
    userProfile && userProfile.user_id ? userProfile : localUser;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (messages.length <= 1) return;

    setSessions((prev) => {
      const title =
        messages.find((message) => message.sender === "user")?.text ||
        "New Conversation";
      const existingIndex = prev.findIndex((session) => session.id === sessionId);
      const nextSessions = [...prev];

      if (existingIndex >= 0) {
        nextSessions[existingIndex] = {
          ...nextSessions[existingIndex],
          title,
          messages,
        };
      } else {
        nextSessions.unshift({ id: sessionId, title, messages });
      }

      return nextSessions;
    });
  }, [messages, sessionId]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  }, [sessions]);

  const chatMutation = useMutation({
    mutationFn: async (messageText) => {
      const endpoint = messageText.toLowerCase().includes("recommendation")
        ? "/librarian/ask"
        : "/chat";

      return apiPost(
        endpoint,
        { message: messageText },
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
        text: text.trim(),
      },
    ]);

    setInputValue("");
    chatMutation.mutate(text.trim());
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
    const session = sessions.find((item) => item.id === id);
    if (!session) return;

    setMessages(session.messages);
    setSessionId(session.id);
    setInputValue("");
  };

  const deleteSession = (event, id) => {
    event.stopPropagation();

    const remainingSessions = sessions.filter((session) => session.id !== id);
    setSessions(remainingSessions);

    if (sessionId !== id) return;

    const nextSession = remainingSessions[0];
    if (nextSession) {
      setSessionId(nextSession.id);
      setMessages(nextSession.messages);
      return;
    }

    setSessionId(Date.now());
    setMessages([STARTING_MESSAGE]);
    setInputValue("");
  };

  const filteredSessions = sessions.filter((session) =>
    session.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const userImage =
    currentUser?.image_url ? getImageUrl(currentUser.image_url) : userAvatar;

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
                  {filteredSessions.length}
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
                {filteredSessions.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center rounded-lg border border-dashed border-[#000035] px-6 text-center text-sm text-[#000035] dark:border-[#D7D7D7] dark:text-[#D7D7D7]">
                    No saved conversations yet.
                  </div>
                ) : (
                  filteredSessions.map((session) => {
                    const isActive = session.id === sessionId;

                    return (
                      <button
                        key={session.id}
                        type="button"
                        onClick={() => loadSession(session.id)}
                        className={`flex items-center gap-3 rounded-lg border px-3 py-3 text-left transition-colors ${
                          isActive
                            ? "border-[#000035] bg-white dark:border-[#D7D7D7] dark:bg-[#D7D7D7]"
                            : "border-[#000035]/30 bg-transparent hover:bg-white/70 dark:border-[#D7D7D7]/40 dark:hover:bg-[#D7D7D7]/10"
                        }`}
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0b0c28] text-white dark:bg-[#D7D7D7] dark:text-black">
                          <Bot size={18} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-sm font-semibold text-[#000035] dark:text-black">
                            {session.title}
                          </div>
                          <div className="mt-0.5 text-xs text-[#000035] opacity-70 dark:text-black">
                            {session.messages.length} messages
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={(event) => deleteSession(event, session.id)}
                          className="shrink-0 cursor-pointer text-[#000035] opacity-70 transition-colors hover:text-red-600 dark:text-black"
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
                className="mt-4 mx-auto min-w-[132px] rounded-xl border border-[#000035] bg-transparent px-5 py-2 text-sm font-bold text-[#000035] transition-colors hover:bg-[#000035]/5 dark:border-[#D7D7D7] dark:text-[#D7D7D7] dark:hover:bg-[#D7D7D7]/10"
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
                    className="rounded-xl border border-[#000035] bg-transparent px-3 py-2 text-sm font-bold text-[#000035] transition-colors hover:bg-[#000035]/5 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[#D7D7D7] dark:text-[#D7D7D7] dark:hover:bg-[#D7D7D7]/10"
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
                        <img
                          src={userImage}
                          alt="User avatar"
                          className="h-10 w-10 shrink-0 rounded-full object-cover"
                        />
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

            <form className="mt-4 flex items-center gap-3" onSubmit={handleFormSubmit}>
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
                  className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center text-[#000035] transition-colors hover:opacity-75 disabled:cursor-not-allowed disabled:opacity-50 dark:text-[#D7D7D7] dark:hover:text-white"
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
