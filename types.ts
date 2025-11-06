export interface Place {
  id: string;
  name: string;
  image: string;
  rating: number;
  tags: string[];
  location: string;
  reviewDate: string;
  description: string;
  links: {
    video: string;
    website: string;
  };
  region: string;
  featured?: boolean;
}
