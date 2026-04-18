"use client";

// src/app/formations/[id]/page.jsx
// US-03 : Détails d'une formation
// Récupère la formation par son id depuis src/data/courses.js

import { useState } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { COURSES } from "@/data/courses";

const C = {
  green: "#1a7a4a", greenDark: "#0d3d24", greenLight: "#e8f5ee",
  gold: "#c8a84b", white: "#ffffff", bg: "#f0f2f5",
  text: "#111827", muted: "#6b7280", border: "#e5e7eb",
};

const IS_LOGGED_IN = false;

export default function CourseDetailPage() {
  const router = useRouter();
  const params = useParams();

  // ← Récupère la formation correspondant à l'id dans l'URL
  const course = COURSES.find(c => c.id === parseInt(params.id));

  const [openModules, setOpenModules] = useState({ 1: true });
  const [subscribeSuccess, setSubscribeSuccess] = useState(false);

  const toggleModule = id => setOpenModules(p => ({ ...p, [id]: !p[id] }));

  const handleSubscribe = () => {
    if (!IS_LOGGED_IN) {
      router.push("/register");
      return;
    }
    setSubscribeSuccess(true);
    setTimeout(() => router.push(`/learn/1`), 1200);
  };

  // ← Si la formation n'existe pas → page 404 propre
  if (!course) {
    return (
      <div style={{ minHeight: "80vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 20px", textAlign: "center" }}>
        <div style={{ fontSize: 64, marginBottom: 20 }}>😕</div>
        <h2 style={{ fontSize: "1.8rem", fontWeight: 900, color: C.text, marginBottom: 12 }}>
          Formation introuvable
        </h2>
        <p style={{ fontSize: 15, color: C.muted, marginBottom: 28, lineHeight: 1.7 }}>
          La formation que tu cherches n'existe pas ou a été supprimée.
        </p>
        <Link
          href="/catalogue"
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: C.green, color: C.white,
            padding: "12px 28px", borderRadius: 9,
            fontWeight: 700, fontSize: 15, textDecoration: "none",
          }}
        >
          ← Retour au catalogue
        </Link>
      </div>
    );
  }

  return (
    <>
      <style>{`
        .detail-body { display: grid; grid-template-columns: 1fr 320px; gap: 36px; }
        .detail-sidebar { position: sticky; top: 76px; align-self: start; }
        .hero-grid { display: grid; grid-template-columns: 1fr 340px; gap: 56px; align-items: flex-start; }
        .objectives-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        @media (max-width: 960px) {
          .hero-grid, .detail-body { grid-template-columns: 1fr !important; }
          .detail-sidebar { position: static !important; }
        }
        @media (max-width: 640px) {
          .objectives-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── HERO BANNER ─────────────────────────────────────── */}
      <div style={{ background: C.white, padding: "48px 6% 40px", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>

          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16, fontSize: 13, color: C.muted }}>
            <Link href="/" style={{ color: C.muted, textDecoration: "none" }}>Accueil</Link>
            <span>›</span>
            <Link href="/catalogue" style={{ color: C.green, fontWeight: 500, textDecoration: "none" }}>Catalogue</Link>
            <span>›</span>
            <span style={{ color: C.text, fontWeight: 500 }}>{course.title}</span>
          </div>

          <div className="hero-grid">
            <div>
              {/* Badge catégorie */}
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 14, fontSize: 11, fontWeight: 700, color: C.green, letterSpacing: 1.5, textTransform: "uppercase" }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: C.green, display: "inline-block" }} />
                {course.category}
              </div>

              {/* Titre dynamique */}
              <h1 style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 900, color: C.text, lineHeight: 1.15, marginBottom: 14, letterSpacing: -.4 }}>
                {course.title}
              </h1>
              <p style={{ fontSize: 15, color: C.muted, lineHeight: 1.75, marginBottom: 22, maxWidth: 580 }}>
                {course.tagline}
              </p>

              {/* Bouton + Rating */}
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28, flexWrap: "wrap" }}>
                <button
                  onClick={handleSubscribe}
                  style={{ background: C.green, color: C.white, border: "none", padding: "12px 28px", borderRadius: 9, fontWeight: 700, fontSize: 15, cursor: "pointer", boxShadow: "0 4px 16px rgba(26,122,74,.3)" }}
                >
                  {subscribeSuccess ? "✓ Inscrit ! Redirection…" : "S'inscrire à cette formation"}
                </button>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ color: C.gold, fontSize: 16 }}>★</span>
                  <span style={{ fontWeight: 700, fontSize: 15 }}>{course.rating}</span>
                  <span style={{ color: C.muted, fontSize: 13 }}>({course.reviews.toLocaleString()} Reviews)</span>
                </div>
              </div>

              {/* Métadonnées dynamiques */}
              <div style={{ display: "flex", gap: 36, flexWrap: "wrap" }}>
                {[
                  { label: "Durée", val: course.duration },
                  { label: "Niveau", val: course.levelLabel },
                  { label: "Certificat", val: course.certificate },
                  { label: "Langue", val: course.lang },
                ].map(m => (
                  <div key={m.label}>
                    <div style={{ fontSize: 10.5, color: C.muted, fontWeight: 600, textTransform: "uppercase", letterSpacing: .5, marginBottom: 4 }}>{m.label}</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{m.val}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Teaser vidéo — visible sans compte */}
            <div style={{ borderRadius: 14, overflow: "hidden", boxShadow: "0 12px 40px rgba(0,0,0,.12)", cursor: "pointer" }}>
              <div style={{ position: "relative", height: 195 }}>
                <img
                  src={course.image}
                  alt={course.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
                <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.35)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 10 }}>
                  <div style={{ width: 60, height: 60, borderRadius: "50%", background: "rgba(255,255,255,.9)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>▶</div>
                  <span style={{ color: C.white, fontSize: 12.5, fontWeight: 600, background: "rgba(0,0,0,.4)", padding: "4px 12px", borderRadius: 6 }}>Aperçu gratuit · 3 min</span>
                </div>
              </div>
              <div style={{ background: C.white, padding: "14px 18px" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>Voir un extrait de la formation</div>
                <div style={{ fontSize: 12, color: C.muted, marginTop: 3 }}>Aucun compte requis pour le teaser</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── BODY ─────────────────────────────────────────────── */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 6% 80px" }}>
        <div className="detail-body">

          {/* ── COLONNE GAUCHE ──────────────────────────────── */}
          <div>
            {/* Description */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 14, padding: "28px", marginBottom: 22 }}>
              <h2 style={{ fontSize: 18, fontWeight: 800, color: C.text, marginBottom: 16 }}>Detailed Description</h2>
              <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.8 }}>{course.description}</p>
            </div>

            {/* Objectifs */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 14, padding: "28px", marginBottom: 22 }}>
              <h2 style={{ fontSize: 18, fontWeight: 800, color: C.text, marginBottom: 20 }}>Learning Objectives</h2>
              <div className="objectives-grid">
                {course.objectives.map((o, i) => (
                  <div key={i} style={{ display: "flex", gap: 10 }}>
                    <span style={{ color: C.green, fontSize: 15, flexShrink: 0, marginTop: 1 }}>✓</span>
                    <span style={{ fontSize: 13.5, color: C.muted, lineHeight: 1.6 }}>{o}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Curriculum — modules + leçons dynamiques */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 14, padding: "28px", marginBottom: 22 }}>
              <h2 style={{ fontSize: 18, fontWeight: 800, color: C.text, marginBottom: 6 }}>Course Curriculum</h2>
              <p style={{ fontSize: 13.5, color: C.muted, marginBottom: 24 }}>
                {course.modules.length} modules · {course.modules.reduce((acc, m) => acc + m.lessons.length, 0)} leçons
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {course.modules.map(mod => (
                  <div key={mod.id} style={{ border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden" }}>
                    {/* Header module */}
                    <button
                      onClick={() => toggleModule(mod.id)}
                      style={{
                        width: "100%", display: "flex", alignItems: "center", gap: 12,
                        padding: "14px 18px",
                        background: openModules[mod.id] ? C.greenLight : C.white,
                        border: "none", cursor: "pointer", textAlign: "left",
                        borderLeft: `3px solid ${openModules[mod.id] ? C.green : "transparent"}`,
                        transition: "all .18s",
                      }}
                    >
                      <div style={{ width: 28, height: 28, borderRadius: 7, background: C.green, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: C.white, flexShrink: 0 }}>
                        {mod.order}
                      </div>
                      <span style={{ flex: 1, fontSize: 14.5, fontWeight: 700, color: C.text }}>{mod.title}</span>
                      <span style={{ fontSize: 12, color: C.muted, marginRight: 8 }}>
                        {mod.lessons.length} leçon{mod.lessons.length !== 1 ? "s" : ""}
                      </span>
                      <span style={{ color: C.muted, fontSize: 11, display: "inline-block", transform: openModules[mod.id] ? "rotate(180deg)" : "none", transition: "transform .2s" }}>▼</span>
                    </button>

                    {/* Leçons */}
                    {openModules[mod.id] && (
                      <div style={{ borderTop: `1px solid ${C.border}` }}>
                        {mod.lessons.length === 0 ? (
                          <div style={{ padding: "14px 18px", fontSize: 13, color: C.muted, fontStyle: "italic" }}>
                            Contenu bientôt disponible.
                          </div>
                        ) : (
                          mod.lessons.map((l, li) => (
                            <div
                              key={l.id}
                              style={{
                                display: "flex", alignItems: "center", gap: 12,
                                padding: "11px 18px",
                                background: li % 2 === 0 ? C.white : "#fafafa",
                                borderBottom: li < mod.lessons.length - 1 ? `1px solid ${C.border}` : "none",
                              }}
                            >
                              <span style={{ fontSize: 15, color: C.green, flexShrink: 0 }}>
                                {l.type === "video" ? "▶" : l.type === "quiz" ? "📝" : "📄"}
                              </span>
                              <span style={{ flex: 1, fontSize: 13.5, color: C.text }}>{l.title}</span>
                              {l.free && (
                                <span style={{ background: C.greenLight, color: C.green, fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 4, flexShrink: 0 }}>
                                  PREVIEW
                                </span>
                              )}
                              <span style={{ fontSize: 12, color: C.muted, flexShrink: 0 }}>{l.duration}</span>
                            </div>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* CTA sombre */}
            <div style={{ background: C.greenDark, borderRadius: 16, padding: "40px 36px", textAlign: "center" }}>
              <h2 style={{ fontSize: "1.6rem", fontWeight: 900, color: C.white, marginBottom: 12 }}>
                Prêt à transformer votre carrière ?
              </h2>
              <p style={{ fontSize: 14.5, color: "rgba(255,255,255,.7)", marginBottom: 28, lineHeight: 1.7 }}>
                Rejoignez 5,000+ apprenants passionnés.
              </p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <button onClick={handleSubscribe} style={{ background: C.green, color: C.white, border: "none", padding: "13px 28px", borderRadius: 9, fontWeight: 700, fontSize: 15, cursor: "pointer" }}>
                  Commencer maintenant
                </button>
                <button style={{ background: "transparent", color: C.white, border: "1.5px solid rgba(255,255,255,.3)", padding: "13px 28px", borderRadius: 9, fontWeight: 600, fontSize: 15, cursor: "pointer" }}>
                  Consulter le syllabus
                </button>
              </div>
            </div>
          </div>

          {/* ── SIDEBAR ───────────────────────────────────────── */}
          <div className="detail-sidebar">
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, padding: "24px", boxShadow: "0 8px 32px rgba(0,0,0,.07)" }}>
              <h3 style={{ fontSize: 15, fontWeight: 800, color: C.text, marginBottom: 16 }}>This course includes:</h3>

              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 22 }}>
                {course.includes.map((inc, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ color: C.green, fontSize: 14, flexShrink: 0 }}>✓</span>
                    <span style={{ fontSize: 13.5, color: C.muted }}>{inc}</span>
                  </div>
                ))}
              </div>

              {/* Instructeur dynamique */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", background: C.bg, borderRadius: 10, marginBottom: 20 }}>
                <div style={{ width: 38, height: 38, borderRadius: "50%", background: C.greenDark, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: C.white, flexShrink: 0 }}>
                  {course.instructor.initials}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{course.instructor.name}</div>
                  <div style={{ fontSize: 12, color: C.muted }}>{course.instructor.title}</div>
                </div>
              </div>

              {/* Prix dynamique */}
              <div style={{ fontSize: 22, fontWeight: 900, color: course.price === "GRATUIT" ? C.green : C.text, marginBottom: 4 }}>
                {course.price}
              </div>
              <div style={{ fontSize: 12.5, color: C.muted, marginBottom: 18 }}>Accès immédiat après inscription</div>

              <button
                onClick={handleSubscribe}
                style={{ width: "100%", padding: "13px", background: C.green, color: C.white, border: "none", borderRadius: 9, fontWeight: 700, fontSize: 15, cursor: "pointer", marginBottom: 10, boxShadow: "0 4px 16px rgba(26,122,74,.3)" }}
              >
                S'inscrire maintenant
              </button>
              <Link
                href="/login"
                style={{ display: "block", textAlign: "center", padding: "11px", color: C.green, border: `1.5px solid ${C.green}`, borderRadius: 9, fontWeight: 600, fontSize: 14, textDecoration: "none" }}
              >
                J'ai déjà un compte
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ background: C.white, borderTop: `1px solid ${C.border}`, padding: "36px 6% 22px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 18 }}>🎓</span>
            <span style={{ fontWeight: 800, fontSize: 15, color: C.green }}>EduPlattform</span>
          </div>
          <span style={{ fontSize: 12, color: C.muted }}>© 2024 EduPlattform. Built for the Elevated Scholar.</span>
          <div style={{ display: "flex", gap: 16 }}>
            {["Help Center", "Terms of Service", "Privacy Policy"].map(l => (
              <a key={l} href="#" style={{ fontSize: 12.5, color: C.muted, textDecoration: "none" }}>{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
