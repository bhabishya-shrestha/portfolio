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
    <div className="relative grid md:grid-cols-[8.5rem_1fr] gap-4 md:gap-8 group">
      {/* Date Section */}
      <header 
        className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-[rgb(var(--text-secondary))] md:text-right" 
        aria-label={`${start} to ${end}`}
      >
        {start} — {end}
      </header>

      {/* Timeline Dot */}
      <div className="absolute left-[9.5rem] top-2 hidden md:block -translate-x-1/2 z-20">
        <div className="h-3 w-3 rounded-full border-2 border-[rgb(var(--bg-primary))] bg-[rgb(var(--text-secondary))] group-hover:bg-[rgb(var(--accent))] group-hover:scale-125 transition-all duration-300"></div>
      </div>

      {/* Content Card */}
      <div className="z-10 relative rounded-lg transition-all duration-300 md:p-6 md:hover:bg-[rgb(var(--bg-secondary))]/50 md:hover:shadow-sm md:border md:border-transparent md:hover:border-[rgb(var(--border))]">
        <h3 className="font-medium leading-snug text-[rgb(var(--text-primary))]">
          <div>
            <a 
              className="inline-flex items-baseline font-medium leading-tight text-[rgb(var(--text-primary))] hover:text-[rgb(var(--accent))] focus-visible:text-[rgb(var(--accent))] group/link text-lg" 
              href={link || '#'} 
              target="_blank" 
              rel="noreferrer" 
              aria-label={`${role} at ${company}`}
            >
              <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
              <span>
                {role} · <span className="inline-block text-[rgb(var(--text-secondary))] group-hover/link:text-[rgb(var(--accent))] transition-colors">{company} <ArrowUpRight className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px" /></span>
              </span>
            </a>
          </div>
        </h3>
        <ul className="mt-4 text-sm leading-relaxed text-[rgb(var(--text-secondary))] list-disc pl-4 space-y-2">
          {description.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <ul className="mt-4 flex flex-wrap" aria-label="Technologies used">
          {skills.map((skill, index) => (
            <li key={index} className="mr-1.5 mt-2">
              <div className="flex items-center rounded-full bg-[rgb(var(--accent))]/10 px-3 py-1 text-xs font-medium leading-5 text-[rgb(var(--accent))] hover:bg-[rgb(var(--accent))]/20 transition-colors cursor-default">
                {skill}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
