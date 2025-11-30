import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Calendar, Clock, Brain } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import type { Note } from '../data/notes';

interface ArticleModalProps {
  note: Note | null;
  onClose: () => void;
}

export default function ArticleModal({ note, onClose }: ArticleModalProps) {
  if (!note) return null;

  return (
    <AnimatePresence>
      {note && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-primary))] shadow-2xl">
              
              {/* Header */}
              <div className="relative border-b border-[rgb(var(--border))] bg-[rgb(var(--bg-secondary))]/50 p-6 md:p-8">
                <button
                  onClick={onClose}
                  className="absolute right-4 top-4 rounded-full p-2 text-[rgb(var(--text-secondary))] hover:bg-[rgb(var(--bg-secondary))] hover:text-[rgb(var(--text-primary))] transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>

                <div className="mb-4 flex flex-wrap gap-2">
                  {note.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-[rgb(var(--accent))]/10 px-3 py-1 text-xs font-medium text-[rgb(var(--accent))] border border-[rgb(var(--accent))]/20">
                      {tag}
                    </span>
                  ))}
                </div>

                <h2 className="mb-4 text-2xl font-bold font-display text-[rgb(var(--text-primary))] md:text-3xl">
                  {note.title}
                </h2>

                <div className="flex items-center gap-6 text-sm text-[rgb(var(--text-secondary))]">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{note.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{note.readTime}</span>
                  </div>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8">
                {/* Abstract */}
                <div className="mb-8 rounded-xl bg-[rgb(var(--bg-secondary))]/30 p-6 border border-[rgb(var(--border))]">
                  <h3 className="mb-3 text-sm font-bold uppercase tracking-widest text-[rgb(var(--text-secondary))]">Abstract</h3>
                  <p className="text-lg leading-relaxed text-[rgb(var(--text-primary))]">
                    {note.abstract}
                  </p>
                </div>

                {/* My Takes Section */}
                {note.takes && (
                  <div className="mb-8">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 p-2">
                        <Brain className="h-6 w-6 text-[rgb(var(--accent))]" />
                      </div>
                      <h3 className="text-xl font-bold text-[rgb(var(--text-primary))]">My Takes</h3>
                    </div>
                    
                    <div className="prose prose-invert max-w-none prose-p:text-[rgb(var(--text-secondary))] prose-headings:text-[rgb(var(--text-primary))] prose-strong:text-[rgb(var(--text-primary))] prose-a:text-[rgb(var(--accent))]">
                      <ReactMarkdown>{note.takes}</ReactMarkdown>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="border-t border-[rgb(var(--border))] bg-[rgb(var(--bg-secondary))]/30 p-6 flex justify-end">
                {note.externalLink && (
                  <a
                    href={note.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-lg bg-[rgb(var(--text-primary))] px-6 py-3 text-sm font-bold text-[rgb(var(--bg-primary))] transition-transform hover:scale-105 active:scale-95"
                  >
                    <span>Read Full Article</span>
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
