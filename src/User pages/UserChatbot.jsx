import React, { useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Bot, MessageSquareText, Search, SendHorizontal } from "lucide-react";

import userAvatar from "../assets/img/testimonial-perfil-1.png";
import { getCurrentUser } from "../services/auth.api";
import { apiPost, getImageUrl } from "../services/api.config";
import { useUser } from "../hooks/useUsers";

const conversations = [
  {
    id: 1,
    name: "Library Book",
    preview: "This is your message",
    date: "Fri 20-2-2026",
  },
  {
    id: 2,
    name: "Library Book",
    preview: "This is your message",
    date: "Fri 20-2-2026",
  },
  {
    id: 3,
    name: "Library Book",
    preview: "This is your message",
    date: "Fri 20-2-2026",
  },
  {
    id: 4,
    name: "Library Book",
    preview: "This is your message",
    date: "Fri 20-2-2026",
  },
  {
    id: 5,
    name: "Library Book",
    preview: "This is your message",
    date: "Fri 20-2-2026",
  },
];

const quickActions = [
  "Renew Subscription",
  "Borrow Status",
  "Recommendations",
  "New Books",
];

const INITIAL_MESSAGES = [
  {
    id: 1,
    sender: "user",
    text: "Hello Library Bot, I'm Abdelmohymen",
  },
  {
    id: 2,
    sender: "bot",
    text: "Hello Abdelmohymen, I'm Library Bot",
  },
  {
    id: 3,
    sender: "user",
    text: "Hello Library Bot, I'm Abdelmohymen",
  },
  {
    id: 4,
    sender: "bot",
    text: "Hello Abdelmohymen, I'm Library Bot",
  },
  {
    id: 5,
    sender: "user",
    text: "Hello Library Bot, I'm Abdelmohymen",
  },
  {
    id: 6,
    sender: "bot",
    text: "Hello Abdelmohymen, I'm Library Bot",
  },
];

function UserChatbot() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
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

  const chatMutation = useMutation({
    mutationFn: async (messageText) => apiPost("/chat", { message: messageText }),
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
        text,
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
    setMessages([...INITIAL_MESSAGES]);
    setInputValue("");
  };

  const userImage =
    currentUser?.image_url ? getImageUrl(currentUser.image_url) : userAvatar;

  return (
    <div className="flex min-h-full w-full bg-[#e7e7e7] px-6 py-8 text-[#050549] transition-colors duration-300 lg:px-10 dark:bg-[#06080f] dark:text-[#ebebf0]">
      <div className="mx-auto flex w-full max-w-[1240px] flex-col">
        <div className="flex items-center gap-3">
          <MessageSquareText
            size={28}
            strokeWidth={2.4}
            className="text-[#00004f] dark:text-[#f1f1f1]"
          />
          <h1 className="bebas-neue-regular text-[46px] leading-none tracking-[0.6px] text-[#050549] dark:text-[#f1f1f1]">
            CHATBOT
          </h1>
        </div>

        <div className="mt-7 grid min-h-[720px] grid-cols-1 gap-8 xl:grid-cols-[387px_minmax(0,1fr)] xl:gap-[64px]">
          <div className="flex flex-col gap-6">
            <section className="flex min-h-[396px] flex-col overflow-hidden rounded-[16px] border border-[#505383] bg-[#e7e7e7] dark:border-[#75789b] dark:bg-[#d8dade]">
              <div className="border-b border-[#505383] px-7 pb-4 pt-6 dark:border-[#75789b]">
                <h2 className="bebas-neue-regular text-[32px] leading-none tracking-[0.4px] text-[#050549] dark:text-[#121747]">
                  CONVERSATION
                </h2>
              </div>

              <div className="px-[7px] pb-0 pt-5">
                <div className="relative">
                  <Search
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#050549] dark:text-[#121747]"
                    size={16}
                  />
                  <input
                    type="text"
                    placeholder="Search Conversations"
                    className="noto-sans-georgian-regular h-[40px] w-full rounded-[10px] border border-[#505383] bg-transparent py-2 pl-11 pr-3 text-[14px] text-[#050549] outline-none placeholder:text-[#505383] dark:border-[#75789b] dark:text-[#121747] dark:placeholder:text-[#61667f]"
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-[18px] py-5">
                <div className="flex flex-col gap-[14px]">
                  {conversations.map((conversation) => (
                    <button
                      key={conversation.id}
                      type="button"
                      className="flex items-start justify-between text-left"
                    >
                      <div className="flex items-start gap-3">
                        <Bot
                          size={18}
                          strokeWidth={2}
                          className="mt-[1px] shrink-0 text-[#050549] dark:text-[#121747]"
                        />
                        <div>
                          <div className="noto-sans-georgian-bold text-[13px] leading-none text-[#050549] dark:text-[#121747]">
                            {conversation.name}
                          </div>
                          <div className="noto-sans-georgian-regular mt-[3px] text-[10px] leading-none text-[#505383] dark:text-[#61667f]">
                            {conversation.preview}
                          </div>
                        </div>
                      </div>
                      <span className="noto-sans-georgian-regular pt-[2px] text-[10px] leading-none text-[#505383] dark:text-[#61667f]">
                        {conversation.date}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-[#505383] px-4 py-4 dark:border-[#75789b]">
                <button
                  type="button"
                  onClick={handleNewChat}
                  className="noto-sans-georgian-bold mx-auto flex h-[30px] min-w-[114px] items-center justify-center rounded-[10px] border border-[#505383] bg-transparent px-5 text-[15px] text-[#050549] transition-colors hover:bg-[#dcdced] dark:border-[#626884] dark:text-[#121747] dark:hover:bg-[#cfd2d8]"
                >
                  New Chat
                </button>
              </div>
            </section>

            <section className="rounded-[16px] border border-[#505383] bg-[#e7e7e7] px-[18px] pb-[14px] pt-5 dark:border-[#75789b] dark:bg-[#d8dade]">
              <h2 className="bebas-neue-regular text-[32px] leading-none tracking-[0.4px] text-[#050549] dark:text-[#121747]">
                QUICK ACTION
              </h2>
              <div className="mt-5 grid grid-cols-2 gap-x-[28px] gap-y-[14px]">
                {quickActions.map((action) => (
                  <button
                    key={action}
                    type="button"
                    onClick={() => handleSendMessage(action)}
                    disabled={chatMutation.isPending}
                    className="noto-sans-georgian-bold h-[30px] rounded-[10px] border border-[#505383] bg-transparent px-3 text-[15px] text-[#050549] transition-colors hover:bg-[#dcdced] disabled:cursor-not-allowed disabled:opacity-50 dark:border-[#626884] dark:text-[#121747] dark:hover:bg-[#cfd2d8]"
                  >
                    {action}
                  </button>
                ))}
              </div>
            </section>
          </div>

          <section className="flex min-h-[520px] flex-col rounded-[16px] border border-[#505383] bg-[#e7e7e7] px-6 pb-4 pt-6 dark:border-[#75789b] dark:bg-[#d8dade] lg:px-8">
            <div className="flex items-center justify-center gap-3 text-[#050549] dark:text-[#121747]">
              <Bot size={20} strokeWidth={2.1} />
              <h2 className="bebas-neue-regular text-[34px] leading-none tracking-[0.4px]">
                LIBRARY BOT
              </h2>
              <span className="mt-[1px] inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              <span className="noto-sans-georgian-regular mt-[1px] text-[14px] text-[#4f4f4f] dark:text-[#5a6074]">
                Online
              </span>
            </div>

            <div className="mt-5 flex min-h-0 flex-1 flex-col overflow-hidden rounded-[16px] border border-[#505383] bg-[#ececec] p-6 dark:border-[#75789b] dark:bg-[#d3d5d9]">
              <div className="flex min-h-0 flex-1 flex-col gap-9 overflow-y-auto">
                {messages.map((message) =>
                  message.sender === "bot" ? (
                    <div key={message.id} className="flex items-start gap-4">
                      <Bot
                        size={20}
                        strokeWidth={2}
                        className="mt-[1px] shrink-0 text-[#050549] dark:text-[#121747]"
                      />
                      <div className="noto-sans-georgian-bold max-w-[360px] pt-[2px] text-[14px] leading-[1.35] text-[#050549] dark:text-[#121747]">
                        {message.text}
                      </div>
                    </div>
                  ) : (
                    <div key={message.id} className="flex justify-end">
                      <div className="flex max-w-[420px] items-start gap-4">
                        <div className="noto-sans-georgian-bold pt-[2px] text-right text-[14px] leading-[1.35] text-[#050549] dark:text-[#121747]">
                          {message.text}
                        </div>
                        <img
                          src={userImage}
                          alt="User avatar"
                          className="h-[26px] w-[26px] shrink-0 rounded-full object-cover"
                        />
                      </div>
                    </div>
                  ),
                )}

                {chatMutation.isPending && (
                  <div className="flex items-start gap-4">
                    <Bot
                      size={20}
                      strokeWidth={2}
                      className="mt-[1px] shrink-0 text-[#050549] dark:text-[#121747]"
                    />
                    <div className="flex items-center gap-1 pt-[2px]">
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
              className="mt-6 flex items-center gap-3 rounded-[12px] border border-[#505383] bg-transparent px-3 py-[9px] dark:border-[#75789b]"
              onSubmit={handleFormSubmit}
            >
              <input
                type="text"
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                disabled={chatMutation.isPending}
                placeholder="Type your message"
                className="noto-sans-georgian-regular flex-1 bg-transparent text-[15px] text-[#050549] outline-none placeholder:text-[#7b7b8f] disabled:opacity-50 dark:text-[#121747] dark:placeholder:text-[#6c7184]"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || chatMutation.isPending}
                className="flex h-8 w-8 items-center justify-center text-[#00004f] transition-colors hover:text-[#161669] disabled:cursor-not-allowed disabled:opacity-50 dark:text-[#121747] dark:hover:text-[#242b53]"
                aria-label="Send message"
              >
                <SendHorizontal size={20} strokeWidth={2.2} />
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}

export default UserChatbot;
