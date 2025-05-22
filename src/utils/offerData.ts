export interface Offer {
  id: string;
  title: string;
  description: string;
  code: string;
  discountPercentage: number;
  validUntil: string;
  category?: string;
  isLimited: boolean;
  imageUrl?: string;
  dealUrl?: string;
}

// Initial sample data
const sampleOffers: Offer[] = [
  {
    id: '1',
    title: 'Summer Sale',
    description: 'Get amazing discounts on all summer products',
    code: 'SUMMER20',
    discountPercentage: 20,
    validUntil: '2025-09-30',
    category: 'seasonal',
    isLimited: false
  },
  {
    id: '2',
    title: 'New Customer Discount',
    description: 'Special discount for first-time customers',
    code: 'WELCOME15',
    discountPercentage: 15,
    validUntil: '2025-12-31',
    category: 'new-customer',
    isLimited: false
  },
  {
    id: '3',
    title: 'Flash Sale Friday',
    description: 'Limited time offer. Valid only this Friday!',
    code: 'FLASH30',
    discountPercentage: 30,
    validUntil: '2025-06-07',
    category: 'flash-sale',
    isLimited: true
  }
];

// Create interface for Category
export interface Category {
  id: string;
  name: string;
  icon: string;
}

// Initial sample categories
const sampleCategories: Category[] = [
  { id: '1', name: "Electronics", icon: "💻" },
  { id: '2', name: "Fashion", icon: "👕" },
  { id: '3', name: "Food & Dining", icon: "🍴" },
  { id: '4', name: "Travel", icon: "✈️" },
  { id: '5', name: "Beauty", icon: "✨" },
  { id: '6', name: "Home & Garden", icon: "🏠" },
];

// Get offers from localStorage or use sample data if none exists
export const getOffers = (): Offer[] => {
  const storedOffers = localStorage.getItem('offers');
  return storedOffers ? JSON.parse(storedOffers) : sampleOffers;
};

// Save offers to localStorage
export const saveOffers = (offers: Offer[]): void => {
  localStorage.setItem('offers', JSON.stringify(offers));
};

// Add a new offer
export const addOffer = (offer: Omit<Offer, 'id'>): Offer => {
  const offers = getOffers();
  const newOffer = {
    ...offer,
    id: Date.now().toString(),
  };
  
  saveOffers([...offers, newOffer]);
  return newOffer;
};

// Delete an offer
export const deleteOffer = (id: string): boolean => {
  const offers = getOffers();
  const updatedOffers = offers.filter(offer => offer.id !== id);
  
  if (updatedOffers.length !== offers.length) {
    saveOffers(updatedOffers);
    return true;
  }
  
  return false;
};

// Get offer by ID
export const getOfferById = (id: string): Offer | undefined => {
  const offers = getOffers();
  return offers.find(offer => offer.id === id);
};

// Get categories from localStorage or use sample data if none exists
export const getCategories = (): Category[] => {
  const storedCategories = localStorage.getItem('categories');
  return storedCategories ? JSON.parse(storedCategories) : sampleCategories;
};

// Save categories to localStorage
export const saveCategories = (categories: Category[]): void => {
  localStorage.setItem('categories', JSON.stringify(categories));
};

// Add a new category
export const addCategory = (category: Omit<Category, 'id'>): Category => {
  const categories = getCategories();
  const newCategory = {
    ...category,
    id: Date.now().toString(),
  };
  
  saveCategories([...categories, newCategory]);
  return newCategory;
};

// Delete a category
export const deleteCategory = (id: string): boolean => {
  const categories = getCategories();
  const updatedCategories = categories.filter(category => category.id !== id);
  
  if (updatedCategories.length !== categories.length) {
    saveCategories(updatedCategories);
    return true;
  }
  
  return false;
};

// Update a category
export const updateCategory = (id: string, updates: Partial<Category>): boolean => {
  const categories = getCategories();
  const categoryIndex = categories.findIndex(category => category.id === id);
  
  if (categoryIndex !== -1) {
    categories[categoryIndex] = { ...categories[categoryIndex], ...updates };
    saveCategories(categories);
    return true;
  }
  
  return false;
};

// Format date for display
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Convert file to base64 for storage
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};
