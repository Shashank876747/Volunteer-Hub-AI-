import React, { useState } from 'react';
import { useVolunteer } from '../context/VolunteerContext';
import { X, Calendar, MapPin, Users, Sparkles } from 'lucide-react';

export const CreateEventModal: React.FC = () => {
  const { isCreateModalOpen, setIsCreateModalOpen, createEvent } = useVolunteer();

  const [formData, setFormData] = useState({
    title: '',
    category: 'Community',
    location: '',
    date: '2026-11-20',
    time: '10:00 AM – 1:00 PM',
    spots: 10,
    icon: '🤝',
    tone: '',
    details: '',
    organizer: 'Local Community Initiative'
  });

  const [error, setError] = useState('');

  if (!isCreateModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setError('Please provide an event title');
      return;
    }
    if (!formData.location.trim()) {
      setError('Please provide an event location');
      return;
    }
    if (!formData.details.trim()) {
      setError('Please provide a short description or details');
      return;
    }

    createEvent({
      ...formData,
      spots: Number(formData.spots) || 5,
      requirements: ['Enthusiasm to help out', 'Check-in on arrival']
    });

    setIsCreateModalOpen(false);
    // Reset
    setFormData({
      title: '',
      category: 'Community',
      location: '',
      date: '2026-11-20',
      time: '10:00 AM – 1:00 PM',
      spots: 10,
      icon: '🤝',
      tone: '',
      details: '',
      organizer: 'Local Community Initiative'
    });
    setError('');
  };

  const iconOptions = [
    { icon: '🌿', tone: '', label: 'Nature' },
    { icon: '🥕', tone: 'orange-bg', label: 'Food' },
    { icon: '📚', tone: 'blue-bg', label: 'Books' },
    { icon: '🐾', tone: 'pink-bg', label: 'Animals' },
    { icon: '🏡', tone: 'yellow-bg', label: 'Housing' },
    { icon: '🤝', tone: '', label: 'Civic' },
    { icon: '🌎', tone: '', label: 'Earth' },
  ];

  return (
    <div className="modal-backdrop" onClick={() => setIsCreateModalOpen(false)}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-head">
          <div>
            <h3>Post Volunteer Opportunity</h3>
            <p>Publish a community service project, workday, or initiative</p>
          </div>
          <button className="close-btn" onClick={() => setIsCreateModalOpen(false)} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        {error && (
          <div style={{ padding: '8px 12px', background: '#fde8e8', color: '#9b1c1c', borderRadius: '8px', fontSize: '12px', marginBottom: '14px' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="field full">
              <label>Opportunity Title *</label>
              <input
                type="text"
                placeholder="e.g. Downtown Tree Planting & Park Cleanup"
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div className="field">
              <label>Category</label>
              <select
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="Environment">Environment</option>
                <option value="Food">Food & Nutrition</option>
                <option value="Education">Education</option>
                <option value="Animals">Animals</option>
                <option value="Community">Community Care</option>
              </select>
            </div>

            <div className="field">
              <label>Available Spots</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Users size={16} color="#718078" />
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={formData.spots}
                  onChange={e => setFormData({ ...formData, spots: parseInt(e.target.value) || 1 })}
                  required
                />
              </div>
            </div>

            <div className="field">
              <label>Event Date</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Calendar size={16} color="#718078" />
                <input
                  type="date"
                  value={formData.date}
                  onChange={e => setFormData({ ...formData, date: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="field">
              <label>Shift Time</label>
              <input
                type="text"
                placeholder="e.g. 9:00 AM – 1:00 PM"
                value={formData.time}
                onChange={e => setFormData({ ...formData, time: e.target.value })}
                required
              />
            </div>

            <div className="field full">
              <label>Location & Address *</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MapPin size={16} color="#718078" />
                <input
                  type="text"
                  placeholder="e.g. Memorial Park, Pavilion #2 (120 Elm St)"
                  value={formData.location}
                  onChange={e => setFormData({ ...formData, location: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="field full">
              <label>Organizer or Organization Name</label>
              <input
                type="text"
                placeholder="e.g. Urban Green Team"
                value={formData.organizer}
                onChange={e => setFormData({ ...formData, organizer: e.target.value })}
              />
            </div>

            <div className="field full">
              <label>Choose Badge & Theme Tone</label>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {iconOptions.map(opt => (
                  <button
                    type="button"
                    key={opt.icon}
                    style={{
                      border: formData.icon === opt.icon ? '2px solid #276b49' : '1px solid #dfe6dc',
                      borderRadius: '10px',
                      padding: '8px 12px',
                      background: formData.icon === opt.icon ? '#e9f3e7' : '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '12px'
                    }}
                    onClick={() => setFormData({ ...formData, icon: opt.icon, tone: opt.tone })}
                  >
                    <span>{opt.icon}</span>
                    <span>{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="field full">
              <label>Description & Volunteer Responsibilities *</label>
              <textarea
                placeholder="Describe what volunteers will be doing, what to bring, and who to look for..."
                value={formData.details}
                onChange={e => setFormData({ ...formData, details: e.target.value })}
                rows={3}
                required
              />
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn btn-light"
              onClick={() => setIsCreateModalOpen(false)}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <Sparkles size={14} />
              <span>Publish Opportunity</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
