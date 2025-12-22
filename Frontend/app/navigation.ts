import type { LucideIcon } from "lucide-react";
import { Home, ProjectorIcon, Info, User } from "lucide-react";

export type NavLink = {
  label: string;
  to: string;
  icon?: LucideIcon;
  auth?: boolean;
};

export const NAV_LINKS: NavLink[] = [
  { label: "Dashboard", to: "/admin", icon: User, auth: true },
  { label: "Products", to: "/admin/products", icon: ProjectorIcon },
  { label: "Customers", to: "/admin/customers", icon: User },
];
