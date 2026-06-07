import { CourseCard } from "@/components/CourseCard";
import { getPrograms } from "@/lib/sanity/queries";

export default async function ProgramsPage() {
  const programs = await getPrograms();

  return (
    <main className="px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-black uppercase tracking-[0.3em] text-orange-500">
          Programs & Courses
        </p>

        <h1 className="mt-4 text-5xl font-black text-white">
          Training built for real-world public safety work.
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-300">
          Courses can be tailored to your agency, venue, policy requirements, and operational needs.
          Select a program below for details, or contact us for a custom-built training solution.
        </p>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {programs.map((course: any) => (
            <CourseCard key={course.slug} {...course} />
          ))}
        </div>
      </div>
    </main>
  );
}
