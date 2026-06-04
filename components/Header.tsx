import Image from "next/image";
import Link from "next/link";
import { navItems, site } from "@/lib/site-data";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/sheepdog-logo.svg"
            alt="The Sheepdog Collective logo"
            width={52}
            height={52}
            priority
            className="rounded-sm"
          />
          <div>
            <p className="text-base font-black uppercase tracking-wide text-white">{site.name}</p>
            <p className="text-xs text-zinc-400">{site.tagline}</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-semibold text-zinc-300 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-orange-500">
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/contact"
          className="rounded-md bg-orange-600 px-4 py-2 text-sm font-bold text-white hover:bg-orange-500"
        >
          Contact
        </Link>
      </div>
    </header>
  );
}
