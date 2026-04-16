import AdminSidebar from '@/components/AdminSidebar';

export const metadata = {
  title: 'Admin - EduPlattform',
  description: 'Interface d\'administration EduPlattform',
};

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 md:ml-64">
        {children}
      </div>
    </div>
  );
}
