"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

type QAItem = {
  id: string;
  question: string;
  asker: string;
  askDate: string;
  answer?: string;
  answerer?: string;
  answerDate?: string;
};

export function BookQA({ qas }: { qas: QAItem[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isAskModalOpen, setIsAskModalOpen] = useState(false);
  const [askText, setAskText] = useState("");

  const [answeringId, setAnsweringId] = useState<string | null>(null);
  const [answerText, setAnswerText] = useState("");

  const itemsPerPage = 3;
  const totalPages = Math.ceil(qas.length / itemsPerPage);

  const paginatedQas = qas.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleAskSubmit = () => {
    if (!askText.trim()) return;
    toast.success("আপনার প্রশ্নটি সফলভাবে জমা দেওয়া হয়েছে!");
    setAskText("");
    setIsAskModalOpen(false);
  };

  const handleAnswerSubmit = () => {
    if (!answerText.trim()) return;
    toast.success("আপনার উত্তরটি সফলভাবে জমা দেওয়া হয়েছে!");
    setAnswerText("");
    setAnsweringId(null);
  };

  return (
    <div id="qa-section" className="bg-card border p-5 shadow-sm lg:p-6">
      <div className="mb-6 flex flex-col justify-between gap-4 border-b pb-4 sm:flex-row sm:items-center">
        <div>
          <h3 className="type-heading mb-1 text-xl">Product Q/A</h3>
          <p className="text-muted-foreground text-sm">
            Have a question regarding the product? Ask Us
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => setIsAskModalOpen(true)}
          className="border-primary text-primary hover:bg-primary/10 rounded-md"
        >
          Ask a Question
        </Button>
      </div>

      <div className="mb-6 space-y-6">
        {paginatedQas.map((qa) => (
          <div
            key={qa.id}
            className="border-b pb-4 text-sm last:border-0 last:pb-0"
          >
            <div className="flex gap-2">
              <span className="text-foreground font-bold">Q:</span>
              <div className="flex-1">
                <p className="text-foreground text-sm font-medium">
                  {qa.question}
                </p>
                <p className="text-muted-foreground mt-1 text-xs">
                  Questioned by{" "}
                  <span className="text-foreground font-semibold">
                    {qa.asker}
                  </span>{" "}
                  on {qa.askDate}
                </p>
              </div>
            </div>
            {qa.answer ? (
              <div className="border-primary/30 mt-3 ml-1 flex gap-2 border-l-2 pl-3">
                <span className="text-foreground font-bold">A:</span>
                <div className="flex-1">
                  <p className="text-foreground text-sm leading-relaxed">
                    {qa.answer}
                  </p>
                  <p className="text-muted-foreground mt-1 text-xs">
                    Answered by{" "}
                    <span className="text-foreground font-semibold">
                      {qa.answerer}
                    </span>{" "}
                    on {qa.answerDate}
                  </p>
                </div>
              </div>
            ) : (
              <div className="mt-4 pl-5">
                {answeringId === qa.id ? (
                  <div className="bg-muted/10 mt-2 space-y-3 rounded-lg border p-4">
                    <p className="mb-2 text-sm font-medium">
                      Write your answer:
                    </p>
                    <Textarea
                      placeholder="Type your response here..."
                      value={answerText}
                      onChange={(e) => setAnswerText(e.target.value)}
                      className="bg-background min-h-[100px]"
                    />
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setAnsweringId(null)}
                      >
                        Cancel
                      </Button>
                      <Button size="sm" onClick={handleAnswerSubmit}>
                        Submit Answer
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setAnsweringId(qa.id)}
                    className="text-primary border-primary/30 hover:bg-primary/5 h-8 rounded-full px-4"
                  >
                    Answer this question
                  </Button>
                )}
              </div>
            )}
          </div>
        ))}
        {qas.length === 0 && (
          <p className="text-muted-foreground py-4 text-center">
            No questions asked yet.
          </p>
        )}
      </div>

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage((p) => Math.max(1, p - 1));
                  document
                    .getElementById("qa-section")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className={
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === i + 1}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(i + 1);
                    document
                      .getElementById("qa-section")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage((p) => Math.min(totalPages, p + 1));
                  document
                    .getElementById("qa-section")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      <Dialog open={isAskModalOpen} onOpenChange={setIsAskModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Ask a Question</DialogTitle>
            <DialogDescription>
              Submit your question about this product.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Textarea
              placeholder="What would you like to know?"
              value={askText}
              onChange={(e) => setAskText(e.target.value)}
              className="min-h-[120px]"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsAskModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAskSubmit}>Submit Question</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
