import React, { useState } from "react";
import { NavLink } from "react-router";
import { NAV_LINKS } from "../navigation";

export default function Navbar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`
        h-screen bg-white shadow-md
        flex flex-col transition-all duration-300
        ${collapsed ? "w-16" : "w-56"}
      `}
    >
      {/* Toggle Collapse */}
      <button
        onClick={() => setCollapsed((prev) => !prev)}
        className="p-3 hover:bg-gray-300 text-left "
      >
        {collapsed ? "➡" : "⬅"}
      </button>

      <nav className="flex flex-col gap-2 mt-4 px-2">
        {NAV_LINKS.map((link) => {
          const Icon = link.icon; // lấy component icon

          return (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/admin"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg
                 transition-colors
                 ${isActive ? "bg-gray-200 font-semibold" : "hover:bg-gray-100"}
                `
              }
            >
              {Icon && <Icon size={20} />}
              {!collapsed && <span>{link.label}</span>}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}