export interface CustomerOrder {
  id: string;
  orderDate: string;
  status: "pending" | "confirmed" | "shipped" | "completed" | "cancelled";
  paymentStatus: string;
  buyerName: string;
  buyerUsername: string;
  buyerAvatar: string;
  buyerPhone: string;
  buyerAddress: string;
  deliveryMethod: string;
  trackingNumber?: string;
  bookTitle: string;
  bookAuthor: string;
  bookCover: string;
  price: number;
  shippingFee: number;
  totalAmount: number;
}

export const MOCK_CUSTOMER_ORDERS: CustomerOrder[] = [
  {
    id: "#ORD-9824",
    orderDate: "23 Jul 2026, 02:15 PM",
    status: "pending",
    paymentStatus: "Escrow Verified (bKash)",
    buyerName: "Jannatul Ferdaus",
    buyerUsername: "jannatul",
    buyerAvatar:
      "https://ui-avatars.com/api/?name=Jannatul+Ferdaus&background=0D8ABC&color=fff",
    buyerPhone: "01712-345678",
    buyerAddress: "House 42, Road 9/A, Dhanmondi, Dhaka - 1209",
    deliveryMethod: "Steadfast Courier (Home Delivery)",
    bookTitle: "Deep Work: Rules for Focused Success",
    bookAuthor: "Cal Newport",
    bookCover:
      "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=300&fit=crop",
    price: 450,
    shippingFee: 60,
    totalAmount: 510,
  },
  {
    id: "#ORD-9812",
    orderDate: "22 Jul 2026, 06:40 PM",
    status: "pending",
    paymentStatus: "Escrow Verified (Nagad)",
    buyerName: "Tanvir Hossain",
    buyerUsername: "tanvir",
    buyerAvatar:
      "https://ui-avatars.com/api/?name=Tanvir+Hossain&background=2b8a3e&color=fff",
    buyerPhone: "01823-987654",
    buyerAddress: "Plot 15, Sector 4, Uttara, Dhaka - 1230",
    deliveryMethod: "Metro Station Handover (Uttara Center)",
    bookTitle: "The Alchemist",
    bookAuthor: "Paulo Coelho",
    bookCover:
      "https://images.unsplash.com/photo-1495640388908-05fa85288e61?q=80&w=300&fit=crop",
    price: 320,
    shippingFee: 0,
    totalAmount: 320,
  },
  {
    id: "#ORD-9788",
    orderDate: "20 Jul 2026, 11:20 AM",
    status: "shipped",
    paymentStatus: "Escrow Locked",
    buyerName: "Farhan Ahmed",
    buyerUsername: "farhan",
    buyerAvatar:
      "https://ui-avatars.com/api/?name=Farhan+Ahmed&background=e67e22&color=fff",
    buyerPhone: "01911-223344",
    buyerAddress: "Flat 4B, Building 12, Mirpur 10, Dhaka - 1216",
    deliveryMethod: "Pathao Parcel",
    trackingNumber: "PATH-8849201",
    bookTitle: "Sapiens: A Brief History of Humankind",
    bookAuthor: "Yuval Noah Harari",
    bookCover:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=300&fit=crop",
    price: 680,
    shippingFee: 70,
    totalAmount: 750,
  },
  {
    id: "#ORD-9650",
    orderDate: "15 Jul 2026, 04:10 PM",
    status: "completed",
    paymentStatus: "Released to Seller Wallet",
    buyerName: "Nusrat Jahan",
    buyerUsername: "nusrat",
    buyerAvatar:
      "https://ui-avatars.com/api/?name=Nusrat+Jahan&background=9b59b6&color=fff",
    buyerPhone: "01677-889900",
    buyerAddress: "Chawkbazar, Chittagong",
    deliveryMethod: "Sundarban Courier",
    trackingNumber: "SND-110293",
    bookTitle: "Atomic Habits",
    bookAuthor: "James Clear",
    bookCover:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=300&fit=crop",
    price: 520,
    shippingFee: 80,
    totalAmount: 600,
  },
];
