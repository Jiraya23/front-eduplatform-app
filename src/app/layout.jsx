import './globals.css';
import { AuthProvider }  from '@/context/AuthContext';
import { ToastProvider } from '@/components/ui/Toast';

export const metadata = {
  title: 'EduPlattform',
  description: 'La plateforme d\'apprentissage panafricaine qui connecte vos ambitions aux meilleures opportunités d\'apprentissage et de mentorat.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <AuthProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
