import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cloud,
  Layout,
  HardDrive,
  BarChart3,
  Zap,
  Wallet,
  TrendingUp,
  DollarSign,
  Sun,
  Moon,
} from "lucide-react";
import { ArchitectureNode } from "./ArchitectureNode";

// Mock Data for Dashboard
const CHART_DATA = [
  { month: "Jan", value: 45000 },
  { month: "Feb", value: 48200 },
  { month: "Mar", value: 47500 },
  { month: "Apr", value: 52000 },
  { month: "May", value: 55400 },
  { month: "Jun", value: 59000 },
];

const TRANSACTIONS = [
  {
    id: 1,
    title: "Apple Store",
    category: "Tech",
    amount: -1299.0,
    date: "Today",
    icon: ShoppingBagIcon,
  },
  {
    id: 2,
    title: "Salary Deposit",
    category: "Income",
    amount: 4500.0,
    date: "Yesterday",
    icon: DollarSign,
  },
  {
    id: 3,
    title: "Whole Foods",
    category: "Groceries",
    amount: -142.5,
    date: "Yesterday",
    icon: ShoppingCartIcon,
  },
];

function ShoppingBagIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function ShoppingCartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}

export default function AuraFinanceExperience() {
  return (
    <div className="w-full space-y-16 py-8">
      <DashboardSimulation />

      <ArchitectureDiagram />
    </div>
  );
}

function DashboardSimulation() {
  const [isDark, setIsDark] = useState(true);
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  // Calculate chart path
  const maxVal = Math.max(...CHART_DATA.map((d) => d.value));
  const minVal = Math.min(...CHART_DATA.map((d) => d.value));
  const range = maxVal - minVal;

  const points = CHART_DATA.map((d, i) => {
    const x = (i / (CHART_DATA.length - 1)) * 100;
    const y = 100 - ((d.value - minVal) / range) * 80 - 10; // 10% padding top/bottom
    return `${x},${y}`;
  }).join(" ");

  return (
    <section>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h3 className="font-display text-2xl font-bold text-[rgb(var(--text-primary))]">
            Interactive Dashboard
          </h3>
          <p className="text-[rgb(var(--text-secondary))] mt-2">
            Experience the responsive, theme-aware UI design.
          </p>
        </div>
      </div>

      <div
        className={`relative overflow-hidden rounded-3xl border transition-colors duration-500 ${
          isDark
            ? "bg-slate-900 border-slate-800 text-white"
            : "bg-gray-50 border-gray-200 text-gray-900"
        }`}
      >
        {/* App Header */}
        <div
          className={`flex items-center justify-between border-b px-6 py-4 ${
            isDark
              ? "border-slate-800 bg-slate-900"
              : "border-gray-200 bg-white"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500 text-white">
              <Wallet className="h-5 w-5" />
            </div>
            <span className="font-bold tracking-tight">Aura</span>
          </div>
          <button
            onClick={() => setIsDark(!isDark)}
            className={`rounded-full p-2 transition-colors ${
              isDark
                ? "bg-slate-800 hover:bg-slate-700"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {isDark ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* App Content */}
        <div className="p-6 md:p-8">
          {/* Net Worth Card */}
          <div className="grid gap-8 md:grid-cols-[1.5fr_1fr]">
            <div
              className={`rounded-2xl p-6 ${
                isDark ? "bg-slate-800/50" : "bg-white shadow-sm"
              }`}
            >
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p
                    className={`text-sm font-medium ${isDark ? "text-slate-400" : "text-gray-500"}`}
                  >
                    Total Net Worth
                  </p>
                  <h4 className="text-3xl font-bold">$59,000.00</h4>
                </div>
                <div className="flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-1 text-sm font-medium text-green-500">
                  <TrendingUp className="h-3 w-3" />
                  <span>+12.5%</span>
                </div>
              </div>

              {/* Custom Chart */}
              <div className="relative h-48 w-full">
                <svg
                  className="h-full w-full overflow-visible"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  {/* Gradient Definition */}
                  <defs>
                    <linearGradient
                      id="chartGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* Area */}
                  <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    d={`M0,100 ${points
                      .split(" ")
                      .map((p) => `L${p}`)
                      .join(" ")} L100,100 Z`}
                    fill="url(#chartGradient)"
                  />

                  {/* Line */}
                  <motion.polyline
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    points={points}
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Interactive Points */}
                  {CHART_DATA.map((d, i) => {
                    const [x, y] = points.split(" ")[i].split(",");
                    return (
                      <g key={i}>
                        <circle
                          cx={x}
                          cy={y}
                          r="6" // Invisible hit area
                          fill="transparent"
                          onMouseEnter={() => setHoveredPoint(i)}
                          onMouseLeave={() => setHoveredPoint(null)}
                          className="cursor-pointer"
                        />
                        <AnimatePresence>
                          {hoveredPoint === i && (
                            <motion.g
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0 }}
                            >
                              <circle
                                cx={x}
                                cy={y}
                                r="3"
                                fill="#3b82f6"
                                stroke="white"
                                strokeWidth="1"
                              />
                              <foreignObject
                                x={parseFloat(x) - 15}
                                y={parseFloat(y) - 20}
                                width="60"
                                height="30"
                              >
                                <div
                                  className={`rounded px-2 py-1 text-[8px] font-bold shadow-lg text-center ${
                                    isDark
                                      ? "bg-slate-700 text-white"
                                      : "bg-gray-800 text-white"
                                  }`}
                                >
                                  ${(d.value / 1000).toFixed(1)}k
                                </div>
                              </foreignObject>
                            </motion.g>
                          )}
                        </AnimatePresence>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="space-y-4">
              <h5
                className={`text-sm font-bold uppercase tracking-wider ${isDark ? "text-slate-500" : "text-gray-400"}`}
              >
                Recent Activity
              </h5>
              <div className="space-y-3">
                {TRANSACTIONS.map((tx) => (
                  <motion.div
                    key={tx.id}
                    whileHover={{ scale: 1.02, x: 4 }}
                    className={`flex items-center justify-between rounded-xl p-3 transition-colors ${
                      isDark
                        ? "bg-slate-800/50 hover:bg-slate-800"
                        : "bg-white hover:bg-gray-50 shadow-sm"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`rounded-full p-2 ${
                          isDark
                            ? "bg-slate-700 text-slate-300"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        <tx.icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-bold text-sm">{tx.title}</p>
                        <p
                          className={`text-xs ${isDark ? "text-slate-400" : "text-gray-500"}`}
                        >
                          {tx.category}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`font-bold text-sm ${
                          tx.amount > 0
                            ? "text-green-500"
                            : isDark
                              ? "text-white"
                              : "text-gray-900"
                        }`}
                      >
                        {tx.amount > 0 ? "+" : ""}
                        {tx.amount.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </p>
                      <p
                        className={`text-xs ${isDark ? "text-slate-400" : "text-gray-500"}`}
                      >
                        {tx.date}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



function ArchitectureDiagram() {
  const [selectedFlow, setSelectedFlow] = useState<string | null>(null);
  const [hoveredComponent, setHoveredComponent] = useState<string | null>(null);

  const flows = [
    {
      id: "offline",
      label: "Offline Transaction",
      path: ["frontend", "zustand", "dexie"],
      description: "Instant local updates via IndexedDB",
    },
    {
      id: "sync",
      label: "Cloud Sync",
      path: ["dexie", "firebase"],
      description: "Background synchronization when online",
    },
    {
      id: "analytics",
      label: "Analytics View",
      path: ["dexie", "recharts", "frontend"],
      description: "Real-time visualization of local data",
    },
  ];

  const components = [
    {
      id: "frontend",
      title: "React Frontend",
      desc: "Vite + Tailwind CSS",
      icon: Layout,
      category: "client",
      url: "https://react.dev",
    },
    {
      id: "zustand",
      title: "Zustand Store",
      desc: "State Management",
      icon: Zap,
      category: "client",
      url: "https://zustand-demo.pmnd.rs",
    },
    {
      id: "dexie",
      title: "Dexie.js",
      desc: "IndexedDB Wrapper",
      icon: HardDrive,
      category: "database",
      url: "https://dexie.org",
    },
    {
      id: "firebase",
      title: "Firebase",
      desc: "Auth & Firestore",
      icon: Cloud,
      category: "service",
      url: "https://firebase.google.com",
    },
    {
      id: "recharts",
      title: "Recharts",
      desc: "Data Visualization",
      icon: BarChart3,
      category: "client",
      url: "https://recharts.org",
    },
  ];

  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-2xl font-bold text-[rgb(var(--text-primary))]">
            System Architecture
          </h3>
          <p className="text-[rgb(var(--text-secondary))] mt-2 max-w-xl">
            Explore the local-first architecture that powers Aura Finance.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 justify-center mb-8">
        <button
          onClick={() => setSelectedFlow(null)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            selectedFlow === null
              ? "bg-[rgb(var(--accent))] text-white"
              : "bg-[rgb(var(--bg-secondary))] text-[rgb(var(--text-secondary))] hover:bg-[rgb(var(--bg-secondary))]/80"
          }`}
        >
          All Components
        </button>
        {flows.map((flow) => (
          <button
            key={flow.id}
            onClick={() => setSelectedFlow(flow.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedFlow === flow.id
                ? "bg-[rgb(var(--accent))] text-white"
                : "bg-[rgb(var(--bg-secondary))] text-[rgb(var(--text-secondary))] hover:bg-[rgb(var(--bg-secondary))]/80"
            }`}
          >
            {flow.label}
          </button>
        ))}
      </div>

      {/* Interactive Architecture Diagram */}
      <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-secondary))]/20 p-4 md:p-8">
        {/* Flow Selector - Sticky on Mobile */}
        <div className="sticky top-0 z-20 bg-[rgb(var(--bg-secondary))] md:bg-transparent -mx-4 px-4 py-4 md:p-0 md:static border-b md:border-0 border-[rgb(var(--border))] mb-6 md:mb-8 backdrop-blur-md md:backdrop-blur-none bg-opacity-90 md:bg-opacity-100">
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setSelectedFlow(null)}
              className={`px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-all ${
                selectedFlow === null
                  ? "bg-[rgb(var(--accent))] text-white shadow-lg shadow-[rgb(var(--accent))]/20"
                  : "bg-[rgb(var(--bg-primary))] md:bg-[rgb(var(--bg-secondary))] text-[rgb(var(--text-secondary))] hover:bg-[rgb(var(--bg-secondary))]/80 border border-[rgb(var(--border))]"
              }`}
            >
              All
            </button>
            {flows.map((flow) => (
              <button
                key={flow.id}
                onClick={() => setSelectedFlow(flow.id)}
                className={`px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-all ${
                  selectedFlow === flow.id
                    ? "bg-[rgb(var(--accent))] text-white shadow-lg shadow-[rgb(var(--accent))]/20"
                    : "bg-[rgb(var(--bg-primary))] md:bg-[rgb(var(--bg-secondary))] text-[rgb(var(--text-secondary))] hover:bg-[rgb(var(--bg-secondary))]/80 border border-[rgb(var(--border))]"
                }`}
              >
                {flow.label}
              </button>
            ))}
          </div>
          {/* Mobile Helper Text */}
          <p className="md:hidden text-[10px] text-center text-[rgb(var(--text-secondary))] mt-2 opacity-80">
            Select a flow to highlight components
          </p>
        </div>

        {/* Desktop View - Full Layered Diagram */}
        <div className="hidden md:block overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Client Layer */}
            <div className="mb-8">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[rgb(var(--text-secondary))] mb-4">
                Client Layer
              </h4>
              <div className="flex justify-center gap-8">
                <ArchitectureNode
                  component={components.find((c) => c.id === "frontend")!}
                  isHighlighted={
                    hoveredComponent === "frontend" ||
                    Boolean(selectedFlow !== null &&
                      flows
                        .find((f) => f.id === selectedFlow)
                        ?.path.includes("frontend"))
                  }
                  onHover={setHoveredComponent}
                />
                <ArchitectureNode
                  component={components.find((c) => c.id === "recharts")!}
                  isHighlighted={
                    hoveredComponent === "recharts" ||
                    Boolean(selectedFlow !== null &&
                      flows
                        .find((f) => f.id === selectedFlow)
                        ?.path.includes("recharts"))
                  }
                  onHover={setHoveredComponent}
                />
              </div>
            </div>

            {/* Connection Line */}
            <div className="flex justify-center mb-8">
              <div className="h-12 w-0.5 bg-[rgb(var(--border))]" />
            </div>

            {/* State Layer */}
            <div className="mb-8">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[rgb(var(--text-secondary))] mb-4">
                State Management
              </h4>
              <div className="flex justify-center">
                <ArchitectureNode
                  component={components.find((c) => c.id === "zustand")!}
                  isHighlighted={
                    hoveredComponent === "zustand" ||
                    Boolean(selectedFlow !== null &&
                      flows
                        .find((f) => f.id === selectedFlow)
                        ?.path.includes("zustand"))
                  }
                  onHover={setHoveredComponent}
                />
              </div>
            </div>

            {/* Connection Line */}
            <div className="flex justify-center mb-8">
              <div className="h-12 w-0.5 bg-[rgb(var(--border))]" />
            </div>

            {/* Local Data Layer */}
            <div className="mb-8">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[rgb(var(--text-secondary))] mb-4">
                Local Data Layer
              </h4>
              <div className="flex justify-center">
                <ArchitectureNode
                  component={components.find((c) => c.id === "dexie")!}
                  isHighlighted={
                    hoveredComponent === "dexie" ||
                    Boolean(selectedFlow !== null &&
                      flows
                        .find((f) => f.id === selectedFlow)
                        ?.path.includes("dexie"))
                  }
                  onHover={setHoveredComponent}
                />
              </div>
            </div>

            {/* Connection Line */}
            <div className="flex justify-center mb-8">
              <div className="h-12 w-0.5 bg-[rgb(var(--border))]" />
            </div>

            {/* Cloud Layer */}
            <div className="mb-8">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[rgb(var(--text-secondary))] mb-4">
                Cloud Layer
              </h4>
              <div className="flex justify-center">
                <ArchitectureNode
                  component={components.find((c) => c.id === "firebase")!}
                  isHighlighted={
                    hoveredComponent === "firebase" ||
                    Boolean(selectedFlow !== null &&
                      flows
                        .find((f) => f.id === selectedFlow)
                        ?.path.includes("firebase"))
                  }
                  onHover={setHoveredComponent}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile View - Layered List */}
        <div className="md:hidden space-y-8">
          {/* Client Layer */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-[rgb(var(--text-secondary))] border-b border-[rgb(var(--border))] pb-2">
              Client Layer
            </h4>
            <div className="grid grid-cols-1 gap-3">
              {["frontend", "recharts"].map((id) => {
                const component = components.find((c) => c.id === id)!;
                const isHighlighted = hoveredComponent === id ||
                  Boolean(selectedFlow !== null &&
                    flows
                      .find((f) => f.id === selectedFlow)
                      ?.path.includes(id));
                
                if (selectedFlow && !isHighlighted) return null;

                return (
                  <ArchitectureNode
                    key={id}
                    component={component}
                    isHighlighted={isHighlighted}
                    onHover={setHoveredComponent}
                    compact={false}
                  />
                );
              })}
              {!selectedFlow && null}
            </div>

          </div>

          {/* State Layer */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-[rgb(var(--text-secondary))] border-b border-[rgb(var(--border))] pb-2">
              State Management
            </h4>
            <ArchitectureNode
              component={components.find((c) => c.id === "zustand")!}
              isHighlighted={
                hoveredComponent === "zustand" ||
                Boolean(selectedFlow !== null &&
                  flows
                    .find((f) => f.id === selectedFlow)
                    ?.path.includes("zustand"))
              }
              onHover={setHoveredComponent}
              compact={false}
            />
          </div>

          {/* Local Data Layer */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-[rgb(var(--text-secondary))] border-b border-[rgb(var(--border))] pb-2">
              Local Data Layer
            </h4>
            <ArchitectureNode
              component={components.find((c) => c.id === "dexie")!}
              isHighlighted={
                hoveredComponent === "dexie" ||
                Boolean(selectedFlow !== null &&
                  flows
                    .find((f) => f.id === selectedFlow)
                    ?.path.includes("dexie"))
              }
              onHover={setHoveredComponent}
              compact={false}
            />
          </div>

          {/* Cloud Layer */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-[rgb(var(--text-secondary))] border-b border-[rgb(var(--border))] pb-2">
              Cloud Layer
            </h4>
            <ArchitectureNode
              component={components.find((c) => c.id === "firebase")!}
              isHighlighted={
                hoveredComponent === "firebase" ||
                Boolean(selectedFlow !== null &&
                  flows
                    .find((f) => f.id === selectedFlow)
                    ?.path.includes("firebase"))
              }
              onHover={setHoveredComponent}
              compact={false}
            />
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-sm justify-center md:justify-start">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500/20 border border-blue-500/50" />
          <span className="text-[rgb(var(--text-secondary))]">Client</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
          <span className="text-[rgb(var(--text-secondary))]">Databases</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-orange-500/20 border border-orange-500/50" />
          <span className="text-[rgb(var(--text-secondary))]">Services</span>
        </div>
      </div>
    </section>
  );
}
