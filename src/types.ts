export interface RatingItem {
  id: number;
  name: string;
  category: 'language' | 'framework' | 'tool';
  description: string;
  rating: number;
  ratingCount: number;
  likes: number;
  dislikes: number;
  comments: number;
  tags: string[];
  imageUrl?: string;
}