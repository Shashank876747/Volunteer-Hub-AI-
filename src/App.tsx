import React from 'react';
import { VolunteerProvider, useVolunteer } from './context/VolunteerContext';
import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';
import { Toast } from './components/Toast';
import { CreateEventModal } from './components/CreateEventModal';
import { EventDetailsModal } from './components/EventDetailsModal';
import { AuthModal } from './components/AuthModal';

import { HomeView } from './views/HomeView';
import { OpportunitiesView } from './views/OpportunitiesView';
import { DashboardView } from './views/DashboardView';
import { MySignupsView } from './views/MySignupsView';
import { ProfileView } from './views/ProfileView';
import { AboutView } from './views/AboutView';
import { Heart } from 'lucide-react';

const MainShell: React.FC = () => {
  const { activeTab, setActiveTab } = useVolunteer();

  const renderActiveView = () => {
    switch (activeTab) {
      case 'home':
        return <HomeView />;
      case 'opportunities':
        return <OpportunitiesView />;
      case 'dashboard':
        return <DashboardView />;
      case 'signups':
        return <MySignupsView />;
      case 'profile':
        return <ProfileView />;
      case 'about':
        return <AboutView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="site-shell">
      <Sidebar />

      <main className="main-content">
        <Topbar />

        <div style={{ flex: 1 }}>
          {renderActiveView()}
        </div>

        {/* Footer */}
        <footer style={{ 
          borderTop: '1px solid var(--line)', 
          padding: '24px 0 0', 
          marginTop: '50px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          color: 'var(--muted)',
          fontSize: '11px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div className="brand-mark" style={{ width: '28px', height: '28px', borderRadius: '8px', fontSize: '14px' }}>
              <Heart size={14} fill="#d9f078" color="#d9f078" />
            </div>
            <div>
              <strong style={{ color: 'var(--ink)', fontSize: '12px' }}>Volunteer Hub</strong>
              <span style={{ margin: '0 8px' }}>·</span>
              <span>Empowering community service and local grassroots initiatives</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px' }}>
            <button className="text-link" onClick={() => setActiveTab('opportunities')}>
              Opportunities
            </button>
            <button className="text-link" onClick={() => setActiveTab('dashboard')}>
              Impact Dashboard
            </button>
            <button className="text-link" onClick={() => setActiveTab('about')}>
              About & FAQs
            </button>
          </div>
        </footer>
      </main>

      {/* Modals & Alerts */}
      <CreateEventModal />
      <EventDetailsModal />
      <AuthModal />
      <Toast />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <VolunteerProvider>
      <MainShell />
    </VolunteerProvider>
  );
};

export default App;
