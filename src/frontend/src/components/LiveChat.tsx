import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useApp } from "@/context/AppContext";
import { CHAT_BOTS, type ChatMessage, INITIAL_CHAT } from "@/data/mockData";
import { Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";

let msgCounter = 100;

export function LiveChat() {
  const { isLoggedIn, user } = useApp();
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_CHAT);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  // Simulate incoming chat
  useEffect(() => {
    const interval = setInterval(() => {
      const bot = CHAT_BOTS[Math.floor(Math.random() * CHAT_BOTS.length)];
      const msg = bot.messages[Math.floor(Math.random() * bot.messages.length)];
      setMessages((prev) => [
        ...prev.slice(-80),
        {
          id: `auto_${msgCounter++}`,
          user: bot.user,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${bot.user}`,
          message: msg,
          color: bot.color,
          isSubscriber: Math.random() > 0.5,
          timestamp: new Date(),
        },
      ]);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  const sendMessage = () => {
    if (!input.trim() || !isLoggedIn) return;
    setMessages((prev) => [
      ...prev,
      {
        id: `user_${msgCounter++}`,
        user: user!.displayName,
        avatar: user!.avatar,
        message: input.trim(),
        color: "#ff4444",
        isSubscriber: user!.isSubscribed,
        timestamp: new Date(),
      },
    ]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-full bg-card border border-border rounded-lg overflow-hidden">
      <div className="px-4 py-3 border-b border-border flex items-center gap-2">
        <span className="live-dot" />
        <span className="font-display font-semibold text-sm">Live Chat</span>
        <span className="ml-auto text-xs text-muted-foreground">
          {messages.length} msgs
        </span>
      </div>

      <ScrollArea className="flex-1 px-3 py-2 scrollbar-thin">
        <div className="space-y-2">
          {messages.map((msg) => (
            <div key={msg.id} className="flex items-start gap-2">
              <img
                src={msg.avatar}
                alt={msg.user}
                className="w-5 h-5 rounded-full flex-shrink-0 mt-0.5"
              />
              <div className="min-w-0 text-xs leading-relaxed">
                <span
                  className="font-semibold mr-1"
                  style={{ color: msg.color }}
                >
                  {msg.isSubscriber && <span className="mr-0.5">⭐</span>}
                  {msg.user}
                </span>
                <span className="text-foreground/90 break-words">
                  {msg.message}
                </span>
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
      </ScrollArea>

      <div className="p-3 border-t border-border">
        {isLoggedIn ? (
          <div className="flex gap-2">
            <Input
              data-ocid="stream.chat_input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Send a message…"
              className="h-8 text-xs bg-muted border-border"
            />
            <Button
              data-ocid="stream.chat.submit_button"
              size="sm"
              className="h-8 px-2 bg-primary hover:bg-primary/80"
              onClick={sendMessage}
            >
              <Send className="w-3.5 h-3.5" />
            </Button>
          </div>
        ) : (
          <p className="text-xs text-muted-foreground text-center">
            Sign in to chat
          </p>
        )}
      </div>
    </div>
  );
}
