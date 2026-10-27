# Volunteer Hub

A modern community service portal built with **React**, **TypeScript**, and **Vite**. Volunteer Hub connects local volunteers with grassroots non-profits, environmental stewardship workdays, food bank distributions, and youth mentorship programs.

## Key Features

- **Explore & Featured Opportunities**: Interactive community feed highlighting local initiatives with real-time slot availability, cause badges, dates, and locations.
- **Search & Multi-Filter Directory**: Search opportunities by title, neighborhood, or keywords, and filter by cause (Environment, Food, Education, Animals, Community) and timing (Weekdays vs. Weekends).
- **Direct RSVP & Spot Management**: Instant one-click registration for shifts with automatic spot decrement and collision detection.
- **My Active Sign-ups**: Overview of confirmed volunteer shifts with shift times, directions, and the ability to cancel or modify commitments.
- **Volunteer Impact Dashboard**: Track completed service hours, quarterly volunteer goal progress bar, categorized contributions, and recent activity logs.
- **Opportunity Posting (Host an Event)**: Community organizers can publish new volunteer initiatives with custom themes, shift times, and volunteer limits.
- **Volunteer Profile & Notification Preferences**: Manage personal details, cause interests, and reminders (24h shift alerts, new project announcements, and weekly digests).
- **Client-Side Persistence**: State and volunteer commitments persist seamlessly in browser storage (`localStorage`).

## Tech Stack

- **Framework**: React 18 (Functional components & Custom Hooks)
- **Language**: TypeScript
- **Bundler / Server**: Vite (running on port 3000)
- **Styling**: Native scoped CSS matching the Volunteer Hub design system
- **Icons**: Lucide React
- **Storage**: Browser LocalStorage (`vh_events_v1`, `vh_signups_v1`, `vh_profile_v1`, `vh_settings`)

## Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```
