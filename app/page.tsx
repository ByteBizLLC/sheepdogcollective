import Image from "next/image";
import Link from "next/link";
import { CourseCard } from "@/components/CourseCard";
import { getPrograms } from "@/lib/sanity/queries";
import { getTrainingEvents } from "@/lib/sanity/queries";

export default async function HomePage() {
  const courses = await getPrograms();
  const events = await getTrainingEvents();
  const featuredEvent = 
    events.find((event) => event.featured) || events[0];

  return (
    <main>
      <section className="relative overflow-hidden bg-zinc-950 px-6 py-20 md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(234,88,12,0.22),transparent_32rem)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.35em] text-orange-500">
				A Public Safety Training & Consulting Company
			</p>
            <h1 className="mt-5 max-w-4xl text-5xl font-black tracking-tight text-white md:text-7xl">
              Premium training for the first responder community.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
              The Sheepdog Collective is a progressive public safety training and consulting
              company comprised of professionals from law enforcement, fire services,
              corrections, and licensed mental health.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link href="/programs" className="rounded-md bg-orange-600 px-6 py-3 font-black text-white hover:bg-orange-500">
                Explore Programs
              </Link>
              <Link href="/contact" className="rounded-md border border-white/20 px-6 py-3 font-black text-white hover:bg-white/10">
                Request Training
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl">
            <Image
              src="/images/sheepdog-logo.svg"
              alt="The Sheepdog Collective logo"
              width={420}
              height={420}
              className="mx-auto"
              priority
            />
            <div className="mt-8 rounded-2xl border border-orange-500/30 bg-orange-600/10 p-5">
              <p className="font-bold text-white">Real-world instructors. Real-world experience.</p>
              <p className="mt-2 text-sm leading-6 text-zinc-300">
                Seasoned veterans with practical knowledge to share across law enforcement,
                fire services, corrections, and mental health disciplines.
              </p>
            </div>
          </div>
        </div>
      </section>

      {featuredEvent && (
  <section className="bg-zinc-900 border-y border-white/10 px-6 py-20">
    <div className="mx-auto max-w-6xl">
      <p className="text-sm font-black uppercase tracking-[0.3em] text-orange-500">
        Featured Upcoming Training
      </p>

      <div className="mt-6 rounded-3xl border border-orange-500/30 bg-zinc-950 p-8">
        <p className="text-orange-500 font-bold">
          {featuredEvent.displayDate}
        </p>

        <h2 className="mt-3 text-4xl font-black text-white">
          {featuredEvent.title}
        </h2>

        <p className="mt-4 max-w-3xl text-zinc-300">
          {featuredEvent.summary}
        </p>

        <div className="mt-6 flex flex-wrap gap-4">
          <Link
            href={`/events/${featuredEvent.slug}`}
            className="rounded-md bg-orange-600 px-6 py-3 font-black text-white hover:bg-orange-500"
          >
            View Event
          </Link>

          <Link
            href="/calendar"
            className="rounded-md border border-white/20 px-6 py-3 font-black text-white hover:bg-white/10"
          >
            View Calendar
          </Link>
        </div>
      </div>
    </div>
  </section>
)}

      <section className="border-y border-white/10 bg-zinc-900 px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-black uppercase tracking-[0.3em] text-orange-500">Why We Exist</p>
          <h2 className="mt-4 text-3xl font-black text-white md:text-4xl">Reality-based training matters.</h2>
          <p className="mt-5 leading-8 text-zinc-300">
            The landmark U.S. Supreme Court case City of Canton, Ohio v. Harris serves as
            the legal foundation for modern reality-based police training. Agencies must
            prepare employees for high-risk, recurring situations with realistic,
            scenario-based training to reduce liability and better protect the public.
          </p>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.3em] text-orange-500">Programs</p>
              <h2 className="mt-3 text-3xl font-black text-white md:text-4xl">Courses & consulting</h2>
            </div>
            <Link href="/programs" className="font-bold text-orange-500 hover:text-orange-400">
              View all programs →
            </Link>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
           {courses.slice(0, 6).map((course: any) => (
              <CourseCard key={course.slug} {...course} />
            ))}
          </div>
        </div>
      </section>
	  
	  
	  
	
      <section className="bg-zinc-900 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.3em] text-orange-500">Upcoming Training</p>
          <h2 className="mt-3 text-3xl font-black text-white md:text-4xl">Event Calendar</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {events.map((event) => (
              <Link key={event.slug} href={`/events/${event.slug}`} className="rounded-2xl border border-white/10 bg-zinc-950 p-6 hover:border-orange-500">
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-orange-500">{event.date}</p>
                <h3 className="mt-3 text-2xl font-black text-white">{event.title}</h3>
                <p className="mt-3 text-zinc-300">{event.venue}</p>
                <p className="text-zinc-400">{event.location}</p>
              </Link>
            ))}
            <div className="rounded-2xl border border-dashed border-white/20 p-6">
              <h3 className="text-xl font-black">Need a custom class?</h3>
              <p className="mt-3 text-zinc-400">
                Contact us with your specific program needs. We will build training around your agency,
                facility, personnel, and operational realities.
              </p>
              <Link href="/contact" className="mt-5 inline-block font-bold text-orange-500">Start a conversation →</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
