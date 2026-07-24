"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSpecInfo } from "./PlayerProvider";
import AmbientMusicControl from "./AmbientMusicControl";

const LINKS = [
  { href: "/", label: "Command" },
  { href: "/character", label: "Character" },
  { href: "/evolution", label: "Evolution" },
  { href: "/specializations", label: "Specializations" },
];

export default function NavHeader() {
  const pathname = usePathname();
  const spec = useSpecInfo();

  return (
    <div className="flex flex-wrap items-baseline justify-between gap-6">
      <div className="flex items-baseline gap-4">
        <div className="text-2xl font-bold tracking-[0.44em] text-[#E8EAF2]">
          ASCEND
        </div>
        <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#565d70]">
          Personal RPG · Operating System
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <nav className="flex gap-6 font-mono text-[11px] tracking-[0.18em] uppercase">
          {LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={active ? "" : "text-[#565d70] hover:text-[#9299AD]"}
                style={active ? { color: spec.accent } : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <AmbientMusicControl />
      </div>
    </div>
  );
}
