import React from "react";
import { Bot, MessageSquareText, Search, SendHorizontal } from "lucide-react";
import userAvatar from "../assets/img/testimonial-perfil-1.png";

const conversations = [
  {
    id: 1,
    name: "Library Book",
    preview: "This is your message",
    time: "Fri 20-2-2026",
    active: true,
  },
  {
    id: 2,
    name: "Library Book",
    preview: "This is your message",
    time: "Fri 20-2-2026",
  },
  {
    id: 3,
    name: "Library Book",
    preview: "This is your message",
    time: "Fri 20-2-2026",
  },
  {
    id: 4,
    name: "Library Book",
    preview: "This is your message",
    time: "Fri 20-2-2026",
  },
  {
    id: 5,
    name: "Library Book",
    preview: "This is your message",
    time: "Fri 20-2-2026",
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
    text: "Hello Abdelmohymen, i'm Library Bot",
  },
  {
    id: 2,
    sender: "user",
    text: "Hello Library Bot, i'm Abdelmohymen",
  },
  {
    id: 3,
    sender: "bot",
    text: "Hello Abdelmohymen, i'm Library Bot",
  },
  {
    id: 4,
    sender: "user",
    text: "Hello Library Bot, i'm Abdelmohymen",
  },
  {
    id: 5,
    sender: "bot",
    text: "Hello Abdelmohymen, i'm Library Bot",
  },
  {
    id: 6,
    sender: "user",
    text: "Hello Library Bot, i'm Abdelmohymen",
  },
  {
    id: 7,
    sender: "bot",
    text: "Hello Abdelmohymen, i'm Library Bot",
  },
];

function UserChatbot() {
  return (
    <div className="h-full w-full bg-[#e7e7e7] px-6 py-8 text-[#050549] transition-colors duration-300 lg:px-10 dark:bg-[#0b0d14] dark:text-[#ebebf0]">
      <div className="mb-8 flex items-center gap-3">
        <MessageSquareText
          size={28}
          strokeWidth={2.4}
          className="text-[#00004f] dark:text-[#ebebf0]"
        />
        <h1
          className="text-[52px] leading-none tracking-[0.4px] text-[#050549] dark:text-[#ebebf0]"
          style={{ fontFamily: "'Bebas Neue', 'Oswald', 'Arial Narrow', sans-serif" }}
        >
          CHATBOT
        </h1>
      </div>

      <div className="grid min-h-0 items-start gap-6 xl:grid-cols-[390px_minmax(0,1120px)]">
        <div className="flex min-h-0 flex-col gap-5">
          <section className="flex h-[450px] shrink-0 flex-col overflow-hidden rounded-[16px] border border-[#dedede] bg-[#f4f4f4] dark:border-[#babec6] dark:bg-[#dbdde1]">
            <div className="border-b border-[#8f8fb1] px-7 pb-4 pt-6 dark:border-[#8f93a4]">
              <h2
                className="text-[44px] leading-none text-[#050549] dark:text-[#121747]"
                style={{ fontFamily: "'Bebas Neue', 'Oswald', 'Arial Narrow', sans-serif" }}
              >
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
                  className="h-11 w-full rounded-[10px] border border-[#52558a] bg-transparent py-2 pl-10 pr-3 text-sm text-[#050549] outline-none placeholder:text-[#52558a] dark:border-[#555d80] dark:text-[#121747] dark:placeholder:text-[#555d80]"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-2">
              <div className="space-y-1 py-2">
                {conversations.map((conversation) => (
                  <button
                    key={conversation.id}
                    type="button"
                    className={`flex w-full items-center justify-between rounded-[10px] px-2 py-1.5 text-left transition-colors ${
                      conversation.active
                        ? "bg-[#ebedf6] dark:bg-[#cfd3dd]"
                        : "hover:bg-[#ececec] dark:hover:bg-[#d2d5de]"
                    }`}
                  >
                    <div className="flex min-w-0 items-start gap-2">
                      <Bot
                        size={16}
                        strokeWidth={2}
                        className="mt-0.5 shrink-0 text-[#050549] dark:text-[#121747]"
                      />
                      <div className="min-w-0">
                        <p className="truncate text-[12px] font-bold leading-tight text-[#050549] dark:text-[#121747]">
                          {conversation.name}
                        </p>
                        <p className="truncate text-[11px] text-[#050549] dark:text-[#121747]">
                          {conversation.preview}
                        </p>
                      </div>
                    </div>
                    <p className="shrink-0 text-[10px] text-[#050549] dark:text-[#121747]">
                      {conversation.time}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-[#8f8fb1] px-4 py-4 dark:border-[#8f93a4]">
              <button
                type="button"
                className="mx-auto flex h-10 min-w-[122px] items-center justify-center rounded-[12px] bg-[#00004f] px-6 text-[34px] leading-none text-white transition-colors hover:bg-[#161669] dark:bg-[#0d1130] dark:hover:bg-[#1d2142]"
                style={{ fontFamily: "'Bebas Neue', 'Oswald', 'Arial Narrow', sans-serif" }}
              >
                New Chat
              </button>
            </div>
          </section>

          <section className="shrink-0 rounded-[16px] border border-[#dedede] bg-[#f4f4f4] px-5 pb-5 pt-6 dark:border-[#babec6] dark:bg-[#dbdde1]">
            <h2
              className="text-[44px] leading-none text-[#050549] dark:text-[#121747]"
              style={{ fontFamily: "'Bebas Neue', 'Oswald', 'Arial Narrow', sans-serif" }}
            >
              QUICK ACTION
            </h2>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {quickActions.map((action) => (
                <button
                  key={action}
                  type="button"
                  className="h-10 rounded-[12px] bg-[#00004f] px-3 text-[26px] leading-none text-white transition-colors hover:bg-[#161669] dark:bg-[#0d1130] dark:hover:bg-[#1d2142]"
                  style={{ fontFamily: "'Bebas Neue', 'Oswald', 'Arial Narrow', sans-serif" }}
                >
                  {action}
                </button>
              ))}
            </div>
          </section>
        </div>

        <section className="flex min-h-[530px] w-full flex-col rounded-[16px] border border-[#dedede] bg-[#f4f4f4] px-6 pb-4 pt-6 lg:px-8 dark:border-[#babec6] dark:bg-[#dbdde1] xl:ml-25">
          <div className="flex items-center justify-center gap-2 text-[#050549] dark:text-[#121747]">
            <Bot size={20} strokeWidth={2.1} />
            <h2
              className="text-[46px] leading-none"
              style={{ fontFamily: "'Bebas Neue', 'Oswald', 'Arial Narrow', sans-serif" }}
            >
              LIBRARY BOT
            </h2>
            <span className="ml-2 mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            <span className="mt-1 text-sm text-[#4f4f4f] dark:text-[#60657a]">Online</span>
          </div>

          <div className="mt-5 flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto rounded-[14px] bg-[#e1e1e1] p-5 dark:bg-[#cfd2d7] lg:p-6">
            {messages.map((message) =>
              message.sender === "bot" ? (
                <div key={message.id} className="flex items-center gap-3">
                  <Bot size={18} strokeWidth={2.1} className="text-[#050549] dark:text-[#121747]" />
                  <div className="max-w-[70%] rounded-[8px] bg-[#d9d9d9] px-3 py-2 text-[14px] font-semibold text-[#050549] dark:bg-[#e2e4e8] dark:text-[#121747]">
                    {message.text}
                  </div>
                </div>
              ) : (
                <div key={message.id} className="flex justify-end">
                  <div className="flex items-center gap-2">
                    <div className="max-w-[70%] rounded-[8px] bg-[#d9d9d9] px-3 py-2 text-[14px] font-semibold text-[#050549] dark:bg-[#e2e4e8] dark:text-[#121747]">
                      {message.text}
                    </div>
                    <img
                      src={userAvatar}
                      alt="User avatar"
                      className="h-9 w-9 rounded-full object-cover"
                    />
                  </div>
                </div>
              ),
            )}
          </div>

          <form
            className="mt-4 flex items-center gap-3 rounded-[12px] border border-[#7d7d90] bg-[#f1f1f1] px-3 py-2 dark:border-[#84899a] dark:bg-[#dde0e5]"
            onSubmit={(event) => event.preventDefault()}
          >
            <input
              type="text"
              placeholder="Type your message"
              className="flex-1 bg-transparent text-lg text-[#050549] outline-none placeholder:text-[#7b7b8f] dark:text-[#121747] dark:placeholder:text-[#6c7184]"
            />
            <button
              type="submit"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#00004f] text-white transition-colors hover:bg-[#161669] dark:bg-[#0d1130] dark:hover:bg-[#1d2142]"
              aria-label="Send message"
            >
              <SendHorizontal size={17} />
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default UserChatbot;
