export type City = {
  name: string;
  slug: string;
  image: string;
  hint: string;
};

export const citiesByState: Record<string, City[]> = {
  'andhra-pradesh': [
    { name: 'Visakhapatnam', slug: 'visakhapatnam', image: 'https://picsum.photos/seed/visakhapatnam/400/300', hint: 'visakhapatnam beach' },
    { name: 'Tirupati', slug: 'tirupati', image: 'https://picsum.photos/seed/tirupati/400/300', hint: 'tirupati temple' },
    { name: 'Vijayawada', slug: 'vijayawada', image: 'https://picsum.photos/seed/vijayawada/400/300', hint: 'vijayawada city' },
    { name: 'Kakinada', slug: 'kakinada', image: 'https://picsum.photos/seed/kakinada/400/300', hint: 'kakinada beach' },
    { name: 'Kurnool', slug: 'kurnool', image: 'https://picsum.photos/seed/kurnool/400/300', hint: 'kurnool fort' },
    { name: 'Anantapur', slug: 'anantapur', image: 'https://picsum.photos/seed/anantapur/400/300', hint: 'anantapur temple' },
  ],
  'arunachal-pradesh': [
    { name: 'Tawang', slug: 'tawang', image: 'https://picsum.photos/seed/tawang/400/300', hint: 'tawang monastery' },
    { name: 'Ziro', slug: 'ziro', image: 'https://picsum.photos/seed/ziro/400/300', hint: 'ziro valley' },
  ],
  'assam': [
    { name: 'Guwahati', slug: 'guwahati', image: 'https://picsum.photos/seed/guwahati/400/300', hint: 'guwahati temple' },
    { name: 'Kaziranga', slug: 'kaziranga', image: 'https://picsum.photos/seed/kaziranga/400/300', hint: 'kaziranga national park' },
  ],
  'bihar': [
    { name: 'Bodh Gaya', slug: 'bodh-gaya', image: 'https://picsum.photos/seed/bodh-gaya/400/300', hint: 'bodh gaya temple' },
    { name: 'Patna', slug: 'patna', image: 'https://picsum.photos/seed/patna/400/300', hint: 'patna city' },
  ],
  'chhattisgarh': [
    { name: 'Raipur', slug: 'raipur', image: 'https://picsum.photos/seed/raipur/400/300', hint: 'raipur city' },
    { name: 'Bastar', slug: 'bastar', image: 'https://picsum.photos/seed/bastar/400/300', hint: 'bastar tribe' },
  ],
  'goa': [
    { name: 'Panaji', slug: 'panaji', image: 'https://picsum.photos/seed/panaji/400/300', hint: 'panaji church' },
    { name: 'Calangute', slug: 'calangute', image: 'https://picsum.photos/seed/calangute/400/300', hint: 'calangute beach' },
  ],
  'gujarat': [
    { name: 'Ahmedabad', slug: 'ahmedabad', image: 'https://picsum.photos/seed/ahmedabad/400/300', hint: 'ahmedabad heritage' },
    { name: 'Rann of Kutch', slug: 'rann-of-kutch', image: 'https://picsum.photos/seed/rann-of-kutch/400/300', hint: 'rann of kutch desert' },
  ],
  'haryana': [
    { name: 'Gurugram', slug: 'gurugram', image: 'https://picsum.photos/seed/gurugram/400/300', hint: 'gurugram skyline' },
    { name: 'Kurukshetra', slug: 'kurukshetra', image: 'https://picsum.photos/seed/kurukshetra/400/300', hint: 'kurukshetra temple' },
  ],
  'himachal-pradesh': [
    { name: 'Shimla', slug: 'shimla', image: 'https://picsum.photos/seed/shimla/400/300', hint: 'shimla mountains' },
    { name: 'Manali', slug: 'manali', image: 'https://picsum.photos/seed/manali/400/300', hint: 'manali snow' },
  ],
  'jharkhand': [
    { name: 'Ranchi', slug: 'ranchi', image: 'https://picsum.photos/seed/ranchi/400/300', hint: 'ranchi waterfall' },
    { name: 'Jamshedpur', slug: 'jamshedpur', image: 'https://picsum.photos/seed/jamshedpur/400/300', hint: 'jamshedpur city' },
  ],
  'karnataka': [
    { name: 'Bengaluru', slug: 'bengaluru', image: 'https://picsum.photos/seed/bengaluru/400/300', hint: 'bengaluru city' },
    { name: 'Mysuru', slug: 'mysuru', image: 'https://picsum.photos/seed/mysuru/400/300', hint: 'mysuru palace' },
    { name: 'Hampi', slug: 'hampi', image: 'https://picsum.photos/seed/hampi/400/300', hint: 'hampi ruins' },
  ],
  'kerala': [
    { name: 'Kochi', slug: 'kochi', image: 'https://picsum.photos/seed/kochi/400/300', hint: 'kochi backwaters' },
    { name: 'Munnar', slug: 'munnar', image: 'https://picsum.photos/seed/munnar/400/300', hint: 'munnar tea plantations' },
    { name: 'Alleppey', slug: 'alleppey', image: 'https://picsum.photos/seed/alleppey/400/300', hint: 'alleppey houseboats' },
  ],
  'madhya-pradesh': [
    { name: 'Bhopal', slug: 'bhopal', image: 'https://picsum.photos/seed/bhopal/400/300', hint: 'bhopal lake' },
    { name: 'Khajuraho', slug: 'khajuraho', image: 'https://picsum.photos/seed/khajuraho/400/300', hint: 'khajuraho temples' },
  ],
  'maharashtra': [
    { name: 'Mumbai', slug: 'mumbai', image: 'https://picsum.photos/seed/mumbai/400/300', hint: 'mumbai skyline' },
    { name: 'Pune', slug: 'pune', image: 'https://picsum.photos/seed/pune/400/300', hint: 'pune city' },
  ],
  'manipur': [
    { name: 'Imphal', slug: 'imphal', image: 'https://picsum.photos/seed/imphal/400/300', hint: 'imphal kangla fort' },
  ],
  'meghalaya': [
    { name: 'Shillong', slug: 'shillong', image: 'https://picsum.photos/seed/shillong/400/300', hint: 'shillong city' },
    { name: 'Cherrapunji', slug: 'cherrapunji', image: 'https://picsum.photos/seed/cherrapunji/400/300', hint: 'cherrapunji waterfalls' },
  ],
  'mizoram': [
    { name: 'Aizawl', slug: 'aizawl', image: 'https://picsum.photos/seed/aizawl/400/300', hint: 'aizawl city' },
  ],
  'nagaland': [
    { name: 'Kohima', slug: 'kohima', image: 'https://picsum.photos/seed/kohima/400/300', hint: 'kohima war cemetery' },
  ],
  'odisha': [
    { name: 'Bhubaneswar', slug: 'bhubaneswar', image: 'https://picsum.photos/seed/bhubaneswar/400/300', hint: 'bhubaneswar temples' },
    { name: 'Puri', slug: 'puri', image: 'https://picsum.photos/seed/puri/400/300', hint: 'puri beach' },
  ],
  'punjab': [
    { name: 'Amritsar', slug: 'amritsar', image: 'https://picsum.photos/seed/amritsar/400/300', hint: 'amritsar golden temple' },
  ],
  'rajasthan': [
    { name: 'Jaipur', slug: 'jaipur', image: 'https://picsum.photos/seed/jaipur/400/300', hint: 'jaipur hawa mahal' },
    { name: 'Udaipur', slug: 'udaipur', image: 'https://picsum.photos/seed/udaipur/400/300', hint: 'udaipur lake palace' },
    { name: 'Jodhpur', slug: 'jodhpur', image: 'https://picsum.photos/seed/jodhpur/400/300', hint: 'jodhpur blue city' },
  ],
  'sikkim': [
    { name: 'Gangtok', slug: 'gangtok', image: 'https://picsum.photos/seed/gangtok/400/300', hint: 'gangtok monastery' },
  ],
  'tamil-nadu': [
    { name: 'Chennai', slug: 'chennai', image: 'https://picsum.photos/seed/chennai/400/300', hint: 'chennai beach' },
    { name: 'Madurai', slug: 'madurai', image: 'https://picsum.photos/seed/madurai/400/300', hint: 'madurai meenakshi temple' },
  ],
  'telangana': [
    { name: 'Hyderabad', slug: 'hyderabad', image: 'https://picsum.photos/seed/hyderabad/400/300', hint: 'hyderabad charminar' },
  ],
  'tripura': [
    { name: 'Agartala', slug: 'agartala', image: 'https://picsum.photos/seed/agartala/400/300', hint: 'agartala palace' },
  ],
  'uttar-pradesh': [
    { name: 'Agra', slug: 'agra', image: 'https://picsum.photos/seed/agra/400/300', hint: 'agra taj mahal' },
    { name: 'Varanasi', slug: 'varanasi', image: 'https://picsum.photos/seed/varanasi/400/300', hint: 'varanasi ganges' },
  ],
  'uttarakhand': [
    { name: 'Rishikesh', slug: 'rishikesh', image: 'https://picsum.photos/seed/rishikesh/400/300', hint: 'rishikesh ganges' },
    { name: 'Nainital', slug: 'nainital', image: 'https://picsum.photos/seed/nainital/400/300', hint: 'nainital lake' },
  ],
  'west-bengal': [
    { name: 'Kolkata', slug: 'kolkata', image: 'https://picsum.photos/seed/kolkata/400/300', hint: 'kolkata howrah bridge' },
    { name: 'Darjeeling', slug: 'darjeeling', image: 'https://picsum.photos/seed/darjeeling/400/300', hint: 'darjeeling tea gardens' },
  ],
};
