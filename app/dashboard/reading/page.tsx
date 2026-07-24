"use client";
/* eslint-disable @next/next/no-img-element */

import { useState } from "react";
import {
  BookOpen,
  Flame,
  Target,
  Trophy,
  ChevronRight,
  TrendingUp,
  Clock,
  Plus,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil } from "lucide-react";

export default function ReadingTrackerPage() {
  const [pagesRead, setPagesRead] = useState(145);
  const [annualGoal, setAnnualGoal] = useState(24);
  const [booksRead] = useState(12);
  const [pagesThisWeek, setPagesThisWeek] = useState(342);

  // Form states for modals
  const [tempGoal, setTempGoal] = useState(annualGoal);
  const [tempPages, setTempPages] = useState(15);

  const totalPages = 320;
  const progressPercent = Math.round((pagesRead / totalPages) * 100);
  const goalProgress = Math.round((booksRead / annualGoal) * 100);

  const handleSetGoal = () => {
    setAnnualGoal(tempGoal);
  };

  const handleLogPages = () => {
    setPagesRead((prev) => Math.min(prev + tempPages, totalPages));
    setPagesThisWeek((prev) => prev + tempPages);
    setTempPages(15); // reset default
  };

  return (
    <div className="space-y-6 pb-12">
      {/* ══════════════════════════════════════
          HERO BANNER (Reading Goal)
      ══════════════════════════════════════ */}
      <div
        className="relative overflow-hidden rounded-[7px] px-5 pt-6 pb-8 shadow-lg sm:px-10 sm:pt-8 sm:pb-10"
        style={{
          background: "linear-gradient(135deg, #ff6a00 0%, #ee0979 100%)",
        }}
      >
        {/* Glow orbs for glassmorphism effect */}
        <div className="pointer-events-none absolute -top-20 -right-20 h-80 w-80 rounded-full bg-white/20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-1/4 h-56 w-56 rounded-full bg-orange-300/20 blur-2xl" />

        {/* Subtle dot grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/20 shadow-inner ring-2 ring-white/30 backdrop-blur-sm sm:h-16 sm:w-16">
              <Target className="h-6 w-6 text-white sm:h-8 sm:w-8" />
            </div>
            <div>
              <p className="text-[10px] font-extrabold tracking-[0.18em] text-white/70 uppercase sm:text-xs">
                2024 Challenge
              </p>
              <h1 className="mt-0.5 text-2xl font-black tracking-tight text-white sm:text-4xl">
                Annual Reading Goal
              </h1>
              <p className="mt-1 text-xs font-medium text-white/90 sm:text-sm">
                You&apos;re slightly ahead of schedule. Keep it up!
              </p>
            </div>
          </div>

          <div className="flex w-full flex-col gap-2 rounded-2xl bg-white/10 p-4 ring-1 ring-white/20 backdrop-blur-md md:max-w-xs">
            <div className="flex items-end justify-between">
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-black text-white">
                  {booksRead}
                </span>
                <span className="text-sm font-semibold text-white/70">
                  / {annualGoal}
                </span>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 rounded-full text-white/70 hover:bg-white/20 hover:text-white"
                  >
                    <Pencil className="h-3 w-3" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Set Reading Goal</DialogTitle>
                    <DialogDescription>
                      How many books do you want to read this year?
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="goal" className="text-right">
                        Goal
                      </Label>
                      <Input
                        id="goal"
                        type="number"
                        value={tempGoal}
                        onChange={(e) => setTempGoal(Number(e.target.value))}
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button onClick={handleSetGoal}>Save Goal</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            <div className="flex items-center gap-2">
              <Progress
                value={goalProgress}
                className="h-2 flex-1 bg-white/20 [&>div]:bg-white"
              />
              <span className="w-8 text-right text-[10px] font-bold text-white/90">
                {goalProgress}%
              </span>
            </div>
            <p className="text-[10px] font-medium text-white/70">
              {annualGoal - booksRead > 0
                ? `${annualGoal - booksRead} books remaining this year`
                : "Goal completed! Awesome!"}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* ══════════════════════════════════════
            CURRENTLY READING
        ══════════════════════════════════════ */}
        <div className="space-y-4 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black tracking-tight">
              Currently Reading
            </h2>
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground h-8 text-xs font-bold"
            >
              View all <ChevronRight className="ml-1 h-3 w-3" />
            </Button>
          </div>

          <div className="group bg-card relative overflow-hidden rounded-[7px] border p-4 shadow-sm transition-all hover:shadow-md sm:p-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:gap-6">
              <div className="relative h-48 w-32 shrink-0 overflow-hidden rounded-[7px] shadow-md sm:h-56 sm:w-36">
                <img
                  src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=300&auto=format&fit=crop"
                  alt="Book Cover"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-xl leading-tight font-bold">
                        Atomic Habits
                      </h3>
                      <p className="text-muted-foreground mt-1 text-sm font-medium">
                        James Clear
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 rounded-full bg-orange-100 px-2.5 py-1 text-[10px] font-bold text-orange-700 dark:bg-orange-500/20 dark:text-orange-400">
                      <Clock className="h-3 w-3" />
                      <span>Started Oct 1</span>
                    </div>
                  </div>

                  <div className="mt-6 flex items-end justify-between">
                    <p className="text-sm font-bold">
                      <span className="text-primary text-2xl font-black">
                        {pagesRead}
                      </span>
                      <span className="text-muted-foreground">
                        {" "}
                        / {totalPages} pages
                      </span>
                    </p>
                    <span className="text-primary text-sm font-bold">
                      {progressPercent}%
                    </span>
                  </div>

                  <Progress value={progressPercent} className="mt-3 h-2.5" />
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="rounded-[7px] font-bold shadow-sm">
                        Log Progress
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Update Reading Progress</DialogTitle>
                        <DialogDescription>
                          How many pages did you read today for &quot;Atomic
                          Habits&quot;?
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="pages" className="text-right">
                            Pages Read
                          </Label>
                          <Input
                            id="pages"
                            type="number"
                            value={tempPages}
                            onChange={(e) =>
                              setTempPages(Number(e.target.value))
                            }
                            className="col-span-3"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button onClick={handleLogPages}>
                            Save Progress
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <Button variant="outline" className="rounded-[7px] font-bold">
                    Mark as Finished
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════
            ACTIVITY & STREAKS
        ══════════════════════════════════════ */}
        <div className="space-y-4">
          <h2 className="text-lg font-black tracking-tight">
            Reading Activity
          </h2>

          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between rounded-[7px] border bg-gradient-to-br from-orange-50 to-rose-50 p-4 shadow-sm dark:from-orange-500/10 dark:to-rose-500/10">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400">
                  <Flame className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-muted-foreground text-xs font-bold">
                    Current Streak
                  </p>
                  <p className="text-foreground text-xl font-black">14 Days</p>
                </div>
              </div>
            </div>

            <div className="bg-card flex items-center justify-between rounded-[7px] border p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-muted-foreground text-xs font-bold">
                    Pages This Week
                  </p>
                  <p className="text-foreground text-xl font-black">
                    {pagesThisWeek}
                  </p>
                </div>
              </div>
              <TrendingUp className="h-5 w-5 text-emerald-500" />
            </div>

            <div className="bg-card flex items-center justify-between rounded-[7px] border p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400">
                  <Trophy className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-muted-foreground text-xs font-bold">
                    Badges Earned
                  </p>
                  <p className="text-foreground text-xl font-black">8</p>
                </div>
              </div>
              <ChevronRight className="text-muted-foreground/50 h-5 w-5" />
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          UP NEXT / QUEUE
      ══════════════════════════════════════ */}
      <div className="mt-8 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black tracking-tight">Up Next</h2>
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground h-8 text-xs font-bold"
          >
            Manage Queue <ChevronRight className="ml-1 h-3 w-3" />
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {/* Add New Button */}
          <button className="group bg-card/50 text-muted-foreground hover:border-primary/50 hover:bg-card hover:text-primary flex aspect-[2/3] w-full flex-col items-center justify-center gap-2 rounded-[7px] border-2 border-dashed transition-all">
            <div className="bg-muted group-hover:bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full transition-colors">
              <Plus className="h-5 w-5" />
            </div>
            <span className="text-xs font-bold">Add to Queue</span>
          </button>

          {[
            {
              title: "Deep Work",
              author: "Cal Newport",
              cover:
                "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=200&auto=format&fit=crop",
            },
            {
              title: "The Midnight Library",
              author: "Matt Haig",
              cover:
                "https://images.unsplash.com/photo-1476275466078-4007374efac4?q=80&w=200&auto=format&fit=crop",
            },
            {
              title: "Project Hail Mary",
              author: "Andy Weir",
              cover:
                "https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=200&auto=format&fit=crop",
            },
          ].map((book, i) => (
            <div key={i} className="group relative flex flex-col gap-2">
              <div className="relative aspect-[2/3] w-full overflow-hidden rounded-[7px] border shadow-sm transition-all hover:shadow-md">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <Button
                  size="icon"
                  className="absolute top-1/2 left-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 scale-50 rounded-full opacity-0 shadow-lg transition-all duration-300 group-hover:scale-100 group-hover:opacity-100"
                >
                  <BookOpen className="h-4 w-4" />
                </Button>
              </div>
              <div>
                <h4 className="line-clamp-1 text-sm font-bold">{book.title}</h4>
                <p className="text-muted-foreground line-clamp-1 text-xs font-medium">
                  {book.author}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
