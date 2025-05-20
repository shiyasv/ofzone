
export interface Offer {
  id: string;
  title: string;
  description: string;
  discountPercentage: number;
  validUntil: string;
  code: string;
  category: string;
  isFeatured: boolean;
  isLimited: boolean;
}

// Initial sample data
const sampleOffers: Offer[] = [
  {
    id: '1',
    title: 'Summer Sale',
    description: 'Get amazing discounts on all summer products',
    discountPercentage: 20,
    validUntil: '2025-09-30',
    code: 'SUMMER20',
    category: 'seasonal',
    isFeatured: true,
    isLimited: false
  },
  {
    id: '2',
    title: 'New Customer Discount',
    description: 'Special discount for first-time customers',
    discountPercentage: 15,
    validUntil: '2025-12-31',
    code: 'WELCOME15',
    category: 'new-customer',
    isFeatured: false,
    isLimited: false
  },
  {
    id: '3',
    title: 'Flash Sale Friday',
    description: 'Limited time offer. Valid only this Friday!',
    discountPercentage: 30,
    validUntil: '2025-06-07',
    code: 'FLASH30',
    category: 'flash-sale',
    isFeatured: false,
    isLimited: true
  }
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

// Format date for display
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
