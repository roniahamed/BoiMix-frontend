import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  CreditCard,
  Truck,
  RefreshCw,
  Users,
  HelpCircle,
} from "lucide-react";
import { MainLayout } from "@/components/layout/main-layout";
import { FaqAccordion } from "@/components/shared/faq-accordion";

const FAQ_CATEGORIES = [
  {
    icon: BookOpen,
    title: "Borrowing",
    faqs: [
      {
        q: "বই ধার করার নিয়ম কী?",
        a: "মেম্বারশিপ নিয়ে সেন্ট্রাল লাইব্রেরি থেকে বই রিকোয়েস্ট করুন, আমরা আপনার বাসায় পৌঁছে দেব।",
      },
      {
        q: "একটি বই কতদিন রাখা যাবে?",
        a: "বেসিক প্ল্যানে ৭ দিন, প্রিমিয়ামে ১৪ দিন এবং এলিটে ২১ দিন পর্যন্ত রাখা যাবে।",
      },
      {
        q: "একসাথে কতটি বই নেওয়া যাবে?",
        a: "বেসিক প্ল্যানে ১টি, প্রিমিয়ামে ৩টি এবং এলিট প্ল্যানে ৫টি বই একসাথে নেওয়া যাবে।",
      },
      {
        q: "ধার করা বই কি নবায়ন করা যাবে?",
        a: "হ্যাঁ, মেয়াদ শেষ হওয়ার আগে ড্যাশবোর্ড থেকে নবায়ন করা যাবে — যদি অন্য কেউ সেই বই চেয়ে না থাকেন।",
      },
      {
        q: "বই হারিয়ে গেলে বা নষ্ট হলে কী করব?",
        a: "বই হারানো বা ক্ষতির ক্ষেত্রে বাজারমূল্য পরিশোধ করতে হবে। সাথে সাথে সাপোর্টে জানান।",
      },
    ],
  },
  {
    icon: Users,
    title: "Membership",
    faqs: [
      {
        q: "মেম্বারশিপ কীভাবে নেব?",
        a: "সেন্ট্রাল লাইব্রেরি পেজ থেকে মেম্বারশিপ প্ল্যান দেখুন, পছন্দেরটি বেছে পেমেন্ট করুন।",
      },
      {
        q: "মেম্বারশিপ বাতিল করা যাবে কি?",
        a: "হ্যাঁ, অ্যাকাউন্ট সেটিংস থেকে যেকোনো সময় বাতিল করা যাবে। মেয়াদ শেষ পর্যন্ত সুবিধা পাবেন।",
      },
      {
        q: "প্ল্যান আপগ্রেড করা যাবে কি?",
        a: "হ্যাঁ, যেকোনো সময় বড় প্ল্যানে যাওয়া যাবে। পরিবর্তন সাথে সাথেই কার্যকর হবে।",
      },
      {
        q: "ছাত্রদের জন্য কোনো ছাড় আছে কি?",
        a: "হ্যাঁ, বৈধ স্টুডেন্ট আইডি দিয়ে ভেরিফাই করলে ২০% ছাড় পাওয়া যাবে।",
      },
    ],
  },
  {
    icon: Truck,
    title: "Delivery & Return",
    faqs: [
      {
        q: "ডেলিভারি কীভাবে হয়?",
        a: "কুরিয়ারের মাধ্যমে বাড়িতে পৌঁছে দেওয়া হয়। প্রিমিয়াম ও এলিট সদস্যরা বিনামূল্যে ডেলিভারি পাবেন।",
      },
      {
        q: "বই ফেরত দিতে কতদিন লাগে?",
        a: "কুরিয়ারে ফেরত দিলে ২–৩ কার্যদিবসে পৌঁছায়। ফেরতের রসিদ সংগ্রহ করে রাখুন।",
      },
      {
        q: "ঢাকার বাইরে ডেলিভারি হয় কি?",
        a: "হ্যাঁ, সারা বাংলাদেশে ডেলিভারি দেওয়া হয়। তবে দূরে হলে একটু বেশি সময় লাগতে পারে।",
      },
      {
        q: "ফেরতের খরচ কে দেবে?",
        a: "বেসিক সদস্যরা নিজে খরচ দেবেন। প্রিমিয়াম ও এলিট সদস্যদের ফেরত বিনামূল্যে।",
      },
    ],
  },
  {
    icon: CreditCard,
    title: "Payment",
    faqs: [
      {
        q: "কোন পেমেন্ট পদ্ধতি গ্রহণযোগ্য?",
        a: "bKash, Nagad, Rocket এবং ক্রেডিট/ডেবিট কার্ড সহ সব প্রধান পদ্ধতি গ্রহণযোগ্য।",
      },
      {
        q: "পেমেন্ট কি নিরাপদ?",
        a: "হ্যাঁ, সম্পূর্ণ এনক্রিপ্টেড পেমেন্ট গেটওয়ে ব্যবহার করা হয়। আপনার তথ্য সুরক্ষিত।",
      },
      {
        q: "রিফান্ড পাওয়া যাবে কি?",
        a: "সাবস্ক্রাইবের ৭ দিনের মধ্যে কোনো বই না নিলে সম্পূর্ণ রিফান্ড পাওয়া যাবে।",
      },
    ],
  },
  {
    icon: RefreshCw,
    title: "Exchanging",
    faqs: [
      {
        q: "বই এক্সচেঞ্জ কী?",
        a: "আপনার পুরনো বই অন্য পাঠকের সাথে বিনিময় করতে পারবেন — একদম বিনামূল্যে।",
      },
      {
        q: "এক্সচেঞ্জ করতে কি টাকা লাগে?",
        a: "না, এক্সচেঞ্জ সম্পূর্ণ বিনামূল্যে। শুধু শিপিং খরচ প্রযোজ্য হতে পারে।",
      },
      {
        q: "কীভাবে এক্সচেঞ্জ শুরু করব?",
        a: "আপনার বই আপলোড করুন, পছন্দের বইয়ে এক্সচেঞ্জ অফার পাঠান। দুইজন রাজি হলেই এক্সচেঞ্জ হয়ে যাবে।",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <MainLayout>
      <div className="boimix-container-wide py-8 md:py-12">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/explore/central-library"
            className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
          >
            <ArrowLeft className="size-4" />
            Back to Central Library
          </Link>

          <div className="mt-4 flex items-start gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/30">
              <HelpCircle className="size-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 md:text-3xl dark:text-white">
                Frequently Asked Questions
              </h1>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                প্রশ্নের উত্তর না পেলে আমাদের সাপোর্ট টিমের সাথে যোগাযোগ করুন।
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-6">
          {FAQ_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.title}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/50"
              >
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/30">
                    <Icon className="size-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                    {cat.title}
                  </h2>
                </div>
                <FaqAccordion faqs={cat.faqs} />
              </div>
            );
          })}
        </div>

        {/* Still have questions CTA */}
        <div className="mt-10 rounded-xl border border-blue-100 bg-blue-50 p-6 text-center dark:border-blue-900/30 dark:bg-blue-900/10">
          <h2 className="mb-2 text-lg font-bold text-slate-900 dark:text-white">
            Still have questions?
          </h2>
          <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">
            আরো কিছু জানতে চাইলে আমাদের সাপোর্ট টিম সাহায্য করতে প্রস্তুত।
          </p>
          <Link
            href="/dashboard/messages"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}
