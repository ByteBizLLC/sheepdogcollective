import Link from "next/link";
import { navItems, site } from "@/lib/site-data";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-zinc-950 px-6 py-10">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
        <div>
          <p className="text-lg font-black">{site.legalName}</p>
          <p className="mt-2 text-sm text-zinc-400">{site.tagline}</p>
        </div>

        <div className="flex flex-col gap-2 text-sm text-zinc-300">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-orange-500">
              {item.label}
            </Link>
          ))}
        </div>

        <div className="text-sm leading-7 text-zinc-400">
          <p>{site.address[0]}</p>
          <p>{site.address[1]}</p>
          <p>
            <a href={`mailto:${site.email}`} className="text-orange-500">{site.email}</a>
          </p>
          <p>
            <a href={site.phoneHref} className="text-orange-500">{site.phone}</a>
          </p>
        </div>
      </div>

      <p className="mx-auto mt-10 max-w-7xl text-xs text-zinc-600">
        © {new Date().getFullYear()} {site.legalName}. All rights reserved.
      </p>
    </footer>
  );
}
