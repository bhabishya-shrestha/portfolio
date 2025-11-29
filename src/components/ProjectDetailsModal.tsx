import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Building2, Code2, MonitorPlay } from 'lucide-react';
import type { Project } from '../data/projects';
import { useEffect } from 'react';

interface ProjectDetailsModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectDetailsModal({ project, onClose }: ProjectDetailsModalProps) {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [project]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            layoutId={`project-${project.id}`}
            className="relative w-full max-w-5xl max-h-[90vh] rounded-2xl bg-[rgb(var(--bg-primary))] shadow-2xl ring-1 ring-white/10 overflow-hidden flex flex-col"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-50 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors backdrop-blur-sm"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="overflow-y-auto flex-1">
              {/* Hero Section */}
              <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden">
                {project.media.videoUrl ? (
                  <iframe
                    src={project.media.videoUrl}
                    title={project.title}
                    className="h-full w-full object-cover"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <img
                    src={project.media.heroImage}
                    alt={project.title}
                    className="h-full w-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[rgb(var(--bg-primary))] to-transparent" />
                
                <div className="absolute bottom-0 left-0 p-6 sm:p-8">
                  {project.sponsor && (
                    <div className="mb-2 flex items-center gap-2 text-sm font-medium text-[rgb(var(--accent))]">
                      <Building2 className="h-4 w-4" />
                      <span>In Partnership with {project.sponsor}</span>
                    </div>
                  )}
                  <h2 className="text-3xl font-bold text-[rgb(var(--text-primary))] sm:text-4xl">{project.title}</h2>
                  <p className="mt-2 text-lg text-[rgb(var(--text-secondary))]">{project.tagline}</p>
                </div>
              </div>

              <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-3">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                  <section>
                    <h3 className="mb-3 flex items-center gap-2 text-xl font-semibold text-[rgb(var(--text-primary))]">
                      <MonitorPlay className="h-5 w-5 text-[rgb(var(--accent))]" />
                      The Challenge & Use Case
                    </h3>
                    <p className="leading-relaxed text-[rgb(var(--text-secondary))] whitespace-pre-line">{project.useCase}</p>
                  </section>

                  <section>
                    <h3 className="mb-3 text-xl font-semibold text-[rgb(var(--text-primary))]">About the Solution</h3>
                    <p className="leading-relaxed text-[rgb(var(--text-secondary))] whitespace-pre-line">{project.about}</p>
                  </section>

                  <section>
                    <h3 className="mb-4 text-xl font-semibold text-[rgb(var(--text-primary))]">Gallery</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {project.media.gallery.map((item, idx) => (
                        <div key={idx} className="group relative aspect-video overflow-hidden rounded-lg border border-[rgb(var(--border))]">
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
                              className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                          )}
                          {item.caption && (
                            <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                              {item.caption}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>
                </div>

                {/* Sidebar */}
                <div className="space-y-8">
                  <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-secondary))]/30 p-6">
                    <h3 className="mb-4 flex items-center gap-2 font-semibold text-[rgb(var(--text-primary))]">
                      <Code2 className="h-5 w-5 text-[rgb(var(--accent))]" />
                      Technical Specs
                    </h3>
                    
                    <div className="space-y-6">
                      {project.technicalSections.map((section, idx) => (
                        <div key={idx}>
                          <h4 className="mb-2 text-sm font-bold text-[rgb(var(--text-primary))]">{section.title}</h4>
                          <p className="text-sm leading-relaxed text-[rgb(var(--text-secondary))] whitespace-pre-line">
                            {section.content}
                          </p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-8">
                      <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-[rgb(var(--text-secondary))]">Tech Stack</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech) => (
                          <span key={tech} className="rounded-full bg-[rgb(var(--accent))]/10 px-3 py-1 text-xs font-medium text-[rgb(var(--accent))]">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    {project.links.demo && (
                      <a
                        href={project.links.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center gap-2 rounded-lg bg-[rgb(var(--text-primary))] px-4 py-3 text-sm font-semibold text-[rgb(var(--bg-primary))] hover:opacity-90 transition-opacity"
                      >
                        <ExternalLink className="h-4 w-4" />
                        {project.links.demoLabel || "View Live Demo"}
                      </a>
                    )}
                    {project.links.repo && (
                      <a
                        href={project.links.repo}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center gap-2 rounded-lg border border-[rgb(var(--border))] px-4 py-3 text-sm font-semibold text-[rgb(var(--text-primary))] hover:bg-[rgb(var(--bg-secondary))] transition-colors"
                      >
                        <Github className="h-4 w-4" />
                        View Source Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
