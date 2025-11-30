import React from "react";
import { motion } from "framer-motion";
import {
  Home,
  Book,
  Gamepad2,
  Youtube,
  Terminal,
  ArrowDownUp,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

interface JournalLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
  sortOrder: "newest" | "oldest";
  onSortChange: () => void;
}

export default function JournalLayout({
  children,
  activeTab,
  onTabChange,
  sortOrder,
  onSortChange,
}: JournalLayoutProps) {
  const navigate = useNavigate();

  const navItems = [
    { id: "all", icon: Terminal, label: "All" },
    { id: "engineering", icon: Terminal, label: "Engineering" },
    { id: "library", icon: Book, label: "Library" },
    { id: "gaming", icon: Gamepad2, label: "Gaming" },
    { id: "media", icon: Youtube, label: "Media" },
  ];

  return (
    <div className="min-h-screen w-full bg-[rgb(var(--bg-primary))] text-[rgb(var(--text-primary))] transition-colors duration-300 flex flex-col md:flex-row overflow-hidden">
      {/* Slim Sidebar */}
      <motion.aside
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="z-50 flex w-full flex-row items-center justify-between border-b border-[rgb(var(--border))] bg-[rgb(var(--bg-primary))]/80 p-4 backdrop-blur-md md:h-screen md:w-20 md:flex-col md:border-b-0 md:border-r md:py-8"
      >
        <button
          onClick={() => navigate("/")}
          className="group flex h-10 w-10 items-center justify-center rounded-xl bg-[rgb(var(--bg-secondary))] text-[rgb(var(--text-secondary))] transition-all hover:bg-[rgb(var(--accent))] hover:text-white"
          title="Back to Portfolio"
        >
          <Home className="h-5 w-5" />
        </button>

        <div className="hidden md:flex flex-col gap-6">
          <div className="h-px w-8 bg-[rgb(var(--border))]" />
          {/* Vertical Text */}
          <div className="writing-vertical-rl text-xs font-mono uppercase tracking-widest text-[rgb(var(--text-secondary))] opacity-50">
            Electronic Journal
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <ThemeToggle className="static p-2 transform-none shadow-none hover:scale-105" />
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative">
        {/* Header / Filter Bar */}
        <header className="sticky top-0 z-40 flex flex-col gap-4 border-b border-[rgb(var(--border))] bg-[rgb(var(--bg-primary))]/80 px-4 py-4 backdrop-blur-md md:flex-row md:items-center md:justify-between md:px-12">
          <div className="flex items-center justify-between md:justify-start gap-2">
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold tracking-tight font-display md:text-xl">
                Notes & Interests
              </h1>
              <span className="rounded-full bg-[rgb(var(--accent))]/10 px-2 py-0.5 text-xs font-mono text-[rgb(var(--accent))]">
                v2.1
              </span>
            </div>

            {/* Mobile Sort Button (Visible only on small screens) */}
            <button
              onClick={onSortChange}
              className="flex md:hidden items-center justify-center rounded-lg bg-[rgb(var(--bg-secondary))] p-2 text-[rgb(var(--text-secondary))] transition-all hover:text-[rgb(var(--text-primary))]"
              title="Sort"
            >
              <ArrowDownUp
                className={`h-4 w-4 transition-transform ${sortOrder === "oldest" ? "rotate-180" : ""}`}
              />
            </button>
          </div>

          <div className="flex items-center gap-4 overflow-x-auto no-scrollbar pb-1 md:pb-0">
            <nav className="flex gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onTabChange(item.id)}
                    className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition-all whitespace-nowrap ${
                      isActive
                        ? "bg-[rgb(var(--text-primary))] text-[rgb(var(--bg-primary))]"
                        : "text-[rgb(var(--text-secondary))] hover:bg-[rgb(var(--bg-secondary))] hover:text-[rgb(var(--text-primary))]"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className={isActive ? "inline" : "hidden sm:inline"}>
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </nav>

            <div className="hidden md:block h-6 w-px bg-[rgb(var(--border))]" />

            {/* Desktop Sort Button */}
            <button
              onClick={onSortChange}
              className="hidden md:flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium text-[rgb(var(--text-secondary))] hover:bg-[rgb(var(--bg-secondary))] hover:text-[rgb(var(--text-primary))] transition-all"
              title={`Sort by Date (${sortOrder === "newest" ? "Newest First" : "Oldest First"})`}
            >
              <ArrowDownUp
                className={`h-4 w-4 transition-transform ${sortOrder === "oldest" ? "rotate-180" : ""}`}
              />
              <span>{sortOrder === "newest" ? "Newest" : "Oldest"}</span>
            </button>
          </div>
        </header>

        <div className="p-6 md:p-12 max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
