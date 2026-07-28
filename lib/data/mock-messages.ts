export type Message = {
  id: string;
  senderId: string;
  text: string;
  time: string;
  isRead: boolean;
  attachment?: {
    type: "image" | "file";
    url: string;
    name?: string;
  };
  exchangeProposal?: {
    id: string;
    offeringBook: {
      title: string;
      author: string;
      cover: string;
    };
    requestingBook: {
      title: string;
      author: string;
      cover: string;
    };
    status: "pending" | "accepted" | "declined";
  };
};

export type Conversation = {
  id: string;
  user: {
    id: string;
    name: string;
    username: string;
    avatar: string;
    isOnline: boolean;
    lastSeen?: string;
  };
  messages: Message[];
  unreadCount: number;
  lastMessageTime: string;
  isTyping?: boolean;
};

export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: "conv-1",
    user: {
      id: "u2",
      name: "Hasan Mahmud",
      username: "hasan_m",
      avatar:
        "https://ui-avatars.com/api/?name=Hasan+Mahmud&background=e67e22&color=fff",
      isOnline: true,
    },
    unreadCount: 0,
    lastMessageTime: "6:30 PM",
    messages: [
      {
        id: "m1",
        senderId: "u2",
        text: "Hi Roni! Are you available to exchange 'Rich Dad Poor Dad' today?",
        time: "10:00 AM",
        isRead: true,
      },
      {
        id: "m2",
        senderId: "me",
        text: "Hey Hasan! Yes, I can meet at Dhanmondi Lake around 5 PM.",
        time: "10:15 AM",
        isRead: true,
      },
      {
        id: "m3",
        senderId: "u2",
        text: "Perfect. I'll bring 'Atomic Habits'.",
        time: "10:20 AM",
        isRead: true,
      },
      {
        id: "m4",
        senderId: "u2",
        text: "I've sent an exchange proposal below so we can confirm the swap!",
        time: "10:22 AM",
        isRead: true,
        exchangeProposal: {
          id: "prop-1",
          offeringBook: {
            title: "Atomic Habits",
            author: "James Clear",
            cover:
              "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&auto=format&fit=crop&q=80",
          },
          requestingBook: {
            title: "Rich Dad Poor Dad",
            author: "Robert T. Kiyosaki",
            cover:
              "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&auto=format&fit=crop&q=80",
          },
          status: "pending",
        },
      },
    ],
  },
  {
    id: "conv-2",
    user: {
      id: "u3",
      name: "Nusrat Jahan",
      username: "nusrat_j",
      avatar:
        "https://ui-avatars.com/api/?name=Nusrat+Jahan&background=8e44ad&color=fff",
      isOnline: false,
      lastSeen: "2 hours ago",
    },
    unreadCount: 2,
    lastMessageTime: "Yesterday",
    isTyping: true,
    messages: [
      {
        id: "m1",
        senderId: "u3",
        text: "Is the book still in good condition?",
        time: "Yesterday, 2:00 PM",
        isRead: true,
      },
      {
        id: "m2",
        senderId: "me",
        text: "Yes, it is almost brand new. I've only read it once.",
        time: "Yesterday, 2:30 PM",
        isRead: true,
      },
      {
        id: "m3",
        senderId: "u3",
        text: "Could you send me a picture of the back cover?",
        time: "Yesterday, 3:00 PM",
        isRead: false,
      },
      {
        id: "m4",
        senderId: "u3",
        text: "When can we meet?",
        time: "Yesterday, 3:05 PM",
        isRead: false,
      },
    ],
  },
  {
    id: "conv-3",
    user: {
      id: "u4",
      name: "Fahim Ahmed",
      username: "fahim_ahmed",
      avatar:
        "https://ui-avatars.com/api/?name=Fahim+Ahmed&background=0D8ABC&color=fff",
      isOnline: true,
    },
    unreadCount: 0,
    lastMessageTime: "Tuesday",
    messages: [
      {
        id: "m1",
        senderId: "u4",
        text: "Is 'The Alchemist' still available?",
        time: "Tuesday, 9:00 AM",
        isRead: true,
      },
      {
        id: "m2",
        senderId: "me",
        text: "Yes, it is! Do you want to borrow it?",
        time: "Tuesday, 9:30 AM",
        isRead: true,
      },
      {
        id: "m3",
        senderId: "u4",
        text: "Awesome, I just sent a request.",
        time: "Tuesday, 9:45 AM",
        isRead: true,
        attachment: {
          type: "image",
          url: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop",
          name: "book_cover.jpg",
        },
      },
    ],
  },
];
