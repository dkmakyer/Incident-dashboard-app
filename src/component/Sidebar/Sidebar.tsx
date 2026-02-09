import SidebarItem from "./SidebarItem";
import {
    LayoutDashboard,
    AlertTriangle,
    BarChart3,
    CheckSquare,
    Settings,
    LogOut,
} from "lucide-react";

import "./Sidebar.css";

const Sidebar = () => {
    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <h1>IncidentOps</h1>
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
                <button className="logout-btn">
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </nav>
        </aside>
    );
};

export default Sidebar;
