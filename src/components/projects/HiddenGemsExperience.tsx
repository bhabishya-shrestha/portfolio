import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  ArrowDown,
  ArrowUp,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  CreditCard,
  Database,
  Fish,
  Flame,
  Gem,
  Heart,
  Info,
  Mail,
  Phone,
  Pizza,
  Search,
  Server,
  Share2,
  ShieldCheck,
  Smartphone,
  Trophy,
  User,
  Users,
  Utensils,
  Zap,
} from "lucide-react";
import {
  ArchitectureNode,
  type ArchitectureComponent,
} from "./ArchitectureNode";

// ---------- Sample data (fictional, for the demo only) ----------

type Vote = "up" | "down" | null;
type Tab = "leaderboard" | "group" | "profile";

interface DemoRestaurant {
  id: string;
  name: string;
  cuisine: string;
  pricing: 1 | 2 | 3;
  baseVotes: number;
  quote: string;
  phone: string;
  hours: string;
  gradient: string;
  icon: React.ElementType;
}

const RESTAURANTS: DemoRestaurant[] = [
  {
    id: "ember",
    name: "Ember & Oak",
    cuisine: "American",
    pricing: 2,
    baseVotes: 41,
    quote: "Wood-fired everything, and the patio is a win.",
    phone: "(555) 010-0142",
    hours: "11:00 AM – 9:00 PM",
    gradient: "from-orange-400 to-red-500",
    icon: Flame,
  },
  {
    id: "saffron",
    name: "Saffron Table",
    cuisine: "Indian",
    pricing: 2,
    baseVotes: 40,
    quote: "Lunch-hour butter chicken that survives a conference call.",
    phone: "(555) 010-0178",
    hours: "11:00 AM – 10:00 PM",
    gradient: "from-amber-400 to-orange-600",
    icon: Utensils,
  },
  {
    id: "noodle",
    name: "Noodle Theory",
    cuisine: "Asian Fusion",
    pricing: 1,
    baseVotes: 39,
    quote: "Fast, fresh bowls for the 20-minute lunch break.",
    phone: "(555) 010-0116",
    hours: "10:30 AM – 8:30 PM",
    gradient: "from-emerald-400 to-teal-600",
    icon: Utensils,
  },
  {
    id: "casa",
    name: "Casa Verde",
    cuisine: "Mexican",
    pricing: 1,
    baseVotes: 38,
    quote: "Tacos that keep the meeting on schedule.",
    phone: "(555) 010-0163",
    hours: "10:00 AM – 9:30 PM",
    gradient: "from-lime-400 to-green-600",
    icon: Utensils,
  },
  {
    id: "harbor",
    name: "Harbor Grill",
    cuisine: "Seafood",
    pricing: 3,
    baseVotes: 37,
    quote: "The special-occasion place that earns it.",
    phone: "(555) 010-0191",
    hours: "4:00 PM – 10:00 PM",
    gradient: "from-sky-400 to-blue-600",
    icon: Fish,
  },
  {
    id: "slice",
    name: "Slice Society",
    cuisine: "Pizza",
    pricing: 1,
    baseVotes: 36,
    quote: "Big slices, small prices, zero regrets.",
    phone: "(555) 010-0127",
    hours: "11:00 AM – 11:00 PM",
    gradient: "from-rose-400 to-red-600",
    icon: Pizza,
  },
];

const CUISINES = [
  "All",
  ...Array.from(new Set(RESTAURANTS.map((r) => r.cuisine))),
];

interface CateringItem {
  id: string;
  restaurant: string;
  name: string;
  price: number;
}

const CATERING: CateringItem[] = [
  {
    id: "c1",
    restaurant: "Ember & Oak",
    name: "Smoked Brisket Plate",
    price: 15,
  },
  {
    id: "c2",
    restaurant: "Ember & Oak",
    name: "Grilled Chicken Salad",
    price: 12.5,
  },
  {
    id: "c3",
    restaurant: "Saffron Table",
    name: "Butter Chicken Box",
    price: 13.5,
  },
  {
    id: "c4",
    restaurant: "Saffron Table",
    name: "Chana Masala Box (V)",
    price: 11.5,
  },
  {
    id: "c5",
    restaurant: "Casa Verde",
    name: "Chicken Fajita Bowl",
    price: 12.25,
  },
  {
    id: "c6",
    restaurant: "Casa Verde",
    name: "Veggie Burrito Bowl (V)",
    price: 10.75,
  },
];

const TEAM_ORDERS = [
  {
    userName: "Priya",
    restaurant: "Saffron Table",
    entree: "Butter Chicken Box",
    price: 13.5,
  },
  {
    userName: "Marcus",
    restaurant: "Ember & Oak",
    entree: "Smoked Brisket Plate",
    price: 15,
  },
  {
    userName: "Dana",
    restaurant: "Casa Verde",
    entree: "Chicken Fajita Bowl",
    price: 12.25,
  },
];

const GROUP_CODE = "24680";
const GREEN = "bg-[#2e7d32]";

// ---------- Architecture ----------

const ARCH_COMPONENTS: ArchitectureComponent[] = [
  {
    id: "app",
    title: "Mobile App",
    desc: "React Native + Expo, Redux Toolkit",
    icon: Smartphone,
    category: "client",
    url: "https://reactnative.dev",
  },
  {
    id: "cognito",
    title: "Amazon Cognito",
    desc: "Sign-in and user roles",
    icon: ShieldCheck,
    category: "service",
    url: "https://aws.amazon.com/cognito/",
  },
  {
    id: "appsync",
    title: "AppSync GraphQL",
    desc: "Amplify DataStore",
    icon: Zap,
    category: "service",
    url: "https://aws.amazon.com/appsync/",
  },
  {
    id: "lambda",
    title: "AWS Lambda",
    desc: "Node.js and Python functions",
    icon: Server,
    category: "service",
    url: "https://aws.amazon.com/lambda/",
  },
  {
    id: "dynamo",
    title: "DynamoDB",
    desc: "Restaurants, users, group orders",
    icon: Database,
    category: "database",
    url: "https://aws.amazon.com/dynamodb",
  },
  {
    id: "square",
    title: "Square API",
    desc: "Menus and ordering via OAuth",
    icon: CreditCard,
    category: "other",
    url: "https://developer.squareup.com",
  },
  {
    id: "email",
    title: "Order Emails",
    desc: "Lambda-sent confirmations",
    icon: Mail,
    category: "service",
  },
  {
    id: "cloudwatch",
    title: "CloudWatch",
    desc: "Dashboards and health monitoring",
    icon: Activity,
    category: "other",
    url: "https://aws.amazon.com/cloudwatch/",
  },
];

const FLOWS = [
  {
    id: "browse",
    label: "Browse & Vote",
    path: ["app", "cognito", "appsync", "lambda", "dynamo"],
    description:
      "Signed-in users load the ranked leaderboard (restaurants plus distance lookups through Lambda) and votes sync through GraphQL into DynamoDB.",
  },
  {
    id: "group",
    label: "Group Order",
    path: ["app", "appsync", "lambda", "dynamo", "email"],
    description:
      "A company admin creates a group order with a deadline. Employees join by code, add their entree, and Lambda emails the final order.",
  },
  {
    id: "square",
    label: "Online Ordering",
    path: ["app", "lambda", "square"],
    description:
      "Lambda handles the Square OAuth token exchange and refresh, then fetches menu items so the app can place orders.",
  },
  {
    id: "monitor",
    label: "Monitoring",
    path: ["lambda", "cloudwatch"],
    description:
      "CloudWatch dashboards track the health of the Lambda backend so problems surface before users notice.",
  },
];

// ---------- Helpers ----------

const money = (n: number) => `$${n.toFixed(2)}`;
const dollars = (n: number) => "$".repeat(n);

// ---------- Component ----------

export default function HiddenGemsExperience() {
  return (
    <div className="space-y-24">
      <AppDemo />
      <ArchitectureDiagram />
    </div>
  );
}

function AppDemo() {
  const [tab, setTab] = useState<Tab>("leaderboard");
  const [query, setQuery] = useState("");
  const [cuisine, setCuisine] = useState("All");
  const [withImages, setWithImages] = useState(true);
  const [votes, setVotes] = useState<Record<string, Vote>>({});
  const [favorites, setFavorites] = useState<string[]>([]);
  const [openId, setOpenId] = useState<string | null>(null);
  const [hoursOpen, setHoursOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [showFavs, setShowFavs] = useState(false);

  const [code, setCode] = useState("");
  const [joined, setJoined] = useState(false);
  const [codeError, setCodeError] = useState(false);
  const [pick, setPick] = useState<string | null>(null);
  const [placed, setPlaced] = useState<CateringItem | null>(null);

  const [events, setEvents] = useState<string[]>([
    "GetRestaurants (Lambda) → ranked list loaded for Richardson",
  ]);
  const log = (msg: string) => setEvents((e) => [msg, ...e].slice(0, 6));

  // Ties go to the restaurant the user upvoted (and away from one they downvoted)
  const voteBias = (r: DemoRestaurant) =>
    votes[r.id] === "up" ? 1 : votes[r.id] === "down" ? -1 : 0;

  const netVotes = (r: DemoRestaurant) =>
    r.baseVotes + (votes[r.id] === "up" ? 1 : votes[r.id] === "down" ? -1 : 0);

  const ranked = useMemo(() => {
    const q = query.trim().toLowerCase();
    return RESTAURANTS.filter(
      (r) =>
        (cuisine === "All" || r.cuisine === cuisine) &&
        (!q ||
          r.name.toLowerCase().includes(q) ||
          r.cuisine.toLowerCase().includes(q)),
    ).sort(
      (a, b) =>
        netVotes(b) - netVotes(a) ||
        voteBias(b) - voteBias(a) ||
        b.baseVotes - a.baseVotes,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, cuisine, votes]);

  const open = RESTAURANTS.find((r) => r.id === openId) ?? null;

  const flash = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 1800);
  };

  const vote = (r: DemoRestaurant, dir: "up" | "down") => {
    const next: Vote = votes[r.id] === dir ? null : dir;
    setVotes((v) => ({ ...v, [r.id]: next }));
    log(
      next
        ? `${dir === "up" ? "Upvote" : "Downvote"} on ${r.name} → saved on the user, rolled into net votes`
        : `Vote removed on ${r.name} → net votes recalculated`,
    );
  };

  const toggleFav = (r: DemoRestaurant) => {
    const isFav = favorites.includes(r.id);
    setFavorites((f) => (isFav ? f.filter((x) => x !== r.id) : [...f, r.id]));
    log(
      `${isFav ? "Removed" : "Saved"} ${r.name} ${isFav ? "from" : "to"} favorites → DataStore sync`,
    );
  };

  const tryCode = (value: string) => {
    const clean = value.replace(/\D/g, "").slice(0, 5);
    setCode(clean);
    setCodeError(false);
    if (clean.length === 5) {
      if (clean === GROUP_CODE) {
        setJoined(true);
        log("fetchGroup(code) → user linked to client, group order loaded");
      } else {
        setCodeError(true);
        log("fetchGroup(code) → no match, invalid code");
      }
    }
  };

  const placeOrder = () => {
    const item = CATERING.find((c) => c.id === pick);
    if (!item) return;
    setPlaced(item);
    log(`AddGroupOrder (Lambda) → order saved; sendGroupOrderEmail queued`);
  };

  const resetDemo = () => {
    setVotes({});
    setFavorites([]);
    setJoined(false);
    setCode("");
    setPick(null);
    setPlaced(null);
    setOpenId(null);
    setQuery("");
    setCuisine("All");
    setTab("leaderboard");
    setEvents(["Demo reset"]);
  };

  const teamTotal =
    TEAM_ORDERS.reduce((s, o) => s + o.price, 0) + (placed?.price ?? 0);

  return (
    <section>
      <div className="mb-8">
        <h3 className="font-display text-2xl font-bold text-[rgb(var(--text-primary))]">
          Interactive App Demo
        </h3>
        <p className="text-[rgb(var(--text-secondary))] mt-2 max-w-2xl">
          Try it: vote to re-rank the leaderboard, open a restaurant, save
          favorites, then join a company group order. Sample data only, but the
          flows mirror the real app.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-[auto_1fr] lg:items-start">
        {/* Phone */}
        <div className="mx-auto">
          <div className="relative w-[300px] sm:w-[320px] rounded-[2.75rem] bg-zinc-900 p-3 shadow-2xl ring-1 ring-white/10">
            <div className="relative h-[600px] overflow-hidden rounded-[2.1rem] bg-white text-zinc-900">
              <div className="h-[540px] overflow-y-auto overflow-x-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <AnimatePresence mode="wait" initial={false}>
                  {/* ---------- Leaderboard / Detail ---------- */}
                  {tab === "leaderboard" && !open && (
                    <motion.div
                      key="board"
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -12 }}
                      transition={{ duration: 0.15 }}
                      className="pb-4"
                    >
                      <div className="px-4 pt-5 pb-2 text-lg font-semibold">
                        Leaderboard
                      </div>
                      <div className="px-4">
                        <label className="flex items-center gap-2 rounded-lg bg-zinc-100 px-3 py-2 shadow-sm">
                          <Search
                            className="h-4 w-4 text-zinc-500"
                            aria-hidden="true"
                          />
                          <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search for a restaurant…"
                            aria-label="Search for a restaurant"
                            className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-500"
                          />
                        </label>
                      </div>
                      <div className="flex items-center justify-between px-4 py-3 text-sm">
                        <span>Images</span>
                        <button
                          role="switch"
                          aria-checked={withImages}
                          aria-label="Show images"
                          onClick={() => setWithImages((v) => !v)}
                          className={`relative h-6 w-11 rounded-full transition-colors ${withImages ? GREEN : "bg-zinc-300"}`}
                        >
                          <span
                            className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${withImages ? "left-[1.4rem]" : "left-0.5"}`}
                          />
                        </button>
                      </div>
                      <div className="flex items-center justify-between px-4 pb-3 text-sm text-zinc-600">
                        <span>Richardson</span>
                        <span className="text-zinc-400">Change</span>
                      </div>
                      <div className="flex gap-2 overflow-x-auto px-4 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                        {CUISINES.map((c) => (
                          <button
                            key={c}
                            onClick={() => {
                              setCuisine(c);
                              log(
                                `Filter: ${c} → list filtered by cuisine attribute`,
                              );
                            }}
                            className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                              cuisine === c
                                ? `${GREEN} text-white`
                                : "bg-zinc-100 text-zinc-700"
                            }`}
                          >
                            {c}
                          </button>
                        ))}
                      </div>

                      <div className="border-t border-zinc-100">
                        {ranked.length === 0 && (
                          <p className="px-4 py-10 text-center text-sm text-zinc-500">
                            No restaurants match that search.
                          </p>
                        )}
                        {ranked.map((r, i) => (
                          <motion.div
                            layout
                            transition={{
                              type: "spring",
                              stiffness: 380,
                              damping: 32,
                            }}
                            key={r.id}
                            className="border-b border-zinc-100"
                          >
                            <div className="flex items-center gap-3 px-4 py-3">
                              <span
                                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-sm font-bold text-white ${
                                  i === 0
                                    ? "bg-yellow-400"
                                    : i === 1
                                      ? "bg-zinc-400"
                                      : i === 2
                                        ? "bg-amber-700"
                                        : "bg-zinc-300"
                                }`}
                              >
                                {i + 1}
                              </span>
                              <button
                                onClick={() => {
                                  setOpenId(r.id);
                                  setHoursOpen(false);
                                  log(`Open ${r.name} → restaurant page`);
                                }}
                                className="min-w-0 flex-1 text-left"
                              >
                                <div className="truncate text-sm font-semibold">
                                  {r.name}
                                </div>
                                <div className="text-xs text-zinc-500">
                                  {dollars(r.pricing)} · {r.cuisine}
                                </div>
                              </button>
                              <div className="flex items-center gap-1">
                                <button
                                  aria-label={`Upvote ${r.name}`}
                                  aria-pressed={votes[r.id] === "up"}
                                  onClick={() => vote(r, "up")}
                                  className={`rounded-full p-1.5 transition-colors ${votes[r.id] === "up" ? `${GREEN} text-white` : "bg-zinc-200 text-zinc-600"}`}
                                >
                                  <ArrowUp className="h-3.5 w-3.5" />
                                </button>
                                <span className="w-8 text-center text-xs font-semibold tabular-nums">
                                  {netVotes(r)}
                                </span>
                                <button
                                  aria-label={`Downvote ${r.name}`}
                                  aria-pressed={votes[r.id] === "down"}
                                  onClick={() => vote(r, "down")}
                                  className={`rounded-full p-1.5 transition-colors ${votes[r.id] === "down" ? "bg-red-500 text-white" : "bg-zinc-200 text-zinc-600"}`}
                                >
                                  <ArrowDown className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            </div>
                            {withImages && (
                              <button
                                onClick={() => setOpenId(r.id)}
                                aria-label={`Open ${r.name}`}
                                className={`flex h-24 w-full items-center justify-center bg-gradient-to-br ${r.gradient}`}
                              >
                                <r.icon
                                  className="h-9 w-9 text-white/90"
                                  aria-hidden="true"
                                />
                              </button>
                            )}
                            <p className="px-4 py-3 text-xs italic text-zinc-600">
                              “{r.quote}”
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {tab === "leaderboard" && open && (
                    <motion.div
                      key={`detail-${open.id}`}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 16 }}
                      transition={{ duration: 0.15 }}
                      className="pb-4"
                    >
                      <div
                        className={`relative flex h-44 items-center justify-center bg-gradient-to-br ${open.gradient}`}
                      >
                        <open.icon
                          className="h-14 w-14 text-white/90"
                          aria-hidden="true"
                        />
                        <button
                          aria-label="Back to leaderboard"
                          onClick={() => setOpenId(null)}
                          className="absolute left-3 top-4 rounded-full bg-white p-2 shadow"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </button>
                        <button
                          aria-label={
                            favorites.includes(open.id)
                              ? "Remove from favorites"
                              : "Save to favorites"
                          }
                          aria-pressed={favorites.includes(open.id)}
                          onClick={() => toggleFav(open)}
                          className="absolute right-3 top-4 rounded-full bg-white p-2 shadow"
                        >
                          <motion.span
                            whileTap={{ scale: 1.4 }}
                            className="block"
                          >
                            <Heart
                              className={`h-4 w-4 ${favorites.includes(open.id) ? "fill-red-500 text-red-500" : ""}`}
                            />
                          </motion.span>
                        </button>
                      </div>
                      <div className="-mt-4 rounded-t-2xl bg-zinc-50 px-4 pt-5">
                        <h4 className="text-2xl font-bold leading-tight">
                          {open.name}
                        </h4>
                        <p className="mt-1 text-xs font-medium">
                          {dollars(open.pricing)} · {open.cuisine}
                        </p>
                        <div className="mt-3 flex items-center gap-2">
                          <button
                            aria-label={`Upvote ${open.name}`}
                            aria-pressed={votes[open.id] === "up"}
                            onClick={() => vote(open, "up")}
                            className={`rounded-full p-2 ${votes[open.id] === "up" ? `${GREEN} text-white` : "bg-zinc-300 text-zinc-700"}`}
                          >
                            <ArrowUp className="h-4 w-4" />
                          </button>
                          <span className="w-8 text-center text-sm font-semibold tabular-nums">
                            {netVotes(open)}
                          </span>
                          <button
                            aria-label={`Downvote ${open.name}`}
                            aria-pressed={votes[open.id] === "down"}
                            onClick={() => vote(open, "down")}
                            className={`rounded-full p-2 ${votes[open.id] === "down" ? "bg-red-500 text-white" : "bg-zinc-300 text-zinc-700"}`}
                          >
                            <ArrowDown className="h-4 w-4" />
                          </button>
                        </div>
                        <button
                          onClick={() => {
                            flash(`Calling ${open.phone}…`);
                            log(
                              "Call to Order → opens the phone dialer (tel: link)",
                            );
                          }}
                          className={`mt-4 flex w-full items-center justify-center gap-2 rounded-md ${GREEN} py-2.5 text-sm font-semibold text-white`}
                        >
                          <Phone className="h-4 w-4" /> Call to Order
                        </button>
                        <button
                          onClick={() => setHoursOpen((v) => !v)}
                          aria-expanded={hoursOpen}
                          className="mt-4 flex w-full items-center justify-between border-t border-zinc-300 py-3 text-left"
                        >
                          <span>
                            <span className="block text-sm font-semibold">
                              Hours
                            </span>
                            <span className="text-xs text-zinc-500">
                              {hoursOpen
                                ? open.hours
                                : "Tap to view today's hours"}
                            </span>
                          </span>
                          <ChevronDown
                            className={`h-4 w-4 text-zinc-500 transition-transform ${hoursOpen ? "rotate-180" : ""}`}
                          />
                        </button>
                        <p className="border-t border-zinc-300 py-4 text-center text-sm italic text-zinc-600">
                          “{open.quote}”
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {/* ---------- Group order ---------- */}
                  {tab === "group" && (
                    <motion.div
                      key="group"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="px-4 pb-4 pt-5"
                    >
                      {!joined ? (
                        <div className="pt-10 text-center">
                          <div className="text-lg font-semibold">
                            Enter Group Code
                          </div>
                          <p className="mt-1 text-xs text-zinc-500">
                            Ask your office admin for the 5-digit code.
                          </p>
                          <input
                            value={code}
                            onChange={(e) => tryCode(e.target.value)}
                            inputMode="numeric"
                            maxLength={5}
                            aria-label="Group code"
                            placeholder="•••••"
                            className={`mt-6 w-full rounded-lg border-2 bg-zinc-50 py-3 text-center text-2xl font-bold tracking-[0.5em] outline-none ${
                              codeError
                                ? "border-red-400"
                                : "border-zinc-300 focus:border-[#2e7d32]"
                            }`}
                          />
                          {codeError && (
                            <p className="mt-2 text-xs font-medium text-red-500">
                              Invalid code. Please try again.
                            </p>
                          )}
                          <p className="mt-6 rounded-md bg-zinc-100 px-3 py-2 text-xs text-zinc-600">
                            Demo code:{" "}
                            <span className="font-bold">{GROUP_CODE}</span>
                          </p>
                        </div>
                      ) : (
                        <div>
                          <div className="text-lg font-semibold">
                            Acme Co. Lunch
                          </div>
                          <div className="mt-1 text-xs text-zinc-500">
                            Delivery Fri 12:00 PM · Order by Thu 5:00 PM
                          </div>

                          <div className="mt-4 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                            Today's restaurants
                          </div>
                          <div className="mt-2 space-y-2">
                            {CATERING.map((item) => (
                              <button
                                key={item.id}
                                disabled={!!placed}
                                onClick={() => setPick(item.id)}
                                aria-pressed={pick === item.id}
                                className={`flex w-full items-center justify-between rounded-lg border px-3 py-2 text-left text-sm transition-colors ${
                                  pick === item.id
                                    ? "border-[#2e7d32] bg-green-50"
                                    : "border-zinc-200"
                                } disabled:opacity-60`}
                              >
                                <span>
                                  <span className="block font-medium">
                                    {item.name}
                                  </span>
                                  <span className="text-xs text-zinc-500">
                                    {item.restaurant}
                                  </span>
                                </span>
                                <span className="text-xs font-semibold">
                                  {money(item.price)}
                                </span>
                              </button>
                            ))}
                          </div>

                          {!placed ? (
                            <button
                              disabled={!pick}
                              onClick={placeOrder}
                              className={`mt-4 w-full rounded-md ${GREEN} py-2.5 text-sm font-semibold text-white disabled:bg-zinc-300`}
                            >
                              {pick ? "Add my order" : "Pick an entree"}
                            </button>
                          ) : (
                            <p className="mt-4 flex items-center gap-2 rounded-md bg-green-50 px-3 py-2 text-xs font-medium text-green-800">
                              <Check className="h-4 w-4" /> Added! The organizer
                              gets the final order by email.
                            </p>
                          )}

                          <div className="mt-5 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                            Team orders
                          </div>
                          <ul className="mt-2 divide-y divide-zinc-100 text-sm">
                            {TEAM_ORDERS.map((o) => (
                              <li
                                key={o.userName}
                                className="flex justify-between py-2"
                              >
                                <span>
                                  <span className="font-medium">
                                    {o.userName}
                                  </span>{" "}
                                  <span className="text-xs text-zinc-500">
                                    {o.entree}
                                  </span>
                                </span>
                                <span className="text-xs">
                                  {money(o.price)}
                                </span>
                              </li>
                            ))}
                            {placed && (
                              <li className="flex justify-between py-2">
                                <span>
                                  <span className="font-medium">You</span>{" "}
                                  <span className="text-xs text-zinc-500">
                                    {placed.name}
                                  </span>
                                </span>
                                <span className="text-xs">
                                  {money(placed.price)}
                                </span>
                              </li>
                            )}
                          </ul>
                          <div className="mt-2 flex justify-between border-t border-zinc-200 pt-2 text-sm font-semibold">
                            <span>Total</span>
                            <span>{money(teamTotal)}</span>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* ---------- Profile ---------- */}
                  {tab === "profile" && (
                    <motion.div
                      key="profile"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="pb-4 pt-5"
                    >
                      <div className="px-4 text-lg font-semibold">Profile</div>
                      <div className="mt-6 flex flex-col items-center">
                        <Gem className="h-10 w-10" aria-hidden="true" />
                        <div className="mt-2 text-sm">Demo User</div>
                        <div className="mt-2 text-sm font-semibold text-[#2e7d32]">
                          Edit Account
                        </div>
                      </div>
                      <button
                        onClick={() => setShowFavs((v) => !v)}
                        aria-expanded={showFavs}
                        className="mt-6 flex w-full items-center gap-3 px-4 py-3 text-left text-sm"
                      >
                        <Heart className="h-5 w-5" />
                        <span className="flex-1">
                          Favorite Restaurants ({favorites.length})
                        </span>
                        <ChevronRight
                          className={`h-4 w-4 transition-transform ${showFavs ? "rotate-90" : ""}`}
                        />
                      </button>
                      {showFavs && (
                        <ul className="px-4 pb-2 text-sm text-zinc-700">
                          {favorites.length === 0 && (
                            <li className="py-1 text-xs text-zinc-500">
                              Tap the heart on a restaurant to save it.
                            </li>
                          )}
                          {favorites.map((id) => {
                            const r = RESTAURANTS.find((x) => x.id === id)!;
                            return (
                              <li
                                key={id}
                                className="flex justify-between py-1"
                              >
                                <span>{r.name}</span>
                                <span className="text-xs text-zinc-500">
                                  {r.cuisine}
                                </span>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                      <div className="px-4 pt-4 text-sm font-medium">About</div>
                      {[
                        { icon: Share2, label: "Share Hidden Gems" },
                        { icon: CircleHelp, label: "Help" },
                        { icon: Info, label: "About" },
                      ].map(({ icon: Icon, label }) => (
                        <div
                          key={label}
                          className="flex items-center gap-3 px-4 py-3 text-sm text-zinc-700"
                        >
                          <Icon className="h-5 w-5" />
                          <span className="flex-1">{label}</span>
                          <ChevronRight className="h-4 w-4" />
                        </div>
                      ))}
                      <div className="px-4 pt-6">
                        <button
                          onClick={resetDemo}
                          className="w-full rounded-md bg-[#f0736a] py-2.5 text-sm font-semibold text-white"
                        >
                          Reset demo
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Tab bar */}
              <div
                role="tablist"
                className="absolute inset-x-0 bottom-0 flex h-[60px] border-t border-zinc-200 bg-white"
              >
                {[
                  {
                    id: "leaderboard" as Tab,
                    label: "Leaderboard",
                    icon: Trophy,
                  },
                  { id: "group" as Tab, label: "Group Order", icon: Users },
                  { id: "profile" as Tab, label: "Profile", icon: User },
                ].map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    role="tab"
                    aria-selected={tab === id}
                    onClick={() => {
                      setTab(id);
                      if (id !== "leaderboard") setOpenId(null);
                      log(`Navigate → ${label}`);
                    }}
                    className={`flex flex-1 flex-col items-center justify-center gap-0.5 text-[11px] font-medium ${
                      tab === id ? "text-[#2e7d32]" : "text-zinc-500"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {label}
                  </button>
                ))}
              </div>

              <AnimatePresence>
                {toast && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    role="status"
                    className="absolute inset-x-6 bottom-20 rounded-full bg-zinc-900 px-4 py-2 text-center text-xs font-medium text-white shadow-lg"
                  >
                    {toast}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Under the hood */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-secondary))]/40 p-5">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[rgb(var(--text-secondary))]">
              Under the hood
            </h4>
            <p className="mt-1 text-xs text-[rgb(var(--text-secondary))]">
              What the app does behind each tap.
            </p>
            <ul className="mt-4 space-y-2 font-mono text-xs" aria-live="polite">
              <AnimatePresence initial={false}>
                {events.map((e, i) => (
                  <motion.li
                    layout
                    key={`${e}-${events.length - i}`}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: i === 0 ? 1 : 0.6, x: 0 }}
                    className="flex gap-2 text-[rgb(var(--text-primary))]"
                  >
                    <span className="text-[rgb(var(--accent))]">›</span>
                    <span>{e}</span>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </div>

          <ul className="grid gap-3 text-sm text-[rgb(var(--text-secondary))] sm:grid-cols-2">
            {[
              "Leaderboard ranked by net votes, with cuisine filters, search and an images toggle",
              "Restaurant pages with favorites, directions and one-tap call-to-order",
              "Company group orders: join by code, pick an entree, order by deadline",
              "Owner hub for restaurants, plus Square-backed menus for online ordering",
            ].map((t) => (
              <li
                key={t}
                className="flex gap-2 rounded-xl border border-[rgb(var(--border))] p-3"
              >
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function ArchitectureDiagram() {
  const [flowId, setFlowId] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const flow = FLOWS.find((f) => f.id === flowId) ?? null;

  const node = (id: string) => {
    const component = ARCH_COMPONENTS.find((c) => c.id === id)!;
    return (
      <ArchitectureNode
        key={id}
        component={component}
        isHighlighted={hovered === id || Boolean(flow?.path.includes(id))}
        onHover={setHovered}
      />
    );
  };

  const line = <div className="mx-auto h-8 w-0.5 bg-[rgb(var(--border))]" />;

  return (
    <section className="space-y-8">
      <div>
        <h3 className="font-display text-2xl font-bold text-[rgb(var(--text-primary))]">
          System Architecture
        </h3>
        <p className="mt-2 max-w-2xl text-[rgb(var(--text-secondary))]">
          A serverless AWS backend behind a React Native app. Pick a flow to see
          which pieces it touches.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <button
          onClick={() => setFlowId(null)}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
            flowId === null
              ? "bg-[rgb(var(--accent))] text-white"
              : "bg-[rgb(var(--bg-secondary))] text-[rgb(var(--text-secondary))]"
          }`}
        >
          All Components
        </button>
        {FLOWS.map((f) => (
          <button
            key={f.id}
            onClick={() => setFlowId(f.id)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
              flowId === f.id
                ? "bg-[rgb(var(--accent))] text-white"
                : "bg-[rgb(var(--bg-secondary))] text-[rgb(var(--text-secondary))]"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {flow && (
          <motion.p
            key={flow.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mx-auto max-w-2xl text-center text-sm text-[rgb(var(--text-secondary))]"
          >
            {flow.description}
          </motion.p>
        )}
      </AnimatePresence>

      <div className="mx-auto max-w-2xl rounded-3xl border border-[rgb(var(--border))] p-6 md:p-8">
        <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-[rgb(var(--text-secondary))]">
          Client
        </h4>
        <div className="mx-auto max-w-sm">{node("app")}</div>
        {line}
        <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-[rgb(var(--text-secondary))]">
          Auth &amp; API
        </h4>
        <div className="grid gap-3 sm:grid-cols-2">
          {node("cognito")}
          {node("appsync")}
        </div>
        {line}
        <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-[rgb(var(--text-secondary))]">
          Compute &amp; Integrations
        </h4>
        <div className="grid gap-3 sm:grid-cols-2">
          {node("lambda")}
          {node("square")}
          {node("email")}
        </div>
        {line}
        <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-[rgb(var(--text-secondary))]">
          Data &amp; Observability
        </h4>
        <div className="grid gap-3 sm:grid-cols-2">
          {node("dynamo")}
          {node("cloudwatch")}
        </div>
      </div>
    </section>
  );
}
