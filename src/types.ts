export interface VolunteerEvent {
  id: string;
  title: string;
  category: string;
  date: string;
  time: string;
  location: string;
  spots: number;
  icon: string;
  tone?: string;
  details: string;
  organizer?: string;
  requirements?: string[];
  isCustom?: boolean;
}

export interface Signup {
  id: string;
  eventId: string;
  title: string;
  date: string;
  time: string;
  location: string;
  name: string;
  email: string;
  shift?: string;
  hours?: number;
  createdAt?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  cause: string;
  phone?: string;
  goalHours?: number;
  isLoggedIn?: boolean;
}

export interface UserSettings {
  reminders: boolean;
  updates: boolean;
  weeklyDigest?: boolean;
}

export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  timeAgo: string;
  icon: string;
}
