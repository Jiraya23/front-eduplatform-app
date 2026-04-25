import './globals.css';

export const metadata = {
  title: 'EduPlattform',
  description: 'La plateforme d\'apprentissage panafricaine qui connecte vos ambitions aux meilleures opportunités d\'apprentissage et de mentorat.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        {children}
      </body>
    </html>
  );
}
