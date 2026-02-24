'use server';

/**
 * Shuffles array in-place.
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}


/**
 * Generates mock listing data locally.
 * @param {{ city: string, listingType: 'homestays' | 'guides' }} input
 * @returns {Array<Object>} An array of mock listings.
 */
function generateMockListings({ city, listingType }) {
  const listings = [];
  
  if (listingType === 'homestays') {
    const count = 32;

    let homestayNames = [
      "Serene Sanctuary", "Mountain Whisper Cottage", "Green Valley Abode", "Coastal Charm Villa",
      "Sunrise Meadows", "Riverbend Retreat", "The Rustic Barn", "Cityscape Suite",
      "Lakeside Lodge", "Bloomfield Homestay", "Heritage Haven", "The Minimalist Loft",
      "Bohemian Bungalow", "Pine Forest Getaway", "Tranquil Terrace", "Orchard Grove",
      "The Azure House", "Golden Sands Stay", "Eagle's Peak", "Hilltop Hideout",
      "The Artist's Nook", "Country Comfort Cottage", "The Urban Escape", "Seaside Serenity",
      "The Writer's Corner", "Starlight Cabin", "The Garden Hideaway", "Palm Grove Inn",
      "The Vintage Residence", "Coral Cove Homestay", "The Glass Pavilion", "The Royal Manor"
    ];

    let homestayImageHints = [
      'modern room', 'cozy cottage', 'guest suite', 'nature cabin', 'luxury villa', 'beach house',
      'mountain lodge', 'rustic farmhouse', 'urban apartment', 'riverside retreat', 'garden view', 'poolside cabana',
      'historic home', 'minimalist studio', 'bohemian loft', 'penthouse suite', 'lakefront bungalow', 'forest hideaway',
      'desert oasis', 'tropical paradise', 'eco friendly home', 'ski chalet', 'country manor', 'island hut',
      'treehouse escape', 'yurt experience', 'glass house', 'A-frame cabin', 'stone cottage', 'log cabin', 'houseboat stay', 'art deco flat'
    ];
    
    // Shuffle the arrays to randomize the data
    shuffle(homestayNames);
    shuffle(homestayImageHints);

    for (let i = 0; i < count; i++) {
      listings.push({
        id: `${city.replace(/\s/g, '-')}-homestay-${i + 1}-${Math.random()}`, // Add random suffix to ensure unique key
        name: homestayNames[i] || `Sample Homestay ${i + 1} in ${city}`,
        location: `Near ${city} Landmark ${i + 1}`,
        price: 1500 + Math.floor(Math.random() * 8500), // Widen the price range
        rating: parseFloat((3.5 + Math.random() * 1.5).toFixed(1)),
        description: `This is a sample description for a wonderful homestay in ${city}. Enjoy your stay!`,
        imageHint: homestayImageHints[i] || 'homestay interior',
      });
    }
  } else if (listingType === 'guides') {
    const count = 32;
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
