export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: 'chicken' | 'mutton' | 'veg' | 'hyderabadi' | 'special';
  spiceLevel: 'mild' | 'medium' | 'hot' | 'extra-hot';
  rating: number;
  reviews: number;
  isVeg: boolean;
  isBestSeller?: boolean;
  isNew?: boolean;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  description: string;
}
