import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NoteCard from "./NoteCard";
import ArticleModal from "./ArticleModal";
import type { Book, Game, Channel } from "../data/personal";
import type { Note } from "../data/notes";
import { BookOpen, Gamepad2, Youtube, ArrowUpRight, Trophy, Clock } from "lucide-react";

export default function JournalGrid({
  items,
}: {
  items: (Note | Book | Game | Channel)[];
}) {
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const handleItemClick = (item: Note | Book | Game | Channel) => {
    if ("takes" in item) {
      setSelectedNote(item as Note);
    } else if ("review" in item && (item as Book).review) {
      const book = item as Book;
      setSelectedNote({
        id: `book-${book.id}`,
        title: `${book.title} — Review & Reflection`,
        date: book.date,
        isoDate: book.date,
        readTime: "5 min reflection",
        abstract: book.review?.summary || `Notes & takeaways on ${book.title} by ${book.author}.`,
        tags: ["Book Review", book.status, book.author],
        externalLink: book.link,
        takes: book.review?.notesMarkdown,
      });
    } else if (item.link) {
      window.open(item.link, "_blank");
    }
  };

  return (
    <>
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        <AnimatePresence mode="popLayout">
          {items.map((item) => {
            let uniqueKey = item.id;
            if ("readTime" in item) uniqueKey = `note-${item.id}`;
            else if ("author" in item) uniqueKey = `book-${item.id}`;
            else if ("platform" in item) uniqueKey = `game-${item.id}`;
            else if ("topic" in item) uniqueKey = `channel-${item.id}`;

            return (
              <motion.div
                key={uniqueKey}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="break-inside-avoid cursor-pointer"
                onClick={() => handleItemClick(item)}
              >
                {"readTime" in item ? (
                  <NoteCard note={item as Note} />
                ) : "author" in item ? (
                  <div className="group relative overflow-hidden rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-secondary))]/30 p-6 transition-all hover:border-[rgb(var(--accent))]/50 hover:shadow-lg hover:shadow-[rgb(var(--accent))]/5">
                    <div className="flex items-start justify-between">
                      <div className="rounded-lg bg-emerald-500/10 p-2 text-emerald-500">
                        <BookOpen className="h-6 w-6" />
                      </div>
                      {item.review ? (
                        <span className="text-xs font-mono font-medium text-[rgb(var(--accent))] flex items-center gap-1">
                          Read Review →
                        </span>
                      ) : item.link ? (
                        <ArrowUpRight className="h-4 w-4 text-[rgb(var(--text-secondary))] opacity-0 transition-opacity group-hover:opacity-100" />
                      ) : null}
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-[rgb(var(--text-primary))] group-hover:text-[rgb(var(--accent))] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[rgb(var(--text-secondary))]">
                      {item.author}
                    </p>
                    {item.review && (
                      <p className="mt-3 text-xs leading-relaxed text-[rgb(var(--text-secondary))] line-clamp-2">
                        {item.review.summary}
                      </p>
                    )}
                    <div className="mt-4 flex items-center gap-2">
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                          item.status === "Reading"
                            ? "bg-emerald-500/10 text-emerald-500"
                            : item.status === "Read"
                              ? "bg-blue-500/10 text-blue-500"
                              : "bg-amber-500/10 text-amber-500"
                        }`}
                      >
                        {item.status}
                      </span>
                      {item.review && (
                        <span className="inline-flex items-center rounded-full bg-[rgb(var(--accent))]/10 px-2 py-1 text-xs font-medium text-[rgb(var(--accent))]">
                          Interactive Reflection
                        </span>
                      )}
                    </div>
                  </div>
                ) : "platform" in item ? (
                  <div className="group relative overflow-hidden rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-secondary))]/30 p-6 transition-all hover:border-[rgb(var(--accent))]/50 hover:shadow-lg hover:shadow-[rgb(var(--accent))]/5">
                    <div className="flex items-start justify-between">
                      <div className="rounded-lg bg-purple-500/10 p-2 text-purple-500">
                        <Gamepad2 className="h-6 w-6" />
                      </div>
                      {item.link && (
                        <ArrowUpRight className="h-4 w-4 text-[rgb(var(--text-secondary))] opacity-0 transition-opacity group-hover:opacity-100" />
                      )}
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-[rgb(var(--text-primary))]">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-mono font-medium uppercase tracking-wider text-[rgb(var(--accent))]">
                        {item.platform}
                      </span>
                      {item.hoursPlayed !== undefined && (
                        <span className="text-xs text-[rgb(var(--text-secondary))] flex items-center gap-1">
                          • <Clock className="h-3 w-3 inline" /> {item.hoursPlayed} hrs
                        </span>
                      )}
                    </div>

                    {item.trophies && (
                      <div className="mt-3 flex items-center gap-3 text-xs text-[rgb(var(--text-secondary))] bg-[rgb(var(--bg-primary))]/60 rounded-lg p-2 border border-[rgb(var(--border))]">
                        <Trophy className="h-4 w-4 text-amber-400" />
                        <span className="font-medium text-[rgb(var(--text-primary))]">
                          {item.trophies.total} Trophies
                        </span>
                        {item.trophies.gold !== undefined && (
                          <span className="text-amber-400 font-medium">🥇 {item.trophies.gold}</span>
                        )}
                        {item.trophies.silver !== undefined && (
                          <span className="text-slate-300 font-medium">🥈 {item.trophies.silver}</span>
                        )}
                        {item.trophies.bronze !== undefined && (
                          <span className="text-amber-600 font-medium">🥉 {item.trophies.bronze}</span>
                        )}
                      </div>
                    )}

                    {item.highlight && !item.trophies && (
                      <p className="mt-3 text-xs text-[rgb(var(--text-secondary))]">
                        {item.highlight}
                      </p>
                    )}

                    <div className="mt-4 flex items-center gap-2">
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                          item.status === "Playing"
                            ? "bg-purple-500/10 text-purple-500"
                            : item.status === "Completed"
                              ? "bg-green-500/10 text-green-500"
                              : "bg-gray-500/10 text-gray-500"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="group relative overflow-hidden rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-secondary))]/30 p-6 transition-all hover:border-[rgb(var(--accent))]/50 hover:shadow-lg hover:shadow-[rgb(var(--accent))]/5">
                    <div className="flex items-start justify-between">
                      <div className="rounded-lg bg-red-500/10 p-2 text-red-500">
                        <Youtube className="h-6 w-6" />
                      </div>
                      {item.link && (
                        <ArrowUpRight className="h-4 w-4 text-[rgb(var(--text-secondary))] opacity-0 transition-opacity group-hover:opacity-100" />
                      )}
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-[rgb(var(--text-primary))]">
                      {item.name}
                    </h3>
                    <p className="text-sm text-[rgb(var(--text-secondary))]">
                      {item.topic}
                    </p>
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <ArticleModal note={selectedNote} onClose={() => setSelectedNote(null)} />
    </>
  );
}
