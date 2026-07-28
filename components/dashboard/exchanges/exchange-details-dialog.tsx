import { useState } from "react";
import Image from "next/image";
import {
  ExchangeOrder,
  useExchangeStore,
} from "@/lib/store/use-exchange-store";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { MOCK_USERS, MOCK_BOOKS } from "@/lib/data/exchanges";
import {
  MapPin,
  CalendarDays,
  Star,
  MessageCircle,
  Check,
  KeyRound,
  Copy,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ExchangeDetailsDialogProps = {
  selectedExchange: ExchangeOrder | null;
  onClose: () => void;
};

export function ExchangeDetailsDialog({
  selectedExchange,
  onClose,
}: ExchangeDetailsDialogProps) {
  const { updateExchangeStatus } = useExchangeStore();
  const [partnerOtpInput, setPartnerOtpInput] = useState("");
  const [copiedOtp, setCopiedOtp] = useState(false);
  const [verifySuccess, setVerifySuccess] = useState(false);

  if (!selectedExchange) return null;

  const isOwner = selectedExchange.ownerId === "current-user";
  const partnerId = isOwner
    ? selectedExchange.proposerId
    : selectedExchange.ownerId;
  const partnerInfo = MOCK_USERS[partnerId] || {
    name: "Unknown",
    avatar:
      "https://ui-avatars.com/api/?name=Unknown&background=95a5a6&color=fff",
    rating: "0.0",
    reviews: 0,
  };
  const myBookTitle = isOwner
    ? selectedExchange.requestedBookTitle
    : selectedExchange.offeredBookTitle;
  const theirBookTitle = isOwner
    ? selectedExchange.offeredBookTitle
    : selectedExchange.requestedBookTitle;
  const myBookImage = isOwner
    ? selectedExchange.requestedBookImage
    : selectedExchange.offeredBookImage;
  const theirBookImage = isOwner
    ? selectedExchange.offeredBookImage
    : selectedExchange.requestedBookImage;
  const myBookMock = myBookTitle.toLowerCase().includes("book")
    ? MOCK_BOOKS[`book${(myBookTitle.length % 3) + 1}`]
    : MOCK_BOOKS["book1"];
  const myBookAuthor = myBookMock?.author || "Unknown Author";
  const theirBookMock = MOCK_BOOKS["book1"];
  const theirBookAuthor = theirBookMock?.author || "Unknown Author";

  const statusMap: Record<string, { label: string; color: string }> = {
    pending_proposal: {
      label: "Waiting for You",
      color: "bg-amber-100 text-amber-700 border-amber-200",
    },
    counter_offered: {
      label: "Waiting for Partner",
      color: "bg-blue-100 text-blue-700 border-blue-200",
    },
    agreement_reached: {
      label: "Ready for Meetup",
      color: "bg-emerald-100 text-emerald-700 border-emerald-200",
    },
    handed_over: {
      label: "Handed Over",
      color: "bg-emerald-100 text-emerald-700 border-emerald-200",
    },
    completed: {
      label: "Completed",
      color: "bg-gray-100 text-gray-700 border-gray-200",
    },
    cancelled: {
      label: "Cancelled",
      color: "bg-red-100 text-red-700 border-red-200",
    },
  };

  const statusInfo = statusMap[selectedExchange.status] || {
    label: selectedExchange.status,
    color: "bg-gray-100 text-gray-700 border-gray-200",
  };

  return (
    <Dialog
      open={!!selectedExchange}
      onOpenChange={(open) => !open && onClose()}
    >
      <DialogContent className="dark:bg-background h-[100dvh] max-h-[100dvh] w-full gap-0 overflow-hidden rounded-none bg-[#F8FAFC] p-0 sm:h-auto sm:max-h-[85vh] sm:max-w-[700px] sm:rounded-2xl">
        <DialogTitle className="sr-only">Exchange Details</DialogTitle>

        <div className="flex flex-col">
          {/* Header */}
          <div className="border-border/60 flex items-center justify-between border-b bg-white p-4 sm:px-6 dark:bg-slate-900">
            <div>
              <span className="text-muted-foreground font-mono text-[10px] uppercase">
                EXCHANGE ID
              </span>
              <h3 className="text-foreground text-sm font-bold sm:text-base">
                #{selectedExchange.id.substring(0, 8).toUpperCase()}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`rounded-full border px-3 py-1 text-xs font-bold ${statusInfo.color}`}
              >
                {statusInfo.label}
              </span>
            </div>
          </div>

          <div className="hide-scrollbar max-h-[calc(100dvh-130px)] space-y-4 overflow-y-auto p-4 sm:max-h-[70vh] sm:p-6">
            {/* Books Comparison Card */}
            <div className="bg-card border-border/60 rounded-xl border p-4 shadow-2xs">
              <h4 className="text-muted-foreground mb-3 text-xs font-bold tracking-wider uppercase">
                Exchanged Books
              </h4>

              <div className="grid grid-cols-2 gap-4">
                {/* Book You Give */}
                <div className="border-border/40 flex flex-col items-center border-r pr-2 text-center sm:items-start sm:text-left">
                  <span className="mb-2 text-[10px] font-extrabold text-blue-600 uppercase">
                    You Give
                  </span>
                  <div className="flex flex-col items-center gap-2 sm:flex-row sm:items-start">
                    <Image
                      src={myBookImage}
                      alt={myBookTitle}
                      width={48}
                      height={68}
                      className="h-16 w-12 rounded object-cover shadow-sm"
                    />
                    <div>
                      <p className="text-foreground text-xs font-bold">
                        {myBookTitle}
                      </p>
                      <p className="text-muted-foreground text-[11px]">
                        {myBookAuthor}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Book You Receive */}
                <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
                  <span className="mb-2 text-[10px] font-extrabold text-emerald-600 uppercase">
                    You Receive
                  </span>
                  <div className="flex flex-col items-center gap-2 sm:flex-row sm:items-start">
                    <Image
                      src={theirBookImage}
                      alt={theirBookTitle}
                      width={48}
                      height={68}
                      className="h-16 w-12 rounded object-cover shadow-sm"
                    />
                    <div>
                      <p className="text-foreground text-xs font-bold">
                        {theirBookTitle}
                      </p>
                      <p className="text-muted-foreground text-[11px]">
                        {theirBookAuthor}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Meetup Details & Location */}
            <div className="bg-card border-border/60 space-y-3 rounded-xl border p-4 shadow-2xs">
              <h4 className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
                Meetup & Handover Coordinates
              </h4>

              <div className="grid gap-3 text-xs sm:grid-cols-2">
                <div className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                  <div>
                    <p className="text-muted-foreground text-[11px]">
                      Location
                    </p>
                    <p className="text-foreground font-bold">
                      {selectedExchange.meetLocation ||
                        "Dhaka University Campus"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
                  <div>
                    <p className="text-muted-foreground text-[11px]">
                      Date & Time
                    </p>
                    <p className="text-foreground font-bold">
                      {selectedExchange.meetDate || "Oct 28, 2026"} @ 4:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Handover Security OTP & Verification Card */}
            <div className="space-y-3 rounded-xl border border-indigo-500/20 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 p-4 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400">
                  <KeyRound className="h-4 w-4" />
                  Live Handover Security OTP
                </span>
                <span className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
                  4-Digit Code
                </span>
              </div>

              {selectedExchange.status === "completed" || verifySuccess ? (
                <div className="flex items-center gap-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-emerald-700 dark:text-emerald-300">
                  <CheckCircle2 className="h-6 w-6 shrink-0 text-emerald-500" />
                  <div className="text-xs">
                    <p className="font-bold">Handover Verified & Completed!</p>
                    <p className="text-[11px] opacity-90">
                      Both partners confirmed receipt of their books via OTP.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-muted-foreground text-[11px] leading-relaxed">
                    When you meet{" "}
                    <span className="text-foreground font-bold">
                      {partnerInfo.name}
                    </span>{" "}
                    in person, exchange your 4-digit codes to confirm book
                    handover.
                  </p>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {/* Your Secret OTP */}
                    <div className="bg-background flex flex-col justify-between rounded-lg border p-3 shadow-2xs">
                      <span className="text-muted-foreground text-[10px] font-bold uppercase">
                        Your Secret OTP
                      </span>
                      <div className="my-1.5 flex items-center justify-between">
                        <span className="text-primary font-mono text-lg font-extrabold tracking-widest">
                          8 4 9 2
                        </span>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 text-xs"
                          onClick={() => {
                            navigator.clipboard.writeText("8492");
                            setCopiedOtp(true);
                            setTimeout(() => setCopiedOtp(false), 2000);
                          }}
                        >
                          {copiedOtp ? (
                            <>
                              <Check className="mr-1 h-3 w-3 text-emerald-500" />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy className="mr-1 h-3 w-3" />
                              Copy
                            </>
                          )}
                        </Button>
                      </div>
                      <span className="text-muted-foreground text-[10px]">
                        Show this to your partner
                      </span>
                    </div>

                    {/* Partner OTP Verification Input */}
                    <div className="bg-background flex flex-col justify-between rounded-lg border p-3 shadow-2xs">
                      <span className="text-muted-foreground text-[10px] font-bold uppercase">
                        Partner&apos;s OTP
                      </span>
                      <div className="my-1.5 flex gap-1.5">
                        <Input
                          value={partnerOtpInput}
                          onChange={(e) => setPartnerOtpInput(e.target.value)}
                          maxLength={4}
                          placeholder="e.g. 1234"
                          className="h-8 font-mono text-sm font-bold tracking-widest"
                        />
                        <Button
                          size="sm"
                          className="h-8 bg-emerald-600 px-3 text-xs font-bold text-white hover:bg-emerald-700"
                          onClick={() => {
                            if (partnerOtpInput.trim().length === 4) {
                              setVerifySuccess(true);
                              updateExchangeStatus(
                                selectedExchange.id,
                                "completed",
                              );
                            }
                          }}
                          disabled={partnerOtpInput.trim().length !== 4}
                        >
                          Verify
                        </Button>
                      </div>
                      <span className="text-muted-foreground text-[10px]">
                        Enter their 4-digit code
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Exchange Partner Profile info */}
            <div className="bg-card border-border/60 flex items-center justify-between rounded-xl border p-4 shadow-2xs">
              <div className="flex items-center gap-3">
                <Image
                  src={partnerInfo.avatar}
                  alt={partnerInfo.name}
                  width={44}
                  height={44}
                  className="border-border h-11 w-11 rounded-full border object-cover"
                />
                <div>
                  <h4 className="text-foreground text-sm font-bold">
                    {partnerInfo.name}
                  </h4>
                  <p className="text-muted-foreground flex items-center gap-1 text-xs">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    {partnerInfo.rating} ({partnerInfo.reviews} reviews)
                  </p>
                </div>
              </div>

              <button className="bg-primary/10 text-primary hover:bg-primary/20 flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-colors">
                <MessageCircle className="h-4 w-4" /> Message
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
