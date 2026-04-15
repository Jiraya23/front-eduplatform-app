
import "./globals.css";

export const metadata = {
  title: "EduPlatform",
  description: "E-Learning Web Application",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="fr">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
