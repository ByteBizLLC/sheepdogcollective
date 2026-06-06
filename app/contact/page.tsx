"use client";

import { useState } from "react";
import { site } from "@/lib/site-data";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    agency: "",
    email: "",
    phone: "",
    course: "",
    message: "",
  });

  const mailtoLink = () => {
    const subject = encodeURIComponent(
      `Training Inquiry: ${form.course || "General Inquiry"}`
    );

    const body = encodeURIComponent(`
Name: ${form.name}
Agency: ${form.agency}
Email: ${form.email}
Phone: ${form.phone}

Course/Event:
${form.course}

Message:
${form.message}
`);

    return `mailto:${site.email}?subject=${subject}&body=${body}`;
  };

  return (
    <main className="px-6 py-20">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.3em] text-orange-500">
            Contact Us
          </p>

          <h1 className="mt-4 text-5xl font-black text-white">
            Tell us what training you need.
          </h1>

          <p className="mt-6 text-lg leading-8 text-zinc-300">
            Contact us with your training needs, and we will tailor programs to
            suit your agency or organization.
          </p>

          <div className="mt-10 space-y-3 text-zinc-300">
            <p>{site.address[0]}</p>
            <p>{site.address[1]}</p>

            <p>
              <a
                className="text-orange-500"
                href={`mailto:${site.email}`}
              >
                {site.email}
              </a>
            </p>

            <p>
              <a
                className="text-orange-500"
                href={site.phoneHref}
              >
                {site.phone}
              </a>
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8">
          <h2 className="text-2xl font-black text-white">
            Training Inquiry
          </h2>

          <div className="mt-6 space-y-4">
            <input
              className="w-full rounded-lg border border-white/10 bg-black/30 p-3 text-white"
              placeholder="Name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <input
              className="w-full rounded-lg border border-white/10 bg-black/30 p-3 text-white"
              placeholder="Agency / Department"
              value={form.agency}
              onChange={(e) =>
                setForm({ ...form, agency: e.target.value })
              }
            />

            <input
              className="w-full rounded-lg border border-white/10 bg-black/30 p-3 text-white"
              placeholder="Email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />

            <input
              className="w-full rounded-lg border border-white/10 bg-black/30 p-3 text-white"
              placeholder="Phone"
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
            />

            <input
              className="w-full rounded-lg border border-white/10 bg-black/30 p-3 text-white"
              placeholder="Course or Event Interested In"
              value={form.course}
              onChange={(e) =>
                setForm({ ...form, course: e.target.value })
              }
            />

            <textarea
              rows={6}
              className="w-full rounded-lg border border-white/10 bg-black/30 p-3 text-white"
              placeholder="Tell us about your training needs..."
              value={form.message}
              onChange={(e) =>
                setForm({ ...form, message: e.target.value })
              }
            />

            <a
              href={mailtoLink()}
              className="inline-block rounded-lg bg-orange-500 px-6 py-3 font-bold text-white transition hover:bg-orange-600"
            >
              Send Inquiry
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}