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
    title: "The Algebra of Wealth: A Simple Formula for Financial Security",
    author: "Scott Galloway",
    status: "Reading",
    link: "https://www.amazon.com/s?k=The+Algebra+of+Wealth+Scott+Galloway",
    date: "2025-11-25",
  },
  {
    id: "2",
    title: "Crime and Punishment",
    author: "Fyodor Dostoevsky",
    status: "Reading",
    link: "https://www.gutenberg.org/ebooks/2554",
    date: "2025-11-15",
  },
  {
    id: "3",
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
    title: "Hogwarts Legacy",
    platform: "PC",
    status: "Playing",
    link: "https://www.hogwartslegacy.com/",
    date: "2025-11-01",
  },
  {
    id: "2",
    title: "Assassin's Creed Shadows",
    platform: "PC",
    status: "Playing",
    link: "https://www.ubisoft.com/en-us/game/assassins-creed/shadows",
    date: "2025-11-20",
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
