export interface Book {
  id: string;
  title: string;
  author: string;
  status: "Reading" | "Read" | "Want to Read";
  coverUrl?: string;
  link?: string;
  date: string; // ISO date string for sorting
  review?: {
    summary: string;
    keyThemes?: {
      title: string;
      take: string;
      rating?: string;
    }[];
    notesMarkdown?: string;
  };
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
    review: {
      summary:
        "Re-reading this in my 20s hits differently: the brash main character reminds me of Eren Yeager, and the caste system feels a lot like a K-shaped economy.",
      notesMarkdown: `
### Eren Yeager Energy in Space
The main character has that same brash, stubborn drive as Eren Yeager from *Attack on Titan*, and I honestly relate to it. He refuses to just accept the hand he was dealt and is willing to burn everything down to change it.

### Caste Systems and the K-Shaped Economy
Reading this again while in my 20s and working toward financial freedom, the caste system and power dynamics stand out a lot more. Seeing Reds stuck at the bottom while Golds hoard everything feels uncomfortably close to real-world wealth disparity and a K-shaped economy.
      `,
    },
  },
  {
    id: "3",
    title: "The Alchemist",
    author: "Paulo Coelho",
    status: "Reading",
    link: "https://www.amazon.com/Alchemist-Paulo-Coelho/dp/0062315005",
    date: "2026-11-05",
    review: {
      summary:
        "First time I read it as 'enjoy the journey.' Now it's more about knowing yourself and actually enjoying good moments while they happen, not just looking back.",
      notesMarkdown: `
### Actually Enjoying the Moment
Originally, I took the surface-level lesson from *The Alchemist*: the journey matters more than the destination. Re-reading it now, it's more about understanding yourself and learning to enjoy the good moments *while they are actually happening*, instead of rushing to the next goal and only appreciating them afterward.

### The Think and Grow Rich Connection
I really do believe the idea that if you think about a goal every day, it's much more likely to happen than just drifting blindly. It reminds me a lot of *Think and Grow Rich* (which I read back in Dec 2022). 

The catch is it works both ways. I've noticed how that same habit can hurt me unintentionally when I'm in a bad headspace or thinking negatively about myself or a situation.
      `,
    },
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
    review: {
      summary:
        "Focus and diversification are logical and easy to automate. Stoicism and time are the hard part because they're purely mental.",
      notesMarkdown: `
### Logic vs. Mentality
In Galloway's formula \`Wealth = Focus + (Stoicism × Time × Diversification)\`, focus and diversification are pretty logical. Once you set up a system, sticking to them isn't that hard.

Stoicism and time are way harder to stay consistent with because they're completely mental.

### Thinking Twice About 80/20
Diversification is the big thing I kept thinking about afterward. I still hold an 80/20 split (80% US stocks, 20% international), and I know that's heavily weighted and risky. US stocks have had an insane 40-year run, so even in my 20s, I want to be mentally and financially ready for 4 to 5% average growth over the next 20 years instead of assuming the boom lasts forever.
      `,
    },
  },
  {
    id: "6",
    title: "Beyond Order: 12 More Rules for Life",
    author: "Jordan B. Peterson",
    status: "Read",
    link: "https://www.amazon.com/Beyond-Order-More-Rules-Life/dp/0593084640",
    date: "2025-02-10",
    review: {
      summary:
        "My honest take on all 12 rules right now: making hard responsibilities easier to do, leading a project at work, and working on cynicism (2/10).",
      notesMarkdown: `
### My Take on the 12 Rules

1. **Social institutions & creative achievement:** True. Tearing things down takes effort and usually creates worse side effects with not much benefit.
2. **Aim single-mindedly:** True, and it lines up with *Think and Grow Rich*.
3. **Don't hide unwanted things in the fog:** True, especially for things like financial planning. Ignoring it is like fighting in the dark.
4. **Opportunity lurks where responsibility is abdicated:** I apply this at work and with my homelab. For me it means: *if a responsibility is too hard to stay consistent with, make the task easier to do* instead of trying to brute-force willpower. At work, I'm leading a project where I have to compile other people's work while keeping one vision, so I'm actively learning this in real time.
5. **Don't do what you hate:** Easy to agree with, hard to actually follow.
6. **Abandon ideology:** Comes down to neuroplasticity. We're creatures of habit, so keeping a learning mindset takes effort if you don't want to get rigid.
7. **Work as hard as you can on one thing:** That's basically what I try to do with my homelab.
8. **Make one room beautiful:** Easy to do once, hard to keep up, but it makes daily life worth living.
9. **Resolving old stuff:** Hard to do. My default is to drop old ideologies and nostalgia, cut the noise, and keep moving forward, only unpacking the past if it's actually blocking me.
10. **Romance & marriage:** At 24, I'm honestly too young to really understand this one yet.
11. **Don't get bitter or cynical:** The hardest one for me to keep up. I'd give myself a **2/10 as of Nov 2026**, and I'm trying to get better at it through things like journaling.
12. **Be grateful in spite of suffering:** Something I try to stay consistent with every day.
      `,
    },
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
    platform: "PS5",
    status: "Playing",
    hoursPlayed: 1.5,
    highlight: "1.5 hrs logged • 2 sessions (Homelab auto-synced)",
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
