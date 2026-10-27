import React from 'react';
import { useVolunteer } from '../context/VolunteerContext';
import { Plus, UserCheck, LogIn, Heart } from 'lucide-react';

export const Topbar: React.FC = () => {
  const { activeTab, setActiveTab, profile, setIsCreateModalOpen, setIsAuthModalOpen } = useVolunteer();

  const getBreadcrumb = () => {
    switch (activeTab) {
      case 'home':
        return <span>Explore / <strong>Community Opportunities</strong></span>;
      case 'opportunities':
        return <span>Directory / <strong>All Opportunities</strong></span>;
      case 'dashboard':
        return <span>Overview / <strong>Volunteer Impact Dashboard</strong></span>;
      case 'signups':
        return <span>Volunteering / <strong>My Active Sign-ups</strong></span>;
      case 'profile':
        return <span>Account / <strong>Profile & Preferences</strong></span>;
      case 'about':
        return <span>Information / <strong>About Volunteer Hub</strong></span>;
      default:
        return <span>Portal / <strong>Volunteer Hub</strong></span>;
    }
  };

  return (
    <header className="topbar">
      <div className="mobile-brand" onClick={() => setActiveTab('home')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
        <Heart size={18} fill="#276b49" color="#276b49" />
        <span>Volunteer Hub</span>
      </div>

      <div className="top-crumb">{getBreadcrumb()}</div>

      <div className="topbar-spacer" />

      <div className="top-actions">
        <button
          className="btn btn-outline btn-small"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <Plus size={14} />
          <span>New Opportunity</span>
        </button>

        <button
          className="btn btn-light btn-small"
          onClick={() => setIsAuthModalOpen(true)}
        >
          {profile.isLoggedIn ? (
            <>
              <UserCheck size={14} color="#276b49" />
              <span>{profile.name.split(' ')[0]} (Demo)</span>
            </>
          ) : (
            <>
              <LogIn size={14} />
              <span>Sign In</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
};
