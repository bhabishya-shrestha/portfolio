import { ArrowUpRight, Clock } from "lucide-react";
import type { Note } from "../data/notes";

interface NoteCardProps {
  note: Note;
}

export default function NoteCard({ note }: NoteCardProps) {
  return (
    <a
      href={note.link || "#"}
      className="group relative flex flex-col justify-between rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-secondary))]/30 p-6 transition-all hover:bg-[rgb(var(--bg-secondary))]/50 hover:shadow-md hover:scale-[1.02]"
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-[rgb(var(--text-secondary))]">
            {note.date}
          </span>
          <div className="flex items-center text-xs text-[rgb(var(--text-secondary))]">
            <Clock className="mr-1 h-3 w-3" />
            {note.readTime}
          </div>
        </div>

        <h3 className="mb-3 text-lg font-bold leading-tight text-[rgb(var(--text-primary))] group-hover:text-[rgb(var(--accent))] transition-colors">
          {note.title}
          <ArrowUpRight className="inline-block ml-2 h-4 w-4 opacity-0 -translate-y-1 translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0" />
        </h3>

        <p className="mb-6 text-sm leading-relaxed text-[rgb(var(--text-secondary))]">
          {note.abstract}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {note.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-[rgb(var(--accent))]/10 px-2.5 py-0.5 text-xs font-medium text-[rgb(var(--accent))]"
          >
            {tag}
          </span>
        ))}
      </div>
    </a>
  );
}
