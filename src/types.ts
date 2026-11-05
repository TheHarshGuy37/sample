export type ScreenTab = 'directory' | 'muhurat' | 'budget' | 'itinerary' | 'guests';

export type VendorCategory = 
  | 'Wedding Venues & Banquet Halls'
  | 'Bridal Wear & Groom Outfits'
  | 'Wedding Decor & Stage'
  | 'Catering & Food Services'
  | 'Photographers & Videographers'
  | 'DJ, Band & Entertainment'
  | 'Mehendi & Makeup Artists';

export interface VendorPackage {
  id: string;
  name: string;
  price: number;
  description: string;
  inclusions: string[];
}

export interface Vendor {
  id: string;
  name: string;
  category: VendorCategory;
  city: string;
  cityTagline?: string;
  rating: number;
  reviewsCount: number;
  basePrice: number;
  priceUnit: string;
  image: string;
  ceremonies: ('Sangeet' | 'Mehendi' | 'Wedding' | 'Haldi' | 'Reception')[];
  verified: boolean;
  budgetTier: 'Budget-Friendly' | 'Mid-Range' | 'Premium' | 'Luxury';
  capacity?: string;
  description: string;
  features: string[];
  packages: VendorPackage[];
  availableDates: string[]; // YYYY-MM-DD
}

export interface MuhuratDate {
  date: string; // YYYY-MM-DD
  dayOfWeek: string;
  month: string;
  tithi: string;
  nakshatra: string;
  muhuratWindow: string;
  muhuratName: string; // e.g., 'Godhuli Bela', 'Amrit Kaal', 'Subham Time'
  season: 'Winter Wedding Season' | 'Spring Wedding Season';
  suitabilityScore: number;
  simpleExplanation: string;
  highlightColor: string;
  isPeak: boolean;
}

export interface BudgetItem {
  id: string;
  category: VendorCategory | 'Travel & Cars' | 'Gifts & Hampers' | 'Other Expenses';
  title: string;
  vendorName: string;
  allocatedAmount: number;
  advancePaid: number;
  dueDate: string;
  status: 'Advance Paid' | 'Fully Paid' | 'Payment Due' | 'In Discussion';
  notes: string;
}

export interface CeremonialEvent {
  id: string;
  title: string;
  day: string;
  date: string;
  timeRange: string;
  muhuratTiming?: string;
  venuePavilion: string;
  dressCode: string;
  dressCodeColors: string;
  description: string;
  assignedVendors: string[];
  checklist: { id: string; task: string; completed: boolean }[];
  tag: 'Mehendi' | 'Sangeet' | 'Haldi' | 'Wedding' | 'Reception';
}

export interface RoyalGuest {
  id: string;
  name: string;
  familySide: "Bride's Side" | "Groom's Side" | "Close Family" | "Friends & Colleagues" | "Outstation Guests";
  partySize: number;
  suiteAssigned: string;
  rsvpStatus: 'Confirmed' | 'Pending' | 'Cannot Attend';
  dietaryPreference: 'Vegetarian' | 'Non-Vegetarian' | 'Jain Food' | 'Any Food';
  airportConcierge: 'Need Car Pickup' | 'Coming on Own' | 'Bus Arranged';
  welcomeHamperDelivered: boolean;
  contact: string;
}
