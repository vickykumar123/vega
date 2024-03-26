// priceCalculator.js

class PriceCalculator {
  baseDistance: number;
  basePrice: number;
  perishableKmPrice: number;
  nonPerishableKmPrice: number;

  constructor() {
    this.baseDistance = 5; // Base distance in km
    this.basePrice = 10; // Base price in euros
    this.perishableKmPrice = 1.5; // Per km price for perishable items in euros
    this.nonPerishableKmPrice = 1; // Per km price for non-perishable items in euros
  }

  calculateTotalPrice(
    basePrice: number,
    totalDistance: number,
    itemType: string
  ) {
    try {
      let totalPrice = (basePrice || this.basePrice) * 100; // Convert to cents to avoid decimal issues

      // Calculate additional distance beyond the base
      const additionalDistance = Math.max(0, totalDistance - this.baseDistance);

      const perKmPrice =
        itemType === 'perishable'
          ? this.perishableKmPrice * 100
          : this.nonPerishableKmPrice * 100; // Convert to cents
      const additionalPrice = additionalDistance * perKmPrice;
      totalPrice += additionalPrice;

      totalPrice /= 100;

      return totalPrice;
    } catch (error) {
      console.error('Error calculating total price:', error);
      throw error;
    }
  }
}

export default new PriceCalculator();
