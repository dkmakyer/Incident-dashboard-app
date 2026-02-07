import React from 'react';
import type { ReactNode } from 'react';
import './Layout.css';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="app-layout">
            <nav className="top-nav">
                <div className="nav-brand">Incident Command</div>
            </nav>
            <main className="main-content">
                {children}
            </main>
            <footer className="app-footer">
                © 2024 Incident Command System
            </footer>
        </div>
    );
};

export default Layout;
