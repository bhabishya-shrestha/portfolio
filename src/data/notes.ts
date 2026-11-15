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
    id: "msai-accountability",
    title: "Closing the AI Accountability Gap: Internal Algorithmic Auditing",
    date: "Nov 5, 2026",
    isoDate: "2026-11-05",
    readTime: "7 min read",
    abstract:
      "Takeaways from Raji et al. (SMACTR framework), Shah, and Slota et al. on building end-to-end accountability into deployed AI systems.",
    tags: ["MSAI Readings", "AI Accountability", "Auditing", "SRE"],
    externalLink: "https://dl.acm.org/doi/10.1145/3351095.3372873",
    takes: `
### Why Post-Hoc Audits Fail
Raji et al. (*Closing the AI Accountability Gap*) make a point that feels very familiar if you work in SRE: waiting until a system is already in production to audit it is way too late. Their **SMACTR** framework (Scoping, Mapping, Artifact Collection, Testing, Reflection) treats algorithmic auditing like a continuous engineering lifecycle, not a one-off compliance checkbox.

### The Engineering Reality
When you're building agentic tooling or database automation, accountability means leaving an audit trail at every step: what data went in, what tool calls fired, what assumptions were baked into the prompt or model, and who signed off before it touched production. Without that traceability, "human-in-the-loop" just becomes a rubber stamp.
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
    id: "msai-guidelines",
    title: "The Gap Between AI Ethics Principles and Engineering Practice",
    date: "Oct 22, 2026",
    isoDate: "2026-10-22",
    readTime: "6 min read",
    abstract:
      "Examining Jobin et al.'s global survey of AI ethics guidelines, Hagendorff's critique of toothless principles, and the White House AI Bill of Rights.",
    tags: ["MSAI Readings", "AI Policy", "AI Governance", "Ethics"],
    externalLink: "https://www.nature.com/articles/s42256-019-0088-2",
    takes: `
### Principles Without Teeth
Jobin et al. mapped 84+ AI ethics frameworks globally and found broad agreement on high-level words like transparency, justice, and non-maleficence, yet massive disagreement on what those words actually mean in code. Hagendorff (*The Ethics of AI Ethics*) goes further: without enforcement, incentives, or technical mechanisms, ethics guidelines mostly act as PR cover.

### Translating Policy to Guardrails
Reading the White House *Blueprint for an AI Bill of Rights* alongside Hagendorff highlights the real engineering problem: high-level principles only matter when they turn into concrete system constraints, like rate limits, fallback paths, opt-out controls, and measurable evaluation gates.
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
    id: "msai-codes",
    title: "Professional Codes of Ethics in Computing: ACM, ALA & Real Trade-offs",
    date: "Oct 14, 2026",
    isoDate: "2026-10-14",
    readTime: "5 min read",
    abstract:
      "Comparing the ACM Code of Ethics, ALA Core Values, and Fleischmann's work on how engineers navigate conflicting professional duties.",
    tags: ["MSAI Readings", "ACM Code of Ethics", "Engineering Ethics"],
    externalLink: "https://www.acm.org/code-of-ethics",
    takes: `
### When Principles Collide
The *ACM Code of Ethics* lays out clear duties: contribute to society, avoid harm, be honest, and respect privacy. The hard part in real software engineering isn't knowing those rules; it's what happens when two good principles collide, like shipping a fast fix vs. waiting for full verification, or logging telemetry for reliability vs. minimizing user data collection.

### Why Codes Still Matter
Even when a code of ethics can't give you a formula for every edge case, it sets a baseline for pushing back on bad incentives and reminds you that "my manager asked for it" isn't a technical or moral defense.
    `,
  },
  {
    id: "msai-vsd",
    title: "Value Sensitive Design: Baking Human Values Into Architecture",
    date: "Oct 7, 2026",
    isoDate: "2026-10-07",
    readTime: "6 min read",
    abstract:
      "Exploring Value Sensitive Design (Friedman et al.), human value frameworks (Cieciuch et al.), and Cheng & Fleischmann on design trade-offs.",
    tags: ["MSAI Readings", "Value Sensitive Design", "System Design"],
    externalLink: "https://vsdesign.org/",
    takes: `
### Design Choices Are Value Choices
Value Sensitive Design (VSD) argues that software is never neutral. Every default setting, schema constraint, and UI flow encodes a value judgment. In local-first apps like Aura Finance, choosing IndexedDB + per-user Firestore rules instead of a shared central analytics warehouse is a concrete VSD decision prioritizing user privacy and ownership.

### Direct vs. Indirect Stakeholders
One of the sharpest ideas in Friedman et al. is designing for **indirect stakeholders**: people who don't directly use your app or model, but still feel the downstream effects of how it behaves.
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
    id: "msai-justice-virtue",
    title: "Distributive Justice, Virtue Ethics & IBM Watson's Jeopardy! Architecture",
    date: "Oct 5, 2026",
    isoDate: "2026-10-05",
    readTime: "6 min read",
    abstract:
      "Connecting Rawlsian distributive justice (Murray 2014) and virtue ethics (Slote 2010) with Chandrasekar's breakdown of IBM Watson.",
    tags: ["MSAI Readings", "Distributive Justice", "Virtue Ethics", "NLP"],
    takes: `
### Who Gets the Upside of Automation?
Murray's *Distributive Justice* framing asks a question that feels especially relevant in the era of frontier models: when AI systems generate massive productivity gains, how are the benefits and risks distributed across society?

### Character Over Calculators
Paired with Slote's *Virtue Ethics* and Chandrasekar's look at IBM Watson's DeepQA pipeline, the contrast is clear: rule-based checklists and raw statistical confidence scores can win Jeopardy!, but building trustworthy systems still depends on the character and judgment of the engineers designing them.
    `,
  },
  {
    id: "msai-kant-mill",
    title: "Kantian Duty, Consequentialism & Deep Blue vs. Kasparov",
    date: "Oct 5, 2026",
    isoDate: "2026-10-05",
    readTime: "7 min read",
    abstract:
      "Contrasting Onora O'Neill on Kantian ethics and Brad Hooker on consequentialism alongside Hankey's analysis of Kasparov vs. Deep Blue.",
    tags: ["MSAI Readings", "Kantian Ethics", "Consequentialism", "AI History"],
    takes: `
### Means vs. Outcomes
O'Neill (*Kantian Ethics*) and Hooker (*Consequentialism*) set up the classic tension in engineering ethics: are there hard lines you never cross regardless of the metrics (deontology), or do you optimize for the best aggregate outcome (consequentialism)?

### Deep Blue & What Machines Actually Do
Hankey's piece on Kasparov vs. Deep Blue revisits the Lucas-Gödel argument and reminds us that brute-force search and human understanding are fundamentally different things. Winning a game doesn't mean the machine "reasons" the way a person does, which is just as true for modern LLMs.
    `,
  },
  {
    id: "msai-buddhist-islamic-dartmouth",
    title: "Buddhist & Islamic Ethics Alongside the Dartmouth AI Conference",
    date: "Oct 5, 2026",
    isoDate: "2026-10-05",
    readTime: "6 min read",
    abstract:
      "Reading Padmasiri de Silva on Buddhist ethics, Azim Nanji on Islamic ethics, and Ronald Kline on cybernetics and the 1956 Dartmouth workshop.",
    tags: ["MSAI Readings", "Global Ethics", "AI History", "Cybernetics"],
    takes: `
### Beyond One Philosophical Tradition
Looking at Buddhist ethics (mindfulness, non-harm, interdependence) and Islamic ethics (stewardship, justice, communal responsibility) alongside Kline's history of the 1956 Dartmouth Conference shows how narrow the early Western framing of "intelligence as symbol manipulation" really was.

### Interdependence in Modern Systems
Both traditions emphasize responsibility toward a wider community rather than isolated individual utility, which maps surprisingly well to thinking about large-scale sociotechnical systems today.
    `,
  },
  {
    id: "msai-indian-chinese-babbage",
    title: "Indian & Classical Chinese Ethics and Babbage's Calculating Engines",
    date: "Sep 1, 2026",
    isoDate: "2026-09-01",
    readTime: "6 min read",
    abstract:
      "Notes on Bilimoria (Indian Ethics), Hansen (Classical Chinese Ethics), and Schaffer's history of Charles Babbage and the factory system.",
    tags: ["MSAI Readings", "Global Ethics", "Computing History"],
    takes: `
### Computation Was Always Social
Schaffer's *Babbage's Intelligence* shows that even in the 1800s, the push for mechanical "intelligence" wasn't just pure math; it was tied directly to industrial labor, factory division, and control. 

### Duty, Harmony & Context
Reading Bilimoria and Hansen alongside Babbage sets the foundation for the whole course: ethical reasoning across Indian and Classical Chinese traditions centers heavily on context, duty, and social harmony rather than treating people as isolated agents.
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
