"use client";

import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

function Header() {
  const pathname = usePathname();
  const [showMenu, setShowModal] = useState(false);
  return (
    <nav className="bg-primary text-secondary flex w-screen items-center justify-center py-6 text-xl transition-all md:px-10">
      <div className="hidden w-full justify-between md:flex">
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
      </div>
      <div className="mx-auto block w-full md:hidden">
        <MenuIcon
          className="mx-auto block size-10 cursor-pointer text-white md:hidden"
          onClick={() => setShowModal(!showMenu)}
        ></MenuIcon>
      </div>
      <div
        className={`bg-primary absolute flex w-screen -translate-x-200 translate-y-20 flex-col items-center p-3 transition-transform md:hidden ${showMenu && "translate-x-0"}`}
      >
        <Link
          href="/"
          className={`hover:text-primary-light cursor-pointer ${
            pathname === "/" ? "text-primary-light" : ""
          }`}
          onClick={() => setShowModal(false)}
        >
          Busca un profe
        </Link>
        <Link
          href="/new/teacher"
          className={`hover:text-primary-light cursor-pointer ${
            pathname === "/new/teacher" ? "text-primary-light" : ""
          }`}
          onClick={() => setShowModal(false)}
        >
          Crea un profe
        </Link>
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
          onClick={() => setShowModal(false)}
        >
          Top profes
        </Link>
      </div>
    </nav>
  );
}

export default Header;
