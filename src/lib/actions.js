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
    
    let landmarkNames = [
        "Central Park", "City Museum", "Riverfront Promenade", "Old Town Square",
        "Grand Cathedral", "Botanical Gardens", "National Art Gallery", "Historic Clock Tower",
        "Main Street Market", "Victory Monument", "The Grand Theatre", "Parliament House",
        "The Royal Palace", "State University Campus", "The Tech Park", "Freedom Bridge",
        "St. John's Church", "The Observatory", "Sunset Point", "The Art Deco District",
        "Cultural Heritage Center", "The Great Library", "War Memorial", "The Shopping Arcade",
        "City Zoo", "The Rose Garden", "Hilltop Viewpoint", "The Ancient Ruins",
        "Lakeside Park", "The Spice Market", "The Lighthouse", "The Old Fort"
    ];

    // Shuffle the arrays to randomize the data
    shuffle(homestayNames);
    shuffle(homestayImageHints);
    shuffle(landmarkNames);

    for (let i = 0; i < count; i++) {
      listings.push({
        id: `${city.replace(/\s/g, '-')}-homestay-${i + 1}-${Math.random()}`, // Add random suffix to ensure unique key
        name: homestayNames[i] || `Sample Homestay ${i + 1} in ${city}`,
        location: `Near ${landmarkNames[i]}`,
        price: 1500 + Math.floor(Math.random() * 8500), // Widen the price range
        rating: parseFloat((3.5 + Math.random() * 1.5).toFixed(1)),
        description: `This is a sample description for a wonderful homestay in ${city}. Enjoy your stay!`,
        imageHint: homestayImageHints[i] || 'homestay interior',
      });
    }
  } else if (listingType === 'guides') {
    const count = 32;
    
    let guideNames = [
        'Aarav Sharma', 'Diya Patel', 'Rohan Das', 'Isha Singh', 'Vikram Rathore', 'Anika Gupta',
        'Aditya Verma', 'Mira Joshi', 'Arjun Reddy', 'Saanvi Desai', 'Kabir Kumar', 'Zara Khan',
        'Ishaan Malhotra', 'Priya Rao', 'Dev Mehra', 'Sia Chatterjee', 'Neel Menon', 'Myra Reddy',
        'Samar Ali', 'Avani Iyer', 'Vivaan Pillai', 'Tara Nair', 'Yash Sinha', 'Kiara Khanna',
        'Reyansh Thakur', 'Ananya Bajaj', 'Ayaan Krish', 'Riya Dubey', 'Zain Abdullah', 'Navya Bhat',
        'Arin Saxena', 'Diya Shankar'
    ];
    shuffle(guideNames);

    let guideImageHints = [
        'male guide avatar', 'female guide avatar', 'person illustration', 'character portrait',
        'friendly guide sketch', 'tour guide icon', 'adventure guide art', 'cultural guide avatar',
        'historical guide drawing', 'food tour guide illustration', 'nature guide avatar', 'spiritual guide art',
        'male character art', 'female character art', 'professional guide portrait', 'animated person',
        'male guide avatar', 'female guide avatar', 'person illustration', 'character portrait',
        'friendly guide sketch', 'tour guide icon', 'adventure guide art', 'cultural guide avatar',
        'historical guide drawing', 'food tour guide illustration', 'nature guide avatar', 'spiritual guide art',
        'male character art', 'female character art', 'professional guide portrait', 'animated person'
    ];
    shuffle(guideImageHints);

    const specialties = ['Spiritual Tours', 'Boat Tours', 'Culture & Heritage', 'Food Walks', 'Photography Tours', 'Adventure Trips'];
    const languages = ['English', 'Hindi', 'Bengali', 'Tamil', 'Telugu', 'Marathi', 'Gujarati', 'Kannada'];

    for (let i = 0; i < count; i++) {
        const knownLanguages = shuffle([...languages]).slice(0, Math.floor(Math.random() * 2) + 2); // 2-3 languages
        listings.push({
            id: `${city.replace(/\s/g, '-')}-guide-${i + 1}-${Math.random()}`,
            name: guideNames[i] || `Sample Guide ${i + 1}`,
            experience: Math.floor(Math.random() * 10) + 3, // 3-12 years
            languages: knownLanguages,
            rating: parseFloat((4.2 + Math.random() * 0.8).toFixed(1)), // 4.2 to 5.0
            rate: 2000 + Math.floor(Math.random() * 3000), // 2000-5000 per day
            specialty: specialties[Math.floor(Math.random() * specialties.length)],
            imageHint: guideImageHints[i] || 'guide avatar',
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
