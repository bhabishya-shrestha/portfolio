import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ExternalLink,
  BookOpen,
  Sparkles,
  Scale,
  Compass,
  Flame,
  TrendingUp,
  Brain,
  Sliders,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import type { Book } from "../data/personal";

interface BookReviewModalProps {
  book: Book | null;
  onClose: () => void;
}

export default function BookReviewModal({ book, onClose }: BookReviewModalProps) {
  useEffect(() => {
    if (!book) return;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [book, onClose]);

  return (
    <AnimatePresence>
      {book && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            role="dialog"
            aria-modal="true"
            aria-label={book.title}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6 pointer-events-none"
          >
            <div
              className="pointer-events-auto relative flex max-h-[90dvh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-primary))] shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="relative border-b border-[rgb(var(--border))] bg-[rgb(var(--bg-secondary))]/50 p-6 md:p-8">
                <button
                  onClick={onClose}
                  aria-label="Close book review"
                  className="absolute right-4 top-4 rounded-full p-2 text-[rgb(var(--text-secondary))] hover:bg-[rgb(var(--bg-secondary))] hover:text-[rgb(var(--text-primary))] transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>

                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-500 border border-emerald-500/20">
                    <BookOpen className="h-3.5 w-3.5" />
                    {book.status}
                  </span>
                  <span className="rounded-full bg-[rgb(var(--accent))]/10 px-3 py-1 text-xs font-medium text-[rgb(var(--accent))] border border-[rgb(var(--accent))]/20">
                    Interactive Book Review
                  </span>
                </div>

                <h2 className="mb-1 pr-10 text-2xl font-bold font-display text-[rgb(var(--text-primary))] md:text-3xl">
                  {book.title}
                </h2>
                <p className="text-sm font-medium text-[rgb(var(--text-secondary))]">
                  by {book.author}
                </p>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
                {book.review?.summary && (
                  <div className="rounded-xl bg-[rgb(var(--bg-secondary))]/30 p-5 border border-[rgb(var(--border))]">
                    <h3 className="mb-2 text-xs font-bold uppercase tracking-widest text-[rgb(var(--text-secondary))]">
                      Core Takeaway
                    </h3>
                    <p className="text-base leading-relaxed text-[rgb(var(--text-primary))]">
                      {book.review.summary}
                    </p>
                  </div>
                )}

                {/* Book-specific Interactive Experience */}
                <BookInteractiveSection bookId={book.id} />

                {/* Detailed Markdown Notes */}
                {book.review?.notesMarkdown && (
                  <div>
                    <div className="mb-4 flex items-center gap-3">
                      <div className="rounded-lg bg-gradient-to-br from-emerald-500/20 to-teal-500/20 p-2">
                        <Brain className="h-5 w-5 text-emerald-400" />
                      </div>
                      <h3 className="text-lg font-bold text-[rgb(var(--text-primary))]">
                        Full Reflection
                      </h3>
                    </div>
                    <div className="prose prose-invert max-w-none prose-p:text-[rgb(var(--text-secondary))] prose-headings:text-[rgb(var(--text-primary))] prose-strong:text-[rgb(var(--text-primary))] prose-a:text-[rgb(var(--accent))] prose-li:text-[rgb(var(--text-secondary))]">
                      <ReactMarkdown>{book.review.notesMarkdown}</ReactMarkdown>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="border-t border-[rgb(var(--border))] bg-[rgb(var(--bg-secondary))]/30 px-6 py-4 flex items-center justify-between">
                <span className="text-xs text-[rgb(var(--text-secondary))]">
                  Updated {book.date}
                </span>
                {book.link && (
                  <a
                    href={book.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-lg bg-[rgb(var(--text-primary))] px-5 py-2.5 text-sm font-bold text-[rgb(var(--bg-primary))] transition-transform hover:scale-105 active:scale-95"
                  >
                    <span>View Book</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function BookInteractiveSection({ bookId }: { bookId: string }) {
  switch (bookId) {
    case "6":
      return <BeyondOrderExplorer />;
    case "5":
      return <AlgebraOfWealthSimulator />;
    case "3":
      return <AlchemistLens />;
    case "2":
      return <RedRisingCasteMap />;
    default:
      return null;
  }
}

const BEYOND_ORDER_RULES = [
  {
    num: 1,
    title: "Social Institutions & Renewal",
    category: "aligned",
    badge: "Aligned",
    take: "True. Tearing down structures blindly takes effort and causes second-order implications that are often worse, with very little benefit.",
  },
  {
    num: 2,
    title: "Singular Aim & Vision",
    category: "aligned",
    badge: "Aligned",
    take: "Coincides directly with Think and Grow Rich and The Alchemist—a clear daily aim bends probabilities in your favor.",
  },
  {
    num: 3,
    title: "Facing What's in the Fog",
    category: "aligned",
    badge: "Practical",
    take: "Essential in financial planning and engineering. Ignoring uncomfortable realities is like fighting someone in the dark.",
  },
  {
    num: 4,
    title: "Abandoned Responsibility",
    category: "focus",
    badge: "Active Core Focus",
    take: "Applied at work and in my homelab: if a responsibility is too hard to maintain consistently, don't brute-force willpower—re-engineer the task to make it easier to do. Currently navigating this while leading a project and compiling peers' work around a shared vision.",
  },
  {
    num: 5,
    title: "Living in Integrity",
    category: "tough",
    badge: "Hard to Follow",
    take: "Very easy to agree with in principle, much harder to uphold consistently under real-world pressure.",
  },
  {
    num: 6,
    title: "Shedding Rigid Ideology",
    category: "aligned",
    badge: "Growth Mindset",
    take: "All about neuroplasticity. We are creatures of habit, so keeping a learning mindset is a deliberate practice to avoid becoming rigid.",
  },
  {
    num: 7,
    title: "Commitment to Mastery",
    category: "focus",
    badge: "Homelab Ethos",
    take: "This is the exact mindset behind my homelab—going all-in on systems, automation, and infrastructure to see how far competence scales.",
  },
  {
    num: 8,
    title: "Cultivating Aesthetic Spaces",
    category: "aligned",
    badge: "Daily Life",
    take: "Easy to set up once, hard to maintain continuously—but having an intentional space makes everyday life worth living.",
  },
  {
    num: 9,
    title: "Resolving Old Resentment",
    category: "tough",
    badge: "Forward Bias",
    take: "My instinct is to drop old ideologies and nostalgia, cut out the noise, and keep moving forward—only stopping to unpack the past if it blocks progress.",
  },
  {
    num: 10,
    title: "Relational Intimacy",
    category: "aligned",
    badge: "At 24",
    take: "At 24, this is a chapter of life I know I am still too young to fully appreciate.",
  },
  {
    num: 11,
    title: "Rejecting Cynicism",
    category: "tough",
    badge: "2/10 (Nov 2026)",
    take: "The hardest rule for me to maintain consistently. Rating myself 2/10 as of 11/15/2026—actively working on it through journaling and perspective-taking.",
  },
  {
    num: 12,
    title: "Gratitude Amid Hardship",
    category: "focus",
    badge: "Daily Practice",
    take: "Something I deliberately try to practice and stay consistent with every day.",
  },
];

function BeyondOrderExplorer() {
  const [filter, setFilter] = useState<"all" | "focus" | "tough" | "aligned">("all");
  const [selectedRule, setSelectedRule] = useState<number>(4);

  const filtered = BEYOND_ORDER_RULES.filter(
    (r) => filter === "all" || r.category === filter,
  );
  const active = BEYOND_ORDER_RULES.find((r) => r.num === selectedRule) || BEYOND_ORDER_RULES[3];

  return (
    <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-secondary))]/30 p-5 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Scale className="h-5 w-5 text-[rgb(var(--accent))]" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-[rgb(var(--text-primary))]">
            Interactive 12-Rule Scorecard
          </h3>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {[
            { id: "all", label: "All 12" },
            { id: "focus", label: "Core Focus" },
            { id: "tough", label: "Toughest" },
            { id: "aligned", label: "Mindset" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as typeof filter)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                filter === tab.id
                  ? "bg-[rgb(var(--accent))] text-white"
                  : "bg-[rgb(var(--bg-primary))] text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {filtered.map((rule) => {
          const isSelected = rule.num === selectedRule;
          return (
            <button
              key={rule.num}
              onClick={() => setSelectedRule(rule.num)}
              className={`text-left rounded-xl p-3 border transition-all ${
                isSelected
                  ? "border-[rgb(var(--accent))] bg-[rgb(var(--accent))]/10"
                  : "border-[rgb(var(--border))] bg-[rgb(var(--bg-primary))]/60 hover:border-[rgb(var(--accent))]/40"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-mono font-bold text-[rgb(var(--accent))]">
                  #{rule.num}
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-[rgb(var(--bg-secondary))] text-[rgb(var(--text-secondary))]">
                  {rule.badge}
                </span>
              </div>
              <p className="text-xs font-semibold text-[rgb(var(--text-primary))] line-clamp-2">
                {rule.title}
              </p>
            </button>
          );
        })}
      </div>

      <motion.div
        key={active.num}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl border border-[rgb(var(--accent))]/30 bg-[rgb(var(--bg-primary))]/80 p-4"
      >
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-sm font-bold text-[rgb(var(--text-primary))]">
            Rule {active.num}: {active.title}
          </span>
          <span className="text-xs font-mono text-[rgb(var(--accent))]">
            {active.badge}
          </span>
        </div>
        <p className="text-sm leading-relaxed text-[rgb(var(--text-secondary))]">
          {active.take}
        </p>
      </motion.div>
    </div>
  );
}

const WEALTH_PILLARS = [
  {
    id: "focus",
    label: "Focus",
    type: "Logical / Systematic",
    detail: "High-leverage skill building and career momentum. Straightforward to execute once you choose your lane.",
  },
  {
    id: "diversification",
    label: "Diversification",
    type: "Logical / Systematic",
    detail: "Asset allocation rules you can set and automate. Prompted me to scrutinize my 80% US / 20% International equity split.",
  },
  {
    id: "stoicism",
    label: "Stoicism",
    type: "Mental Endurance",
    detail: "Hardest to stay consistent on. Resisting lifestyle creep and staying calm during drawdowns is purely psychological.",
  },
  {
    id: "time",
    label: "Time",
    type: "Mental Endurance",
    detail: "Decades of compounding require patience. Being in my 20s is an edge—if I stay disciplined through slow cycles.",
  },
];

function AlgebraOfWealthSimulator() {
  const [selectedPillar, setSelectedPillar] = useState("stoicism");
  const [expectedReturn, setExpectedReturn] = useState(4.5);
  const [usWeight, setUsWeight] = useState(80);

  const years = 20;
  const baseMultiple = Math.pow(1 + expectedReturn / 100, years).toFixed(2);
  const bullMultiple = Math.pow(1 + 9.0 / 100, years).toFixed(2);
  const activePillar = WEALTH_PILLARS.find((p) => p.id === selectedPillar) || WEALTH_PILLARS[2];

  return (
    <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-secondary))]/30 p-5 space-y-5">
      <div className="flex items-center gap-2">
        <TrendingUp className="h-5 w-5 text-emerald-400" />
        <h3 className="text-sm font-bold uppercase tracking-wider text-[rgb(var(--text-primary))]">
          Interactive Wealth Equation & 20-Year Reality Check
        </h3>
      </div>

      {/* Equation Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {WEALTH_PILLARS.map((pillar, idx) => (
          <div key={pillar.id} className="flex items-center gap-2">
            <button
              onClick={() => setSelectedPillar(pillar.id)}
              className={`rounded-lg px-3 py-2 text-xs font-bold border transition-all ${
                selectedPillar === pillar.id
                  ? "border-emerald-500 bg-emerald-500/15 text-emerald-400"
                  : "border-[rgb(var(--border))] bg-[rgb(var(--bg-primary))]/60 text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))]"
              }`}
            >
              {pillar.label}
            </button>
            {idx === 0 && <span className="text-xs font-mono text-[rgb(var(--text-secondary))]">+ (</span>}
            {idx > 0 && idx < 3 && <span className="text-xs font-mono text-[rgb(var(--text-secondary))]">×</span>}
            {idx === 3 && <span className="text-xs font-mono text-[rgb(var(--text-secondary))]">)</span>}
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-primary))]/80 p-3.5">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-bold text-[rgb(var(--text-primary))]">
            {activePillar.label}
          </span>
          <span className="text-[11px] font-mono text-emerald-400">
            {activePillar.type}
          </span>
        </div>
        <p className="text-xs leading-relaxed text-[rgb(var(--text-secondary))]">
          {activePillar.detail}
        </p>
      </div>

      {/* Interactive Sliders */}
      <div className="grid gap-4 sm:grid-cols-2 pt-2 border-t border-[rgb(var(--border))]">
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-[rgb(var(--text-secondary))] flex items-center gap-1">
              <Sliders className="h-3.5 w-3.5" /> Annualized Return Assumption
            </span>
            <span className="font-mono font-bold text-emerald-400">{expectedReturn.toFixed(1)}% / yr</span>
          </div>
          <input
            type="range"
            min="3.0"
            max="10.0"
            step="0.5"
            value={expectedReturn}
            onChange={(e) => setExpectedReturn(parseFloat(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer"
          />
          <p className="text-[11px] text-[rgb(var(--text-secondary))]">
            20-yr multiplier: <strong className="text-[rgb(var(--text-primary))]">{baseMultiple}x</strong>{" "}
            <span className="opacity-70">(vs {bullMultiple}x at 9% historical bull)</span>
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-[rgb(var(--text-secondary))]">US / Intl Equity Split</span>
            <span className="font-mono font-bold text-[rgb(var(--accent))]">
              {usWeight}% US / {100 - usWeight}% Intl
            </span>
          </div>
          <input
            type="range"
            min="50"
            max="95"
            step="5"
            value={usWeight}
            onChange={(e) => setUsWeight(parseInt(e.target.value, 10))}
            className="w-full accent-[rgb(var(--accent))] cursor-pointer"
          />
          <p className="text-[11px] text-[rgb(var(--text-secondary))]">
            {usWeight >= 80
              ? "Heavy US concentration — higher upside if US dominance holds, higher single-market risk."
              : "More balanced global exposure — cushions single-country valuation compression."}
          </p>
        </div>
      </div>
    </div>
  );
}

function AlchemistLens() {
  const [lens, setLens] = useState<"first" | "reread">("reread");
  const [polarity, setPolarity] = useState<"positive" | "negative">("positive");

  return (
    <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-secondary))]/30 p-5 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Compass className="h-5 w-5 text-amber-400" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-[rgb(var(--text-primary))]">
            First Read vs. Re-Read & Focus Polarity
          </h3>
        </div>
        <div className="flex gap-1.5">
          <button
            onClick={() => setLens("first")}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              lens === "first"
                ? "bg-amber-500 text-black"
                : "bg-[rgb(var(--bg-primary))] text-[rgb(var(--text-secondary))]"
            }`}
          >
            First Read
          </button>
          <button
            onClick={() => setLens("reread")}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              lens === "reread"
                ? "bg-amber-500 text-black"
                : "bg-[rgb(var(--bg-primary))] text-[rgb(var(--text-secondary))]"
            }`}
          >
            Re-Read (2026)
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-primary))]/80 p-4">
        <p className="text-xs font-mono uppercase tracking-wider text-amber-400 mb-1">
          {lens === "first" ? "Surface-Level Takeaway" : "Lived Experience Takeaway"}
        </p>
        <p className="text-sm leading-relaxed text-[rgb(var(--text-secondary))]">
          {lens === "first"
            ? "Originally, it felt like the classic cliché: 'the journey matters more than the destination.' Inspiring, but abstract."
            : "Now it's about self-understanding and actually inhabiting the good moments *while they are happening*, rather than chasing the next milestone and only appreciating life in hindsight."}
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-[rgb(var(--text-primary))] flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            Think & Grow Rich Connection (Mental Magnetism)
          </span>
          <div className="flex gap-1">
            <button
              onClick={() => setPolarity("positive")}
              className={`rounded px-2 py-0.5 text-[11px] font-medium ${
                polarity === "positive"
                  ? "bg-emerald-500/20 text-emerald-400"
                  : "text-[rgb(var(--text-secondary))]"
              }`}
            >
              Directed Aspiration
            </button>
            <button
              onClick={() => setPolarity("negative")}
              className={`rounded px-2 py-0.5 text-[11px] font-medium ${
                polarity === "negative"
                  ? "bg-rose-500/20 text-rose-400"
                  : "text-[rgb(var(--text-secondary))]"
              }`}
            >
              Unchecked Self-Doubt
            </button>
          </div>
        </div>
        <p className="text-xs leading-relaxed text-[rgb(var(--text-secondary))] rounded-lg bg-[rgb(var(--bg-primary))]/60 p-3 border border-[rgb(var(--border))]">
          {polarity === "positive"
            ? "Holding an aspiration in your mind every single day increases the odds it materializes—your attention filters opportunities and compounds effort far better than navigating blindly."
            : "The flip side: that same mechanism works against you unintentionally when negative self-talk or dwelling on bad situations takes over."}
        </p>
      </div>
    </div>
  );
}

const CASTES = [
  {
    id: "red",
    name: "Reds & LowColors",
    color: "text-rose-400 border-rose-500/40 bg-rose-500/10",
    bookRole: "Laboring beneath Mars' surface, convinced their sacrifice builds a future they'll never inherit.",
    realParallel: "The bottom leg of a K-shaped economy: wages stagnating against asset inflation while mobility narrows.",
  },
  {
    id: "gold",
    name: "Golds & Peerless",
    color: "text-amber-400 border-amber-500/40 bg-amber-500/10",
    bookRole: "Ruling class educated in power, strategy, and entitlement—convinced hierarchy is natural law.",
    realParallel: "Concentrated capital and institutional gatekeeping where compounding assets outpace labor income.",
  },
  {
    id: "darrow",
    name: "Darrow (Eren Yeager Drive)",
    color: "text-purple-400 border-purple-500/40 bg-purple-500/10",
    bookRole: "Brash, relentless infiltration from the inside—willing to burn peace to break a rigged machine.",
    realParallel: "The personal drive to achieve financial freedom in your 20s and refuse to be boxed in by default trajectories.",
  },
];

function RedRisingCasteMap() {
  const [selected, setSelected] = useState("darrow");
  const active = CASTES.find((c) => c.id === selected) || CASTES[2];

  return (
    <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-secondary))]/30 p-5 space-y-4">
      <div className="flex items-center gap-2">
        <Flame className="h-5 w-5 text-rose-400" />
        <h3 className="text-sm font-bold uppercase tracking-wider text-[rgb(var(--text-primary))]">
          Society Hierarchy & K-Shaped Economy Parallels
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {CASTES.map((caste) => (
          <button
            key={caste.id}
            onClick={() => setSelected(caste.id)}
            className={`rounded-xl p-3 text-left border transition-all ${
              selected === caste.id
                ? caste.color
                : "border-[rgb(var(--border))] bg-[rgb(var(--bg-primary))]/60 text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))]"
            }`}
          >
            <span className="text-xs font-bold block">{caste.name}</span>
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-primary))]/80 p-3.5">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[rgb(var(--text-secondary))]">
            In Red Rising
          </span>
          <p className="mt-1 text-xs leading-relaxed text-[rgb(var(--text-primary))]">
            {active.bookRole}
          </p>
        </div>
        <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-primary))]/80 p-3.5">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[rgb(var(--accent))]">
            Real-World Lens (20s)
          </span>
          <p className="mt-1 text-xs leading-relaxed text-[rgb(var(--text-primary))]">
            {active.realParallel}
          </p>
        </div>
      </div>
    </div>
  );
}
