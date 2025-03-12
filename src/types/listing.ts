
export interface Listing {
  id: string;
  title: string;
  price: number;
  location: string;
  type: string;
  status: 'active' | 'pending' | 'sold';
  featured: boolean;
  image: string;
  createdAt: string;
  views: number;
}
