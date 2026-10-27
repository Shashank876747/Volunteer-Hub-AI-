import React from 'react';
import { useVolunteer } from '../context/VolunteerContext';
import { 
  Clock, 
  CalendarCheck, 
  PlusCircle, 
  Target, 
  ArrowRight, 
  Compass, 
  Award,
  Calendar,
  MapPin
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const { 
    signups, 
    events, 
    profile, 
    activities, 
    setActiveTab, 
    setSelectedEvent, 
    setIsCreateModalOpen 
  } = useVolunteer();

  const totalHours = signups.length * 3;
  const goalHours = profile.goalHours || 20;
  const progressPercent = Math.min(100, Math.round((totalHours / goalHours) * 100));

  const customEventsCreated = events.filter(e => e.isCustom).length;

  // Breakdown by category
  const categoryCounts: { [cat: string]: number } = {};
  signups.forEach(s => {
    const ev = events.find(e => e.id === s.eventId);
    const cat = ev ? ev.category : 'Community';
    categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
  });

  return (
    <div>
      <div className="section-heading" style={{ marginBottom: '18px' }}>
        <div>
          <div className="eyebrow">VOLUNTEER OVERVIEW</div>
          <h2>Impact Dashboard</h2>
          <p style={{ color: 'var(--muted)', fontSize: '13px', margin: '4px 0 0' }}>
            Track your service hours, active commitments, and community contributions.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            className="btn btn-primary"
            onClick={() => setActiveTab('opportunities')}
          >
            <Compass size={14} />
            <span>Find Shifts</span>
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="dashboard-stats">
        <div className="metric-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>SERVICE HOURS</span>
            <div style={{ background: '#e7f3e8', color: '#276b49', padding: '6px', borderRadius: '8px' }}>
              <Clock size={16} />
            </div>
          </div>
          <strong>{totalHours} hrs</strong>
          <small>Estimated volunteer time logged</small>
        </div>

        <div className="metric-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>ACTIVE SIGN-UPS</span>
            <div style={{ background: '#edf1fc', color: '#4d6bb0', padding: '6px', borderRadius: '8px' }}>
              <CalendarCheck size={16} />
            </div>
          </div>
          <strong>{signups.length}</strong>
          <small>Scheduled community commitments</small>
        </div>

        <div className="metric-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>INITIATIVES CREATED</span>
            <div style={{ background: '#fbf2dc', color: '#a67d26', padding: '6px', borderRadius: '8px' }}>
              <PlusCircle size={16} />
            </div>
          </div>
          <strong>{customEventsCreated}</strong>
          <small>Opportunities you hosted</small>
        </div>

        <div className="metric-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>GOAL COMPLETION</span>
            <div style={{ background: '#f5eefc', color: '#885cb8', padding: '6px', borderRadius: '8px' }}>
              <Target size={16} />
            </div>
          </div>
          <strong>{progressPercent}%</strong>
          <small>{totalHours} of {goalHours} hour goal</small>
        </div>
      </div>

      {/* Main Grid */}
      <div className="dashboard-split">
        {/* Left column: Upcoming Shifts & Goal */}
        <div style={{ display: 'grid', gap: '18px' }}>
          {/* Goal card */}
          <div className="card">
            <div className="card-heading">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Award size={18} color="#276b49" />
                <h3>Quarterly Volunteer Goal</h3>
              </div>
              <span className="pill" style={{ background: '#e9f3e7', color: '#276b49' }}>
                {goalHours} Hours Target
              </span>
            </div>

            <p style={{ fontSize: '12px', color: 'var(--muted)', margin: '0 0 14px' }}>
              You've logged {totalHours} hours toward your target. Keep up the great work supporting local neighborhoods!
            </p>

            <div className="progress-wrap" style={{ margin: 0, padding: 0, border: 'none' }}>
              <div className="progress-head">
                <span>Progress: {totalHours} / {goalHours} hrs</span>
                <span>{progressPercent}%</span>
              </div>
              <div className="progress-track">
                <div 
                  className="progress-fill" 
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Upcoming commitments */}
          <div className="card">
            <div className="card-heading">
              <h3>Upcoming Commitments</h3>
              <button 
                className="text-link"
                onClick={() => setActiveTab('signups')}
              >
                View all ({signups.length}) →
              </button>
            </div>

            {signups.length > 0 ? (
              <div style={{ display: 'grid', gap: '10px' }}>
                {signups.slice(0, 3).map(s => {
                  const ev = events.find(e => e.id === s.eventId);
                  return (
                    <div 
                      key={s.id}
                      style={{ 
                        border: '1px solid var(--line)', 
                        borderRadius: '12px', 
                        padding: '12px 14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '12px'
                      }}
                    >
                      <div>
                        <strong style={{ fontSize: '13px', display: 'block', color: 'var(--ink)' }}>
                          {s.title}
                        </strong>
                        <div style={{ display: 'flex', gap: '12px', fontSize: '11px', color: 'var(--muted)', marginTop: '4px' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Calendar size={12} color="#276b49" /> {s.date}
                          </span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <MapPin size={12} color="#276b49" /> {s.location.split(',')[0]}
                          </span>
                        </div>
                      </div>
                      {ev && (
                        <button 
                          className="btn btn-outline btn-small"
                          onClick={() => setSelectedEvent(ev)}
                        >
                          Details
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '24px 10px', color: 'var(--muted)', fontSize: '12px' }}>
                <p style={{ margin: '0 0 10px' }}>You haven't signed up for any upcoming shifts yet.</p>
                <button 
                  className="btn btn-primary btn-small"
                  onClick={() => setActiveTab('opportunities')}
                >
                  Browse open shifts →
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right column: Activity Feed & Quick Actions */}
        <div style={{ display: 'grid', gap: '18px' }}>
          {/* Quick Actions */}
          <div className="card">
            <h3 style={{ font: "800 15px 'Manrope', sans-serif", margin: '0 0 14px' }}>
              Quick Actions
            </h3>
            <div style={{ display: 'grid', gap: '8px' }}>
              <button 
                className="btn btn-light full-width"
                style={{ justifyContent: 'space-between', padding: '12px 16px' }}
                onClick={() => setIsCreateModalOpen(true)}
              >
                <span>Host a Volunteer Event</span>
                <PlusCircle size={15} color="#276b49" />
              </button>

              <button 
                className="btn btn-light full-width"
                style={{ justifyContent: 'space-between', padding: '12px 16px' }}
                onClick={() => setActiveTab('opportunities')}
              >
                <span>Browse Local Opportunities</span>
                <ArrowRight size={15} color="#276b49" />
              </button>

              <button 
                className="btn btn-light full-width"
                style={{ justifyContent: 'space-between', padding: '12px 16px' }}
                onClick={() => setActiveTab('profile')}
              >
                <span>Edit Profile & Goal Hours</span>
                <ArrowRight size={15} color="#276b49" />
              </button>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="card">
            <h3 style={{ font: "800 15px 'Manrope', sans-serif", margin: '0 0 14px' }}>
              Recent Activity
            </h3>
            <div className="activity-list">
              {activities.map(act => (
                <div key={act.id} className="activity-item">
                  <div className="activity-dot">{act.icon}</div>
                  <div>
                    <strong>{act.title}</strong>
                    <small>{act.description} · {act.timeAgo}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
