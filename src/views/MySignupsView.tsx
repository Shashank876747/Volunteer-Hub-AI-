import React from 'react';
import { useVolunteer } from '../context/VolunteerContext';
import { Calendar, Clock, MapPin, XCircle, ArrowRight, Heart } from 'lucide-react';

export const MySignupsView: React.FC = () => {
  const { signups, cancelSignup, events, setSelectedEvent, setActiveTab } = useVolunteer();

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr + 'T12:00:00');
      return d.toLocaleDateString(undefined, { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div>
      <div className="section-heading">
        <div>
          <div className="eyebrow">MY COMMITMENTS</div>
          <h2>My Active Sign-ups</h2>
          <p style={{ color: 'var(--muted)', fontSize: '13px', margin: '4px 0 0' }}>
            View your upcoming volunteer dates, locations, and manage your registrations.
          </p>
        </div>
        <button 
          className="btn btn-outline"
          onClick={() => setActiveTab('opportunities')}
        >
          <span>Find More Shifts</span>
          <ArrowRight size={14} />
        </button>
      </div>

      {signups.length > 0 ? (
        <div className="stack-list">
          {signups.map((s, idx) => {
            const ev = events.find(e => e.id === s.eventId);
            return (
              <article key={s.id || idx} className="signup-row">
                <div className="row-icon">
                  {ev ? ev.icon : '♡'}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span className="pill" style={{ fontSize: '9px', padding: '3px 8px' }}>
                      {ev ? ev.category : 'Volunteering'}
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--green)', fontWeight: 700 }}>
                      Confirmed
                    </span>
                  </div>

                  <h3>{s.title}</h3>

                  <div style={{ display: 'grid', gap: '4px', fontSize: '11px', color: 'var(--muted)', marginTop: '6px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Calendar size={12} color="#276b49" /> {formatDate(s.date)}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Clock size={12} color="#276b49" /> {s.time || s.shift || 'Scheduled shift'}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <MapPin size={12} color="#276b49" /> {s.location}
                    </span>
                  </div>
                </div>

                <div className="actions" style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end' }}>
                  {ev && (
                    <button
                      className="btn btn-light btn-small"
                      onClick={() => setSelectedEvent(ev)}
                    >
                      View Details
                    </button>
                  )}
                  <button
                    className="btn btn-danger btn-small"
                    onClick={() => {
                      if (confirm(`Cancel your sign-up for "${s.title}"?`)) {
                        cancelSignup(s.id);
                      }
                    }}
                  >
                    <XCircle size={13} />
                    <span>Cancel Sign-up</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="form-card" style={{ maxWidth: '600px', margin: '20px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <Heart size={24} color="#276b49" />
            <h3 style={{ margin: 0, font: "800 18px 'Manrope', sans-serif" }}>No sign-ups yet</h3>
          </div>
          <p style={{ color: 'var(--muted)', fontSize: '13px', lineHeight: 1.6, margin: '0 0 18px' }}>
            When you register for a volunteer workday or community drive, it will appear here 
            with all check-in details and shift instructions.
          </p>
          <button 
            className="btn btn-primary"
            onClick={() => setActiveTab('opportunities')}
          >
            Find an opportunity →
          </button>
        </div>
      )}
    </div>
  );
};
