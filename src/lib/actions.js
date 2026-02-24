'use server';

/**
 * Generates mock listing data locally.
 * @param {{ city: string, listingType: 'homestays' | 'guides' }} input
 * @returns {Array<Object>} An array of mock listings.
 */
function generateMockListings({ city, listingType }) {
  const listings = [];
  const count = Math.floor(Math.random() * 3) + 30; // Generate 30 to 32 listings

  if (listingType === 'homestays') {
    for (let i = 1; i <= count; i++) {
      listings.push({
        id: `${city.replace(/\s/g, '-')}-homestay-${i}`,
        name: `Sample Homestay ${i} in ${city}`,
        location: `Near ${city} Landmark ${i}`,
        price: 1500 + Math.floor(Math.random() * 5000),
        rating: parseFloat((3.5 + Math.random() * 1.5).toFixed(1)),
        description: `This is a sample description for a wonderful homestay in ${city}. Enjoy your stay!`,
        imageHint: 'modern room',
      });
    }
  } else if (listingType === 'guides') {
    const specialties = ['Historical Tours', 'Food & Culinary', 'Spiritual Sites', 'Adventure Trips'];
    for (let i = 1; i <= count; i++) {
      listings.push({
        id: `${city.replace(/\s/g, '-')}-guide-${i}`,
        name: `Sample Guide ${i}`,
        specialty: specialties[Math.floor(Math.random() * specialties.length)],
        rate: 500 + Math.floor(Math.random() * 1000),
        rating: parseFloat((4.0 + Math.random() * 1.0).toFixed(1)),
        imageHint: 'friendly guide',
      });
    }
  }

  return listings;
}

export async function generateListingsAction(input) {
    try {
        // Replace AI call with local mock data generation
        const listings = generateMockListings(input);
        // Simulate network delay for realism
        await new Promise(resolve => setTimeout(resolve, 500));
        return listings;
    } catch (error) {
        console.error('Error in generateListingsAction:', error);
        if (error instanceof Error) {
            throw new Error(`Failed to generate listings: ${error.message}`);
        }
        throw new Error('An unknown error occurred while generating listings.');
    }
}
