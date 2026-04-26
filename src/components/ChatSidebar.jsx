import React from "react";
import { Bot, Search, Trash2, Loader2, X } from "lucide-react";

/**
 * ChatSidebar - Scoped sidebar for chatbot conversations and quick actions
 */
const ChatSidebar = ({
  isOpen,
  onClose,
  sessions,
  sessionId,
  loadSession,
  deleteSession,
  handleNewChat,
  handleSendMessage,
  searchQuery,
  setSearchQuery,
  messages,
  chatMutation,
  deleteSessionMutation,
  quickActions,
}) => {
  return (
    <>
      {/* Sidebar Backdrop - mobile only, scoped to chatbot */}
      <div
        className={`min-[62.5rem]:hidden absolute inset-0 z-40 bg-transparent transition-all duration-300 ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      ></div>

      <aside
        className={`max-[62.5rem]:absolute max-[62.5rem]:right-0 max-[62.5rem]:top-0 max-[62.5rem]:z-60 max-[62.5rem]:h-full max-[62.5rem]:max-w-[20rem] max-[62.5rem]:bg-[#F2F2F2] dark:max-[62.5rem]:bg-[#121317] max-[62.5rem]:p-5 max-[62.5rem]:shadow-2xl flex w-full max-w-[22.5rem] flex-col gap-3 transition-all duration-300 ${
          isOpen
            ? "max-[62.5rem]:translate-x-0"
            : "max-[62.5rem]:translate-x-full"
        } min-[62.5rem]:relative min-[62.5rem]:translate-x-0`}
      >
        <div className="min-[62.5rem]:hidden mb-2 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-[#000035] dark:text-[#D7D7D7]">
            Chat Options
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-[#000035] dark:text-[#D7D7D7]"
          >
            <X size={20} />
          </button>
        </div>

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
                    <div
                      key={session.id}
                      onClick={() => loadSession(session.id)}
                      onKeyDown={(event) => {
                        if (event.target !== event.currentTarget) return;
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          loadSession(session.id);
                        }
                      }}
                      role="button"
                      tabIndex={0}
                      className={`flex cursor-pointer items-center gap-3 rounded-lg border px-3 py-3 text-left transition-colors ${
                        isActive && messages.length > 1
                          ? "border-[#000035] bg-white dark:border-[#D7D7D7] dark:bg-[#D7D7D7]"
                          : "border-[#000035] bg-transparent hover:bg-white/70 dark:border-[#D7D7D7] dark:hover:bg-[#D7D7D7]/10"
                      }`}
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#000035] text-white dark:bg-[#D7D7D7] dark:text-black">
                        <Bot size={18} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div
                          className={`truncate text-sm font-semibold ${
                            isActive && messages.length > 1
                              ? "text-[#000035] dark:text-[#121317]"
                              : "text-[#000035] dark:text-[#D7D7D7]"
                          }`}
                        >
                          {session.title}
                        </div>
                        <div
                          className={`mt-0.5 text-xs ${
                            isActive && messages.length > 1
                              ? "text-[#000035] opacity-70 dark:text-[#121317]"
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
                        onClick={(event) => deleteSession(event, session.id)}
                        className={`shrink-0 cursor-pointer ${
                          isActive && messages.length > 1
                            ? "text-[#000035] dark:text-[#121317]"
                            : "text-[#000035] dark:text-[#D7D7D7]"
                        } opacity-70 transition-colors hover:text-red-600`}
                        aria-label="Delete chat"
                        disabled={deleteSessionMutation.isPending}
                      >
                        {deleteSessionMutation.isPending &&
                        deleteSessionMutation.variables === session.id ? (
                          <Loader2 size={16} className="animate-spin" />
                        ) : (
                          <Trash2 size={16} />
                        )}
                      </button>
                    </div>
                  );
                })
            )}
          </div>

          <button
            type="button"
            onClick={onClose} // Auto-close on "New Chat" on mobile
            onMouseUp={handleNewChat}
            className="mx-auto mt-4 min-w-[8.25rem] cursor-pointer rounded-xl border border-[#000035] bg-transparent px-5 py-2 text-sm font-bold text-[#000035] transition-colors hover:bg-[#000035]/5 dark:border-[#D7D7D7] dark:text-[#D7D7D7] dark:hover:bg-[#D7D7D7]/10"
          >
            New Chat
          </button>
        </section>

        <section className="rounded-lg border border-[#000035] p-4 dark:border-[#D7D7D7]">
          <h2 className="text-2xl font-semibold text-[#000035] dark:text-[#D7D7D7]">
            Quick Action
          </h2>
          <div className="max-[71.875rem]:grid-cols-1 mt-4 grid grid-cols-2 gap-3">
            {quickActions.map((action) => (
              <button
                key={action.label}
                type="button"
                onClick={() => {
                  handleSendMessage(action.prompt);
                  onClose(); // Close sidebar after action
                }}
                disabled={chatMutation.isPending}
                className="cursor-pointer rounded-xl border border-[#000035] bg-transparent px-3 py-2 text-sm font-bold text-[#000035] transition-colors hover:bg-[#000035]/5 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[#D7D7D7] dark:text-[#D7D7D7] dark:hover:bg-[#D7D7D7]/10"
              >
                {action.label}
              </button>
            ))}
          </div>
        </section>
      </aside>
    </>
  );
};

export default ChatSidebar;
