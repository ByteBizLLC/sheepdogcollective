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
    "programPageSlug": programPage->slug.current,
    startDate,
    endDate,
    displayDate,
    venue,
    location,
    summary,
    "status": coalesce(eventStatus, "Scheduled"),
    registrationUrl,
    "flyerUrl": flyer.asset->url,
    "heroImage": heroImage.asset->url,
    maxSeats,
    seatsRemaining,
    registrationDeadline,
    featured,
    duration,
    tuition,
    leadInstructor,
    instructorBio,
    targetAudience,
    prerequisites,
    courseOutline
  }
`;

const trainingEventBySlugQuery = `
  *[
    _type == "trainingEvent" &&
    !(_id in path("drafts.**")) &&
    (
      slug.current == $slug ||
      programSlug == $slug
    )
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
    "heroImage": heroImage.asset->url,
    maxSeats,
    seatsRemaining,
    registrationDeadline,
    featured,
    duration,
    tuition,
    leadInstructor,
    instructorBio,
    targetAudience,
    prerequisites,
    courseOutline
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

export async function getEventsByProgramSlug(programSlug: string): Promise<TrainingEvent[]> {
  const events = await getTrainingEvents();
  return events.filter((event: any) => event.programSlug === programSlug);
}

export async function getPrograms() {
  try {
    const programs = await sanityClient.fetch(
      `*[_type == "program" && !(_id in path("drafts.**"))] | order(title asc) {
        title,
        "slug": slug.current,
        duration,
        summary,
        details,
        "flyer": flyer.asset->url
      }`,
      {},
      { next: { revalidate: 60 } },
    );

    if (programs?.length) return programs;
  } catch (error) {
    console.error("Failed to fetch programs. Falling back to local data.", error);
  }

  const { courses } = await import("@/lib/site-data");
  return courses;
}

export async function getProgramBySlug(slug: string) {
  const programs = await getPrograms();
  return programs.find((program: any) => program.slug === slug) || null;
}
