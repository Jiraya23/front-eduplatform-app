
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "EduPlattform - Apprenez à votre rythme",
  description: "La plateforme d'apprentissage camerounaise. Des formations en ligne sur la programmation, design, marketing et bien d'autres domaines.",
  keywords: "e-learning, formations, Cameroun, programmation, design, marketing",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
