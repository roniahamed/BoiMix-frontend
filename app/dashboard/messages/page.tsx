import { MessageBubble } from "@/components/shared/message-bubble";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendIcon } from "lucide-react";

export default function MessagesPage() {
  return (
    <div className="flex h-[calc(100vh-200px)] flex-col space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
        <p className="text-muted-foreground mt-2">
          Chat with other readers regarding book swaps and purchases.
        </p>
      </div>

      <div className="bg-card flex flex-1 overflow-hidden rounded-lg border">
        {/* Sidebar */}
        <div className="bg-muted/20 flex w-1/3 flex-col border-r">
          <div className="border-b p-4 font-semibold">Recent Chats</div>
          <div className="flex-1 overflow-y-auto">
            <div className="bg-background hover:bg-muted/50 cursor-pointer border-b p-4">
              <div className="text-sm font-semibold">Hasan Mahmud</div>
              <div className="text-muted-foreground truncate text-xs">
                Thanks for the book!
              </div>
            </div>
            <div className="hover:bg-muted/50 cursor-pointer border-b p-4">
              <div className="text-sm font-semibold">Nusrat Jahan</div>
              <div className="text-muted-foreground truncate text-xs">
                When can we meet?
              </div>
            </div>
            <div className="hover:bg-muted/50 cursor-pointer p-4">
              <div className="text-sm font-semibold">Fahim Ahmed</div>
              <div className="text-muted-foreground truncate text-xs">
                Is &apos;The Alchemist&apos; still available?
              </div>
            </div>
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex flex-1 flex-col">
          <div className="bg-background flex items-center gap-3 border-b p-4 font-semibold">
            Hasan Mahmud
          </div>
          <div className="bg-muted/10 flex-1 space-y-4 overflow-y-auto p-4">
            <MessageBubble
              message="Hi Roni! Are you available to swap 'Rich Dad Poor Dad' today?"
              time="10:00 AM"
            />
            <MessageBubble
              message="Hey Hasan! Yes, I can meet at Dhanmondi Lake around 5 PM."
              time="10:15 AM"
              mine={true}
            />
            <MessageBubble
              message="Perfect. I'll bring 'Atomic Habits'."
              time="10:20 AM"
            />
            <MessageBubble
              message="Thanks for the book! Left you a 5-star review."
              time="6:30 PM"
            />
          </div>
          <div className="bg-background flex gap-2 border-t p-4">
            <Input placeholder="Type your message..." className="flex-1" />
            <Button size="icon">
              <SendIcon className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
