import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen = true, onClose }) => {
  const { user } = useAppSelector((state) => state.auth);
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => setCollapsed(!collapsed);

  const navItems = [
    {
      to: "/dashboard",
      label: "Dashboard",
      icon: "📊",
      roles: ["user", "admin"],
    },
    { to: "/profile", label: "Profile", icon: "👤", roles: ["user", "admin"] },
    { to: "/admin", label: "Admin Panel", icon: "⚙️", roles: ["admin"] },
    { to: "/timer", label: "Timer", icon: "⏱️", roles: ["user", "admin"] },
  ];

  const filteredItems = navItems.filter(
    (item) => user && item.roles.includes(user.role),
  );

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed md:static top-0 left-0 h-full bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 z-30 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } ${collapsed ? "w-20" : "w-64"}`}
      >
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          {!collapsed && (
            <span className="font-bold text-xl dark:text-white">MyApp</span>
          )}
          <button
            onClick={toggleCollapse}
            className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {collapsed ? "→" : "←"}
          </button>
        </div>

        <nav className="p-2">
          {filteredItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center p-3 my-1 rounded transition-colors ${
                  isActive
                    ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300"
                }`
              }
              onClick={() => onClose && onClose()}
            >
              <span className="text-xl">{item.icon}</span>
              {!collapsed && <span className="ml-3">{item.label}</span>}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};
