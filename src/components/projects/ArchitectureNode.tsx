import { motion } from "framer-motion";
import { Globe } from "lucide-react";

export interface ArchitectureComponent {
  id: string;
  title: string;
  desc: string;
  icon: React.ElementType;
  category: string;
  url?: string;
}

interface ArchitectureNodeProps {
  component: ArchitectureComponent;
  isHighlighted: boolean;
  onHover: (id: string | null) => void;
  compact?: boolean;
}

export function ArchitectureNode({
  component,
  isHighlighted,
  onHover,
  compact = false,
}: ArchitectureNodeProps) {
  const isClient = component.category === "client";
  const isService = component.category === "service";
  const isDatabase = component.category === "database";


  const baseColor = isClient
    ? "rgb(59, 130, 246)" // Blue-500
    : isService
    ? "rgb(249, 115, 22)" // Orange-500
    : isDatabase
    ? "rgb(34, 197, 94)" // Green-500
    : "rgb(168, 85, 247)"; // Purple-500

  const Component = component.url ? motion.a : motion.div;

  const content = (
    <div
      className={`relative flex items-center gap-3 rounded-xl border p-3 transition-all duration-300 ${
        isHighlighted
          ? "bg-[rgb(var(--bg-secondary))] shadow-lg scale-105 border-[rgb(var(--accent))]"
          : "bg-[rgb(var(--bg-secondary))]/40 border-[rgb(var(--border))] hover:border-[rgb(var(--accent))]/50"
      }`}
      style={{
        borderColor: isHighlighted ? baseColor : undefined,
        boxShadow: isHighlighted ? `0 0 20px ${baseColor}20` : undefined,
      }}
    >
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors duration-300`}
        style={{
          backgroundColor: isHighlighted ? `${baseColor}20` : "rgba(128,128,128,0.1)",
          color: isHighlighted ? baseColor : "rgb(var(--text-secondary))",
        }}
      >
        <component.icon className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <h4
            className={`text-sm font-bold transition-colors duration-300 truncate ${
              isHighlighted ? "text-[rgb(var(--text-primary))]" : "text-[rgb(var(--text-secondary))]"
            }`}
          >
            {component.title}
          </h4>
          {component.url && (
            <Globe className="h-3 w-3 text-[rgb(var(--text-secondary))] opacity-50" />
          )}
        </div>
        {!compact && (
          <p className="text-xs text-[rgb(var(--text-secondary))] truncate opacity-80">
            {component.desc}
          </p>
        )}
      </div>
    </div>
  );

  return (
    <Component
      href={component.url}
      target={component.url ? "_blank" : undefined}
      rel={component.url ? "noopener noreferrer" : undefined}
      className={`relative group cursor-pointer ${compact ? "w-full" : "w-64"}`}
      onMouseEnter={() => onHover(component.id)}
      onMouseLeave={() => onHover(null)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {content}
    </Component>
  );
}
