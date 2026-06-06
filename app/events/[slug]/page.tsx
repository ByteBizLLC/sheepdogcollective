import { notFound } from "next/navigation";
import { getTrainingEventBySlug } from "@/lib/sanity/queries";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function EventPage({ params }: Props) {
  const { slug } = await params;

  const event = await getTrainingEventBySlug(slug);

  if (!event) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-4xl px-6 py-24">

        <div className="mb-4 text-orange-500 uppercase tracking-widest text-sm">
          Training Event
        </div>

        <h1 className="text-5xl font-bold mb-6">
          {event.title}
        </h1>

       <div className="grid gap-4 md:grid-cols-2 mb-10">

  <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
    <div className="text-xs uppercase tracking-widest text-orange-500 mb-2">
      Date
    </div>

    <div className="text-white font-semibold">
      {event.displayDate}
    </div>
  </div>

  <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
    <div className="text-xs uppercase tracking-widest text-orange-500 mb-2">
      Status
    </div>

    <div className="text-white font-semibold">
      {event.status}
    </div>
  </div>

  <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
    <div className="text-xs uppercase tracking-widest text-orange-500 mb-2">
      Venue
    </div>

    <div className="text-white font-semibold">
      {event.venue}
    </div>
  </div>

  <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
    <div className="text-xs uppercase tracking-widest text-orange-500 mb-2">
      Location
    </div>

    <div className="text-white font-semibold">
      {event.location}
    </div>
  </div>

  {event.seatsRemaining !== null &&
    event.seatsRemaining !== undefined && (
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
        <div className="text-xs uppercase tracking-widest text-orange-500 mb-2">
          Seats Remaining
        </div>

        <div className="text-white font-semibold">
          {event.seatsRemaining}
          {event.maxSeats ? ` / ${event.maxSeats}` : ""}
        </div>
      </div>
    )}

  {event.registrationDeadline && (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
      <div className="text-xs uppercase tracking-widest text-orange-500 mb-2">
        Registration Deadline
      </div>

      <div className="text-white font-semibold">
        {event.registrationDeadline}
      </div>
    </div>
  )}

</div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Event Description
          </h2>

          <p className="text-gray-300 leading-relaxed">
            {event.summary}
          </p>
        </div>

        <div className="flex flex-wrap gap-4">

  <a
    href={event.registrationUrl || "/contact"}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex rounded-lg bg-orange-600 px-6 py-3 font-semibold hover:bg-orange-500"
  >
    Register / Inquire
  </a>

  {event.flyerUrl && (
    <a
      href={event.flyerUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex rounded-lg border border-zinc-700 px-6 py-3 font-semibold hover:bg-zinc-900"
    >
      Download Flyer
    </a>
  )}

</div>
      </div>
    </main>
  );
}