import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../ui/Sidebar";
import { Navbar } from "./Navbar";
import { Breadcrumbs } from "../ui/Breadcrumbs";

export const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
          <Breadcrumbs />
          <Outlet />
        </main>
      </div>
    </div>
  );
};
