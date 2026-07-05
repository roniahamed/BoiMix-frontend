"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  q: string;
  a: string;
}

interface FaqAccordionProps {
  faqs: FaqItem[];
}

export function FaqAccordion({ faqs }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:gap-6">
      {faqs.map((faq, i) => (
        <div
          key={i}
          className="rounded-lg border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
        >
          <button
            onClick={() => toggle(i)}
            className="flex w-full cursor-pointer items-center justify-between p-5 text-left font-semibold text-slate-800 dark:text-slate-200"
            aria-expanded={openIndex === i}
          >
            <span>{faq.q}</span>
            <ChevronDown
              className={`size-5 shrink-0 text-slate-400 transition-transform duration-200 ${
                openIndex === i ? "rotate-180" : ""
              }`}
            />
          </button>
          {openIndex === i && (
            <div className="px-5 pb-5 text-sm text-slate-600 dark:text-slate-400">
              {faq.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
