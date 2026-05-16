import AdminSidebar from "../../components/admin/AdminSidebar";

export const metadata = { title: "Admin Panel — Portfolio" };

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-background flex font-body">
      <AdminSidebar />
      <main className="flex-1 ml-64 p-10 bg-dot-grid min-h-screen">{children}</main>
    </div>
  );
}
