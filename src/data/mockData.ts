// Mock data for development

// Categories
export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  slug: string;
}

export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Electronics',
    description: 'Latest tech deals and discounts',
    image: 'https://images.pexels.com/photos/1841841/pexels-photo-1841841.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    slug: 'electronics',
  },
  {
    id: '2',
    name: 'Fashion',
    description: 'Clothing and accessory offers',
    image: 'https://images.pexels.com/photos/3965545/pexels-photo-3965545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    slug: 'fashion',
  },
  {
    id: '3',
    name: 'Home & Kitchen',
    description: 'Deals on home decor and appliances',
    image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    slug: 'home-kitchen',
  },
  {
    id: '4',
    name: 'Beauty & Health',
    description: 'Discounts on beauty and health products',
    image: 'https://images.pexels.com/photos/3373746/pexels-photo-3373746.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    slug: 'beauty-health',
  },
  {
    id: '5',
    name: 'Travel',
    description: 'Best travel deals and packages',
    image: 'https://images.pexels.com/photos/3935702/pexels-photo-3935702.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    slug: 'travel',
  },
  {
    id: '6',
    name: 'Entertainment',
    description: 'Deals on movies, games, and more',
    image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    slug: 'entertainment',
  },
];

// Offers
export interface Offer {
  id: string;
  title: string;
  description: string;
  image: string;
  categoryId: string;
  discount: number; // percentage
  originalPrice?: number;
  currentPrice?: number;
  code?: string;
  validUntil: string; // date string
  store: string;
  featured: boolean;
  isExpired: boolean;
}

export const mockOffers: Offer[] = [
  {
    id: '1',
    title: '50% Off New MacBook Pro',
    description: 'Get 50% off the latest MacBook Pro with Apple M2 chip',
    image: 'https://images.pexels.com/photos/930530/pexels-photo-930530.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    categoryId: '1',
    discount: 50,
    originalPrice: 1999,
    currentPrice: 999.5,
    code: 'MAC50OFF',
    validUntil: '2025-12-31',
    store: 'Apple Store',
    featured: true,
    isExpired: false,
  },
  {
    id: '2',
    title: '30% Off Summer Collection',
    description: 'Enjoy 30% off the latest summer collection',
    image: 'https://images.pexels.com/photos/6567607/pexels-photo-6567607.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    categoryId: '2',
    discount: 30,
    code: 'SUMMER30',
    validUntil: '2025-08-31',
    store: 'H&M',
    featured: true,
    isExpired: false,
  },
  {
    id: '3',
    title: 'Buy One Get One Free on All Kitchen Appliances',
    description: 'Purchase any kitchen appliance and get another one free',
    image: 'https://images.pexels.com/photos/6996192/pexels-photo-6996192.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    categoryId: '3',
    discount: 100,
    code: 'BOGOKITCHEN',
    validUntil: '2025-10-15',
    store: 'Home Depot',
    featured: false,
    isExpired: false,
  },
  {
    id: '4',
    title: '25% Off All Skincare Products',
    description: 'Get 25% off all skincare products from top brands',
    image: 'https://images.pexels.com/photos/3321416/pexels-photo-3321416.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    categoryId: '4',
    discount: 25,
    code: 'SKIN25',
    validUntil: '2025-11-30',
    store: 'Sephora',
    featured: false,
    isExpired: false,
  },
  {
    id: '5',
    title: '40% Off Weekend Getaway Packages',
    description: 'Enjoy 40% off all weekend getaway packages',
    image: 'https://images.pexels.com/photos/2373201/pexels-photo-2373201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    categoryId: '5',
    discount: 40,
    code: 'WEEKEND40',
    validUntil: '2025-09-30',
    store: 'Expedia',
    featured: true,
    isExpired: false,
  },
  {
    id: '6',
    title: '50% Off Movie Tickets',
    description: 'Get 50% off all movie tickets every Tuesday',
    image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    categoryId: '6',
    discount: 50,
    originalPrice: 15,
    currentPrice: 7.5,
    code: 'MOVIE50',
    validUntil: '2025-12-31',
    store: 'AMC Theaters',
    featured: false,
    isExpired: false,
  },
  {
    id: '7',
    title: '20% Off Samsung Galaxy S22',
    description: 'Get 20% off the latest Samsung Galaxy S22 smartphone',
    image: 'https://images.pexels.com/photos/1337752/pexels-photo-1337752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    categoryId: '1',
    discount: 20,
    originalPrice: 799,
    currentPrice: 639.2,
    code: 'GALAXY20',
    validUntil: '2025-11-15',
    store: 'Samsung',
    featured: false,
    isExpired: false,
  },
  {
    id: '8',
    title: '70% Off Home Decor',
    description: 'Huge discounts on all home decor items',
    image: 'https://images.pexels.com/photos/6032280/pexels-photo-6032280.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    categoryId: '3',
    discount: 70,
    code: 'DECOR70',
    validUntil: '2025-08-31',
    store: 'IKEA',
    featured: true,
    isExpired: false,
  },
];

// Advertisements
export interface Advertisement {
  id: string;
  title: string;
  imageUrl: string;
  targetUrl: string;
  position: 'home_top' | 'home_middle' | 'category_top' | 'sidebar';
  active: boolean;
}

export const mockAds: Advertisement[] = [
  {
    id: '1',
    title: 'Summer Sale - Up to 70% Off',
    imageUrl: 'https://images.pexels.com/photos/3965545/pexels-photo-3965545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    targetUrl: '/offers?campaign=summer',
    position: 'home_top',
    active: true,
  },
  {
    id: '2',
    title: 'New Electronics Deals',
    imageUrl: 'https://images.pexels.com/photos/1841841/pexels-photo-1841841.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    targetUrl: '/category/1',
    position: 'home_middle',
    active: true,
  },
  {
    id: '3',
    title: 'Beauty Products Discount',
    imageUrl: 'https://images.pexels.com/photos/3373746/pexels-photo-3373746.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    targetUrl: '/category/4',
    position: 'category_top',
    active: true,
  },
  {
    id: '4',
    title: 'Travel Deals',
    imageUrl: 'https://images.pexels.com/photos/3935702/pexels-photo-3935702.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    targetUrl: '/category/5',
    position: 'sidebar',
    active: true,
  },
];