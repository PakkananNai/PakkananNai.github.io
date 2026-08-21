export type PageType =
  | 'home'
  | 'browse'
  | 'details'
  | 'checkout'
  | 'library'
  | 'reader'
  | 'profile'
  | 'login';

export interface Chapter {
  id: number;
  title: string;
  page: number;
}

export interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  description: string;
  price: number;
  rating: number;
  reviews: number;
  category: string;
  pages: number;
  language: string;
  publishDate: string;
  chapters?: Chapter[];
  reviewsList?: Review[];
  progress?: number; // 0-100 percentage
  isFinished?: boolean;
  isFavorite?: boolean;
  isBestSeller?: boolean;
  isNewRelease?: boolean;
  isFree?: boolean;
  featuredPastelBg?: string;
}

export interface Category {
  id: string;
  name: string;
  iconName: string;
  bookCount: number;
  bgColor: string;
  textColor: string;
  borderColor: string;
}

export interface CartItem {
  book: Book;
  quantity: number;
}

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  purchasedCount: number;
  finishedCount: number;
  readingHours: number;
  darkMode: boolean;
  notifications: boolean;
}
