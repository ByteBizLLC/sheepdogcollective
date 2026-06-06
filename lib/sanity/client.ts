import { createClient } from "next-sanity";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-06-04";

export const sanityConfigured = Boolean(projectId && projectId !== "your-project-id");

export const sanityClient = createClient({
  projectId: projectId || "your-project-id",
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === "production",
});
