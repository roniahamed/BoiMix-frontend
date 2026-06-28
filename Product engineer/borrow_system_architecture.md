# BoiMix Borrow System (Phase 10) - Production-Ready Architecture

এই ডকুমেন্টে ইউজারের দেওয়া ফিডব্যাকের ভিত্তিতে BoiMix-এর "Borrow System"-এর পূর্ণাঙ্গ এবং **Production-Ready** সিস্টেম আর্কিটেকচার তুলে ধরা হলো। 

পুরো সিস্টেমটি একটি **"Order-centric Model"** ফলো করবে। ঠিক ই-কমার্স অর্ডারের মতো এখানেও প্রতিটি ধারের জন্য একটি **Borrow Order Entity** থাকবে (যেমন: `BR-000245`)।

---

## ১. কোর কনসেপ্ট: Borrow Order Entity
অর্ডার ট্র্যাক এবং ম্যানেজ করার জন্য ডেটাবেসে নিচের স্ট্রাকচারটি থাকবে:
* `Order ID` (BR-000245)
* `Borrower` & `Owner`
* `Book Details`
* `Payment Status`
* `Deposit Locked Value`
* `Timeline & Status`

---

## ২. মেইন ইউজার ফ্লো (The Complete Flow)

```text
Eligibility Check (ডিপোজিট এবং পলিসি যাচাই)
        │
        ▼
Borrow Request (মিটআপ বা কুরিয়ার অপশনসহ)
        │
        ▼
Owner Review
        │
        ├── Reject
        │
        ├── Counter Offer (নতুন সময়/লোকেশন প্রস্তাব)
        │
        ▼
Accepted (রিকোয়েস্ট গ্রহণ)
        │
        ▼
Payment (বরো ফি/কুরিয়ার ফি প্রদান) ──► [Fail হলে Request Cancel]
        │
        ▼
Pickup Scheduling (হস্তান্তরের প্রস্তুতি)
        │
        ▼
Owner Confirm Handover (মালিক বই দিয়েছেন কনফার্ম)
        │
        ▼
Borrower Confirm Receive (গ্রহীতা বই পেয়েছেন কনফার্ম)
        │
        ▼
Borrow Active (কাউন্টডাউন শুরু)
        │
        ▼
Reminder (মেয়াদ শেষের আগে নোটিফিকেশন)
        │
        ├── Extension Request (ঐচ্ছিক: ৩-৪ দিন সময় বাড়ানো)
        │
        ▼
Return Initiated (বই ফেরত দেওয়া শুরু)
        │
        ▼
Return Validation
        │
        ├── Meetup হলে → উভয়পক্ষের কনফার্মেশনই যথেষ্ট (কোনো ট্র্যাকিং দরকার নেই)
        └── Courier হলে → Tracking ID সাবমিট করতে হবে (সময় Freeze হবে)
        │
        ▼
Owner Confirm Return (মালিক বই ফেরত পেয়েছেন কনফার্ম) ──► [Damage Report (যদি বই নষ্ট হয় তবে Dispute)]
        │
        ▼
Deposit Release (লক হওয়া ডিপোজিট ফ্রি করে দেওয়া)
        │
        ▼
Peer-to-Peer Review (ঐচ্ছিক) — উভয়পক্ষ একে অপরকে রিভিউ দেবে
        │
        ▼
Completed
```

---

## ৩. গুরুত্বপূর্ণ পলিসি এবং টাইমআউট (Auto-Rules)

সিস্টেমটি যেন কখনো আটকে না থাকে, তার জন্য কিছু অটোমেশন রুলস:

* **Expired Request (অটো-এক্সপায়ার):** রিকোয়েস্ট পাঠানোর পর মালিক যদি **৪৮ ঘণ্টার** মধ্যে কোনো রেসপন্স না করেন, তবে সেটি অটোমেটিক Expired হয়ে যাবে।
* **Auto-Completed Return:** ইউজার বই ফেরত দেওয়ার পর মালিক নির্ধারিত সময়ের মধ্যে "Confirm Return" না করলে অটোমেটিক Completed হবে। তবে এই সময়সীমা হস্তান্তরের মাধ্যমের উপর নির্ভর করবে:
  * **Meetup হলে:** ৩ দিনের মধ্যে কনফার্ম করতে হবে।
  * **Courier হলে:** ৭-১০ দিন পর্যন্ত সময় পাবে (কারণ কুরিয়ারে এতদিন লাগতে পারে)। এর মধ্যে কনফার্ম না হলে অ্যাডমিন রিভিউতে যাবে।
* **Cancel Policy:**
  * *Before Accept:* ফ্রিতে ক্যানসেল করা যাবে।
  * *After Accept/Payment:* ক্যানসেল করলে পেনাল্টি (Penalty) কাটবে।
* **Overdue & Penalty:** মেয়াদ শেষ হওয়ার পর ইউজারের কাছ থেকে প্রতিদিন একটি লেট ফি কাটবে। এছাড়া ইউজারের:
  * **Rating** কমে যাবে
  * **Trust Score** কমে যাবে
  * **Platform Points** হারাবে
  * সংগৃহীত লেট ফির অর্থ BoiMix ব্যবহার করে নতুন বই কিনবে এবং সেগুলো ইউজারদের ফ্রিতে পড়ার অফার করবে। এটি কোনো প্রত্যক্ষ আয়ের উৎস নয়, বরং কমিউনিটিতে পুনরায় বিনিয়োগ।

---

## ৪. সিকিউরিটি এবং ফ্রড-প্রিভেনশন

* **Dual Confirmation:** বই হস্তান্তরের সময় শুধু ইউজার "Received" দিলে হবে না, মালিককেও আগে "Handed Over" কনফার্ম করতে হবে। 
* **Return Freeze Validation:** কুরিয়ারের ক্ষেত্রে ইউজার Tracking ID সাবমিট করলে সময় ফ্রিজ হবে। (AI/OCR বা কুরিয়ার API ভ্যালিডেশন এই পর্যায়ে রাখা হচ্ছে না — এটি সিস্টেমকে অযথা জটিল করে ফেলবে।) Meetup-এর ক্ষেত্রে ট্র্যাকিং প্রয়োজন নেই।
* **Damage Report (Dispute):** রিটার্ন নেওয়ার সময় মালিক যদি দেখেন বই ছেঁড়া বা নষ্ট, তবে তিনি ছবি আপলোড করে সরাসরি Dispute ওপেন করতে পারবেন। 

---

## ৫. ইউজার এক্সপেরিয়েন্স (UX) ফিচার্স

* **Borrow Chat:** রিকোয়েস্ট অ্যাকসেপ্ট হওয়ার সাথে সাথেই দুইজনের মধ্যে একটি প্রাইভেট চ্যাট অটোমেটিক ওপেন হবে।
* **Visual Timeline:** শুধু টেক্সট নয়, ইউজাররা একটি প্রোগ্রেস বার দেখতে পাবেন: 
  `✓ Requested ➔ ✓ Accepted ➔ ✓ Paid ➔ ✓ Borrow Active ➔ ○ Returning ➔ ○ Completed`
* **Deposit Lock UI:** ইউজারের ওয়ালেটে পরিষ্কারভাবে লেখা থাকবে:
  * Total Deposit: ১০০০ টাকা
  * Locked: ৪০০ টাকা
  * Available Limit: ৬০০ টাকা
