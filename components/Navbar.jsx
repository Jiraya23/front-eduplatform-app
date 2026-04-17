// components/Navbar.jsx
// Navbar partagée entre toutes les pages
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const C = {
  green: "#1a7a4a",
  white: "#ffffff",
  text: "#111827",
  muted: "#6b7280",
  border: "#e5e7eb",
};

export default function Navbar() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) return null; // Pas de navbar sur les pages admin

  return (
    <nav
      style={{
        height: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 6%",
        background: C.white,
        borderBottom: `1px solid ${C.border}`,
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      {/* Logo */}
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
        <span style={{ fontSize: 22 }}>🎓</span>
        <span style={{ fontWeight: 800, fontSize: 17, color: C.green }}>
          EduPlattform
        </span>
      </Link>

      {/* Liens */}
      <div style={{ display: "flex", gap: 28 }}>
        {[
          { label: "Courses", href: "/catalogue" },
          { label: "Scholarships", href: "#" },
          { label: "Mentors", href: "#" },
          { label: "Community", href: "#" },
        ].map((l) => (
          <Link
            key={l.label}
            href={l.href}
            style={{
              textDecoration: "none",
              color: pathname === l.href ? C.green : C.muted,
              fontSize: 14,
              fontWeight: pathname === l.href ? 700 : 500,
              borderBottom: pathname === l.href ? `2px solid ${C.green}` : "none",
              paddingBottom: 2,
            }}
          >
            {l.label}
          </Link>
        ))}
      </div>

      {/* Auth */}
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <Link
          href="/login"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: 14,
            fontWeight: 600,
            color: C.text,
            textDecoration: "none",
          }}
        >
          Sign In
        </Link>
        <Link
          href="/register"
          style={{
            background: C.green,
            color: C.white,
            border: "none",
            padding: "9px 20px",
            borderRadius: 8,
            fontWeight: 700,
            fontSize: 14,
            cursor: "pointer",
            textDecoration: "none",
          }}
        >
          Join Free
        </Link>
      </div>
    </nav>
  );
}
