"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { events } from "@/lib/site-data";

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function formatMonthTitle(date: Date) {
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

function toDateOnly(date: Date) {
  return date.toISOString().slice(0, 10);
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function eventsForDay(date: Date) {
  const dateText = toDateOnly(date);
  return events.filter((event) => dateText >= event.startDate && dateText <= event.endDate);
}

export default function CalendarPage() {
  const today = new Date();

  const [currentMonth, setCurrentMonth] = useState(() => {
    const firstEvent = events[0]?.startDate ? new Date(`${events[0].startDate}T12:00:00`) : today;
    return new Date(firstEvent.getFullYear(), firstEvent.getMonth(), 1);
  });

  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const blanks = firstDay.getDay();

    return [
      ...Array.from({ length: blanks }, (_, index) => ({
        type: "blank" as const,
        key: `blank-${index}`,
      })),
      ...Array.from({ length: daysInMonth }, (_, index) => ({
        type: "day" as const,
        key: `day-${index + 1}`,
        date: new Date(year, month, index + 1, 12, 0, 0),
      })),
    ];
  }, [currentMonth]);

  const monthEvents = events.filter((event) => {
    const start = new Date(`${event.startDate}T12:00:00`);
    const end = new Date(`${event.endDate}T12:00:00`);
    const monthStart = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1, 12, 0, 0);
    const monthEnd = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0, 12, 0, 0);
    return start <= monthEnd && end >= monthStart;
  });

  function previousMonth() {
    setCurrentMonth((month) => new Date(month.getFullYear(), month.getMonth() - 1, 1));
  }

  function nextMonth() {
    setCurrentMonth((month) => new Date(month.getFullYear(), month.getMonth() + 1, 1));
  }

  function goToCurrentMonth() {
    setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1));
  }

  return (
    <main className="px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-black uppercase tracking-[0.3em] text-orange-500">Event Calendar</p>
        <div className="mt-4 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <h1 className="text-5xl font-black text-white">Upcoming and past classes</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-300">
              Click any event to view class details and request registration. Use the arrows to browse
              other months, including months without scheduled classes.
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex w-fit rounded-md bg-orange-600 px-5 py-3 font-black text-white hover:bg-orange-500"
          >
            Register / Inquire →
          </Link>
        </div>

        <section className="mt-12 rounded-3xl border border-white/10 bg-white/[0.04] p-4 shadow-2xl md:p-6">
          <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={previousMonth}
                aria-label="Previous month"
                className="rounded-md border border-white/20 px-3 py-2 text-zinc-300 hover:border-orange-500 hover:bg-white/10 hover:text-orange-400"
              >
                ‹
              </button>

              <h2 className="text-3xl font-black uppercase tracking-tight text-white">
                {formatMonthTitle(currentMonth)}
              </h2>

              <button
                type="button"
                onClick={nextMonth}
                aria-label="Next month"
                className="rounded-md border border-white/20 px-3 py-2 text-zinc-300 hover:border-orange-500 hover:bg-white/10 hover:text-orange-400"
              >
                ›
              </button>
            </div>

            <button
              type="button"
              onClick={goToCurrentMonth}
              className="w-fit rounded-md border border-white/20 px-4 py-2 text-sm font-black uppercase tracking-wide text-zinc-300 hover:border-orange-500 hover:bg-white/10 hover:text-orange-400"
            >
              Current Month
            </button>
          </div>

          <div className="calendar-grid border-l border-t border-white/10">
            {weekdays.map((day) => (
              <div
                key={day}
                className="border-b border-r border-white/10 bg-zinc-950 px-2 py-2 text-center text-xs font-black uppercase tracking-[0.2em] text-zinc-400"
              >
                {day}
              </div>
            ))}

            {calendarDays.map((cell) => {
              if (cell.type === "blank") {
                return <div key={cell.key} className="calendar-cell border-b border-r border-white/10 bg-black/30" />;
              }

              const dayEvents = eventsForDay(cell.date);
              const isToday = isSameDay(cell.date, today);

              return (
                <div
                  key={cell.key}
                  className={`calendar-cell border-b border-r border-white/10 p-2 ${
                    isToday ? "bg-orange-600/10 ring-1 ring-inset ring-orange-500/50" : "bg-zinc-900/70 hover:bg-zinc-900"
                  }`}
                >
                  <div className={`text-sm font-black ${isToday ? "text-orange-400" : "text-zinc-400"}`}>
                    {cell.date.getDate()}
                  </div>

                  <div className="mt-2 space-y-1">
                    {dayEvents.map((event) => (
                      <Link
                        key={`${event.slug}-${toDateOnly(cell.date)}`}
                        href={`/programs/${event.slug}`}
                        className="block truncate rounded bg-orange-600 px-2 py-1 text-[11px] font-black text-white hover:bg-orange-500"
                        title={event.title}
                      >
                        {event.shortTitle ?? event.title}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-12">
          <p className="text-sm font-black uppercase tracking-[0.3em] text-orange-500">
            {monthEvents.length > 0 ? "Events This Month" : "No Events This Month"}
          </p>

          {monthEvents.length > 0 ? (
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              {monthEvents.map((event) => (
                <Link
                  key={event.slug}
                  href={`/programs/${event.slug}`}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 hover:border-orange-500"
                >
                  <p className="text-sm font-bold uppercase tracking-[0.25em] text-orange-500">
                    {event.displayDate}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <h2 className="text-2xl font-black text-white">{event.title}</h2>
                    <span className="rounded bg-orange-600/20 px-2 py-1 text-xs font-black uppercase text-orange-400">
                      {event.status}
                    </span>
                  </div>
                  <p className="mt-3 text-zinc-300">{event.venue}</p>
                  <p className="text-zinc-400">{event.location}</p>
                  <p className="mt-3 text-zinc-300">{event.summary}</p>
                  <p className="mt-5 font-bold text-orange-500">View details →</p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="mt-5 rounded-2xl border border-dashed border-white/15 bg-white/[0.03] p-6">
              <h2 className="text-xl font-black text-white">No scheduled classes for this month.</h2>
              <p className="mt-2 max-w-3xl text-zinc-400">
                Browse another month, or contact us to request a custom class for your agency.
              </p>
              <Link href="/contact" className="mt-5 inline-block font-black uppercase text-orange-500 hover:text-orange-400">
                Request Training →
              </Link>
            </div>
          )}
        </section>

        <section className="mt-12">
          <p className="text-sm font-black uppercase tracking-[0.3em] text-orange-500">All Events</p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {events.map((event) => (
              <Link
                key={`all-${event.slug}`}
                href={`/programs/${event.slug}`}
                className="rounded-xl border border-white/10 bg-zinc-950/70 p-4 hover:border-orange-500"
              >
                <h3 className="font-black uppercase text-white">{event.title}</h3>
                <p className="mt-1 text-sm text-zinc-400">{event.displayDate}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
