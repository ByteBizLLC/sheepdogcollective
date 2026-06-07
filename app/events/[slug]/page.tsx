import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getTrainingEventBySlug,
  getTrainingEvents,
} from "@/lib/sanity/queries";

type Props = {
  params: Promise<{ slug: string }>;
};

type RichTrainingEvent = {
  title: string;
  shortTitle?: string;
  slug?: string;
  programSlug?: string;
  programPageSlug?: string;
  startDate?: string;
  endDate?: string;
  displayDate?: string;
  venue?: string;
  location?: string;
  summary?: string;
  status?: string;
  registrationUrl?: string;
  flyerUrl?: string;
  heroImage?: string;
  maxSeats?: number;
  seatsRemaining?: number;
  registrationDeadline?: string;
  featured?: boolean;
  duration?: string;
  tuition?: string;
  leadInstructor?: string;
  instructorBio?: string;
  targetAudience?: string;
  prerequisites?: string[];
  courseOutline?: string[];
};

function formatDate(date?: string) {
  if (!date) return null;

  const parsed = new Date(`${date}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return date;

  return parsed.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export async function generateStaticParams() {
  const events = await getTrainingEvents();

  return events
    .filter((event) => event.slug)
    .map((event) => ({
      slug: event.slug,
    }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const event = (await getTrainingEventBySlug(slug)) as RichTrainingEvent | null;

  return {
    title: event
      ? `${event.title} | The Sheepdog Collective`
      : "Training Event | The Sheepdog Collective",
  };
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const event = (await getTrainingEventBySlug(slug)) as RichTrainingEvent | null;

  if (!event) notFound();

  const eventDate = event.displayDate || formatDate(event.startDate);
  const registrationDeadline = formatDate(event.registrationDeadline);
  const registrationHref =
    event.registrationUrl ||
    `/contact?course=${encodeURIComponent(event.title)}`;

  return (
    <main className="px-6 py-20">
      <article className="mx-auto max-w-5xl">
        <Link
          href="/calendar"
          className="text-sm font-bold text-orange-500 hover:text-orange-400"
        >
          ← Back to Calendar
        </Link>

        <p className="mt-10 text-sm font-black uppercase tracking-[0.3em] text-orange-500">
          Training Event
        </p>

        <h1 className="mt-4 text-5xl font-black text-white">{event.title}</h1>

        {event.summary && (
          <p className="mt-6 text-xl leading-8 text-zinc-300">
            {event.summary}
          </p>
        )}

        {event.heroImage && (
          <div className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
            <img
              src={event.heroImage}
              alt={event.title}
              className="h-auto w-full object-cover"
            />
          </div>
        )}

        <section className="mt-10 grid gap-4 md:grid-cols-2">
          {eventDate && (
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-orange-500">
                Date
              </p>
              <p className="mt-3 text-lg font-bold text-white">{eventDate}</p>
            </div>
          )}

          {event.status && (
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-orange-500">
                Status
              </p>
              <p className="mt-3 text-lg font-bold text-white">{event.status}</p>
            </div>
          )}

          {event.venue && (
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-orange-500">
                Venue
              </p>
              <p className="mt-3 text-lg font-bold text-white">{event.venue}</p>
            </div>
          )}

          {event.location && (
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-orange-500">
                Location
              </p>
              <p className="mt-3 text-lg font-bold text-white">{event.location}</p>
            </div>
          )}

          {typeof event.seatsRemaining === "number" && (
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-orange-500">
                Seats Remaining
              </p>
              <p className="mt-3 text-lg font-bold text-white">
                {event.maxSeats
                  ? `${event.seatsRemaining} / ${event.maxSeats}`
                  : event.seatsRemaining}
              </p>
            </div>
          )}

          {registrationDeadline && (
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-orange-500">
                Registration Deadline
              </p>
              <p className="mt-3 text-lg font-bold text-white">
                {registrationDeadline}
              </p>
            </div>
          )}
        </section>

        {event.summary && (
          <section className="mt-10 rounded-2xl border border-white/10 bg-white/[0.04] p-8">
            <h2 className="text-2xl font-black text-white">
              Event Description
            </h2>
            <p className="mt-4 leading-7 text-zinc-300">{event.summary}</p>
          </section>
        )}

        {(event.duration || event.tuition) && (
          <section className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-8">
            <h2 className="text-2xl font-black text-white">
              Course Information
            </h2>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {event.duration && (
                <div className="rounded-xl border border-white/10 bg-black/20 p-5">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-orange-500">
                    Duration
                  </p>
                  <p className="mt-2 font-bold text-white">{event.duration}</p>
                </div>
              )}

              {event.tuition && (
                <div className="rounded-xl border border-white/10 bg-black/20 p-5">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-orange-500">
                    Tuition
                  </p>
                  <p className="mt-2 font-bold text-white">{event.tuition}</p>
                </div>
              )}
            </div>
          </section>
        )}

        {event.targetAudience && (
          <section className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-8">
            <h2 className="text-2xl font-black text-white">
              Who Should Attend
            </h2>
            <p className="mt-4 leading-7 text-zinc-300">
              {event.targetAudience}
            </p>
          </section>
        )}

        {event.courseOutline?.length ? (
          <section className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-8">
            <h2 className="text-2xl font-black text-white">Course Outline</h2>
            <ul className="mt-5 space-y-3 text-zinc-300">
              {event.courseOutline.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-orange-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {event.prerequisites?.length ? (
          <section className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-8">
            <h2 className="text-2xl font-black text-white">Prerequisites</h2>
            <ul className="mt-5 space-y-3 text-zinc-300">
              {event.prerequisites.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-orange-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {event.leadInstructor && (
          <section className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-orange-500">
              Lead Instructor
            </p>
            <h2 className="mt-2 text-2xl font-black text-white">
              {event.leadInstructor}
            </h2>

            {event.instructorBio && (
              <p className="mt-4 leading-7 text-zinc-300">
                {event.instructorBio}
              </p>
            )}
          </section>
        )}

        <section className="mt-10 rounded-2xl border border-orange-500/30 bg-orange-600/10 p-8">
          <h2 className="text-2xl font-black text-white">Ready to Attend?</h2>
          <p className="mt-3 text-zinc-300">
            Reserve your seat, request registration details, or ask about hosting
            this course for your agency.
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href={registrationHref}
              className="rounded-md bg-orange-600 px-5 py-3 font-bold text-white hover:bg-orange-500"
            >
              Register / Inquire
            </Link>

            {event.flyerUrl && (
              <a
                href={event.flyerUrl}
                className="rounded-md border border-white/20 px-5 py-3 font-bold text-white hover:bg-white/10"
              >
                Download Flyer
              </a>
            )}

            {event.programPageSlug && (
            <Link
              href={`/programs/${event.programPageSlug}`}
              className="rounded-md border border-white/20 px-5 py-3 font-bold text-white hover:bg-white/10"
            >
              View Course
            </Link>
            )}
          </div>
        </section>
      </article>
    </main>
  );
}
