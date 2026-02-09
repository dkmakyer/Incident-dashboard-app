import React from 'react';
import type { ReactNode } from 'react';
import './Layout.css';
import Sidebar from '../Sidebar/Sidebar';
import UserProfile from '../UserProfile/UserProfile';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="app-layout">
            <nav className="sidebar-nav">
                <Sidebar />
            </nav>
            <div className="app-content-wrapper">
                <header className="app-topbar">
                    <div className="topbar-spacer"></div>
                    <UserProfile />
                </header>
                <main className="main-content">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
