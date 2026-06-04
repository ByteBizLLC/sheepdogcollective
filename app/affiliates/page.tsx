import { affiliates } from "@/lib/site-data";

export default function AffiliatesPage() {
  return (
    <main className="px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-black uppercase tracking-[0.3em] text-orange-500">Friends & Affiliates</p>
        <h1 className="mt-4 text-5xl font-black text-white">Trusted partners and training resources.</h1>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {affiliates.map((affiliate) => (
            <a
              key={affiliate.name}
              href={affiliate.url}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 hover:border-orange-500"
            >
              <h2 className="text-xl font-black text-white">{affiliate.name}</h2>
              <p className="mt-5 text-sm font-bold text-orange-500">Visit website →</p>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
