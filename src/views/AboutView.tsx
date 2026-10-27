import React, { useState } from 'react';
import { useVolunteer } from '../context/VolunteerContext';
import { Heart, Send, Users, TreePine, Sparkles, HelpCircle } from 'lucide-react';

export const AboutView: React.FC = () => {
  const { showToast } = useVolunteer();
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Thanks for your message! Our community team will review it.');
    setContactName('');
    setContactEmail('');
    setSubject('');
    setMessage('');
  };

  return (
    <div>
      <div className="section-heading">
        <div>
          <div className="eyebrow">ABOUT VOLUNTEER HUB</div>
          <h2>Our Mission & Community Promise</h2>
          <p style={{ color: 'var(--muted)', fontSize: '13px', margin: '4px 0 0' }}>
            Bridging passionate individuals with non-profit initiatives to empower thriving neighborhoods.
          </p>
        </div>
      </div>

      {/* 3 Pillars */}
      <div className="category-grid" style={{ marginBottom: '32px' }}>
        <div className="category-card" style={{ cursor: 'default' }}>
          <div className="category-icon green">
            <TreePine size={22} color="#276b49" />
          </div>
          <b>Rooted in Neighborhoods</b>
          <small>
            Directly addressing local environmental restoration, food scarcity, and education equity.
          </small>
        </div>

        <div className="category-card" style={{ cursor: 'default' }}>
          <div className="category-icon blue">
            <Users size={22} color="#2b5996" />
          </div>
          <b>Verified Initiatives</b>
          <small>
            All volunteer opportunities are submitted by registered community groups or dedicated organizers.
          </small>
        </div>

        <div className="category-card" style={{ cursor: 'default' }}>
          <div className="category-icon yellow">
            <Sparkles size={22} color="#946d1e" />
          </div>
          <b>Simple, Direct RSVP</b>
          <small>
            Instant registration without barriers or complex hurdles—sign up and show up ready to help.
          </small>
        </div>

        <div className="category-card" style={{ cursor: 'default' }}>
          <div className="category-icon pink">
            <Heart size={22} color="#b83e6b" />
          </div>
          <b>Recognition & Impact</b>
          <small>
            Every volunteer hour is recognized and recorded to celebrate your community contributions.
          </small>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {/* FAQs */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <HelpCircle size={20} color="#276b49" />
            <h3 style={{ margin: 0, font: "800 16px 'Manrope', sans-serif" }}>Frequently Asked Questions</h3>
          </div>

          <div style={{ display: 'grid', gap: '16px', fontSize: '13px' }}>
            <div>
              <strong style={{ display: 'block', color: 'var(--ink)', marginBottom: '4px' }}>
                How do volunteer shifts work?
              </strong>
              <p style={{ margin: 0, color: 'var(--muted)', fontSize: '12px', lineHeight: 1.6 }}>
                When you click "Confirm My Registration", your slot is instantly reserved and counted. Organizers will prepare supplies and check you in when you arrive.
              </p>
            </div>

            <div>
              <strong style={{ display: 'block', color: 'var(--ink)', marginBottom: '4px' }}>
                Can our organization post shifts?
              </strong>
              <p style={{ margin: 0, color: 'var(--muted)', fontSize: '12px', lineHeight: 1.6 }}>
                Yes! Any community group or organizer can click "Post Opportunity" to publish upcoming workdays, food distributions, or mentorship sessions.
              </p>
            </div>

            <div>
              <strong style={{ display: 'block', color: 'var(--ink)', marginBottom: '4px' }}>
                What if my schedule changes?
              </strong>
              <p style={{ margin: 0, color: 'var(--muted)', fontSize: '12px', lineHeight: 1.6 }}>
                You can easily cancel your sign-up in "My Sign-ups". This releases the spot immediately so another neighbor can take part.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="form-card" style={{ maxWidth: '100%', margin: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <div style={{ background: '#e9f3e7', color: '#276b49', padding: '8px', borderRadius: '10px' }}>
              <Send size={16} />
            </div>
            <div>
              <h3 style={{ margin: 0, font: "800 16px 'Manrope', sans-serif" }}>Get in Touch</h3>
              <small style={{ color: 'var(--muted)' }}>Send feedback or partner with Volunteer Hub</small>
            </div>
          </div>

          <form onSubmit={handleContactSubmit}>
            <div style={{ display: 'grid', gap: '12px' }}>
              <div className="field">
                <label>Your Name</label>
                <input
                  type="text"
                  placeholder="Taylor Smith"
                  value={contactName}
                  onChange={e => setContactName(e.target.value)}
                  required
                />
              </div>

              <div className="field">
                <label>Your Email</label>
                <input
                  type="email"
                  placeholder="taylor@example.org"
                  value={contactEmail}
                  onChange={e => setContactEmail(e.target.value)}
                  required
                />
              </div>

              <div className="field">
                <label>Subject</label>
                <input
                  type="text"
                  placeholder="e.g. Partnering as a 501(c)(3) / Suggestion"
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                  required
                />
              </div>

              <div className="field">
                <label>Message</label>
                <textarea
                  rows={3}
                  placeholder="How can we assist you or your community initiative?"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ marginTop: '6px' }}>
                <Send size={13} />
                <span>Submit Message</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
