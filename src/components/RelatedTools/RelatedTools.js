import Link from "next/link";
import { getRelatedTools } from "../../app/lib/tools";

export default function RelatedTools({ currentSlug, limit = 3 }) {
  const tools = getRelatedTools(currentSlug, limit);
  if (!tools.length) return null;

  return (
    <section className="bg-background border border-border rounded-2xl p-6">
      <h2 className="text-sm font-bold text-foreground uppercase tracking-widest mb-4">
        Related Tools
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {tools.map((tool) => (
          <Link
            key={tool.slug}
            href={tool.href}
            className="group block bg-secondary border border-border rounded-xl p-4 hover:border-primary/40 hover:shadow-sm transition-all"
          >
            <span className="text-xl">{tool.icon}</span>
            <p className="text-sm font-bold text-foreground mt-2 mb-1 group-hover:text-primary transition-colors">
              {tool.shortName}
            </p>
            <p className="text-xs text-muted leading-relaxed">{tool.desc}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
