import React from "react";
import { MessageSquare, Search, Send, Bot } from "lucide-react";

const conversations = [
  {
    id: 1,
    name: "Library Bot",
    preview: "This is your message",
    time: "Feb 20, 2026",
    active: true,
  },
  {
    id: 2,
    name: "Library Book",
    preview: "This is your message",
    time: "Feb 19, 2026",
  },
  {
    id: 3,
    name: "Library Book",
    preview: "This is your message",
    time: "Feb 18, 2026",
  },
  {
    id: 4,
    name: "Library Book",
    preview: "This is your message",
    time: "Feb 17, 2026",
  },
  {
    id: 5,
    name: "Library Book",
    preview: "This is your message",
    time: "Feb 16, 2026",
  },
];

const quickActions = [
  "Renew Subscription",
  "Borrow Status",
  "Recommendations",
  "New Books",
];

const messages = [
  {
    id: 1,
    sender: "bot",
    text: "Hello Abdelmohymen, I'm Library Bot.",
  },
  {
    id: 2,
    sender: "user",
    text: "Hello Library Bot, I'm Abdelmohymen.",
  },
  {
    id: 3,
    sender: "bot",
    text: "How can I help you today? Ask about renewals, books, or your account.",
  },
  {
    id: 4,
    sender: "user",
    text: "Show me new arrivals this week.",
  },
  {
    id: 5,
    sender: "bot",
    text: "Sure. I found 12 new books in Fiction, History, and Science. Want a list?",
  },
];

function UserChatbot() {
  return (
    <div className="flex h-full w-full flex-col gap-6 px-[27px] py-[18px]">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0a0f33] text-white shadow-sm dark:bg-[#d9d9d9] dark:text-[#0a0f33]">
          <MessageSquare size={18} />
        </div>
        <div>
          <h1 className="text-2xl font-semibold">Chatbot</h1>
          <p className="text-sm text-[#6b7280] dark:text-[#b8bcc6]">
            Ask anything about your library account or books.
          </p>
        </div>
      </div>

      <div className="grid flex-1 min-h-0 gap-6 xl:grid-cols-[340px_1fr]">
        <div className="flex h-full flex-col gap-6">
          <section className="flex min-h-0 flex-1 flex-col rounded-2xl bg-white p-5 text-[#0a0f33] shadow-[0_12px_30px_rgba(15,23,42,0.08)] dark:bg-[#d9d9d9] dark:text-[#0a0f33]">
            <div className="flex items-center justify-between border-b border-gray-200 pb-3 dark:border-[#b5b5b5]">
              <h2 className="text-lg font-semibold">Conversation</h2>
              <span className="rounded-full bg-[#eef0f6] px-2 py-1 text-xs font-semibold text-[#4b5563] dark:bg-[#cfd3db] dark:text-[#0a0f33]">
                {conversations.length}
              </span>
            </div>

            <div className="relative mt-4">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Search Conversations"
                className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-9 pr-3 text-sm text-[#0a0f33] outline-none transition-colors placeholder:text-gray-400 focus:border-[#0a0f33] dark:border-[#a5a5a5] dark:bg-[#efefef] dark:text-[#0a0f33] dark:placeholder:text-[#6b6b6b]"
              />
            </div>

            <div className="mt-4 flex-1 overflow-y-auto pr-1">
              <div className="flex flex-col gap-3">
                {conversations.map((conversation) => (
                  <button
                    key={conversation.id}
                    type="button"
                    className={`flex w-full items-center justify-between rounded-xl border p-3 text-left transition-colors ${
                      conversation.active
                        ? "border-[#0a0f33] bg-[#f2f4f9] dark:border-[#0a0f33] dark:bg-[#d1d1d1]"
                        : "border-gray-200 bg-white hover:border-[#cbd5f5] dark:border-[#bdbdbd] dark:bg-[#f0f0f0] dark:hover:border-[#9aa3b2]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0a0f33] text-white">
                        <Bot size={18} strokeWidth={2.1} />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-[#0a0f33] dark:text-[#0a0f33]">
                          {conversation.name}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-[#5f6672]">
                          {conversation.preview}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] text-gray-400 dark:text-[#6b7280]">
                      {conversation.time}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <button className="mt-4 w-full rounded-xl bg-[#0a0f33] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#141850]">
              New Chat
            </button>
          </section>

          <section className="rounded-2xl bg-white p-5 text-[#0a0f33] shadow-[0_12px_30px_rgba(15,23,42,0.08)] dark:bg-[#d9d9d9] dark:text-[#0a0f33]">
            <h2 className="text-lg font-semibold">Quick Action</h2>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {quickActions.map((action) => (
                <button
                  key={action}
                  type="button"
                  className="rounded-xl bg-[#0a0f33] px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#141850]"
                >
                  {action}
                </button>
              ))}
            </div>
          </section>
        </div>

        <section className="flex h-full min-h-0 flex-col rounded-2xl bg-white p-6 text-[#0a0f33] shadow-[0_12px_30px_rgba(15,23,42,0.08)] dark:bg-[#d9d9d9] dark:text-[#0a0f33]">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-4 dark:border-[#b5b5b5]">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0a0f33] text-white">
                <Bot size={16} strokeWidth={2.1} />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Library Bot</h2>
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-[#5f6672]">
                  <span className="inline-block h-2 w-2 rounded-full bg-emerald-500"></span>
                  Online
                </div>
              </div>
            </div>
            <div className="text-xs text-gray-400 dark:text-[#6b7280]">
              Always here to help
            </div>
          </div>

          <div className="mt-4 flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto rounded-2xl bg-gradient-to-br from-[#f4f6fb] to-[#e7eaf3] p-6 dark:from-[#cfd3d8] dark:to-[#c7ccd2]">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] rounded-2xl px-4 py-2 text-sm shadow-sm ${
                    message.sender === "user"
                      ? "bg-[#0a0f33] text-white dark:bg-[#cfd3d9] dark:text-[#0a0f33]"
                      : "bg-white text-[#0a0f33] dark:bg-[#f1f1f1] dark:text-[#0a0f33]"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          <form
            className="mt-4 flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-3 shadow-sm dark:border-[#a5a5a5] dark:bg-[#eeeeee]"
            onSubmit={(event) => event.preventDefault()}
          >
            <input
              type="text"
              placeholder="Type your message"
              className="flex-1 bg-transparent text-sm text-[#0a0f33] outline-none placeholder:text-gray-400 dark:text-[#0a0f33] dark:placeholder:text-[#6b6b6b]"
            />
            <button
              type="submit"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0a0f33] text-white transition-colors hover:bg-[#141850]"
              aria-label="Send message"
            >
              <Send size={16} />
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default UserChatbot;
