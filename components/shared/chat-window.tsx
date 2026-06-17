import { MessageBubble } from "@/components/shared/message-bubble";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type ChatMessage = {
  id: string;
  message: string;
  time?: string;
  mine?: boolean;
};

type ChatWindowProps = {
  messages: ChatMessage[];
  placeholder?: string;
  className?: string;
};

export function ChatWindow({
  messages,
  placeholder = "Write a message...",
  className,
}: ChatWindowProps) {
  return (
    <section
      className={cn(
        "bg-card shadow-soft flex h-[520px] flex-col rounded-lg border",
        className,
      )}
    >
      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {messages.map((message) => (
          <MessageBubble key={message.id} {...message} />
        ))}
      </div>
      <form className="flex gap-2 border-t p-3">
        <Input placeholder={placeholder} />
        <Button type="submit">Send</Button>
      </form>
    </section>
  );
}
