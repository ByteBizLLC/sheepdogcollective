import Link from "next/link";
import { notFound } from "next/navigation";
import { courses } from "@/lib/site-data";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const course = courses.find((item) => item.slug === slug);
  return {
    title: course ? `${course.title} | The Sheepdog Collective` : "Course | The Sheepdog Collective",
  };
}

export default async function CourseDetailPage({ params }: Props) {
  const { slug } = await params;
  const course = courses.find((item) => item.slug === slug);

  if (!course) notFound();

  return (
    <main className="px-6 py-20">
      <article className="mx-auto max-w-5xl">
        <Link href="/programs" className="text-sm font-bold text-orange-500 hover:text-orange-400">
          ← Back to Programs
        </Link>

        <p className="mt-10 text-sm font-black uppercase tracking-[0.3em] text-orange-500">{course.duration}</p>
        <h1 className="mt-4 text-5xl font-black text-white">{course.title}</h1>
        <p className="mt-6 text-xl leading-8 text-zinc-300">{course.summary}</p>

        <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.04] p-8">
          <h2 className="text-2xl font-black text-white">Course Details</h2>
          <ul className="mt-6 space-y-4 text-zinc-300">
            {course.details.map((detail) => (
              <li key={detail} className="flex gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-orange-500" />
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>

        {course.flyer && (
          <div className="mt-8 rounded-2xl border border-orange-500/30 bg-orange-600/10 p-6">
            <h2 className="text-xl font-black">Course Flyer</h2>
            <p className="mt-2 text-zinc-300">
              Download the current flyer for additional course information.
            </p>
            <a
              href={course.flyer}
              className="mt-5 inline-block rounded-md bg-orange-600 px-5 py-3 font-bold text-white hover:bg-orange-500"
            >
              Download Flyer
            </a>
          </div>
        )}

        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="/contact" className="rounded-md bg-orange-600 px-6 py-3 font-black text-white hover:bg-orange-500">
            Request This Course
          </Link>
          <Link href="/calendar" className="rounded-md border border-white/20 px-6 py-3 font-black text-white hover:bg-white/10">
            View Calendar
          </Link>
        </div>
      </article>
    </main>
  );
}
