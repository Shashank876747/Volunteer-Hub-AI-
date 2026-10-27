import React, { createContext, useContext, useState, useEffect } from 'react';
import { VolunteerEvent, Signup, UserProfile, UserSettings, ActivityItem } from '../types';
import { SEED_EVENTS } from '../data/seedData';

interface VolunteerContextType {
  events: VolunteerEvent[];
  signups: Signup[];
  profile: UserProfile;
  settings: UserSettings;
  activities: ActivityItem[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedEvent: VolunteerEvent | null;
  setSelectedEvent: (event: VolunteerEvent | null) => void;
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (open: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  toast: { message: string; type?: 'success' | 'error' | 'info' } | null;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
  dateFilter: string;
  setDateFilter: (filter: string) => void;
  createEvent: (event: Omit<VolunteerEvent, 'id'>) => boolean;
  deleteEvent: (id: string) => void;
  signUpForEvent: (eventId: string, name: string, email: string, shift?: string) => { success: boolean; message: string };
  cancelSignup: (signupId: string) => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
  updateSettings: (settings: Partial<UserSettings>) => void;
  loginUser: (email: string, name: string) => void;
  logoutUser: () => void;
}

const STORE_EVENTS = 'vh_events_v1';
const STORE_SIGNUPS = 'vh_signups_v1';
const STORE_PROFILE = 'vh_profile_v1';
const STORE_SETTINGS = 'vh_settings';

const initialProfile: UserProfile = {
  name: 'Alex Rivera',
  email: 'alex.rivera@example.org',
  cause: 'Environment & Food Security',
  phone: '(555) 349-8821',
  goalHours: 20,
  isLoggedIn: true
};

const initialSettings: UserSettings = {
  reminders: true,
  updates: true,
  weeklyDigest: false
};

const VolunteerContext = createContext<VolunteerContextType | undefined>(undefined);

export const VolunteerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<VolunteerEvent[]>(() => {
    try {
      const stored = localStorage.getItem(STORE_EVENTS);
      const customEvents: VolunteerEvent[] = stored ? JSON.parse(stored) : [];
      // Seed events merged with user custom events
      const merged = [
        ...SEED_EVENTS.filter(s => !customEvents.some(c => c.id === s.id)),
        ...customEvents
      ];
      return merged;
    } catch {
      return SEED_EVENTS;
    }
  });

  const [signups, setSignups] = useState<Signup[]>(() => {
    try {
      const stored = localStorage.getItem(STORE_SIGNUPS);
      if (stored) {
        return JSON.parse(stored);
      }
      // Initial demo signups for realistic dashboard
      return [
        {
          id: 'signup-1',
          eventId: 'garden',
          title: 'Community Garden Workday',
          date: '2026-11-07',
          time: '9:00 AM – 12:00 PM',
          location: 'Oak Street Community Garden, 412 Oak St',
          name: 'Alex Rivera',
          email: 'alex.rivera@example.org',
          shift: 'Morning (9:00 AM – 12:00 PM)',
          hours: 3,
          createdAt: new Date().toISOString()
        }
      ];
    } catch {
      return [];
    }
  });

  const [profile, setProfile] = useState<UserProfile>(() => {
    try {
      const stored = localStorage.getItem(STORE_PROFILE);
      return stored ? { ...initialProfile, ...JSON.parse(stored) } : initialProfile;
    } catch {
      return initialProfile;
    }
  });

  const [settings, setSettings] = useState<UserSettings>(() => {
    try {
      const stored = localStorage.getItem(STORE_SETTINGS);
      return stored ? { ...initialSettings, ...JSON.parse(stored) } : initialSettings;
    } catch {
      return initialSettings;
    }
  });

  const [activities, setActivities] = useState<ActivityItem[]>([
    {
      id: 'act-1',
      title: 'Signed up for shift',
      description: 'Confirmed attendance for Community Garden Workday (3 hrs)',
      timeAgo: 'Just now',
      icon: '🌿'
    },
    {
      id: 'act-2',
      title: 'Profile Updated',
      description: 'Set volunteer goal to 20 hours for the quarter',
      timeAgo: '1 day ago',
      icon: '👤'
    },
    {
      id: 'act-3',
      title: 'Community Milestones',
      description: 'Over 145 volunteer spots filled across 6 organizations',
      timeAgo: '3 days ago',
      icon: '✨'
    }
  ]);

  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedEvent, setSelectedEvent] = useState<VolunteerEvent | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type?: 'success' | 'error' | 'info' } | null>(null);

  // Filters for opportunities
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  // Save to localStorage
  useEffect(() => {
    try {
      const customOnly = events.filter(e => e.isCustom || !SEED_EVENTS.some(s => s.id === e.id));
      localStorage.setItem(STORE_EVENTS, JSON.stringify(customOnly));
    } catch {
      // Ignore quota errors
    }
  }, [events]);

  useEffect(() => {
    try {
      localStorage.setItem(STORE_SIGNUPS, JSON.stringify(signups));
    } catch {
      // Ignore quota errors
    }
  }, [signups]);

  useEffect(() => {
    try {
      localStorage.setItem(STORE_PROFILE, JSON.stringify(profile));
    } catch {
      // Ignore
    }
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem(STORE_SETTINGS, JSON.stringify(settings));
    } catch {
      // Ignore
    }
  }, [settings]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3800);
  };

  const createEvent = (data: Omit<VolunteerEvent, 'id'>) => {
    const newEvent: VolunteerEvent = {
      ...data,
      id: 'custom-' + Date.now(),
      isCustom: true
    };
    setEvents(prev => [newEvent, ...prev]);
    showToast(`Event "${newEvent.title}" posted successfully!`);
    setActivities(prev => [
      {
        id: 'act-' + Date.now(),
        title: 'New Event Hosted',
        description: `Created opportunity "${newEvent.title}"`,
        timeAgo: 'Just now',
        icon: newEvent.icon || '✨'
      },
      ...prev
    ]);
    return true;
  };

  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
    setSignups(prev => prev.filter(s => s.eventId !== id));
    showToast('Event and associated signups deleted.');
  };

  const signUpForEvent = (eventId: string, name: string, email: string, shift?: string) => {
    const event = events.find(e => e.id === eventId);
    if (!event) {
      return { success: false, message: 'Event could not be found.' };
    }

    if (!name.trim() || !email.trim()) {
      return { success: false, message: 'Please enter your name and valid email to sign up.' };
    }

    // Check duplicate
    const existing = signups.some(
      s => s.eventId === eventId && s.email.toLowerCase() === email.trim().toLowerCase()
    );
    if (existing) {
      return { success: false, message: 'You are already signed up for this volunteer opportunity.' };
    }

    if (event.spots <= 0) {
      return { success: false, message: 'Sorry, this opportunity has no remaining open spots.' };
    }

    // Deduct spot
    setEvents(prev =>
      prev.map(e => (e.id === eventId ? { ...e, spots: Math.max(0, e.spots - 1) } : e))
    );

    const newSignup: Signup = {
      id: 'signup-' + Date.now(),
      eventId,
      title: event.title,
      date: event.date,
      time: shift || event.time,
      location: event.location,
      name: name.trim(),
      email: email.trim(),
      shift: shift || event.time,
      hours: 3, // average 3 hr shift
      createdAt: new Date().toISOString()
    };

    setSignups(prev => [newSignup, ...prev]);
    setActivities(prev => [
      {
        id: 'act-' + Date.now(),
        title: 'New Signup Confirmed',
        description: `Committed to ${event.title}`,
        timeAgo: 'Just now',
        icon: event.icon || '♡'
      },
      ...prev
    ]);

    showToast(`You're confirmed for ${event.title}!`, 'success');
    return { success: true, message: "You're registered! Your commitment is confirmed." };
  };

  const cancelSignup = (signupId: string) => {
    const signup = signups.find(s => s.id === signupId);
    if (signup) {
      // Re-increment event spot
      setEvents(prev =>
        prev.map(e => (e.id === signup.eventId ? { ...e, spots: e.spots + 1 } : e))
      );
      setSignups(prev => prev.filter(s => s.id !== signupId));
      showToast(`Cancelled registration for ${signup.title}.`, 'info');
      setActivities(prev => [
        {
          id: 'act-' + Date.now(),
          title: 'Registration Cancelled',
          description: `Withdrew from ${signup.title}`,
          timeAgo: 'Just now',
          icon: '↩'
        },
        ...prev
      ]);
    }
  };

  const updateProfile = (data: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...data }));
    showToast('Profile information saved.');
  };

  const updateSettings = (data: Partial<UserSettings>) => {
    setSettings(prev => ({ ...prev, ...data }));
    showToast('Preferences updated.');
  };

  const loginUser = (email: string, name: string) => {
    setProfile(prev => ({
      ...prev,
      name: name || prev.name,
      email: email || prev.email,
      isLoggedIn: true
    }));
    showToast(`Signed in as ${name || email}`);
  };

  const logoutUser = () => {
    setProfile(prev => ({ ...prev, isLoggedIn: false }));
    showToast('Signed out of demo session.', 'info');
  };

  return (
    <VolunteerContext.Provider
      value={{
        events,
        signups,
        profile,
        settings,
        activities,
        activeTab,
        setActiveTab,
        selectedEvent,
        setSelectedEvent,
        isCreateModalOpen,
        setIsCreateModalOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        toast,
        showToast,
        searchTerm,
        setSearchTerm,
        categoryFilter,
        setCategoryFilter,
        dateFilter,
        setDateFilter,
        createEvent,
        deleteEvent,
        signUpForEvent,
        cancelSignup,
        updateProfile,
        updateSettings,
        loginUser,
        logoutUser
      }}
    >
      {children}
    </VolunteerContext.Provider>
  );
};

export const useVolunteer = () => {
  const context = useContext(VolunteerContext);
  if (!context) {
    throw new Error('useVolunteer must be used within a VolunteerProvider');
  }
  return context;
};
