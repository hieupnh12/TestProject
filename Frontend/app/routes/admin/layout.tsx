import { Outlet } from "react-router";
import Navbar from "~/components/Navbar";

export default function AdminLayout() {
  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* Sidebar */}
      <Navbar />

      {/* Content */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}
