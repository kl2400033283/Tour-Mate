export const homestaysByCity = {
  'varanasi': [
    {
      id: 1,
      name: 'Ganga View Homestay',
      location: 'Near Dashashwamedh Ghat',
      price: 2500,
      rating: 4.6,
      description: 'Peaceful river-view stay with traditional hospitality.',
      image: 'https://picsum.photos/seed/ganga-homestay/600/400',
      hint: 'ganges view room'
    },
    {
      id: 2,
      name: 'Kashi Residency',
      location: 'Near Kashi Vishwanath Temple',
      price: 2000,
      rating: 4.4,
      description: 'Comfortable rooms close to major spiritual landmarks and Ghats.',
      image: 'https://picsum.photos/seed/kashi-residency/600/400',
      hint: 'modern hotel room'
    },
    {
      id: 3,
      name: 'Assi Riverside Stay',
      location: 'Near Assi Ghat',
      price: 3000,
      rating: 4.7,
      description: 'Relaxing stay with beautiful sunrise views and modern amenities.',
      image: 'https://picsum.photos/seed/assi-riverside/600/400',
      hint: 'luxury hotel room'
    },
    {
      id: 4,
      name: 'Budget Stay Varanasi',
      location: 'Lanka, Varanasi',
      price: 1200,
      rating: 4.1,
      description: 'An affordable and clean stay for budget travelers.',
      image: 'https://picsum.photos/seed/budget-varanasi/600/400',
      hint: 'simple room interior'
    }
  ],
  'tirupati': [
    {
      id: 5,
      name: 'Tirumala Homestay',
      location: 'Near Tirumala Temple',
      price: 3500,
      rating: 4.8,
      description: 'Stay close to the divine with our comfortable homestay.',
      image: 'https://picsum.photos/seed/tirumala-homestay/600/400',
      hint: 'peaceful room interior'
    },
    {
      id: 6,
      name: 'Padmavathi Guest House',
      location: 'Near Padmavathi Temple',
      price: 1800,
      rating: 4.3,
      description: 'A cozy guesthouse offering great value and comfort.',
      image: 'https://picsum.photos/seed/padmavathi-guesthouse/600/400',
      hint: 'guest house room'
    }
  ],
    'jaipur': [
    {
      id: 7,
      name: 'Royal Heritage Haveli',
      location: 'Near City Palace',
      price: 7500,
      rating: 4.9,
      description: 'Experience royalty in this beautifully restored haveli.',
      image: 'https://picsum.photos/seed/royal-haveli-jaipur/600/400',
      hint: 'heritage hotel room'
    },
    {
      id: 8,
      name: 'Pink City Homestay',
      location: 'C-Scheme',
      price: 2800,
      rating: 4.5,
      description: 'A charming homestay in the heart of the Pink City.',
      image: 'https://picsum.photos/seed/pink-city-homestay/600/400',
      hint: 'colorful room interior'
    }
  ],
  'agra': [
    {
      id: 9,
      name: 'Taj View Suites',
      location: 'Near Taj Mahal East Gate',
      price: 6000,
      rating: 4.8,
      description: 'Wake up to the stunning view of the Taj Mahal.',
      image: 'https://picsum.photos/seed/taj-view-suites/600/400',
      hint: 'taj mahal view'
    },
    {
      id: 10,
      name: 'Mughal Garden Homestay',
      location: 'Fatehabad Road',
      price: 3200,
      rating: 4.2,
      description: 'A comfortable stay with a touch of Mughal hospitality.',
      image: 'https://picsum.photos/seed/mughal-garden-homestay/600/400',
      hint: 'garden homestay'
    }
  ]
};

export const getAllHomestays = () => Object.values(homestaysByCity).flat();
