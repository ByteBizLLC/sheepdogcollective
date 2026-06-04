import { site } from "@/lib/site-data";

export default function ContactPage() {
  return (
    <main className="px-6 py-20">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.3em] text-orange-500">Contact Us</p>
          <h1 className="mt-4 text-5xl font-black text-white">Tell us what training you need.</h1>
          <p className="mt-6 text-lg leading-8 text-zinc-300">
            Contact us with your training needs, and we will tailor programs to suit you.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8">
          <h2 className="text-2xl font-black text-white">{site.name}</h2>
          <div className="mt-6 space-y-3 text-zinc-300">
            <p>{site.address[0]}</p>
            <p>{site.address[1]}</p>
            <p>
              <a className="text-orange-500" href={`mailto:${site.email}`}>{site.email}</a>
            </p>
            <p>
              <a className="text-orange-500" href={site.phoneHref}>{site.phone}</a>
            </p>
          </div>

          <div className="mt-8 rounded-xl border border-orange-500/30 bg-orange-600/10 p-5">
            <p className="font-bold text-white">Custom program needs?</p>
            <p className="mt-2 text-sm leading-6 text-zinc-300">
              We can build training around your agency, facility, schedule, personnel, and operational realities.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
