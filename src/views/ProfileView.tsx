import React, { useState } from 'react';
import { useVolunteer } from '../context/VolunteerContext';
import { User, Bell, CheckCircle2, Shield } from 'lucide-react';

export const ProfileView: React.FC = () => {
  const { profile, settings, updateProfile, updateSettings } = useVolunteer();

  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [phone, setPhone] = useState(profile.phone || '');
  const [cause, setCause] = useState(profile.cause);
  const [goalHours, setGoalHours] = useState(profile.goalHours || 20);

  const [reminders, setReminders] = useState(settings.reminders);
  const [updates, setUpdates] = useState(settings.updates);
  const [weeklyDigest, setWeeklyDigest] = useState(settings.weeklyDigest || false);

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      email,
      phone,
      cause,
      goalHours: Number(goalHours) || 20
    });
  };

  const handleSettingsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      reminders,
      updates,
      weeklyDigest
    });
  };

  return (
    <div>
      <div className="section-heading">
        <div>
          <div className="eyebrow">PREFERENCES & ACCOUNT</div>
          <h2>Volunteer Profile & Settings</h2>
          <p style={{ color: 'var(--muted)', fontSize: '13px', margin: '4px 0 0' }}>
            Manage your personal volunteer details, preferred causes, and notification alerts.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '22px' }}>
        {/* Profile Card */}
        <div className="form-card" style={{ maxWidth: '100%', margin: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
            <div style={{ background: '#e9f3e7', color: '#276b49', padding: '8px', borderRadius: '10px' }}>
              <User size={18} />
            </div>
            <div>
              <h3 style={{ margin: 0, font: "800 16px 'Manrope', sans-serif" }}>Personal Details</h3>
              <small style={{ color: 'var(--muted)' }}>Saved in your current browser</small>
            </div>
          </div>

          <form onSubmit={handleProfileSubmit}>
            <div style={{ display: 'grid', gap: '14px' }}>
              <div className="field">
                <label>Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Your full name"
                  required
                />
              </div>

              <div className="field">
                <label>Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your.email@example.org"
                  required
                />
              </div>

              <div className="field">
                <label>Phone Number (Optional)</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="(555) 000-0000"
                />
              </div>

              <div className="field">
                <label>Preferred Volunteer Causes</label>
                <input
                  type="text"
                  value={cause}
                  onChange={e => setCause(e.target.value)}
                  placeholder="e.g. Environmental cleanup, Food pantries, Youth mentorship"
                />
              </div>

              <div className="field">
                <label>Quarterly Service Goal (Hours)</label>
                <input
                  type="number"
                  min="1"
                  max="500"
                  value={goalHours}
                  onChange={e => setGoalHours(parseInt(e.target.value) || 1)}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ marginTop: '8px' }}>
                <CheckCircle2 size={14} />
                <span>Save Profile</span>
              </button>
            </div>
          </form>
        </div>

        {/* Preferences & Settings */}
        <div className="form-card" style={{ maxWidth: '100%', margin: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
            <div style={{ background: '#edf1fc', color: '#4d6bb0', padding: '8px', borderRadius: '10px' }}>
              <Bell size={18} />
            </div>
            <div>
              <h3 style={{ margin: 0, font: "800 16px 'Manrope', sans-serif" }}>Notification Preferences</h3>
              <small style={{ color: 'var(--muted)' }}>Choose when you receive alerts</small>
            </div>
          </div>

          <form onSubmit={handleSettingsSubmit}>
            <div style={{ display: 'grid', gap: '16px' }}>
              <label 
                style={{ 
                  display: 'flex', 
                  alignItems: 'flex-start', 
                  gap: '12px', 
                  cursor: 'pointer',
                  margin: 0,
                  fontSize: '13px'
                }}
              >
                <input
                  type="checkbox"
                  checked={reminders}
                  onChange={e => setReminders(e.target.checked)}
                  style={{ width: '18px', height: '18px', marginTop: '2px', accentColor: '#276b49' }}
                />
                <div>
                  <strong style={{ display: 'block', color: 'var(--ink)' }}>Shift Reminders</strong>
                  <span style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: 400 }}>
                    Receive a notification 24 hours prior to your scheduled volunteer workday.
                  </span>
                </div>
              </label>

              <label 
                style={{ 
                  display: 'flex', 
                  alignItems: 'flex-start', 
                  gap: '12px', 
                  cursor: 'pointer',
                  margin: 0,
                  fontSize: '13px'
                }}
              >
                <input
                  type="checkbox"
                  checked={updates}
                  onChange={e => setUpdates(e.target.checked)}
                  style={{ width: '18px', height: '18px', marginTop: '2px', accentColor: '#276b49' }}
                />
                <div>
                  <strong style={{ display: 'block', color: 'var(--ink)' }}>Community Project Updates</strong>
                  <span style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: 400 }}>
                    Get notified when new opportunities are posted in your favorite causes.
                  </span>
                </div>
              </label>

              <label 
                style={{ 
                  display: 'flex', 
                  alignItems: 'flex-start', 
                  gap: '12px', 
                  cursor: 'pointer',
                  margin: 0,
                  fontSize: '13px'
                }}
              >
                <input
                  type="checkbox"
                  checked={weeklyDigest}
                  onChange={e => setWeeklyDigest(e.target.checked)}
                  style={{ width: '18px', height: '18px', marginTop: '2px', accentColor: '#276b49' }}
                />
                <div>
                  <strong style={{ display: 'block', color: 'var(--ink)' }}>Weekly Impact Digest</strong>
                  <span style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: 400 }}>
                    Receive a brief weekend email summary of local impact and volunteer spotlights.
                  </span>
                </div>
              </label>

              <div style={{ background: '#f8faf6', border: '1px solid var(--line)', borderRadius: '12px', padding: '12px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Shield size={16} color="#276b49" />
                <span style={{ fontSize: '11px', color: 'var(--muted)' }}>
                  Your contact details are only shared with event organizers you register with.
                </span>
              </div>

              <button type="submit" className="btn btn-primary" style={{ marginTop: '8px' }}>
                <CheckCircle2 size={14} />
                <span>Save Preferences</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
