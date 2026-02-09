import React from 'react';
import type { ReactNode } from 'react';
import './Layout.css';
import Sidebar from '../Sidebar/SIdebar';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="app-layout">
            <nav className="sidebar-nav">
                <Sidebar />
            </nav>
            <main className="main-content">
                {children}
            </main>
        </div>
    );
};

export default Layout;
