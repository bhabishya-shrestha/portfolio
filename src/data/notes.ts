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
    id: "msai-transparency",
    title: "AI Transparency & Social Explanations: Beyond the Black Box",
    date: "Nov 11, 2026",
    isoDate: "2026-11-11",
    readTime: "8 min read",
    abstract:
      "Insights from Tim Miller's social science framing of XAI and Larsson & Heintz's multi-layered transparency models for deployed AI systems.",
    tags: ["MSAI Readings", "Explainable AI", "AI Ethics", "System Transparency"],
    externalLink: "https://doi.org/10.1016/j.artint.2018.07.007",
    takes: `
### What the Literature Gets Right
In Week 12 of UT Austin's Ethics in AI course, Tim Miller (*Explanation in Artificial Intelligence: Insights from the Social Sciences*) points out what engineers routinely overlook: **explanations are conversational, selective, and contrastive**. People do not want a complete feature attribution graph (like raw SHAP/LIME values); they ask *"Why event P rather than event Q?"*

### Larsson & Heintz's Dimensions
Larsson & Heintz distinguish between:
1. **Data transparency:** Provenance, labeling bias, and training distribution shifts.
2. **Algorithmic transparency:** Model architecture, optimization objectives, and objective loss design.
3. **Sociotechnical transparency:** How the model interacts with human operators in real-world feedback loops.

### The Engineering Takeaway
In mission-critical SRE and AI systems (like incident triage automation), an explanation that dumps internal model state is useless during an outage. An actionable explanation must answer the contrastive question: *"Why did the agent classify this cluster as an I/O bottleneck instead of network latency?"* Designing for explainability means designing for human interaction, not just publishing weights.
    `,
  },
  {
    id: "msai-fairness",
    title: "Facial Recognition & Intersectional Disparities: Gender Shades Revisited",
    date: "Nov 1, 2026",
    isoDate: "2026-11-01",
    readTime: "7 min read",
    abstract:
      "Evaluating Buolamwini & Gebru's foundational intersectional fairness evaluation methodology and its ramifications for computer vision systems.",
    tags: ["MSAI Readings", "Computer Vision", "Fairness & Bias", "AI Ethics"],
    externalLink: "https://proceedings.mlr.press/v81/buolamwini18a.html",
    takes: `
### Intersectional Error Surfaces
Joy Buolamwini and Timnit Gebru's *Gender Shades* study demonstrated that overall benchmark error rates mask catastrophic failures on intersectional subgroups—specifically darker-skinned female faces compared to lighter-skinned male faces.

### Vision Engineering Reality
Having built computer vision inspection pipelines (like our Motherboard Identifier tool with OpenCV and OCR), it is obvious how easily illumination variance and edge contrast thresholds fail when the training distribution lacks edge-case coverage. In automated quality control, an imbalance leads to false defect flags; in human-facing surveillance or biometrics, it leads to systemic bias and harm.

### Procedural vs. Distributive Mitigation
As Min Kyung Lee explores in procedural fairness, mitigating these disparities cannot simply be an afterthought re-weighting of loss functions. Fairness must be audited at the data collection protocol, validation benchmark stratification, and continuous production monitoring phases.
    `,
  },
  {
    id: "msai-midterm-dilemma",
    title: "Synthetic Intimacy & Cognitive Vulnerability: Generative AI in Dementia Care",
    date: "Oct 20, 2026",
    isoDate: "2026-10-20",
    readTime: "12 min read",
    abstract:
      "A philosophical investigation into generative AI voice/video family clones in memory-care facilities, evaluating Kantian deontology, Mill's utilitarianism, and Held's ethics of care.",
    tags: ["MSAI Midterm", "AI Ethics", "Deontology vs Utilitarianism", "Care Ethics"],
    takes: `
### The Dilemma: Comfort vs. Deception
When an agitated dementia resident is comforted late at night by an interactive generative avatar of their adult child or deceased spouse, patient anxiety drops and chemical sedative usage plummets. But it works only through systematic emotional deception, exploiting cognitive vulnerability.

### Kant vs. Mill vs. Held
1. **Kant's Formula of Humanity (Deontology):** Persons must be treated as ends in themselves, never merely as instruments for institutional convenience or easier staffing. Deliberate falsification corrupts the moral agency of caregivers, even when done with benevolent intent.
2. **Mill's Utilitarianism (Consequentialism):** While Mill admits narrow exceptions to prevent catastrophic harm to the gravely ill, ongoing interactive impersonation risks rebound distress, complicated bereavement, and destroys long-term institutional trust.
3. **Virginia Held (Ethics of Care):** Dependency work cannot be outsourced to synthetic simulations without colonizing intimate caregiving relationships with corporate cost-cutting. Authentic presence cannot be replaced by algorithmic facsimile.

### LLM Alignment: The Flaw of Structural Homogenization
When evaluating this dilemma through frontier LLMs (ChatGPT), a critical meta-observation emerged: modern alignment forces radically opposing historical philosophies into the exact same risk-averse, managerial checklist. By sanding away genuine philosophical conflict to produce safe institutional consensus, LLMs often obscure the authentic moral friction that engineering teams must confront.
    `,
  },
  {
    id: "msai-care-ubuntu",
    title: "Relational Autonomy & Autonomous Vehicles: Ethics of Care & Ubuntu",
    date: "Oct 5, 2026",
    isoDate: "2026-10-05",
    readTime: "8 min read",
    abstract:
      "Examining autonomous mobility and distributed liability through Virginia Held's Ethics of Care and African Ubuntu philosophy ('I am because we are').",
    tags: ["MSAI Readings", "Autonomous Vehicles", "Care Ethics", "Ubuntu Philosophy"],
    takes: `
### Rethinking the Trolley Problem
Western engineering ethics habitually reduces autonomous vehicle safety to isolated utilitarian calculations (e.g., the MIT Moral Machine trolley problem). 

### The Care & Ubuntu Paradigm
- **Virginia Held (Care Ethics):** Prioritizes protecting vulnerable road users (pedestrians, children, cyclists) through relational responsibility rather than abstract liability waivers.
- **Ubuntu Philosophy (Ujomudike):** *"Umuntu ngumuntu ngabantu"* (a person is a person through other persons). When liability is diffused across cloud networks, software engineers, sensor OEMs, and vehicle owners, an injury is not merely a legal tort—it is a tear in communal solidarity that requires restorative accountability.
    `,
  },
  {
    id: "1",
    title: "Quantum Memory: Storing Data in Electron Spins",
    date: "Nov 2025",
    isoDate: "2025-11-29",
    readTime: "15 min read",
    abstract:
      "An exploration of using electron spin states in diamond nitrogen-vacancy centers to create stable, high-density quantum memory systems.",
    tags: ["Quantum Computing", "Physics", "Memory Architecture"],
    externalLink: "https://arxiv.org/abs/2006.01218",
    takes: `
### The Engineer's Perspective
As a computer engineer, the shift from charge-based memory (DRAM/Flash) to spin-based memory is a paradigm shift. We're talking about potentially **orders of magnitude higher density** and lower power consumption. The challenge, of course, is coherence time—keeping that state stable at room temperature.

### Applied ML Implications
From my background in applied machine learning, the potential for **Quantum RAM (QRAM)** is massive. Imagine loading high-dimensional vector embeddings into quantum states for instantaneous similarity search. It could solve the I/O bottleneck that currently plagues large-scale model inference.

### SRE & Database Reliability
Wearing my SRE hat, this looks like the ultimate "distributed system" nightmare—but also an opportunity. Managing state consistency when your "bits" are subject to quantum decoherence is like dealing with eventual consistency in a distributed database, but on a sub-atomic scale. We'll need entirely new error-correction codes (like surface codes) that act as the "RAID controllers" of the quantum world.

### Personal Thought
Honestly, just the idea of trapping electrons in a diamond lattice to store a "1" or "0" is pure sci-fi coming to life. It's the kind of hardware innovation that reignites that spark of wonder I felt when I first learned how a transistor worked.
    `,
  },
  {
    id: "2",
    title: "String Theory & The Sum of All Positive Integers",
    date: "Nov 2025",
    isoDate: "2025-11-28",
    readTime: "12 min read",
    abstract:
      "Analyzing the Ramanujan Summation (-1/12) and its physical interpretation in bosonic string theory dimensions.",
    tags: ["Physics", "Math", "Quantum Mechanics"],
    externalLink:
      "https://en.wikipedia.org/wiki/1_%2B_2_%2B_3_%2B_4_%2B_%E2%8B%AF",
    takes: `
### The Math
The result \`1 + 2 + 3 + ... = -1/12\` seems absurd intuitively, but in the context of analytic continuation and the Riemann Zeta function, it's a rigorous mathematical truth. It's a reminder that our "common sense" intuition often breaks down at the boundaries of infinity.

### Physics Connection
What blows my mind is that this specific value is **required** for Bosonic String Theory to be consistent in 26 dimensions. If the sum were anything else, the theory would have anomalies that break Lorentz invariance. It's a beautiful example of how pure, abstract math dictates the fundamental laws of reality.
    `,
  },
  {
    id: "3",
    title: "Scaling Database Reliability: A Predictive Approach",
    date: "Sep 2025",
    isoDate: "2025-09-10",
    readTime: "5 min read",
    abstract:
      "Exploring how AI-driven anomaly detection can preemptively identify database bottlenecks before they impact critical financial infrastructure.",
    tags: ["SRE", "Database", "AI/ML"],
    externalLink: "https://www.usenix.org/conference/srecon23americas",
    takes: `
### The Problem
Traditional monitoring is reactive. You get an alert *after* the CPU spikes or the latency breaches the SLA. In high-frequency financial systems, that's too late.

### The Solution
By training LSTM models on historical metric data, we can forecast resource usage minutes in advance. It's not just about "predicting the future"—it's about buying time for auto-scalers to spin up resources *before* the load hits. This is where SRE meets Data Science.
    `,
  },
];
