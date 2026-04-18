"use client";

// src/app/catalogue/page.jsx
// US-02 : Catalogue des formations
// Utilise le fichier partagé src/data/courses.js

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { COURSES } from "@/data/courses";

const C = {
  green: "#1a7a4a", greenDark: "#0d3d24", greenLight: "#e8f5ee",
  gold: "#c8a84b", white: "#ffffff", bg: "#f0f2f5",
  text: "#111827", muted: "#6b7280", border: "#e5e7eb",
};

// Simulation état connexion — à remplacer par contexte Auth en production
const IS_LOGGED_IN = false;

/* ── CARD ────────────────────────────────────────────────── */
function CourseCard({ course }) {
  const router = useRouter();
  const [subscribed, setSubscribed] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubscribe = () => {
    // Si visiteur → redirection vers /register
    if (!IS_LOGGED_IN) {
      router.push("/register");
      return;
    }
    // Si apprenant connecté → souscription directe
    setSubscribed(true);
    setShowConfirm(true);
    setTimeout(() => setShowConfirm(false), 3000);
  };

  return (
    <div
      style={{
        background: C.white, borderRadius: 14, overflow: "hidden",
        border: `1px solid ${C.border}`, transition: "all .25s",
        display: "flex", flexDirection: "column", position: "relative",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 12px 36px rgba(0,0,0,.10)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Toast confirmation inscription */}
      {showConfirm && (
        <div style={{
          position: "absolute", top: 12, left: "50%",
          transform: "translateX(-50%)",
          background: C.green, color: C.white,
          padding: "8px 18px", borderRadius: 8,
          fontSize: 13, fontWeight: 700, zIndex: 10, whiteSpace: "nowrap",
        }}>
          ✓ Inscription confirmée !
        </div>
      )}

      {/* Image */}
      <div style={{ position: "relative", height: 190, overflow: "hidden" }}>
        <img
          src={course.image}
          alt={course.title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{
          position: "absolute", top: 12, left: 12,
          background: course.tagColor, color: C.white,
          fontSize: 11, fontWeight: 800, padding: "4px 10px", borderRadius: 5,
        }}>
          {course.tag}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "18px 20px 22px", flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Niveau + Durée */}
        <div style={{ display: "flex", gap: 16, marginBottom: 12 }}>
          <span style={{ fontSize: 11.5, color: C.muted, fontWeight: 600 }}>
            📶 {course.levelLabel}
          </span>
          <span style={{ fontSize: 11.5, color: C.muted, fontWeight: 600 }}>
            🕐 {course.duration}
          </span>
        </div>

        {/* Titre */}
        <h3 style={{ fontSize: 16, fontWeight: 800, color: C.text, marginBottom: 8, lineHeight: 1.35 }}>
          {course.title}
        </h3>

        {/* Description courte */}
        <p style={{ fontSize: 13.5, color: C.muted, lineHeight: 1.65, marginBottom: 18, flex: 1 }}>
          {course.shortDesc}
        </p>

        {/* Footer carte */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          paddingTop: 14, borderTop: `1px solid ${C.border}`,
        }}>
          <span style={{ fontSize: 15, fontWeight: 800, color: course.price === "GRATUIT" ? C.green : C.text }}>
            {course.price}
          </span>

          <div style={{ display: "flex", gap: 8 }}>
            {/* ← Voir détails → renvoie vers /formations/:id */}
            <Link
              href={`/formations/${course.id}`}
              style={{
                background: "none", border: `1.5px solid ${C.green}`,
                color: C.green, padding: "7px 14px", borderRadius: 7,
                fontSize: 12.5, fontWeight: 700, cursor: "pointer",
                textDecoration: "none", display: "inline-block",
                transition: "all .18s",
              }}
              onMouseEnter={e => e.currentTarget.style.background = C.greenLight}
              onMouseLeave={e => e.currentTarget.style.background = "none"}
            >
              Voir détails
            </Link>

            {/* S'inscrire */}
            <button
              onClick={handleSubscribe}
              style={{
                background: subscribed ? C.greenLight : C.green,
                color: subscribed ? C.green : C.white,
                border: `1.5px solid ${C.green}`,
                padding: "7px 14px", borderRadius: 7,
                fontSize: 12.5, fontWeight: 700, cursor: "pointer",
                transition: "all .18s",
              }}
            >
              {subscribed ? "✓ Inscrit" : "S'inscrire"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── PAGE ────────────────────────────────────────────────── */
export default function CataloguePage() {
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState("Tous les niveaux");

  const filtered = COURSES.filter(c => {
    const q = search.toLowerCase();
    const matchSearch =
      c.title.toLowerCase().includes(q) ||
      c.shortDesc.toLowerCase().includes(q);
    const matchLevel =
      level === "Tous les niveaux" ||
      (level === "Débutant" && c.level === "BEGINNER") ||
      (level === "Intermédiaire" && c.level === "INTERMEDIATE") ||
      (level === "Avancé" && c.level === "ADVANCED");
    return matchSearch && matchLevel;
  });

  return (
    <>
      <style>{`
        @media (max-width: 1024px) { .cat-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 640px) {
          .cat-grid { grid-template-columns: 1fr !important; }
          .cat-filters { flex-direction: column !important; }
        }
      `}</style>

      {/* Header */}
      <div style={{ background: C.white, borderBottom: `1px solid ${C.border}`, padding: "52px 6% 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h1 style={{
            fontSize: "clamp(2rem,4vw,2.8rem)", fontWeight: 900,
            color: C.text, marginBottom: 10, letterSpacing: -.4,
          }}>
            Discover Your <span style={{ color: C.green }}>Future.</span>
          </h1>
          <p style={{ fontSize: 15.5, color: C.muted, marginBottom: 32, maxWidth: 540, lineHeight: 1.6 }}>
            Access world-class curriculum. Start your journey with our curated course catalog.
          </p>

          {/* Filtres */}
          <div className="cat-filters" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <div style={{ position: "relative", flex: 1, minWidth: 220 }}>
              <span style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: C.muted }}>
                🔍
              </span>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search for courses, skills..."
                style={{
                  width: "100%", padding: "11px 13px 11px 40px",
                  border: `1.5px solid ${C.border}`, borderRadius: 9,
                  fontSize: 14, color: C.text, background: C.white, outline: "none",
                }}
                onFocus={e => e.target.style.borderColor = C.green}
                onBlur={e => e.target.style.borderColor = C.border}
              />
            </div>
            <select
              value={level}
              onChange={e => setLevel(e.target.value)}
              style={{
                padding: "11px 16px", border: `1.5px solid ${C.border}`,
                borderRadius: 9, fontSize: 14, color: C.text,
                background: C.white, outline: "none", cursor: "pointer",
              }}
            >
              {["Tous les niveaux", "Débutant", "Intermédiaire", "Avancé"].map(o => (
                <option key={o}>{o}</option>
              ))}
            </select>
            <button style={{
              background: C.text, color: C.white, border: "none",
              padding: "11px 22px", borderRadius: 9, fontWeight: 700,
              fontSize: 14, cursor: "pointer",
            }}>
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      {/* Grille des formations */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "36px 6% 80px" }}>
        <p style={{ fontSize: 14, color: C.muted, marginBottom: 24, fontWeight: 500 }}>
          {filtered.length} formation{filtered.length > 1 ? "s" : ""} trouvée{filtered.length > 1 ? "s" : ""}
        </p>

        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <div style={{ fontSize: 52, marginBottom: 16 }}>🔍</div>
            <p style={{ fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 8 }}>
              Aucune formation trouvée
            </p>
            <p style={{ fontSize: 14, color: C.muted }}>
              Essaie d'autres mots-clés ou modifie les filtres.
            </p>
          </div>
        ) : (
          <div className="cat-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {filtered.map(c => <CourseCard key={c.id} course={c} />)}
          </div>
        )}

        <div style={{ textAlign: "center", marginTop: 48 }}>
          <button style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "none", border: `1.5px solid ${C.border}`,
            color: C.text, padding: "12px 28px", borderRadius: 9,
            fontSize: 14, fontWeight: 600, cursor: "pointer",
          }}>
            View More Courses →
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ background: C.white, borderTop: `1px solid ${C.border}`, padding: "40px 6% 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1.5fr", gap: 40, marginBottom: 28 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <span style={{ fontSize: 20 }}>🎓</span>
                <span style={{ fontWeight: 800, fontSize: 16, color: C.green }}>EduPlattform</span>
              </div>
              <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.7, maxWidth: 260 }}>
                Elevating scholars through accessible, high-quality digital education.
              </p>
            </div>
            {[
              { title: "Platform", links: ["Curriculum", "Scholarships", "Mentors"] },
              { title: "Support", links: ["Help Center", "Contact", "Privacy Policy"] },
            ].map(col => (
              <div key={col.title}>
                <h4 style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 14 }}>{col.title}</h4>
                {col.links.map(l => (
                  <a key={l} href="#" style={{ display: "block", fontSize: 13, color: C.muted, textDecoration: "none", marginBottom: 8 }}>{l}</a>
                ))}
              </div>
            ))}
            <div>
              <h4 style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 14 }}>Newsletter</h4>
              <div style={{ display: "flex", gap: 6 }}>
                <input
                  placeholder="Your email"
                  style={{ flex: 1, padding: "9px 12px", border: `1.5px solid ${C.border}`, borderRadius: 7, fontSize: 13, outline: "none" }}
                />
                <button style={{ background: C.green, color: C.white, border: "none", borderRadius: 7, padding: "9px 12px", cursor: "pointer" }}>→</button>
              </div>
            </div>
          </div>
          <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 18, textAlign: "center", fontSize: 12, color: C.muted }}>
            © 2024 EduPlatform. Built for the Elevated Scholar.
          </div>
        </div>
      </footer>
    </>
  );
}
