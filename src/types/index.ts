export type PageId =
  | 'home'
  | 'story'
  | 'philosophy'
  | 'ecosystem'
  | 'ventures'
  | 'community'
  | 'media'
  | 'vision'
  | 'founder'
  | 'join'
  | 'contact';

export interface Venture {
  id: string;
  name: string;
  category: 'Hospitality' | 'Food & Community' | 'Media & Storytelling';
  status: 'Operational' | 'Active Development';
  tagline: string;
  description: string;
  details: string[];
  image: string;
  location: string;
  focusArea: string;
}

export interface FutureSector {
  id: string;
  title: string;
  nature: string;
  rationale: string;
  potentialActivities: string[];
  readiness: 'Exploratory' | 'Conceptual' | 'Planned';
}

export interface MediaStory {
  id: string;
  title: string;
  category: 'Aaj Ka Devta' | 'Documentary' | 'Cultural Reflection' | 'Field Notes' | 'Founder Vlog';
  duration: string;
  description: string;
  featuredQuote?: string;
  thumbnail: string;
  videoId?: string;
  releaseDate: string;
}

export interface ProcessStage {
  step: number;
  name: string;
  shortDesc: string;
  fullDesc: string;
  keyAction: string;
}

export interface ParticipationInquiry {
  name: string;
  email: string;
  phone?: string;
  areaOfInterest:
    | 'business_hospitality'
    | 'creative_media'
    | 'community_initiatives'
    | 'skills_volunteering'
    | 'general_enquiry';
  experience?: string;
  message: string;
}
