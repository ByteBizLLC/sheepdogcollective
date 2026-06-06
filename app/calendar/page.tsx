import { CalendarClient } from "./CalendarClient";
import { getTrainingEvents } from "@/lib/sanity/queries";

export const revalidate = 60;

export default async function CalendarPage() {
  const events = await getTrainingEvents();
  return <CalendarClient events={events} />;
}
