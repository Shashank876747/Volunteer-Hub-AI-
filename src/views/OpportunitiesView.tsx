import React from 'react';
import { useVolunteer } from '../context/VolunteerContext';
import { CATEGORIES } from '../data/seedData';
import { VolunteerEvent } from '../types';
import { Search, Calendar, MapPin, Users, Plus, FilterX } from 'lucide-react';

export const OpportunitiesView: React.FC = () => {
  const { 
    events, 
    searchTerm, 
    setSearchTerm, 
    categoryFilter, 
    setCategoryFilter, 
    dateFilter, 
    setDateFilter, 
    setSelectedEvent,
    setIsCreateModalOpen 
  } = useVolunteer();

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr + 'T12:00:00');
      return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  const isWeekend = (dateStr: string) => {
    try {
      const day = new Date(dateStr + 'T12:00:00').getDay();
      return day === 0 || day === 6;
    } catch {
      return false;
    }
  };

  const filteredEvents = events.filter((e: VolunteerEvent) => {
    // Search query
    const q = searchTerm.toLowerCase().trim();
    if (q) {
      const match = [e.title, e.category, e.location, e.details, e.organizer || '']
        .join(' ')
        .toLowerCase()
        .includes(q);
      if (!match) return false;
    }

    // Category filter
    if (categoryFilter && e.category !== categoryFilter) {
      return false;
    }

    // Timing filter
    if (dateFilter === 'weekend') {
      if (!isWeekend(e.date)) return false;
    } else if (dateFilter === 'weekday') {
      if (isWeekend(e.date)) return false;
    }

    return true;
  });

  return (
    <div>
      <div className="section-heading" style={{ marginBottom: '8px' }}>
        <div>
          <div className="eyebrow">VOLUNTEER DIRECTORY</div>
          <h2>Explore Opportunities</h2>
          <p style={{ color: 'var(--muted)', fontSize: '13px', margin: '4px 0 0' }}>
            Browse active community projects and find a shift that fits your schedule.
          </p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <Plus size={14} />
          <span>Post Opportunity</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="filter-bar">
        <div className="search-field">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search by title, neighborhood, cause, or keywords..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        <select
          value={categoryFilter}
          onChange={e => setCategoryFilter(e.target.value)}
          aria-label="Filter by category"
        >
          {CATEGORIES.map(c => (
            <option key={c.key} value={c.key}>
              {c.name}
            </option>
          ))}
        </select>

        <select
          value={dateFilter}
          onChange={e => setDateFilter(e.target.value)}
          aria-label="Filter by timing"
        >
          <option value="">All Days</option>
          <option value="weekend">Weekends Only</option>
          <option value="weekday">Weekdays Only</option>
        </select>

        {(searchTerm || categoryFilter || dateFilter) && (
          <button
            className="btn btn-light btn-small"
            style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
            onClick={() => {
              setSearchTerm('');
              setCategoryFilter('');
              setDateFilter('');
            }}
          >
            <FilterX size={14} />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Results Count */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0 4px 16px', fontSize: '12px', color: 'var(--muted)' }}>
        <span>Showing <strong>{filteredEvents.length}</strong> available projects</span>
        {categoryFilter && (
          <span>Filtered by cause: <strong>{categoryFilter}</strong></span>
        )}
      </div>

      {/* Grid of Opportunities */}
      {filteredEvents.length > 0 ? (
        <div className="event-grid" style={{ margin: 0 }}>
          {filteredEvents.map((event: VolunteerEvent) => (
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
                    <strong>{event.spots}</strong> spots left
                  </span>
                  <span style={{ fontSize: '11px', color: 'var(--green)', fontWeight: 800 }}>
                    View & RSVP →
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <span>🔍</span>
          <strong>No opportunities match your current filters</strong>
          <p style={{ margin: '4px 0 16px', fontSize: '12px' }}>
            Try broadening your search term or selecting a different category.
          </p>
          <button 
            className="btn btn-outline btn-small"
            onClick={() => {
              setSearchTerm('');
              setCategoryFilter('');
              setDateFilter('');
            }}
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};
