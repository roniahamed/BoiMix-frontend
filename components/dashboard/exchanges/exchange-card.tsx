import Image from "next/image";
import {
  ExchangeOrder,
  useExchangeStore,
} from "@/lib/store/use-exchange-store";
import { getStatusBadge, MOCK_USERS, MOCK_BOOKS } from "@/lib/data/exchanges";
import {
  Repeat2,
  CheckCircle2,
  Eye,
  MapPin,
  CalendarDays,
  Star,
  Clock,
  MoreVertical,
} from "lucide-react";

type ExchangeCardProps = {
  exchange: ExchangeOrder;
  currentUser: string;
  onSelect: (exchange: ExchangeOrder) => void;
};

export function ExchangeCard({
  exchange,
  currentUser,
  onSelect,
}: ExchangeCardProps) {
  const { updateExchangeStatus } = useExchangeStore();

  const isOwner = exchange.ownerId === currentUser;
  const isProposer = exchange.proposerId === currentUser;

  let isActionRequiredByMe = false;
  if (isOwner && exchange.status === "pending_proposal")
    isActionRequiredByMe = true;
  if (isProposer && exchange.status === "counter_offered")
    isActionRequiredByMe = true;

  const statusBadge = getStatusBadge(exchange.status, isActionRequiredByMe);
  const partnerId = isOwner ? exchange.proposerId : exchange.ownerId;
  const partnerInfo = MOCK_USERS[partnerId] || {
    name: "Unknown User",
    avatar:
      "https://ui-avatars.com/api/?name=Unknown+User&background=95a5a6&color=fff",
    rating: "0.0",
    reviews: 0,
    completedSwaps: 0,
    memberSince: "2024",
  };

  const myBookTitle = isOwner
    ? exchange.requestedBookTitle
    : exchange.offeredBookTitle;
  const myBookImage = isOwner
    ? exchange.requestedBookImage
    : exchange.offeredBookImage;
  const theirBookTitle = isOwner
    ? exchange.offeredBookTitle
    : exchange.requestedBookTitle;
  const theirBookImage = isOwner
    ? exchange.offeredBookImage
    : exchange.requestedBookImage;

  const myBookMock =
    MOCK_BOOKS[`book${(myBookTitle.length % 3) + 1}`] || MOCK_BOOKS["book1"];
  const theirBookMock =
    MOCK_BOOKS[`book${(theirBookTitle.length % 3) + 1}`] || MOCK_BOOKS["book1"];

  return (
    <div className="bg-card border-border/60 relative flex flex-col items-start gap-4 overflow-hidden rounded-xl border p-3 shadow-xs transition-colors sm:gap-6 sm:px-4 sm:py-5 xl:flex-row xl:items-center">
      {/* Status Color Left Border */}
      <div
        className={`absolute top-0 bottom-0 left-0 w-1 ${
          statusBadge.color.includes("amber")
            ? "bg-amber-400"
            : statusBadge.color.includes("emerald")
              ? "bg-emerald-400"
              : statusBadge.color.includes("blue")
                ? "bg-blue-400"
                : "bg-muted"
        }`}
      />

      {/* Col 1: ID, Status, Partner & Location */}
      <div className="border-border/40 flex w-full shrink-0 flex-col xl:w-[260px] xl:border-r xl:pr-6">
        {/* Top: ID & Status */}
        <div className="mb-4 flex items-center gap-2">
          <span className="text-muted-foreground bg-muted/30 rounded px-2 py-0.5 font-mono text-[11px] font-bold tracking-wider">
            {exchange.id.substring(0, 8).toUpperCase()}
          </span>
          <div
            className={`flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-bold ${statusBadge.color}`}
          >
            <span>{statusBadge.icon}</span>
            {statusBadge.label}
          </div>
        </div>

        {/* Bottom: Partner & Location */}
        <div className="relative flex w-full flex-col sm:flex-row sm:items-start sm:justify-between sm:gap-2 xl:flex-col xl:gap-3">
          <div className="flex min-w-0 flex-1 items-start gap-2.5">
            <Image
              src={partnerInfo.avatar}
              alt={partnerInfo.name}
              width={40}
              height={40}
              className="border-border h-10 w-10 shrink-0 rounded-full border"
            />
            <div className="flex min-w-0 flex-1 flex-col">
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-2">
                  <h4 className="truncate text-sm leading-tight font-bold">
                    {partnerInfo.name}
                  </h4>
                  <span className="flex shrink-0 items-center text-[11px] font-semibold text-amber-500">
                    <Star className="mr-0.5 h-3 w-3 fill-current" />
                    {partnerInfo.rating}
                    <span className="text-muted-foreground ml-1 hidden font-normal sm:inline">
                      ({partnerInfo.reviews})
                    </span>
                  </span>
                </div>
                <button className="text-muted-foreground ml-2 sm:hidden">
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>

              <div className="text-muted-foreground mt-1.5 flex items-center gap-3 text-[10px] sm:hidden">
                {exchange.meetDate && (
                  <>
                    <div className="flex items-center gap-1">
                      <CalendarDays className="h-3 w-3 shrink-0 text-blue-500" />
                      <span className="truncate">{exchange.meetDate}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 shrink-0 text-orange-500" />
                      <span className="truncate">4:00 PM</span>
                    </div>
                  </>
                )}
                {exchange.meetLocation && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 shrink-0 text-red-500" />
                    <span className="truncate">{exchange.meetLocation}</span>
                  </div>
                )}
              </div>

              <div className="text-muted-foreground mt-2 hidden text-[10px] leading-snug sm:block">
                <span className="text-foreground font-bold">
                  {partnerInfo.completedSwaps}
                </span>{" "}
                Completed Swaps
                <br />
                Member since {partnerInfo.memberSince}
              </div>
            </div>
          </div>

          {exchange.meetLocation && (
            <div className="text-muted-foreground border-border/40 hidden min-w-[100px] shrink-0 flex-col gap-1.5 text-[10px] sm:flex sm:border-l sm:pl-3 xl:border-t xl:border-l-0 xl:pt-3 xl:pl-0">
              <div className="text-foreground flex items-center gap-1.5 font-medium">
                <MapPin className="h-3 w-3 shrink-0 text-red-500" />
                <span className="line-clamp-1 break-words">
                  {exchange.meetLocation}
                </span>
              </div>
              {exchange.meetDate && (
                <>
                  <div className="flex items-center gap-1.5">
                    <CalendarDays className="h-3 w-3 shrink-0 text-blue-500" />
                    <span className="line-clamp-1 break-words">
                      {exchange.meetDate}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3 w-3 shrink-0 text-orange-500" />
                    <span className="line-clamp-1 break-words">4:00 PM</span>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Col 2: Books */}
      <div className="border-border/40 border-border/10 flex w-full shrink-0 flex-col border-y py-4 xl:w-[320px] xl:border-y-0 xl:border-r xl:py-0 xl:pr-6">
        <div className="flex h-full items-center justify-between gap-2">
          {/* You Give */}
          <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
            <div className="flex w-full flex-col items-center text-center sm:items-start sm:text-left">
              <span className="text-brand-blue mb-1.5 hidden text-[9px] font-extrabold tracking-wider uppercase sm:block">
                You Give
              </span>
              <div className="flex gap-2">
                <Image
                  src={myBookImage}
                  alt={myBookTitle}
                  width={44}
                  height={64}
                  className="h-16 w-11 shrink-0 rounded object-cover shadow-sm"
                />
                <div className="hidden min-w-0 flex-col sm:flex">
                  <h5 className="line-clamp-2 text-[11px] leading-tight font-bold">
                    {myBookTitle}
                  </h5>
                  <p className="text-muted-foreground mt-0.5 line-clamp-1 text-[10px]">
                    {myBookMock.author}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Repeat2 className="text-muted-foreground h-4 w-4 shrink-0 opacity-50" />

          {/* You Receive */}
          <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
            <div className="flex w-full flex-col items-center text-center sm:items-start sm:text-left">
              <span className="mb-1.5 hidden text-[9px] font-extrabold tracking-wider text-emerald-600 uppercase sm:block">
                You Receive
              </span>
              <div className="flex gap-2">
                <Image
                  src={theirBookImage}
                  alt={theirBookTitle}
                  width={44}
                  height={64}
                  className="h-16 w-11 shrink-0 rounded object-cover shadow-sm"
                />
                <div className="hidden min-w-0 flex-col sm:flex">
                  <h5 className="line-clamp-2 text-[11px] leading-tight font-bold">
                    {theirBookTitle}
                  </h5>
                  <p className="text-muted-foreground mt-0.5 line-clamp-1 text-[10px]">
                    {theirBookMock.author}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Col 3: Progress Tracker */}
      <div className="border-border/40 flex w-full min-w-0 flex-1 flex-col justify-center overflow-hidden xl:w-auto xl:min-w-[220px] xl:border-r xl:pr-6">
        <span className="text-muted-foreground mb-3 text-[9px] font-extrabold tracking-wider uppercase">
          Progress
        </span>
        <div className="relative mx-auto flex w-full max-w-[300px] items-center justify-between xl:mx-0">
          <div className="bg-border/50 absolute top-[9px] right-[15px] left-[15px] z-0 h-0.5"></div>

          {/* Agreement */}
          <div className="relative z-10 flex w-12 flex-col items-center gap-1.5">
            <div
              className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] ${["agreement_reached", "handed_over", "completed"].includes(exchange.status) ? "bg-emerald-500 text-white" : "bg-card border-muted border-2"}`}
            >
              {["agreement_reached", "handed_over", "completed"].includes(
                exchange.status,
              ) ? (
                <CheckCircle2 className="h-3 w-3" />
              ) : (
                <div className="bg-muted-foreground/30 h-1.5 w-1.5 rounded-full"></div>
              )}
            </div>
            <span className="text-foreground text-center text-[9px] font-semibold">
              Agreement
              <br />
              <span className="text-muted-foreground font-normal">Oct 25</span>
            </span>
          </div>

          {/* Meetup */}
          <div className="relative z-10 flex w-12 flex-col items-center gap-1.5">
            <div
              className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] ${["handed_over", "completed"].includes(exchange.status) ? "bg-emerald-500 text-white" : exchange.status === "agreement_reached" ? "bg-card border-brand-blue text-brand-blue border-2" : "bg-card border-muted border-2"}`}
            >
              {["handed_over", "completed"].includes(exchange.status) ? (
                <CheckCircle2 className="h-3 w-3" />
              ) : exchange.status === "agreement_reached" ? (
                <Clock className="h-3 w-3" />
              ) : (
                <div className="bg-muted-foreground/30 h-1.5 w-1.5 rounded-full"></div>
              )}
            </div>
            <span className="text-foreground text-center text-[9px] font-semibold">
              Meetup
              <br />
              <span className="text-muted-foreground font-normal">Oct 28</span>
            </span>
          </div>

          {/* Handover */}
          <div className="relative z-10 flex w-12 flex-col items-center gap-1.5">
            <div
              className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] ${exchange.status === "completed" ? "bg-emerald-500 text-white" : exchange.status === "handed_over" ? "bg-card border-2 border-amber-500 text-amber-500" : "bg-card border-muted border-2"}`}
            >
              {exchange.status === "completed" ? (
                <CheckCircle2 className="h-3 w-3" />
              ) : exchange.status === "handed_over" ? (
                <Clock className="h-3 w-3" />
              ) : (
                <div className="bg-muted-foreground/30 h-1.5 w-1.5 rounded-full"></div>
              )}
            </div>
            <span className="text-foreground text-center text-[9px] font-semibold">
              Handover
              <br />
              <span className="text-muted-foreground font-normal">-</span>
            </span>
          </div>

          {/* Completed */}
          <div className="relative z-10 flex w-12 flex-col items-center gap-1.5">
            <div
              className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] ${exchange.status === "completed" ? "bg-emerald-500 text-white" : "bg-card border-muted border-2"}`}
            >
              {exchange.status === "completed" ? (
                <CheckCircle2 className="h-3 w-3" />
              ) : (
                <div className="bg-muted-foreground/30 h-1.5 w-1.5 rounded-full"></div>
              )}
            </div>
            <span className="text-foreground text-center text-[9px] font-semibold">
              Completed
            </span>
          </div>
        </div>
      </div>

      {/* Col 4: Actions */}
      <div className="mt-2 flex w-full shrink-0 flex-col gap-2 sm:grid sm:grid-cols-3 xl:mt-0 xl:flex xl:w-[140px] xl:flex-col">
        {isActionRequiredByMe && exchange.status === "pending_proposal" && (
          <button
            onClick={() =>
              updateExchangeStatus(exchange.id, "agreement_reached")
            }
            className="bg-brand-blue hover:bg-brand-blue/90 w-full rounded-full px-3 py-1.5 text-center text-[10px] font-bold text-white shadow-sm transition-all"
          >
            Accept Request
          </button>
        )}
        {exchange.status === "agreement_reached" && (
          <button
            onClick={() => updateExchangeStatus(exchange.id, "handed_over")}
            className="w-full rounded-full bg-emerald-600 px-3 py-1.5 text-center text-[10px] font-bold text-white shadow-sm transition-all hover:bg-emerald-700"
          >
            Confirm Handover
          </button>
        )}
        {exchange.status === "handed_over" && (
          <button
            onClick={() => updateExchangeStatus(exchange.id, "completed")}
            className="w-full rounded-full bg-emerald-600 px-3 py-1.5 text-center text-[10px] font-bold text-white shadow-sm transition-all hover:bg-emerald-700"
          >
            Mark Completed
          </button>
        )}

        <button
          onClick={() => onSelect(exchange)}
          className="bg-background border-brand-blue/30 text-brand-blue hover:bg-brand-blue/5 flex w-full items-center justify-center gap-1 rounded-full border px-3 py-1.5 text-[10px] font-semibold transition-all sm:col-span-3 xl:col-span-1"
        >
          <Eye className="h-3 w-3" /> Details
        </button>
      </div>
    </div>
  );
}
