import Link from "next/link";
import React from "react";

function Header() {
  return (
    <nav className="w-screen px-10 py-6 bg-primary flex justify-between text-xl text-secondary">
      <div className="flex gap-3">
        <Link href={"/"}>Busca un profe</Link>
        <Link href={"/new/teacher"}>Crea un profe</Link>
      </div>
      <div className="flex gap-3">
        <Link href={"/new/review"}>Sube una reseña</Link>
        <Link href={"/top"}>Top profes</Link>
      </div>
    </nav>
  );
}

export default Header;
