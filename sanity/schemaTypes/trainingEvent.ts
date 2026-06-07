import { defineField, defineType } from "sanity";

export const trainingEvent = defineType({
  name: "trainingEvent",
  title: "Training Event",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Class Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "shortTitle",
      title: "Short Calendar Title",
      type: "string",
      description: "Short label shown inside the calendar box, for example: Dynamic & Shot...",
    }),
    defineField({
      name: "slug",
      title: "Event Slug",
      type: "slug",
      description: "Used internally. Click Generate after entering the title.",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "programSlug",
      title: "Program Page Link",
      type: "string",
      description:
        "Optional. Use a program slug like dynamic-shotgun-breaching so this event links to the matching course page.",
      options: {
        list: [
          { title: "Dynamic & Shotgun Breaching", value: "dynamic-shotgun-breaching" },
          { title: "Mental Health Crisis Encounters", value: "mental-health-crisis-encounters" },
          { title: "Officer Wellness & Resiliency", value: "officer-wellness-resiliency" },
          { title: "Remedial Firearms", value: "remedial-firearms" },
          { title: "Progressive Firearms", value: "progressive-firearms" },
          { title: "Building Clearing / CQB", value: "building-clearing-cqb" },
          { title: "Site Security & Safety Reviews", value: "site-security-safety-reviews" },
          { title: "Cell Extractions / Prisoner Movement", value: "cell-extractions-prisoner-movement" },
        ],
      },
    }),
    defineField({
      name: "startDate",
      title: "Start Date",
      type: "date",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "endDate",
      title: "End Date",
      type: "date",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "displayDate",
      title: "Display Date",
      type: "string",
      description: "Optional. Example: June 10–12, 2026. Leave blank to auto-format.",
    }),
    defineField({
      name: "venue",
      title: "Venue / Host Agency",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "location",
      title: "City / State",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Short Description",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "eventStatus",
      title: "Event Status Label",
      type: "string",
      initialValue: "Scheduled",
      options: {
        list: [
          { title: "Scheduled", value: "Scheduled" },
          { title: "Open Registration", value: "Open Registration" },
          { title: "Limited Seats", value: "Limited Seats" },
          { title: "Full", value: "Full" },
          { title: "Past", value: "Past" },
          { title: "Cancelled", value: "Cancelled" },
        ],
      },
    }),
    defineField({
      name: "visibility",
      title: "Website Visibility",
      type: "string",
      initialValue: "published",
      description: "Use Archived to remove an event from the website without deleting it.",
      options: {
        layout: "radio",
        list: [
          { title: "Show on Website", value: "published" },
          { title: "Archived / Hidden", value: "archived" },
        ],
      },
    }),
    defineField({
      name: "registrationUrl",
      title: "Registration / Inquiry Link",
      type: "url",
      description: "Optional. If blank, the website will use the Contact page.",
    }),
    defineField({
      name: "flyer",
      title: "Class Flyer PDF",
      type: "file",
      description: "Upload a PDF flyer for this class.",
      options: { accept: ".pdf" },
    }),

defineField({
  name: "heroImage",
  title: "Hero Image",
  type: "image",
  options: {
    hotspot: true,
  },
}),
    defineField({
      name: "maxSeats",
      title: "Maximum Seats",
      type: "number",
      validation: (rule) => rule.integer().min(0),
    }),
    defineField({
      name: "seatsRemaining",
      title: "Seats Remaining",
      type: "number",
      validation: (rule) => rule.integer().min(0),
    }),
defineField({
  name: "duration",
  title: "Course Duration",
  type: "string",
  description: "Example: 3 Days",
}),
defineField({
  name: "tuition",
  title: "Tuition",
  type: "string",
  description: "Example: $399",
}),
defineField({
  name: "leadInstructor",
  title: "Lead Instructor",
  type: "string",
}),
defineField({
  name: "instructorBio",
  title: "Instructor Bio",
  type: "text",
  rows: 5,
}),
defineField({
  name: "targetAudience",
  title: "Who Should Attend",
  type: "text",
  rows: 4,
}),
defineField({
  name: "prerequisites",
  title: "Prerequisites",
  type: "array",
  of: [{ type: "string" }],
}),
defineField({
  name: "courseOutline",
  title: "Course Outline",
  type: "array",
  of: [{ type: "string" }],
}),
    defineField({
      name: "registrationDeadline",
      title: "Registration Deadline",
      type: "date",
    }),
    defineField({
      name: "featured",
      title: "Featured Event",
      type: "boolean",
      initialValue: false,
      description: "Optional. Can be used later for homepage highlights.",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "displayDate",
      startDate: "startDate",
      visibility: "visibility",
    },
    prepare(selection) {
      const subtitle = [selection.subtitle || selection.startDate, selection.visibility === "archived" ? "Archived" : "Visible"]
        .filter(Boolean)
        .join(" · ");
      return { title: selection.title, subtitle };
    },
  },
});
