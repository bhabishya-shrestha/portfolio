import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NoteCard from "./NoteCard";
import ArticleModal from "./ArticleModal";
import type { Book, Game, Channel } from "../data/personal";
import type { Note } from "../data/notes";
import { BookOpen, Gamepad2, Youtube, ArrowUpRight } from "lucide-react";

export default function JournalGrid({
  items,
}: {
  items: (Note | Book | Game | Channel)[];
}) {
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const handleItemClick = (item: Note | Book | Game | Channel) => {
    if ("takes" in item) {
      // Check if it's a Note
      setSelectedNote(item as Note);
    } else if (item.link) {
      window.open(item.link, "_blank");
    }
  };

  return (
    <>
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        <AnimatePresence mode="popLayout">
          {items.map((item) => {
            // Generate a unique key based on item type and ID to prevent collisions
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
                {/* Render different cards based on item type */}
                {"readTime" in item ? (
                  <NoteCard note={item as Note} />
                ) : "author" in item ? (
                  <div className="group relative overflow-hidden rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-secondary))]/30 p-6 transition-all hover:border-[rgb(var(--accent))]/50 hover:shadow-lg hover:shadow-[rgb(var(--accent))]/5">
                    <div className="flex items-start justify-between">
                      <div className="rounded-lg bg-emerald-500/10 p-2 text-emerald-500">
                        <BookOpen className="h-6 w-6" />
                      </div>
                      {item.link && (
                        <ArrowUpRight className="h-4 w-4 text-[rgb(var(--text-secondary))] opacity-0 transition-opacity group-hover:opacity-100" />
                      )}
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-[rgb(var(--text-primary))]">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[rgb(var(--text-secondary))]">
                      {item.author}
                    </p>
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
                    <p className="text-sm text-[rgb(var(--text-secondary))]">
                      {item.platform}
                    </p>
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
