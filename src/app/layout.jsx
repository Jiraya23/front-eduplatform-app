// app/layout.jsx
// Layout global Next.js 13+ App Router

import "./globals.css";

export const metadata = {
  title: "EduPlattform — Apprends à ton rythme",
  description: "Plateforme e-learning accessible, pratique et certifiante.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}