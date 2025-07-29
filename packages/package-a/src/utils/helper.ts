export const utils = {
  formatDate: (date: Date): string => {
    return date.toISOString();
  },
  generateId: (): string => {
    return Math.random().toString(36).substr(2, 9);
  },
  validateEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}; 