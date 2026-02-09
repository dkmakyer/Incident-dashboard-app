import SidebarItem from "./SidebarItem";
import {
    LayoutDashboard,
    AlertTriangle,
    BarChart3,
    CheckSquare,
    Settings,
    Shield
} from "lucide-react";

import "./Sidebar.css";

const Sidebar = () => {
    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <Shield size={28} className="brand-icon" />
                <h1 className="sidebar-title">IncidentOps</h1>
            </div>

            <nav className="sidebar-menu">
                <SidebarItem
                    to="/"
                    label="Dashboard"
                    Icon={LayoutDashboard}
                />

                <SidebarItem
                    to="/incidents"
                    label="Incidents"
                    Icon={AlertTriangle}
                />

                <SidebarItem
                    to="/analytics"
                    label="Analytics"
                    Icon={BarChart3}
                />

                <SidebarItem
                    to="/tasks"
                    label="Tasks"
                    Icon={CheckSquare}
                />

                <SidebarItem
                    to="/settings"
                    label="Settings"
                    Icon={Settings}
                />
            </nav>
        </aside>
    );
};

export default Sidebar;
