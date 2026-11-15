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
    title: "Social Institutions & Creative Achievement",
    category: "aligned",
    badge: "Agreed",
    take: "True. Tearing things down takes effort and usually creates worse side effects with not much benefit.",
  },
  {
    num: 2,
    title: "Aim Single-Mindedly",
    category: "aligned",
    badge: "Agreed",
    take: "True, and it lines up directly with Think and Grow Rich and The Alchemist.",
  },
  {
    num: 3,
    title: "Don't Hide Things in the Fog",
    category: "aligned",
    badge: "Practical",
    take: "True, especially with financial planning. Ignoring it is like fighting in the dark.",
  },
  {
    num: 4,
    title: "Responsibility & Opportunity",
    category: "focus",
    badge: "Active Focus",
    take: "Applied at work and in my homelab: if a responsibility is too hard to stay consistent with, make the task easier to do instead of brute-forcing willpower. Currently navigating this while leading a project and compiling peers' work around one vision.",
  },
  {
    num: 5,
    title: "Don't Do What You Hate",
    category: "tough",
    badge: "Hard to Follow",
    take: "Easy to agree with, hard to actually follow.",
  },
  {
    num: 6,
    title: "Abandon Ideology",
    category: "aligned",
    badge: "Neuroplasticity",
    take: "We are creatures of habit, so keeping a learning mindset takes deliberate effort if you don't want to get rigid.",
  },
  {
    num: 7,
    title: "Work Hard on One Thing",
    category: "focus",
    badge: "Homelab",
    take: "That is basically what I try to do with my homelab.",
  },
  {
    num: 8,
    title: "Make One Room Beautiful",
    category: "aligned",
    badge: "Daily Life",
    take: "Easy to do once, hard to keep up, but it makes life worth living.",
  },
  {
    num: 9,
    title: "Resolving Old Stuff",
    category: "tough",
    badge: "Forward Bias",
    take: "Hard to do. My instinct is to drop old ideologies and nostalgia, cut the noise, and keep moving forward, only stopping to unpack the past if it blocks me.",
  },
  {
    num: 10,
    title: "Romance & Marriage",
    category: "aligned",
    badge: "At 24",
    take: "At 24, I am honestly too young to really understand this one yet.",
  },
  {
    num: 11,
    title: "Don't Get Bitter or Cynical",
    category: "tough",
    badge: "2/10 (Nov 2026)",
    take: "The hardest one for me to keep up. I'd give myself a 2/10 as of 11/15/2026, and I'm trying to improve through things like journaling.",
  },
  {
    num: 12,
    title: "Be Grateful Anyway",
    category: "focus",
    badge: "Daily Practice",
    take: "Something I try to do and stay consistent with every day.",
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
    type: "Logical",
    detail: "Picking a lane and building skills. Pretty logical, so staying consistent with it isn't the hardest part.",
  },
  {
    id: "diversification",
    label: "Diversification",
    type: "Logical",
    detail: "Spreading risk systematically. Got me questioning my 80% US / 20% International split and whether it's too US-heavy.",
  },
  {
    id: "stoicism",
    label: "Stoicism",
    type: "Mental",
    detail: "Way harder to stay consistent with because it's all in your head. Not panicking or inflating your lifestyle takes real discipline.",
  },
  {
    id: "time",
    label: "Time",
    type: "Mental",
    detail: "Playing the long game over decades. Being in my 20s helps, as long as I'm ready for slower 4 to 5% years too.",
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
              ? "Heavy US tilt. Great if the US keeps booming, risky if the next 20 years average 4 to 5%."
              : "More balanced global split to cushion single-market risk."}
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
            ? "Originally I just got the surface-level idea that the journey matters more than the destination, without really applying it to my life."
            : "Now it's about knowing myself and actually enjoying the good moments while they are happening, instead of only appreciating them afterward."}
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-[rgb(var(--text-primary))] flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            Think & Grow Rich Connection
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
              Positive Focus
            </button>
            <button
              onClick={() => setPolarity("negative")}
              className={`rounded px-2 py-0.5 text-[11px] font-medium ${
                polarity === "negative"
                  ? "bg-rose-500/20 text-rose-400"
                  : "text-[rgb(var(--text-secondary))]"
              }`}
            >
              Negative Spiral
            </button>
          </div>
        </div>
        <p className="text-xs leading-relaxed text-[rgb(var(--text-secondary))] rounded-lg bg-[rgb(var(--bg-primary))]/60 p-3 border border-[rgb(var(--border))]">
          {polarity === "positive"
            ? "If you really think about an aspiration every day, it's way more likely to happen than just drifting blindly."
            : "It cuts both ways though. When I feel bad or think negatively about a situation or myself, it can hurt me without me even meaning to."}
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
    bookRole: "Doing the hardest labor at the bottom while being told it's for a future they'll never see.",
    realParallel: "The bottom half of a K-shaped economy where wages struggle to keep up with rising asset prices.",
  },
  {
    id: "gold",
    name: "Golds & Peerless",
    color: "text-amber-400 border-amber-500/40 bg-amber-500/10",
    bookRole: "Sitting at the top with all the power, convinced the hierarchy is just how the world works.",
    realParallel: "Concentrated wealth and gatekeeping where owning capital pulls further away from regular income.",
  },
  {
    id: "darrow",
    name: "Main Character (Eren Yeager Energy)",
    color: "text-purple-400 border-purple-500/40 bg-purple-500/10",
    bookRole: "Brash, stubborn, and willing to break the whole system from the inside.",
    realParallel: "Relating to that drive in your 20s when you're pushing for financial freedom and refusing to stay boxed in.",
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
