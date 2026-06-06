import { events as fallbackEvents } from "@/lib/site-data";

export type TrainingEvent = {
  title: string;
  shortTitle?: string;
  date: string;
  startDate: string;
  endDate: string;
  displayDate: string;
  venue: string;
  location: string;
  slug: string;
  status: string;
  summary: string;
  registrationUrl?: string;
  flyerUrl?: string;
  maxSeats?: number;
  seatsRemaining?: number;
  registrationDeadline?: string;
  featured?: boolean;
};

export const fallbackTrainingEvents: TrainingEvent[] = fallbackEvents.map((event) => ({
  ...event,
  status: event.status ?? "Scheduled",
}));

export function formatEventDate(startDate: string, endDate?: string) {
  const start = new Date(`${startDate}T12:00:00`);
  const end = endDate ? new Date(`${endDate}T12:00:00`) : start;

  const startMonth = start.toLocaleDateString("en-US", { month: "long" });
  const endMonth = end.toLocaleDateString("en-US", { month: "long" });
  const startDay = start.getDate();
  const endDay = end.getDate();
  const year = end.getFullYear();

  if (startDate === endDate || !endDate) {
    return `${startMonth} ${startDay}, ${year}`;
  }

  if (start.getFullYear() === end.getFullYear() && start.getMonth() === end.getMonth()) {
    return `${startMonth} ${startDay}–${endDay}, ${year}`;
  }

  return `${startMonth} ${startDay} – ${endMonth} ${endDay}, ${year}`;
}

export function normalizeTrainingEvent(event: Partial<TrainingEvent>): TrainingEvent | null {
  if (!event.title || !event.startDate || !event.endDate) return null;

  const displayDate = event.displayDate || formatEventDate(event.startDate, event.endDate);
  const shortDate = event.date || displayDate.replace(/, \d{4}$/, "");

  return {
    title: event.title,
    shortTitle: event.shortTitle || event.title,
    date: shortDate,
    startDate: event.startDate,
    endDate: event.endDate,
    displayDate,
    venue: event.venue || "Venue TBD",
    location: event.location || "Location TBD",
    slug: event.slug || "contact",
    status: event.status || "Scheduled",
    summary: event.summary || "Course details will be posted soon.",
    registrationUrl: event.registrationUrl,
    flyerUrl: event.flyerUrl,
    maxSeats: event.maxSeats,
    seatsRemaining: event.seatsRemaining,
    registrationDeadline: event.registrationDeadline,
    featured: event.featured ?? false,
  };
}
