import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-8 md:flex-row lg:px-8">
        <div>
          <h3 className="text-lg font-bold text-white">Eventra</h3>
          <p className="mt-1 text-xs text-slate-500">
            © 2026 Eventra. All rights reserved.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-xs text-slate-500">
          {["Privacy", "Terms", "Support", "LinkedIn", "Instagram"].map(
            (item) => (
              <Link key={item} href="#" className="hover:text-white">
                {item}
              </Link>
            )
          )}
        </div>
      </div>
    </footer>
  );
}