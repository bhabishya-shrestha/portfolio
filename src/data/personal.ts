export interface Book {
  id: string;
  title: string;
  author: string;
  status: "Reading" | "Read" | "Want to Read";
  coverUrl?: string;
  link?: string;
  date: string; // ISO date string for sorting
}

export interface Game {
  id: string;
  title: string;
  platform: string;
  status: "Playing" | "Completed" | "Backlog";
  hoursPlayed?: number;
  trophies?: {
    gold?: number;
    silver?: number;
    bronze?: number;
    platinum?: number;
    total?: number;
  };
  highlight?: string;
  coverUrl?: string;
  link?: string;
  date: string;
}

export interface Channel {
  id: string;
  name: string;
  topic: string;
  avatarUrl?: string;
  link: string;
  date: string; // "Subscribed since" or "Latest video" date for sorting
}

export const books: Book[] = [
  {
    id: "1",
    title: "Piranesi",
    author: "Susanna Clarke",
    status: "Reading",
    link: "https://www.bloomsbury.com/us/piranesi-9781635575637/",
    date: "2026-11-15",
  },
  {
    id: "2",
    title: "Red Rising",
    author: "Pierce Brown",
    status: "Reading",
    link: "https://www.amazon.com/Red-Rising-Pierce-Brown/dp/034553980X",
    date: "2026-11-10",
  },
  {
    id: "3",
    title: "The Alchemist",
    author: "Paulo Coelho",
    status: "Reading",
    link: "https://www.amazon.com/Alchemist-Paulo-Coelho/dp/0062315005",
    date: "2026-11-05",
  },
  {
    id: "4",
    title: "Crime and Punishment",
    author: "Fyodor Dostoevsky",
    status: "Reading",
    link: "https://www.gutenberg.org/ebooks/2554",
    date: "2026-10-15",
  },
  {
    id: "5",
    title: "The Algebra of Wealth: A Simple Formula for Financial Security",
    author: "Scott Galloway",
    status: "Read",
    link: "https://www.amazon.com/s?k=The+Algebra+of+Wealth+Scott+Galloway",
    date: "2026-10-01",
  },
  {
    id: "6",
    title: "Beyond Order: 12 More Rules for Life",
    author: "Jordan B. Peterson",
    status: "Read",
    link: "https://www.amazon.com/Beyond-Order-More-Rules-Life/dp/0593084640",
    date: "2025-02-10",
  },
];

export const games: Game[] = [
  {
    id: "1",
    title: "God of War",
    platform: "PS5",
    status: "Playing",
    hoursPlayed: 25.0,
    trophies: {
      gold: 1,
      silver: 1,
      bronze: 19,
      total: 21,
    },
    highlight: "25 hrs logged • 21 trophies (Homelab auto-synced)",
    link: "https://www.playstation.com/en-us/games/god-of-war/",
    date: "2026-11-14",
  },
  {
    id: "2",
    title: "Red Dead Redemption 2",
    platform: "PS5",
    status: "Playing",
    hoursPlayed: 6.9,
    highlight: "6.9 hrs logged • Homelab save vault backed up",
    link: "https://www.rockstargames.com/reddeadredemption2",
    date: "2026-11-15",
  },
  {
    id: "3",
    title: "Hades",
    platform: "PS5",
    status: "Playing",
    hoursPlayed: 5.1,
    highlight: "5.1 hrs logged • 9 sessions",
    link: "https://www.supergiantgames.com/games/hades/",
    date: "2026-11-14",
  },
  {
    id: "4",
    title: "Hades II",
    platform: "PC",
    status: "Playing",
    hoursPlayed: 1.5,
    highlight: "Early Access",
    link: "https://www.supergiantgames.com/games/hades-ii/",
    date: "2026-11-06",
  },
];

export const channels: Channel[] = [
  {
    id: "1",
    name: "Michael Reeves",
    topic: "Engineering & Chaos",
    link: "https://www.youtube.com/@MichaelReeves",
    date: "2025-10-01",
  },
  {
    id: "2",
    name: "Stuff Made Here",
    topic: "Engineering & Fabrication",
    link: "https://www.youtube.com/@StuffMadeHere",
    date: "2025-09-15",
  },
];
