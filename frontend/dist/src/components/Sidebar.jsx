import React from 'react';

const MENU_ITEMS = [
  { id: 'dashboard', label: 'New Request', icon: '📝' },
  { id: 'recent', label: 'Recent Requests', icon: '🕒' },
  { id: 'analytics', label: 'Analytics', icon: '📊' },
  { id: 'policy', label: 'Policy Documents', icon: '📑' },
  { id: 'status', label: 'System Status', icon: '⚡' },
  { id: 'monitoring', label: 'Monitoring', icon: '📈' },
  { id: 'evaluation', label: 'Evaluation', icon: '🧪' },
  { id: 'settings', label: 'Settings', icon: '⚙️' }
];

export default function Sidebar({ activeTab, setActiveTab }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo-badge">+</div>
        <div className="sidebar-title">Pre-Auth Desk</div>
      </div>
      <nav className="sidebar-menu">
        {MENU_ITEMS.map((item) => (
          <div
            key={item.id}
            className={`menu-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </div>
        ))}
      </nav>
    </aside>
  );
}
