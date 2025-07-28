"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function Header() {
  const pathname = usePathname();

  return (
    <nav className="bg-primary text-secondary flex w-screen justify-between px-10 py-6 text-xl transition-colors">
      <div className="flex gap-3">
        <Link
          href="/"
          className={`hover:text-primary-light cursor-pointer ${
            pathname === "/" ? "text-primary-light" : ""
          }`}
        >
          Busca un profe
        </Link>
        <Link
          href="/new/teacher"
          className={`hover:text-primary-light cursor-pointer ${
            pathname === "/new/teacher" ? "text-primary-light" : ""
          }`}
        >
          Crea un profe
        </Link>
      </div>
      <div className="flex gap-3">
        <Link
          href="/new/review"
          className={`hover:text-primary-light cursor-pointer ${
            pathname === "/new/review" ? "text-primary-light" : ""
          }`}
        >
          Sube una reseña
        </Link>
        <Link
          href="/top"
          className={`hover:text-primary-light cursor-pointer ${
            pathname === "/top" ? "text-primary-light" : ""
          }`}
        >
          Top profes
        </Link>
      </div>
    </nav>
  );
}

export default Header;
