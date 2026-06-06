import { defineField, defineType } from "sanity";

export const program = defineType({
  name: "program",
  title: "Program",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Program Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Program Slug",
      type: "slug",
      description: "Used for the program page URL. Click Generate after entering the title.",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "duration",
      title: "Duration",
      type: "string",
      description: "Example: 3 Days, Custom, 8 Hours",
    }),
    defineField({
      name: "summary",
      title: "Short Summary",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "details",
      title: "Course Details",
      type: "array",
      of: [{ type: "string" }],
      description: "Add one bullet point per line/item.",
    }),
    defineField({
      name: "flyer",
      title: "Course Flyer PDF",
      type: "file",
      options: {
        accept: "application/pdf",
      },
    }),
    defineField({
      name: "featured",
      title: "Featured Program",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "displayOrder",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first. Example: 1, 2, 3.",
      initialValue: 100,
    }),
    defineField({
      name: "visible",
      title: "Visible on Website",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "duration",
    },
  },
});
