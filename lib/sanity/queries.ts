import { sanityClient, sanityConfigured } from "@/lib/sanity/client";
import {
  fallbackTrainingEvents,
  normalizeTrainingEvent,
  type TrainingEvent,
} from "@/lib/events";

const trainingEventsQuery = `
  *[_type == "trainingEvent" && !(_id in path("drafts.**")) && coalesce(visibility, "published") != "archived"] | order(startDate asc) {
    title,
    shortTitle,
    "slug": slug.current,
    programSlug,
    startDate,
    endDate,
    displayDate,
    venue,
    location,
    summary,
    "status": coalesce(eventStatus, "Scheduled"),
    registrationUrl,
    "flyerUrl": flyer.asset->url,
    maxSeats,
    seatsRemaining,
    registrationDeadline,
    featured
  }
`;

const trainingEventBySlugQuery = `
  *[
    _type == "trainingEvent" &&
    !(_id in path("drafts.**")) &&
    slug.current == $slug
  ][0]{
    title,
    shortTitle,
    "slug": slug.current,
    programSlug,
    startDate,
    endDate,
    displayDate,
    venue,
    location,
    summary,
    "status": coalesce(eventStatus, "Scheduled"),
    registrationUrl,
    "flyerUrl": flyer.asset->url,
    maxSeats,
    seatsRemaining,
    registrationDeadline,
    featured
  }
`;


export async function getTrainingEvents(): Promise<TrainingEvent[]> {
  if (!sanityConfigured) {
    return fallbackTrainingEvents;
  }

  try {
    const results = await sanityClient.fetch<Partial<TrainingEvent>[]>(
      trainingEventsQuery,
      {},
      { next: { revalidate: 60 } },
    );

    const events = results
      .map((event) => normalizeTrainingEvent(event))
      .filter((event): event is TrainingEvent => event !== null);

    return events.length > 0 ? events : fallbackTrainingEvents;
  } catch (error) {
    console.error("Sanity event fetch failed. Falling back to local event data.", error);
    return fallbackTrainingEvents;
  }
}

export async function getTrainingEventBySlug(slug: string) {
  if (!sanityConfigured) {
    return null;
  }

  try {
    const event = await sanityClient.fetch(
      trainingEventBySlugQuery,
      { slug },
      { next: { revalidate: 60 } },
    );

    return event;
  } catch (error) {
    console.error("Failed to fetch event:", error);
    return null;
  }
}

export type Program = {
  title: string;
  slug: string;
  duration?: string;
  summary?: string;
  details?: string[];
  flyer?: string;
  featured?: boolean;
  displayOrder?: number;
  visible?: boolean;
};

const programsQuery = `
  *[
    _type == "program" &&
    !(_id in path("drafts.**")) &&
    coalesce(visible, true) == true
  ] | order(coalesce(displayOrder, 100) asc, title asc) {
    title,
    "slug": slug.current,
    duration,
    summary,
    details,
    "flyer": flyer.asset->url,
    featured,
    displayOrder,
    visible
  }
`;

const programBySlugQuery = `
  *[
    _type == "program" &&
    !(_id in path("drafts.**")) &&
    slug.current == $slug &&
    coalesce(visible, true) == true
  ][0]{
    title,
    "slug": slug.current,
    duration,
    summary,
    details,
    "flyer": flyer.asset->url,
    featured,
    displayOrder,
    visible
  }
`;

export async function getPrograms(): Promise<Program[]> {
  if (!sanityConfigured) {
    const { courses } = await import("@/lib/site-data");
    return courses;
  }

  try {
    const programs = await sanityClient.fetch<Program[]>(
      programsQuery,
      {},
      { next: { revalidate: 60 } }
    );

    if (programs.length > 0) {
      return programs;
    }

    const { courses } = await import("@/lib/site-data");
    return courses;
  } catch (error) {
    console.error("Failed to fetch programs. Falling back to local course data.", error);
    const { courses } = await import("@/lib/site-data");
    return courses;
  }
}

export async function getProgramBySlug(slug: string): Promise<Program | null> {
  if (!sanityConfigured) {
    const { courses } = await import("@/lib/site-data");
    return courses.find((course) => course.slug == slug) || null;
  }

  try {
    const program = await sanityClient.fetch<Program | null>(
      programBySlugQuery,
      { slug },
      { next: { revalidate: 60 } }
    );

    if (program) {
      return program;
    }

    const { courses } = await import("@/lib/site-data");
    return courses.find((course) => course.slug == slug) || null;
  } catch (error) {
    console.error("Failed to fetch program by slug. Falling back to local course data.", error);
    const { courses } = await import("@/lib/site-data");
    return courses.find((course) => course.slug == slug) || null;
  }
}

export async function getEventsByProgramSlug(programSlug: string) {
  if (!sanityConfigured) {
    return [];
  }

  try {
    return await sanityClient.fetch(
      `
        *[
          _type == "trainingEvent" &&
          !(_id in path("drafts.**")) &&
          programSlug == $programSlug
        ] | order(startDate asc) {
          title,
          shortTitle,
          "slug": slug.current,
          programSlug,
          startDate,
          endDate,
          displayDate,
          venue,
          location,
          summary,
          "status": coalesce(eventStatus, "Scheduled"),
          maxSeats,
          seatsRemaining,
          registrationDeadline
        }
      `,
      { programSlug },
      { next: { revalidate: 60 } }
    );
  } catch (error) {
    console.error("Failed to fetch events by program:", error);
    return [];
  }
}