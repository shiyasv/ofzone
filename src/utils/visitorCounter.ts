
// Simple visitor counter implementation using localStorage
export const incrementVisitorCount = (): void => {
  try {
    // Get existing visitor count
    const existingCount = localStorage.getItem('visitor_count') || '0';
    const count = parseInt(existingCount, 10);
    
    // Store the visit date to prevent counting the same user multiple times in a day
    const lastVisit = localStorage.getItem('last_visit_date');
    const today = new Date().toDateString();
    
    // Only increment count if it's a new day or first visit
    if (lastVisit !== today) {
      localStorage.setItem('visitor_count', (count + 1).toString());
      localStorage.setItem('last_visit_date', today);
    }
  } catch (error) {
    console.error('Error tracking visitor:', error);
  }
};

export const getVisitorCount = (): number => {
  try {
    const count = localStorage.getItem('visitor_count') || '0';
    return parseInt(count, 10);
  } catch (error) {
    console.error('Error getting visitor count:', error);
    return 0;
  }
};
