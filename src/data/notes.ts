export interface Note {
  id: string;
  title: string;
  date: string;
  isoDate: string;
  readTime: string;
  abstract: string;
  tags: string[];
  link?: string;
  externalLink?: string;
  takes?: string; // Markdown supported
}

export const notes: Note[] = [
  {
    id: "1",
    title: "Quantum Memory: Storing Data in Electron Spins",
    date: "Nov 2025",
    isoDate: "2025-11-29",
    readTime: "15 min read",
    abstract: "An exploration of using electron spin states in diamond nitrogen-vacancy centers to create stable, high-density quantum memory systems.",
    tags: ["Quantum Computing", "Physics", "Memory Architecture"],
    externalLink: "https://arxiv.org/abs/2301.00001", // Placeholder link
    takes: `
### The Engineer's Perspective
As a computer engineer, the shift from charge-based memory (DRAM/Flash) to spin-based memory is a paradigm shift. We're talking about potentially **orders of magnitude higher density** and lower power consumption. The challenge, of course, is coherence time—keeping that state stable at room temperature.

### Applied ML Implications
From my background in applied machine learning, the potential for **Quantum RAM (QRAM)** is massive. Imagine loading high-dimensional vector embeddings into quantum states for instantaneous similarity search. It could solve the I/O bottleneck that currently plagues large-scale model inference.

### SRE & Database Reliability
Wearing my SRE hat, this looks like the ultimate "distributed system" nightmare—but also an opportunity. Managing state consistency when your "bits" are subject to quantum decoherence is like dealing with eventual consistency in a distributed database, but on a sub-atomic scale. We'll need entirely new error-correction codes (like surface codes) that act as the "RAID controllers" of the quantum world.

### Personal Thought
Honestly, just the idea of trapping electrons in a diamond lattice to store a "1" or "0" is pure sci-fi coming to life. It's the kind of hardware innovation that reignites that spark of wonder I felt when I first learned how a transistor worked.
    `
  },
  {
    id: "2",
    title: "String Theory & The Sum of All Positive Integers",
    date: "Nov 2025",
    isoDate: "2025-11-28",
    readTime: "12 min read",
    abstract: "Analyzing the Ramanujan Summation (-1/12) and its physical interpretation in bosonic string theory dimensions.",
    tags: ["Physics", "Math", "Quantum Mechanics"],
    externalLink: "https://en.wikipedia.org/wiki/1_%2B_2_%2B_3_%2B_4_%2B_%E2%8B%AF",
    takes: `
### The Math
The result \`1 + 2 + 3 + ... = -1/12\` seems absurd intuitively, but in the context of analytic continuation and the Riemann Zeta function, it's a rigorous mathematical truth. It's a reminder that our "common sense" intuition often breaks down at the boundaries of infinity.

### Physics Connection
What blows my mind is that this specific value is **required** for Bosonic String Theory to be consistent in 26 dimensions. If the sum were anything else, the theory would have anomalies that break Lorentz invariance. It's a beautiful example of how pure, abstract math dictates the fundamental laws of reality.
    `
  },
  {
    id: "3",
    title: "Scaling Database Reliability: A Predictive Approach",
    date: "Sep 2025",
    isoDate: "2025-09-10",
    readTime: "5 min read",
    abstract: "Exploring how AI-driven anomaly detection can preemptively identify database bottlenecks before they impact critical financial infrastructure.",
    tags: ["SRE", "Database", "AI/ML"],
    externalLink: "#",
    takes: `
### The Problem
Traditional monitoring is reactive. You get an alert *after* the CPU spikes or the latency breaches the SLA. In high-frequency financial systems, that's too late.

### The Solution
By training LSTM models on historical metric data, we can forecast resource usage minutes in advance. It's not just about "predicting the future"—it's about buying time for auto-scalers to spin up resources *before* the load hits. This is where SRE meets Data Science.
    `
  }
];
