import Link from "next/link";

type CourseCardProps = {
  title: string;
  slug: string;
  summary: string;
  duration: string;
};

export function CourseCard({ title, slug, summary, duration }: CourseCardProps) {
  return (
    <Link
      href={`/programs/${slug}`}
      className="group rounded-2xl border border-white/10 bg-white/[0.04] p-6 hover:border-orange-500 hover:bg-white/[0.07]"
    >
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-500">{duration}</p>
      <h3 className="mt-4 text-xl font-black text-white group-hover:text-orange-400">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-zinc-400">{summary}</p>
      <p className="mt-5 text-sm font-bold text-orange-500">View course details →</p>
    </Link>
  );
}
