import { NavLink } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

interface SidebarItemProps {
    to: string;
    label: string;
    Icon: LucideIcon;
}

const SidebarItem = ({ to, label, Icon }: SidebarItemProps) => {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `sidebar-item ${isActive ? "active" : ""}`
            }
        >
            <Icon size={20} strokeWidth={1.8} />
            <span>{label}</span>
        </NavLink>
    );
};

export default SidebarItem;
