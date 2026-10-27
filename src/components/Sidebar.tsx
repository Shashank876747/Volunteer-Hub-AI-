import React from 'react';
import { useVolunteer } from '../context/VolunteerContext';
import { 
  Home, 
  Compass, 
  LayoutDashboard, 
  CalendarCheck, 
  User, 
  Info, 
  PlusCircle,
  Heart
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, profile, signups, setIsCreateModalOpen } = useVolunteer();

  const navItems = [
    { id: 'home', label: 'Explore', icon: <Home size={18} /> },
    { id: 'opportunities', label: 'Opportunities', icon: <Compass size={18} /> },
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { 
      id: 'signups', 
      label: 'My Sign-ups', 
      icon: <CalendarCheck size={18} />,
      badge: signups.length > 0 ? signups.length : undefined
    },
    { id: 'profile', label: 'Profile & Settings', icon: <User size={18} /> },
    { id: 'about', label: 'About Hub', icon: <Info size={18} /> },
  ];

  const initials = profile.name
    ? profile.name
        .split(' ')
        .map(n => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'VH';

  return (
    <aside className="sidebar">
      <div className="brand" onClick={() => setActiveTab('home')}>
        <div className="brand-mark">
          <Heart size={20} fill="#d9f078" color="#d9f078" />
        </div>
        <div>
          <b>Volunteer Hub</b>
          <small>Community Service Portal</small>
        </div>
      </div>

      <div className="nav-label">NAVIGATION</div>
      <nav className="nav">
        {navItems.map(item => (
          <button
            key={item.id}
            className={`nav-link ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
          >
            <span>{item.icon}</span>
            <span style={{ flex: 1, textAlign: 'left' }}>{item.label}</span>
            {item.badge !== undefined && (
              <span className="pill" style={{ marginLeft: 'auto', fontSize: '10px', padding: '2px 7px' }}>
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <button
          className="btn btn-primary full-width"
          style={{ marginBottom: '14px' }}
          onClick={() => setIsCreateModalOpen(true)}
        >
          <PlusCircle size={15} />
          <span>Post Opportunity</span>
        </button>

        <div className="side-note">
          <span className="icon">🌱</span>
          <b>Community Impact</b>
          <p>Every volunteer hour makes an immediate difference in someone's life.</p>
          <button
            className="text-link"
            style={{ fontSize: '11px', display: 'block' }}
            onClick={() => setActiveTab('dashboard')}
          >
            View your impact →
          </button>
        </div>

        <div 
          className="sidebar-profile" 
          style={{ cursor: 'pointer' }}
          onClick={() => setActiveTab('profile')}
        >
          <div className="avatar">{initials}</div>
          <div style={{ overflow: 'hidden' }}>
            <strong style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
              {profile.name}
            </strong>
            <small style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', display: 'block' }}>
              {profile.email}
            </small>
          </div>
        </div>
      </div>
    </aside>
  );
};
