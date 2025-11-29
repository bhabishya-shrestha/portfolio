import { motion } from 'framer-motion';
import { ArrowUpRight, Eye } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string[];
  skills: string[];
  image?: string;
  onClick: () => void;
}

export default function ProjectCard({ title, description, skills, image, onClick }: ProjectCardProps) {
  return (
    <motion.div 
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      className="group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50 cursor-pointer"
    >
      <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-[rgb(var(--bg-secondary))]/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
      
      {image && (
        <div className="z-10 sm:col-span-2 mt-1">
           <img 
            src={image} 
            alt={title} 
            className="rounded border-2 border-[rgb(var(--border))/10] transition group-hover:border-[rgb(var(--border))/30] sm:order-1 sm:col-span-2 sm:translate-y-1 object-cover h-24 w-full" 
            width="200" 
            height="48" 
          />
        </div>
      )}

      <div className={`z-10 ${image ? 'sm:col-span-6' : 'sm:col-span-8'}`}>
        <h3 className="font-medium leading-snug text-[rgb(var(--text-primary))]">
          <div className="flex items-center gap-2 group/link">
            <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
            <span className="text-base font-medium text-[rgb(var(--text-primary))] group-hover/link:text-[rgb(var(--accent))] transition-colors">
              {title}
            </span>
            <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 motion-reduce:transition-none translate-y-px text-[rgb(var(--text-secondary))] group-hover/link:text-[rgb(var(--accent))]" />
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
        
        <div className="mt-4 flex items-center gap-2 text-xs font-medium text-[rgb(var(--accent))] opacity-0 transition-opacity group-hover:opacity-100">
          <Eye className="h-3 w-3" />
          View Case Study
        </div>
      </div>
    </motion.div>
  );
}
