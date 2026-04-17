// components/AuthPage.jsx
// US-04 : Inscription + US-05 : Connexion
// useRouter de next/navigation remplace useNavigate de react-router-dom
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const C = {
  green: "#1a7a4a", greenDark: "#0d3d24", greenLight: "#e8f5ee",
  gold: "#c8a84b", white: "#ffffff", bg: "#f0f2f5",
  text: "#111827", muted: "#6b7280", border: "#e5e7eb", error: "#ef4444",
};

function Field({ label, type = "text", placeholder, icon, value, onChange, error, rightEl }) {
  const [focused, setFocused] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const actualType = type === "password" ? (showPwd ? "text" : "password") : type;

  return (
    <div style={{ marginBottom: error ? 6 : 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
        <label style={{ fontSize: 11, fontWeight: 700, color: C.muted, letterSpacing: .8, textTransform: "uppercase" }}>{label}</label>
        {rightEl}
      </div>
      <div style={{ position: "relative" }}>
        {icon && <span style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", fontSize: 15, color: "#9ca3af" }}>{icon}</span>}
        <input
          type={actualType} placeholder={placeholder} value={value} onChange={onChange}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          style={{ width: "100%", padding: "12px 40px 12px 40px", border: `1.5px solid ${error ? C.error : focused ? C.green : C.border}`, borderRadius: 9, fontSize: 14, color: C.text, background: C.white, outline: "none", transition: "border .18s" }}
        />
        {type === "password" && (
          <button type="button" onClick={() => setShowPwd(s => !s)} style={{ position: "absolute", right: 13, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#9ca3af", fontSize: 15 }}>
            {showPwd ? "🙈" : "👁"}
          </button>
        )}
      </div>
      {error && <p style={{ fontSize: 11.5, color: C.error, marginTop: 4, marginBottom: 8 }}>⚠ {error}</p>}
    </div>
  );
}

function LoginForm({ onSwitch }) {
  const router = useRouter(); // ← Next.js
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!email.trim()) e.email = "L'adresse email est requise";
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = "Format d'email invalide";
    if (!password) e.password = "Le mot de passe est requis";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setErrors({});
    setLoading(true);
    // Simulation POST /api/login → Laravel Sanctum
    setTimeout(() => {
      setLoading(false);
      router.push("/learn/1"); // US-05 : redirection après connexion
    }, 1200);
  };

  return (
    <div>
      <h2 style={{ fontSize: 24, fontWeight: 900, color: C.text, marginBottom: 5 }}>Welcome Back</h2>
      <p style={{ fontSize: 14, color: C.muted, marginBottom: 28 }}>Continue your journey of excellence.</p>

      <Field label="Email Address" type="email" placeholder="scholar@eduplattform.com" icon="✉️" value={email} onChange={e => setEmail(e.target.value)} error={errors.email} />
      <Field label="Password" type="password" placeholder="••••••••" icon="🔒" value={password} onChange={e => setPassword(e.target.value)} error={errors.password}
        rightEl={<Link href="#" style={{ fontSize: 12, color: C.green, fontWeight: 600 }}>Forgot?</Link>}
      />

      <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 24 }}>
        <input type="checkbox" id="keep" style={{ width: 15, height: 15, accentColor: C.green }} />
        <label htmlFor="keep" style={{ fontSize: 13.5, color: C.muted, cursor: "pointer" }}>Keep me signed in</label>
      </div>

      <button onClick={handleSubmit} disabled={loading} style={{ width: "100%", padding: "14px", background: loading ? "#9ca3af" : C.green, color: C.white, border: "none", borderRadius: 9, fontWeight: 700, fontSize: 15, cursor: loading ? "not-allowed" : "pointer", boxShadow: "0 4px 16px rgba(26,122,74,.3)", marginBottom: 20 }}>
        {loading ? "Connexion en cours…" : "Sign In to Dashboard"}
      </button>

      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
        <div style={{ flex: 1, height: 1, background: C.border }} />
        <span style={{ fontSize: 11.5, color: C.muted, fontWeight: 600 }}>OR CONTINUE WITH</span>
        <div style={{ flex: 1, height: 1, background: C.border }} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 24 }}>
        <button style={{ padding: "11px", background: C.white, border: `1.5px solid ${C.border}`, borderRadius: 9, fontWeight: 600, fontSize: 14, cursor: "pointer" }}>G Google</button>
        <button style={{ padding: "11px", background: "#1877f2", color: C.white, border: "none", borderRadius: 9, fontWeight: 600, fontSize: 14, cursor: "pointer" }}>f Facebook</button>
      </div>

      <p style={{ textAlign: "center", fontSize: 13.5, color: C.muted }}>
        New to the platform?{" "}
        <button onClick={onSwitch} style={{ background: "none", border: "none", color: C.green, fontWeight: 700, cursor: "pointer", fontSize: 13.5 }}>Create your free account</button>
      </p>
    </div>
  );
}

function RegisterForm({ onSwitch }) {
  const router = useRouter(); // ← Next.js
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "Le prénom est requis";
    if (!form.lastName.trim()) e.lastName = "Le nom est requis";
    if (!form.email) e.email = "L'email est requis";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Email invalide";
    if (!form.password) e.password = "Le mot de passe est requis";
    else if (form.password.length < 8) e.password = "Minimum 8 caractères";
    if (form.password !== form.confirm) e.confirm = "Les mots de passe ne correspondent pas";
    return e;
  };

  const strength = form.password.length === 0 ? 0 : form.password.length < 6 ? 1 : form.password.length < 10 ? 2 : 3;
  const sColors = [C.border, C.error, C.gold, C.green];
  const sLabels = ["", "Faible", "Moyen", "Fort"];

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setErrors({});
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => router.push("/login"), 2000); // US-04 : redirection vers /login
    }, 1200);
  };

  if (success) return (
    <div style={{ textAlign: "center", padding: "40px 0" }}>
      <div style={{ fontSize: 60, marginBottom: 20 }}>✅</div>
      <h3 style={{ fontSize: 20, fontWeight: 900, color: C.text, marginBottom: 10 }}>Compte créé avec succès !</h3>
      <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.7 }}>Bienvenue sur EduPlattform.<br />Redirection vers la connexion…</p>
    </div>
  );

  return (
    <div>
      <h2 style={{ fontSize: 24, fontWeight: 900, color: C.text, marginBottom: 5 }}>Crée ton compte 🚀</h2>
      <p style={{ fontSize: 14, color: C.muted, marginBottom: 24 }}>Rejoins EduPlattform. Gratuit, sans carte bancaire.</p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 12px" }}>
        <Field label="Prénom" placeholder="Jean" icon="👤" value={form.firstName} onChange={set("firstName")} error={errors.firstName} />
        <Field label="Nom" placeholder="Dupont" icon="👤" value={form.lastName} onChange={set("lastName")} error={errors.lastName} />
      </div>
      <Field label="Email" type="email" placeholder="scholar@eduplattform.com" icon="✉️" value={form.email} onChange={set("email")} error={errors.email} />
      <Field label="Password" type="password" placeholder="Minimum 8 caractères" icon="🔒" value={form.password} onChange={set("password")} error={errors.password} />

      {form.password.length > 0 && (
        <div style={{ marginTop: -8, marginBottom: 14 }}>
          <div style={{ display: "flex", gap: 4, marginBottom: 4 }}>
            {[1, 2, 3].map(i => <div key={i} style={{ flex: 1, height: 4, borderRadius: 50, background: strength >= i ? sColors[strength] : C.border, transition: "background .3s" }} />)}
          </div>
          <span style={{ fontSize: 11.5, fontWeight: 600, color: sColors[strength] }}>{sLabels[strength]}</span>
        </div>
      )}

      <Field label="Confirm Password" type="password" placeholder="••••••••" icon="🔒" value={form.confirm} onChange={set("confirm")} error={errors.confirm} />

      <div style={{ display: "flex", alignItems: "flex-start", gap: 9, marginBottom: 22 }}>
        <input type="checkbox" style={{ marginTop: 2, accentColor: C.green, width: 15, height: 15 }} />
        <label style={{ fontSize: 12.5, color: C.muted, lineHeight: 1.6 }}>
          J'accepte les <Link href="#" style={{ color: C.green, fontWeight: 600 }}>conditions d'utilisation</Link> et la <Link href="#" style={{ color: C.green, fontWeight: 600 }}>politique de confidentialité</Link>
        </label>
      </div>

      <button onClick={handleSubmit} disabled={loading} style={{ width: "100%", padding: "14px", background: loading ? "#9ca3af" : C.green, color: C.white, border: "none", borderRadius: 9, fontWeight: 700, fontSize: 15, cursor: loading ? "not-allowed" : "pointer", marginBottom: 18 }}>
        {loading ? "Création du compte…" : "Create My Free Account"}
      </button>

      <p style={{ textAlign: "center", fontSize: 13.5, color: C.muted }}>
        Already have an account?{" "}
        <button onClick={onSwitch} style={{ background: "none", border: "none", color: C.green, fontWeight: 700, cursor: "pointer", fontSize: 13.5 }}>Sign in</button>
      </p>
    </div>
  );
}

export default function AuthPage({ defaultMode = "login" }) {
  const [mode, setMode] = useState(defaultMode);

  return (
    <>
      <style>{`
        @media (max-width: 768px) { .auth-panel-left { display: none !important; } .auth-card { grid-template-columns: 1fr !important; max-width: 480px !important; } }
      `}</style>

      <div style={{ minHeight: "calc(100vh - 60px)", display: "flex", flexDirection: "column" }}>
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 5%" }}>
          <div className="auth-card" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", background: C.white, borderRadius: 20, boxShadow: "0 20px 60px rgba(0,0,0,.10)", overflow: "hidden", width: "100%", maxWidth: 1000 }}>

            {/* Panneau vert gauche */}
            <div className="auth-panel-left" style={{ background: C.green, padding: "48px 44px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 36 }}>
                  <div style={{ width: 32, height: 32, background: "rgba(255,255,255,.2)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🎓</div>
                  <span style={{ fontWeight: 800, fontSize: 17, color: C.white }}>EduPlattform</span>
                </div>
                <h2 style={{ fontSize: "clamp(1.5rem,2.5vw,2rem)", fontWeight: 900, color: C.white, lineHeight: 1.25, marginBottom: 14 }}>
                  Empowering the<br /><span style={{ color: C.gold }}>Elevated Scholar.</span>
                </h2>
                <p style={{ fontSize: 14.5, color: "rgba(255,255,255,.8)", lineHeight: 1.75, maxWidth: 330 }}>
                  Join Africa's most modern learning ecosystem. Access world-class courses, expert mentors, and a community of high-achievers.
                </p>
              </div>
              <div>
                <div style={{ borderRadius: 14, overflow: "hidden", marginBottom: 22 }}>
                  <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80" alt="Students" style={{ width: "100%", height: 210, objectFit: "cover", display: "block" }} />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ display: "flex" }}>
                    {["#2d5a4a", "#1a4a3a", "#0d3d2a"].map((bg, i) => (
                      <div key={i} style={{ width: 28, height: 28, borderRadius: "50%", background: bg, border: "2px solid rgba(255,255,255,.4)", marginLeft: i > 0 ? -8 : 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: C.white, fontWeight: 700 }}>
                        {["J", "M", "E"][i]}
                      </div>
                    ))}
                  </div>
                  <span style={{ fontSize: 13.5, color: "rgba(255,255,255,.9)", fontWeight: 600 }}>Join +5,000 scholars today</span>
                </div>
              </div>
            </div>

            {/* Panneau droit : formulaire */}
            <div style={{ padding: "48px 44px", display: "flex", flexDirection: "column", justifyContent: "center", overflowY: "auto", maxHeight: "100vh" }}>
              <div style={{ display: "flex", background: C.bg, borderRadius: 10, padding: 4, marginBottom: 32 }}>
                {[["login", "Login"], ["register", "Sign Up"]].map(([m, label]) => (
                  <button key={m} onClick={() => setMode(m)} style={{ flex: 1, padding: "9px", borderRadius: 7, border: "none", cursor: "pointer", fontWeight: 700, fontSize: 14, background: mode === m ? C.white : "transparent", color: mode === m ? C.text : C.muted, boxShadow: mode === m ? "0 1px 6px rgba(0,0,0,.08)" : "none", transition: "all .2s" }}>
                    {label}
                  </button>
                ))}
              </div>
              {mode === "login" ? <LoginForm onSwitch={() => setMode("register")} /> : <RegisterForm onSwitch={() => setMode("login")} />}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer style={{ padding: "16px 6%", borderTop: `1px solid ${C.border}`, background: C.white }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
            <span style={{ fontWeight: 800, fontSize: 14, color: C.green }}>EduPlattform</span>
            <div style={{ display: "flex", gap: 18 }}>
              {["Help Center", "Terms of Service", "Privacy Policy"].map(l => (
                <Link key={l} href="#" style={{ fontSize: 12.5, color: C.muted }}>{l}</Link>
              ))}
            </div>
            <span style={{ fontSize: 12, color: C.muted }}>© 2024 EduPlattform. Built for the Elevated Scholar.</span>
          </div>
        </footer>
      </div>
    </>
  );
}
