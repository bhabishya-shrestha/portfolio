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
        "A visceral look at caste hierarchies, societal friction, and the relentless, brash drive required to break through rigid systems.",
      notesMarkdown: `
### Eren Yeager Energy in Deep Space
Darrow's fierce, uncompromising mindset immediately evokes the raw, brash drive of Eren Yeager from *Attack on Titan*. That refusal to accept subjugation—and the willingness to sacrifice personal peace to dismantle an oppressive order—drives the pulse of the story.

### Caste Systems, Power & The Modern K-Shaped Economy
Reading this in my 20s while pursuing financial independence, the book transcends space fantasy. The color-coded society (Reds breaking their backs in the depths while Golds sit atop immense wealth and control) mirrors contemporary conversations around wealth disparity and the growing K-shaped economic divide. It asks difficult questions about what mobility actually demands when systems are designed to keep power concentrated.
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
        "Re-reading from a deeper vantage point: moving beyond the cliché of 'the journey' to truly inhabit the present and channel singular aspiration.",
      notesMarkdown: `
### Beyond the Surface Cliché
When I first read *The Alchemist*, I took away the standard, surface-level message that the journey matters more than the destination. Re-reading it now as a practicing engineer and graduate student, it hits on a much deeper frequency: it is about **self-awareness and actually inhabiting the good moments while they are happening**, rather than only appreciating them in hindsight.

### Gravitational Pull & Negative Self-Talk (Think and Grow Rich)
Santiago's Personal Legend directly connects with Napoleon Hill's *Think and Grow Rich* (which I read around Dec 2022). If you obsess over an aspiration every single day with singular clarity, the probability of reaching it rises dramatically—the universe really does begin to align around your focus. 

However, there is an equal and opposite danger: that same mental magnetism can affect you negatively without intention when you dwell in anxiety, feel bad about a situation, or let self-doubt take the steering wheel. Directing that focus is a lifelong practice.
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
        "A blueprint for long-term wealth: recognizing that Stoicism and Time require far greater psychological endurance than Focus and Diversification.",
      notesMarkdown: `
### The Mental Filter: Stoicism & Time vs. Focus & Diversification
In Galloway's formula \`Wealth = Focus + (Stoicism × Time × Diversification)\`, setting up asset allocation (Diversification) and developing specialized skills (Focus) are logical, systematic, and relatively straightforward to execute consistently. 

**Stoicism and Time are the real trial.** They are purely mental. Resisting lifestyle creep, not chasing hype, and remaining emotionally level through market volatility across decades is where most people falter.

### Re-evaluating the 80/20 Allocation
After reading this, I re-evaluated my portfolio (currently an 80/20 split between US and international equities). While I am in my 20s and the US market has had an incredible four-decade run, overweighting domestic stocks carries risk. Grounding my expectations means being prepared for a 4–5% annualized real return over the next 20 years rather than banking on constant hyper-growth.
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
        "A personal breakdown of all 12 rules—navigating leadership, resisting cynicism, and designing sustainable habits over brute force.",
      notesMarkdown: `
### 12 Rules: A Personal Performance Breakdown

1. **Social Institutions & Creative Achievement:** True. Tearing down structures blindly causes far worse second-order fallout with little upside.
2. **Singular Aim & Self-Image:** Aligns directly with *Think and Grow Rich* and *The Alchemist*. Clear daily focus bends probabilities in your favor.
3. **Facing What Is Hidden in the Fog:** Vital in financial planning and architecture. Ignoring hard realities is like fighting an opponent in pitch-black darkness.
4. **Opportunity Lurks Where Responsibility Is Abdicated:** **Active Core Focus.** Rather than trying to brute-force consistency, *if a task is too hard to maintain, re-engineer it to make it easier to do.* As a technical lead coordinating peers while keeping sight of the overarching vision, I am actively learning how to steer without micromanaging.
5. **Living in Integrity (Refusing to do what you hate):** Easy to agree on in theory; demanding to execute in high-pressure environments.
6. **Shedding Ideology & Maintaining Neuroplasticity:** We are creatures of habit, but cultivating neuroplasticity and an open learning mindset prevents ossification.
7. **Complete Commitment to Mastery:** That intensity is the exact principle driving my deep dive into homelab infrastructure, AI, and systems reliability.
8. **Cultivating Aesthetic Spaces:** Easy to create initially, difficult to maintain consistently, but brings sanity and makes everyday work worth living.
9. **Resolving Resentment:** My default instinct is forward momentum—cutting out the noise and abandoning dead weight, only stopping to dissect the past if it physically prevents moving forward.
10. **Protecting Relational Intimacy:** At 24, this is a wisdom dimension I recognize I am still growing into.
11. **Rejecting Bitterness & Cynicism:** **My toughest continuous struggle.** I rate my current performance here at **2/10 (Nov 2026)**. Guarding against cynicism when systems break requires deliberate counter-measures like daily journaling and perspective-taking.
12. **Gratitude in the Face of Hardship:** A foundational baseline habit I deliberately practice every day.
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
