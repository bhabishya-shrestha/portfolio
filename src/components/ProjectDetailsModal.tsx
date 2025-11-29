import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { X, Github, Building2, Code2, MonitorPlay, Layers, ArrowUpRight } from 'lucide-react';
import type { Project } from '../data/projects';
import { useEffect, useRef } from 'react';

interface ProjectDetailsModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectDetailsModal({ project, onClose }: ProjectDetailsModalProps) {
  return (
    <AnimatePresence>
      {project && <ProjectModalContent project={project} onClose={onClose} key={project.id} />}
    </AnimatePresence>
  );
}

function ProjectModalContent({ project, onClose }: { project: Project; onClose: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({ container: containerRef });
  
  // Parallax effects for hero
  const heroScale = useTransform(scrollY, [0, 1000], [1, 1.2]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0.3]);
  const contentTranslateY = useTransform(scrollY, [0, 500], [0, -50]);

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full h-full md:h-[95vh] md:w-[95vw] md:max-w-7xl md:rounded-3xl bg-[rgb(var(--bg-primary))] shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Close Button - Floating */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-[60] rounded-full bg-black/20 p-3 text-white hover:bg-black/40 transition-colors backdrop-blur-md border border-white/10"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Main Scrollable Container */}
        <div 
          ref={containerRef}
          className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth"
        >
          {/* Immersive Hero Section */}
          <div className="relative h-[70vh] md:h-[80vh] w-full overflow-hidden">
            <motion.div 
              style={{ scale: heroScale, opacity: heroOpacity }}
              className="absolute inset-0 w-full h-full"
            >
              {project.media.videoUrl ? (
                <iframe
                  src={`${project.media.videoUrl}?autoplay=1&mute=1&loop=1&controls=0`}
                  title={project.title}
                  className="h-full w-full object-cover pointer-events-none"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              ) : (
                <img
                  src={project.media.heroImage}
                  alt={project.title}
                  className="h-full w-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[rgb(var(--bg-primary))] via-[rgb(var(--bg-primary))]/40 to-transparent" />
            </motion.div>

            {/* Hero Content Overlay */}
            <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 lg:p-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="max-w-4xl"
              >
                {project.sponsor && (
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[rgb(var(--accent))]/10 px-4 py-1.5 text-sm font-medium text-[rgb(var(--accent))] backdrop-blur-md border border-[rgb(var(--accent))]/20">
                    <Building2 className="h-4 w-4" />
                    <span>In Partnership with {project.sponsor}</span>
                  </div>
                )}
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[rgb(var(--text-primary))] mb-4 tracking-tight leading-tight">
                  {project.title}
                </h1>
                <p className="text-xl md:text-2xl text-[rgb(var(--text-secondary))] max-w-2xl font-light">
                  {project.tagline}
                </p>
              </motion.div>
            </div>
          </div>

          {/* Content Grid */}
          <motion.div 
            style={{ y: contentTranslateY }}
            className="relative z-10 px-6 md:px-12 lg:px-16 pb-24 md:pb-16 max-w-full"
          >
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-12 lg:gap-24">
              
              {/* Left Column: Narrative */}
              <div className="space-y-16">
                {/* Challenge & Solution */}
                <section className="space-y-12">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 text-[rgb(var(--accent))]">
                      <MonitorPlay className="h-6 w-6" />
                      <h3 className="text-sm font-bold uppercase tracking-widest">The Challenge</h3>
                    </div>
                    <p className="text-lg md:text-xl leading-relaxed text-[rgb(var(--text-secondary))]">
                      {project.useCase}
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center gap-3 text-[rgb(var(--accent))]">
                      <Layers className="h-6 w-6" />
                      <h3 className="text-sm font-bold uppercase tracking-widest">The Solution</h3>
                    </div>
                    <p className="text-lg md:text-xl leading-relaxed text-[rgb(var(--text-secondary))]">
                      {project.about}
                    </p>
                  </div>
                </section>

                {/* Interactive Gallery */}
                <section>
                  <h3 className="text-2xl font-bold text-[rgb(var(--text-primary))] mb-8">Project Gallery</h3>
                  {/* Mobile: Horizontal Scroll Snap | Desktop: Grid */}
                  <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 md:grid md:grid-cols-2 md:overflow-visible md:pb-0 -mx-6 px-6 md:mx-0 md:px-0">
                    {project.media.gallery.map((item, idx) => (
                      <div 
                        key={idx} 
                        className="flex-none w-[85vw] md:w-auto snap-center group relative aspect-video overflow-hidden rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-secondary))]"
                      >
                        {item.type === 'video' ? (
                          <video
                            src={item.url}
                            controls
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <img
                            src={item.url}
                            alt={item.caption || `Gallery ${idx + 1}`}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        )}
                        {item.caption && (
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 pt-12 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <p className="text-sm text-white font-medium">{item.caption}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>

                {/* Technical Deep Dive */}
                <section className="space-y-8">
                  <h3 className="text-2xl font-bold text-[rgb(var(--text-primary))]">Technical Deep Dive</h3>
                  <div className="grid gap-6">
                    {project.technicalSections.map((section, idx) => (
                      <div 
                        key={idx}
                        className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-secondary))]/30 p-8 hover:bg-[rgb(var(--bg-secondary))]/50 transition-colors"
                      >
                        <h4 className="mb-4 text-lg font-bold text-[rgb(var(--text-primary))]">{section.title}</h4>
                        <p className="text-base leading-relaxed text-[rgb(var(--text-secondary))] whitespace-pre-line">
                          {section.content}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              {/* Right Column: Sticky Context Card (Desktop) */}
              <div className="hidden lg:block relative">
                <div className="sticky top-8 space-y-8">
                  {/* Project Stats/Info Card */}
                  <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-secondary))]/50 p-8 backdrop-blur-xl">
                    <div className="mb-8">
                      <h4 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[rgb(var(--text-secondary))]">
                        <Code2 className="h-4 w-4" />
                        Tech Stack
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech) => (
                          <span 
                            key={tech} 
                            className="rounded-lg bg-[rgb(var(--accent))]/10 px-3 py-1.5 text-sm font-medium text-[rgb(var(--accent))] border border-[rgb(var(--accent))]/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      {project.links.demo && (
                        <a
                          href={project.links.demo}
                          target="_blank"
                          rel="noreferrer"
                          className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[rgb(var(--text-primary))] px-4 py-4 text-base font-bold text-[rgb(var(--bg-primary))] hover:opacity-90 transition-all hover:scale-[1.02]"
                        >
                          <span>{project.links.demoLabel || "View Live Demo"}</span>
                          <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                      )}
                      {project.links.repo && (
                        <a
                          href={project.links.repo}
                          target="_blank"
                          rel="noreferrer"
                          className="flex w-full items-center justify-center gap-2 rounded-xl border border-[rgb(var(--border))] px-4 py-4 text-base font-bold text-[rgb(var(--text-primary))] hover:bg-[rgb(var(--bg-secondary))] transition-all"
                        >
                          <Github className="h-5 w-5" />
                          <span>View Source Code</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        </div>

        {/* Mobile Sticky Bottom Bar */}
        <div className="lg:hidden absolute bottom-0 left-0 right-0 p-4 bg-[rgb(var(--bg-primary))]/80 backdrop-blur-xl border-t border-[rgb(var(--border))] z-50">
          <div className="flex gap-3">
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-[rgb(var(--text-primary))] px-4 py-3 text-sm font-bold text-[rgb(var(--bg-primary))]"
              >
                {project.links.demoLabel || "View Demo"}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
            {project.links.repo && (
              <a
                href={project.links.repo}
                target="_blank"
                rel="noreferrer"
                className="flex-none flex items-center justify-center rounded-xl border border-[rgb(var(--border))] p-3 text-[rgb(var(--text-primary))]"
                aria-label="View Source Code"
              >
                <Github className="h-5 w-5" />
              </a>
            )}
          </div>
        </div>

      </motion.div>
    </div>
  );
}
