import React from "react";
import ThemeToggle from "./ThemeToggle";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen w-full bg-[rgb(var(--bg-primary))] text-[rgb(var(--text-primary))] transition-colors duration-300">
      <ThemeToggle />
      <div className="mx-auto max-w-screen-xl px-6 py-12 font-sans md:px-12 md:py-20 lg:px-24 lg:py-0">
        <div className="lg:flex lg:justify-between lg:gap-4">{children}</div>
      </div>
    </div>
  );
}
