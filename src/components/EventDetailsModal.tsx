import React, { useState } from 'react';
import { useVolunteer } from '../context/VolunteerContext';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  CheckCircle, 
  ShieldCheck, 
  Trash2,
  Share2
} from 'lucide-react';

export const EventDetailsModal: React.FC = () => {
  const { 
    selectedEvent, 
    setSelectedEvent, 
    signUpForEvent, 
    signups, 
    profile, 
    deleteEvent,
    showToast 
  } = useVolunteer();

  const [name, setName] = useState(profile.name || '');
  const [email, setEmail] = useState(profile.email || '');
  const [shift, setShift] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!selectedEvent) return null;

  const isAlreadySignedUp = signups.some(
    s => s.eventId === selectedEvent.id && s.email.toLowerCase() === profile.email.toLowerCase()
  );

  const formattedDate = () => {
    try {
      const d = new Date(selectedEvent.date + 'T12:00:00');
      return d.toLocaleDateString(undefined, { 
        weekday: 'long', 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric' 
      });
    } catch {
      return selectedEvent.date;
    }
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    const res = signUpForEvent(
      selectedEvent.id,
      name,
      email,
      shift || selectedEvent.time
    );

    setIsSubmitting(false);

    if (res.success) {
      setSelectedEvent(null);
    } else {
      setErrorMessage(res.message);
    }
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Opportunity link copied to clipboard!', 'info');
  };

  return (
    <div className="modal-backdrop" onClick={() => setSelectedEvent(null)}>
      <div className="modal" style={{ maxWidth: '640px' }} onClick={e => e.stopPropagation()}>
        <div className="modal-head">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span className="pill">{selectedEvent.category}</span>
            {selectedEvent.spots <= 3 && selectedEvent.spots > 0 && (
              <span className="pill" style={{ background: '#feeceb', color: '#c93b3b' }}>
                Only {selectedEvent.spots} spots left!
              </span>
            )}
            {selectedEvent.spots === 0 && (
              <span className="pill" style={{ background: '#f0f0f0', color: '#888' }}>
                Event Full
              </span>
            )}
          </div>
          <button className="close-btn" onClick={() => setSelectedEvent(null)} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        {/* Visual Header */}
        <div 
          className={`event-cover ${selectedEvent.tone || ''}`} 
          style={{ height: '140px', borderRadius: '16px', marginBottom: '20px' }}
        >
          <span style={{ fontSize: '50px' }}>{selectedEvent.icon}</span>
        </div>

        <h2 style={{ font: "800 24px 'Manrope', sans-serif", margin: '0 0 10px', color: 'var(--ink)' }}>
          {selectedEvent.title}
        </h2>
        
        {selectedEvent.organizer && (
          <p style={{ color: 'var(--green)', fontWeight: 700, fontSize: '12px', margin: '0 0 16px' }}>
            Organized by {selectedEvent.organizer}
          </p>
        )}

        <p style={{ color: 'var(--muted)', fontSize: '13px', lineHeight: 1.7, margin: '0 0 20px' }}>
          {selectedEvent.details}
        </p>

        {/* Event Quick Facts */}
        <div style={{ 
          background: '#f8faf6', 
          border: '1px solid var(--line)', 
          borderRadius: '14px', 
          padding: '16px',
          display: 'grid',
          gap: '12px',
          marginBottom: '22px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px' }}>
            <Calendar size={16} color="#276b49" />
            <span><strong>Date:</strong> {formattedDate()}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px' }}>
            <Clock size={16} color="#276b49" />
            <span><strong>Shift:</strong> {selectedEvent.time}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px' }}>
            <MapPin size={16} color="#276b49" />
            <span><strong>Location:</strong> {selectedEvent.location}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px' }}>
            <Users size={16} color="#276b49" />
            <span><strong>Availability:</strong> {selectedEvent.spots} open spots remaining</span>
          </div>
        </div>

        {/* Requirements */}
        {selectedEvent.requirements && selectedEvent.requirements.length > 0 && (
          <div style={{ marginBottom: '22px' }}>
            <strong style={{ display: 'block', fontSize: '12px', marginBottom: '8px', color: 'var(--ink)' }}>
              Important Information & What to Bring:
            </strong>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '12px', color: '#55665b', lineHeight: 1.8 }}>
              {selectedEvent.requirements.map((req, i) => (
                <li key={i}>{req}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Registration Section */}
        <div style={{ 
          borderTop: '1px solid var(--line)', 
          paddingTop: '20px', 
          marginTop: '10px' 
        }}>
          {isAlreadySignedUp ? (
            <div style={{ 
              background: '#e9f3e7', 
              borderRadius: '14px', 
              padding: '18px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px' 
            }}>
              <CheckCircle size={24} color="#276b49" />
              <div>
                <strong style={{ display: 'block', color: 'var(--dark)', fontSize: '13px' }}>
                  You are registered for this event!
                </strong>
                <span style={{ fontSize: '11px', color: '#516859' }}>
                  A confirmation was saved. You can manage this in "My Sign-ups".
                </span>
              </div>
            </div>
          ) : selectedEvent.spots === 0 ? (
            <div style={{ 
              background: '#f9f9f9', 
              borderRadius: '14px', 
              padding: '16px', 
              textAlign: 'center', 
              color: 'var(--muted)',
              fontSize: '12px' 
            }}>
              This opportunity has reached full capacity. Check other active events!
            </div>
          ) : (
            <div>
              <h4 style={{ margin: '0 0 12px', font: "800 15px 'Manrope', sans-serif" }}>
                Volunteer Registration (Instant RSVP)
              </h4>

              {errorMessage && (
                <div style={{ 
                  padding: '8px 12px', 
                  background: '#fde8e8', 
                  color: '#9b1c1c', 
                  borderRadius: '8px', 
                  fontSize: '12px', 
                  marginBottom: '12px' 
                }}>
                  {errorMessage}
                </div>
              )}

              <form onSubmit={handleSignUp}>
                <div className="form-grid">
                  <div className="field">
                    <label>Your Name *</label>
                    <input
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="Jane Doe"
                      required
                    />
                  </div>

                  <div className="field">
                    <label>Email Address *</label>
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="jane@example.com"
                      required
                    />
                  </div>

                  <div className="field full">
                    <label>Shift / Preferred Arrival Time</label>
                    <input
                      type="text"
                      value={shift}
                      onChange={e => setShift(e.target.value)}
                      placeholder={selectedEvent.time}
                    />
                    <small style={{ fontSize: '10px', color: 'var(--muted)' }}>
                      Defaults to scheduled shift: {selectedEvent.time}
                    </small>
                  </div>
                </div>

                <div className="form-actions" style={{ marginTop: '16px' }}>
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={handleShare}
                  >
                    <Share2 size={13} />
                    <span>Share</span>
                  </button>

                  {selectedEvent.isCustom && (
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => {
                        if (confirm('Are you sure you want to delete this custom event?')) {
                          deleteEvent(selectedEvent.id);
                          setSelectedEvent(null);
                        }
                      }}
                    >
                      <Trash2 size={13} />
                      <span>Delete</span>
                    </button>
                  )}

                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                  >
                    <ShieldCheck size={14} />
                    <span>{isSubmitting ? 'Confirming...' : 'Confirm My Registration'}</span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
