import { VolunteerEvent } from '../types';

export const SEED_EVENTS: VolunteerEvent[] = [
  {
    id: 'garden',
    title: 'Community Garden Workday',
    category: 'Environment',
    date: '2026-11-07',
    time: '9:00 AM – 12:00 PM',
    location: 'Oak Street Community Garden, 412 Oak St',
    spots: 8,
    icon: '🌿',
    tone: '',
    details: 'Help prepare garden beds, plant winter seedlings, weed designated plots, and tidy up shared green space. Tools and work gloves provided!',
    organizer: 'Green Roots Community',
    requirements: ['Closed-toe shoes required', 'Bring reusable water bottle', 'Ages 12+ welcome with guardian']
  },
  {
    id: 'food',
    title: 'Neighborhood Food Pantry',
    category: 'Food',
    date: '2026-11-10',
    time: '10:00 AM – 1:00 PM',
    location: 'Community Food Center, Warehouse Bay 3',
    spots: 12,
    icon: '🥕',
    tone: 'orange-bg',
    details: 'Sort fresh produce donations, check packaging, and pack family-sized grocery parcels for local food distribution.',
    organizer: 'Greater Neighborhood Food Coalition',
    requirements: ['Able to lift up to 20 lbs', 'Comfortable standing for shifts', 'Hair net / apron provided on site']
  },
  {
    id: 'tutor',
    title: 'After-School Reading Buddies',
    category: 'Education',
    date: '2026-11-12',
    time: '3:30 PM – 5:00 PM',
    location: 'Maplewood Learning Center, Room 104',
    spots: 5,
    icon: '📚',
    tone: 'blue-bg',
    details: 'Pair one-on-one with 2nd to 4th grade elementary students to practice reading comprehension, phonetic pronunciation, and foster a love for books.',
    organizer: 'Maplewood Public Library Partners',
    requirements: ['Patience and encouragement', 'Background check verified at check-in', 'High school seniors or adults']
  },
  {
    id: 'cleanup',
    title: 'Park Clean-Up Morning',
    category: 'Environment',
    date: '2026-11-14',
    time: '8:30 AM – 11:00 AM',
    location: 'Riverside Park, North Trailhead Pavilion',
    spots: 16,
    icon: '🌎',
    tone: '',
    details: 'Keep local riverside trails, riverbanks, and recreation areas clean and safe for wildlife and families. Trash grabbers and bags provided.',
    organizer: 'Clean Trails Alliance',
    requirements: ['Outdoor weather gear', 'Sun protection & sturdy footwear', 'All ages welcome']
  },
  {
    id: 'animals',
    title: 'Shelter Pet Care & Socialization',
    category: 'Animals',
    date: '2026-11-15',
    time: '11:00 AM – 1:00 PM',
    location: 'Paws & Friends Animal Shelter, West Wing',
    spots: 6,
    icon: '🐾',
    tone: 'pink-bg',
    details: 'Assist shelter staff in preparing enrichment puzzles, brushing friendly cats, and walking calm shelter dogs in the courtyard.',
    organizer: 'Paws & Friends Rescue',
    requirements: ['Must be comfortable around dogs and cats', 'Long pants recommended', 'Ages 16+']
  },
  {
    id: 'community',
    title: 'Community Welcome Table & Resource Guide',
    category: 'Community',
    date: '2026-11-18',
    time: '4:00 PM – 6:00 PM',
    location: 'Town Hall Plaza, Main Concourse',
    spots: 10,
    icon: '🏡',
    tone: 'yellow-bg',
    details: 'Welcome neighbors, hand out municipal resource guides, register residents for library cards, and provide directions to local services.',
    organizer: 'Civic Engagement Council',
    requirements: ['Friendly interpersonal skills', 'Bilingual volunteers especially encouraged', 'Warm outerwear']
  }
];

export const CATEGORIES = [
  { name: 'All Categories', key: '' },
  { name: 'Environment', key: 'Environment', icon: '🌿', colorClass: 'green' },
  { name: 'Food & Hunger', key: 'Food', icon: '🥕', colorClass: 'yellow' },
  { name: 'Education', key: 'Education', icon: '📚', colorClass: 'blue' },
  { name: 'Animals', key: 'Animals', icon: '🐾', colorClass: 'pink' },
  { name: 'Community', key: 'Community', icon: '🏡', colorClass: 'green' }
];
