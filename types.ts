
export type Region = 'north' | 'center' | 'south';
export type Category = 'spa' | 'hotel';

export interface Place {
  id: string;
  name: string;
  region: Region;
  category: Category;
  image: string;
  description: string;
  location: string;
  links: {
    website: string;
    instagram: string;
    video: string;
  };
  tags: string[];
  reviewDate: string;
  rating: number;
}

export interface RegionData {
    id: Region;
    name: string;
    description: string;
    image: string;
    sortOrder: number;
}

export interface SocialLinks {
    instagramUrl?: string;
    tiktokUrl?: string;
    facebookUrl?: string;
    youtubeUrl?: string;
}
