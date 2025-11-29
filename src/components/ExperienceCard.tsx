import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface ExperienceCardProps {
  start: string;
  end: string;
  role: string;
  company: string;
  description: string[];
  skills: string[];
  link?: string;
}

export default function ExperienceCard({ start, end, role, company, description, skills, link }: ExperienceCardProps) {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50"
    >
      <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-[rgb(var(--bg-secondary))]/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
      <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-[rgb(var(--text-secondary))] sm:col-span-2" aria-label={`${start} to ${end}`}>
        {start} — {end}
      </header>
      <div className="z-10 sm:col-span-6">
        <h3 className="font-medium leading-snug text-[rgb(var(--text-primary))]">
          <div>
            <a 
              className="inline-flex items-baseline font-medium leading-tight text-[rgb(var(--text-primary))] hover:text-[rgb(var(--accent))] focus-visible:text-[rgb(var(--accent))] group/link text-base" 
              href={link || '#'} 
              target="_blank" 
              rel="noreferrer" 
              aria-label={`${role} at ${company}`}
            >
              <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
              <span>
                {role} · <span className="inline-block">{company} <ArrowUpRight className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px" /></span>
              </span>
            </a>
          </div>
        </h3>
        <ul className="mt-2 text-sm leading-normal text-[rgb(var(--text-secondary))] list-disc pl-4 space-y-1">
          {description.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <ul className="mt-2 flex flex-wrap" aria-label="Technologies used">
          {skills.map((skill, index) => (
            <li key={index} className="mr-1.5 mt-2">
              <div className="flex items-center rounded-full bg-[rgb(var(--accent))]/10 px-3 py-1 text-xs font-medium leading-5 text-[rgb(var(--accent))]">
                {skill}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
