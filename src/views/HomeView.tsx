import React from 'react';
import { useVolunteer } from '../context/VolunteerContext';
import { CATEGORIES } from '../data/seedData';
import { VolunteerEvent } from '../types';
import { 
  ArrowRight, 
  Calendar, 
  MapPin, 
  Users, 
  Plus, 
  Sparkles, 
  HeartHandshake, 
  TreePine 
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const { 
    events, 
    signups, 
    setActiveTab, 
    setSelectedEvent, 
    setIsCreateModalOpen,
    setCategoryFilter 
  } = useVolunteer();

  // Featured 3 events
  const featuredEvents = events.slice(0, 3);

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr + 'T12:00:00');
      return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  const totalSpotsOpen = events.reduce((acc, e) => acc + (e.spots || 0), 0);
  const totalVolunteers = 148 + signups.length;

  const handleCategoryClick = (categoryKey: string) => {
    setCategoryFilter(categoryKey);
    setActiveTab('opportunities');
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow">COMMUNITY SERVICE & ENGAGEMENT</div>
          <h1>
            Connect with <em>meaningful</em> local volunteer causes.
          </h1>
          <p>
            Find hands-on volunteering opportunities across environmental restoration, 
            food distribution, youth mentorship, and animal rescue right in your neighborhood.
          </p>

          <div className="hero-actions">
            <button 
              className="btn btn-primary"
              onClick={() => setActiveTab('opportunities')}
            >
              <span>Explore Opportunities</span>
              <ArrowRight size={14} />
            </button>
            <button 
              className="btn btn-light"
              onClick={() => setIsCreateModalOpen(true)}
            >
              <Plus size={14} />
              <span>Host an Event</span>
            </button>
          </div>

          <div className="hero-proof">
            <div className="avatar-stack">
              <b>JD</b>
              <b>AR</b>
              <b>ML</b>
              <b>+</b>
            </div>
            <div>
              <strong>{totalVolunteers} Local Volunteers</strong>
              <div>Serving 24+ community organizations this year</div>
            </div>
          </div>
        </div>

        {/* Hero Illustration */}
        <div className="hero-art">
          <div className="art-circle" />

          {/* Top card */}
          <div className="art-card art-card-top">
            <div className="art-icon">
              <TreePine size={22} color="#276b49" />
            </div>
            <div>
              <b>Park Stewardship</b>
              <small className="check">✓ 8 volunteers confirmed</small>
            </div>
          </div>

          {/* Bottom card */}
          <div className="art-card art-card-bottom">
            <div className="art-icon orange">
              <HeartHandshake size={22} color="#f4a36f" />
            </div>
            <div>
              <b>Food Drive Ready</b>
              <small>Distribution starts 10 AM</small>
            </div>
          </div>

          {/* Stat bubble */}
          <div className="hero-stat">
            <strong>98%</strong>
            <span>Volunteer<br />Satisfaction</span>
          </div>
        </div>
      </section>

      {/* Stats Row */}
      <section className="stats-row">
        <div>
          <strong>{events.length} Active</strong>
          <span>Community initiatives</span>
        </div>
        <div>
          <strong>{totalSpotsOpen} Open</strong>
          <span>Available shift spots</span>
        </div>
        <div>
          <strong>{signups.length * 3 + 45} Hours</strong>
          <span>Service logged this month</span>
        </div>
        <div>
          <strong>100% Free</strong>
          <span>Community powered</span>
        </div>
      </section>

      {/* Browse by Category */}
      <section className="section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">DISCOVER BY CAUSE</div>
            <h2>What causes do you care about?</h2>
          </div>
          <button 
            className="text-link"
            onClick={() => {
              setCategoryFilter('');
              setActiveTab('opportunities');
            }}
          >
            View all categories →
          </button>
        </div>

        <div className="category-grid">
          {CATEGORIES.filter(c => c.key !== '').map(cat => (
            <div 
              key={cat.key} 
              className="category-card"
              onClick={() => handleCategoryClick(cat.key)}
            >
              <div className={`category-icon ${cat.colorClass}`}>
                {cat.icon}
              </div>
              <b>{cat.name}</b>
              <small>
                {events.filter(e => e.category === cat.key).length} upcoming projects available
              </small>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Opportunities */}
      <section className="section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">UPCOMING HIGHLIGHTS</div>
            <h2>Featured Volunteer Opportunities</h2>
          </div>
          <button 
            className="text-link"
            onClick={() => setActiveTab('opportunities')}
          >
            Browse all ({events.length}) →
          </button>
        </div>

        <div className="event-grid">
          {featuredEvents.map((event: VolunteerEvent) => (
            <article 
              key={event.id} 
              className="event-card"
              style={{ cursor: 'pointer' }}
              onClick={() => setSelectedEvent(event)}
            >
              <div className={`event-cover ${event.tone || ''}`}>
                <span>{event.icon}</span>
                <span className="pill">{event.category}</span>
              </div>

              <div className="event-card-body">
                <h3>{event.title}</h3>
                <p>{event.details}</p>

                <div className="event-meta">
                  <span>
                    <Calendar size={13} color="#276b49" />
                    {formatDate(event.date)} · {event.time}
                  </span>
                  <span>
                    <MapPin size={13} color="#276b49" />
                    {event.location}
                  </span>
                  <span>
                    <Users size={13} color="#276b49" />
                    {event.spots} spots available
                  </span>
                </div>

                <div className="event-footer">
                  <span className="spots">
                    <strong>{event.spots}</strong> open slots
                  </span>
                  <span style={{ fontSize: '11px', color: 'var(--green)', fontWeight: 800 }}>
                    Sign up →
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Call to action band */}
      <div className="cta-band">
        <div>
          <h2>Organizing an initiative in your town?</h2>
          <p>Post your event on Volunteer Hub and recruit dedicated neighbors in minutes.</p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <Sparkles size={14} />
          <span>Post an Opportunity</span>
        </button>
      </div>
    </div>
  );
};
