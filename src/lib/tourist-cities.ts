export type City = {
  name: string;
  slug: string;
  image: string;
  hint: string;
  attractions: number;
  homestays: number;
  knownFor: string;
};

export const citiesByState: Record<string, City[]> = {
  'andhra-pradesh': [
    { name: 'Visakhapatnam', slug: 'visakhapatnam', image: 'https://picsum.photos/seed/visakhapatnam/400/300', hint: 'visakhapatnam beach', attractions: 22, homestays: 45, knownFor: 'Pristine beaches and a bustling port city.' },
    { name: 'Tirupati', slug: 'tirupati', image: 'https://picsum.photos/seed/tirupati/400/300', hint: 'tirupati temple', attractions: 12, homestays: 80, knownFor: 'A major pilgrimage site, home to the Tirumala Venkateswara Temple.' },
    { name: 'Vijayawada', slug: 'vijayawada', image: 'https://picsum.photos/seed/vijayawada/400/300', hint: 'vijayawada city', attractions: 18, homestays: 35, knownFor: 'Known for the Kanaka Durga Temple and Prakasam Barrage.' },
    { name: 'Kakinada', slug: 'kakinada', image: 'https://picsum.photos/seed/kakinada/400/300', hint: 'kakinada beach', attractions: 10, homestays: 25, knownFor: 'A port city with beautiful beaches and mangrove forests.' },
    { name: 'Kurnool', slug: 'kurnool', image: 'https://picsum.photos/seed/kurnool/400/300', hint: 'kurnool fort', attractions: 14, homestays: 20, knownFor: 'Famous for the Konda Reddy Fort and Belum Caves.' },
    { name: 'Anantapur', slug: 'anantapur', image: 'https://picsum.photos/seed/anantapur/400/300', hint: 'anantapur temple', attractions: 9, homestays: 15, knownFor: 'Home to the Lepakshi temple and historical sites.' },
  ],
  'arunachal-pradesh': [
    { name: 'Tawang', slug: 'tawang', image: 'https://picsum.photos/seed/tawang/400/300', hint: 'tawang monastery', attractions: 15, homestays: 30, knownFor: 'Famous for its stunning monastery and breathtaking mountain views.' },
    { name: 'Ziro', slug: 'ziro', image: 'https://picsum.photos/seed/ziro/400/300', hint: 'ziro valley', attractions: 8, homestays: 20, knownFor: 'A picturesque valley, home to the Apatani tribe and lush rice fields.' },
    { name: 'Itanagar', slug: 'itanagar', image: 'https://picsum.photos/seed/itanagar/400/300', hint: 'itanagar city', attractions: 11, homestays: 28, knownFor: 'The state capital, with historical sites like Ita Fort.' },
    { name: 'Bomdila', slug: 'bomdila', image: 'https://picsum.photos/seed/bomdila/400/300', hint: 'bomdila monastery', attractions: 7, homestays: 18, knownFor: 'Offers panoramic views of the Himalayas and has a beautiful monastery.' },
    { name: 'Mechuka', slug: 'mechuka', image: 'https://picsum.photos/seed/mechuka/400/300', hint: 'mechuka valley', attractions: 6, homestays: 12, knownFor: 'A remote valley known for its scenic beauty and adventure sports.' },
    { name: 'Roing', slug: 'roing', image: 'https://picsum.photos/seed/roing/400/300', hint: 'roing valley', attractions: 9, homestays: 15, knownFor: 'A nature lover\'s paradise with lakes, valleys, and wildlife sanctuaries.' },
    { name: 'Dirang', slug: 'dirang', image: 'https://picsum.photos/seed/dirang/400/300', hint: 'dirang valley', attractions: 8, homestays: 22, knownFor: 'A charming valley town with a pleasant climate and apple orchards.' },
    { name: 'Pasighat', slug: 'pasighat', image: 'https://picsum.photos/seed/pasighat/400/300', hint: 'pasighat town', attractions: 10, homestays: 19, knownFor: 'The oldest town in Arunachal Pradesh, located on the banks of the Siang river.' },
    { name: 'Along (Aalo)', slug: 'along-aalo', image: 'https://picsum.photos/seed/along-aalo/400/300', hint: 'along aalo town', attractions: 7, homestays: 16, knownFor: 'Known for its picturesque landscapes and tribal culture.' },
  ],
  'assam': [
    { name: 'Guwahati', slug: 'guwahati', image: 'https://picsum.photos/seed/guwahati/400/300', hint: 'guwahati temple', attractions: 25, homestays: 60, knownFor: 'A bustling city and gateway to Assam, famous for the Kamakhya Temple.' },
    { name: 'Kaziranga', slug: 'kaziranga', image: 'https://picsum.photos/seed/kaziranga/400/300', hint: 'kaziranga national park', attractions: 5, homestays: 40, knownFor: 'A UNESCO World Heritage Site, home to the one-horned rhinoceros.' },
    { name: 'Jorhat', slug: 'jorhat', image: 'https://picsum.photos/seed/jorhat/400/300', hint: 'jorhat tea', attractions: 12, homestays: 25, knownFor: 'Known as the "Tea Capital of the World".' },
    { name: 'Dibrugarh', slug: 'dibrugarh', image: 'https://picsum.photos/seed/dibrugarh/400/300', hint: 'dibrugarh city', attractions: 14, homestays: 30, knownFor: 'An industrial city surrounded by lush tea gardens.' },
    { name: 'Sibsagar', slug: 'sibsagar', image: 'https://picsum.photos/seed/sibsagar/400/300', hint: 'sibsagar monuments', attractions: 16, homestays: 20, knownFor: 'A historical town with ancient Ahom monuments and temples.' },
    { name: 'Silchar', slug: 'silchar', image: 'https://picsum.photos/seed/silchar/400/300', hint: 'silchar town', attractions: 10, homestays: 22, knownFor: 'A key commercial hub in southern Assam.' },
    { name: 'Tezpur', slug: 'tezpur', image: 'https://picsum.photos/seed/tezpur/400/300', hint: 'tezpur ruins', attractions: 13, homestays: 28, knownFor: 'A city of ancient ruins, temples, and scenic beauty.' },
    { name: 'Digboi', slug: 'digboi', image: 'https://picsum.photos/seed/digboi/400/300', hint: 'digboi oil refinery', attractions: 6, homestays: 15, knownFor: 'Home to the world\'s oldest operating oil refinery.' },
  ],
  'bihar': [
    { name: 'Bodh Gaya', slug: 'bodh-gaya', image: 'https://picsum.photos/seed/bodh-gaya/400/300', hint: 'bodh gaya temple', attractions: 10, homestays: 50, knownFor: 'The place where Gautama Buddha attained enlightenment.' },
    { name: 'Patna', slug: 'patna', image: 'https://picsum.photos/seed/patna/400/300', hint: 'patna city', attractions: 20, homestays: 40, knownFor: 'An ancient city with a rich history and numerous historical sites.' },
  ],
  'chhattisgarh': [
    { name: 'Raipur', slug: 'raipur', image: 'https://picsum.photos/seed/raipur/400/300', hint: 'raipur city', attractions: 15, homestays: 30, knownFor: 'The capital city, known for its temples and lakes.' },
    { name: 'Bastar', slug: 'bastar', image: 'https://picsum.photos/seed/bastar/400/300', hint: 'bastar tribe', attractions: 12, homestays: 20, knownFor: 'Famous for its unique tribal culture, dense forests, and waterfalls.' },
  ],
  'goa': [
    { name: 'Panaji', slug: 'panaji', image: 'https://picsum.photos/seed/panaji/400/300', hint: 'panaji church', attractions: 25, homestays: 150, knownFor: 'The state capital with charming Portuguese architecture.' },
    { name: 'Calangute', slug: 'calangute', image: 'https://picsum.photos/seed/calangute/400/300', hint: 'calangute beach', attractions: 8, homestays: 200, knownFor: 'Known as the "Queen of Beaches", famous for its bustling nightlife.' },
  ],
  'gujarat': [
    { name: 'Ahmedabad', slug: 'ahmedabad', image: 'https://picsum.photos/seed/ahmedabad/400/300', hint: 'ahmedabad heritage', attractions: 30, homestays: 70, knownFor: 'India\'s first UNESCO World Heritage City, rich in culture and history.' },
    { name: 'Rann of Kutch', slug: 'rann-of-kutch', image: 'https://picsum.photos/seed/rann-of-kutch/400/300', hint: 'rann of kutch desert', attractions: 7, homestays: 50, knownFor: 'A vast salt marsh famous for the Rann Utsav festival.' },
  ],
  'haryana': [
    { name: 'Gurugram', slug: 'gurugram', image: 'https://picsum.photos/seed/gurugram/400/300', hint: 'gurugram skyline', attractions: 18, homestays: 90, knownFor: 'A bustling financial and technology hub with modern attractions.' },
    { name: 'Kurukshetra', slug: 'kurukshetra', image: 'https://picsum.photos/seed/kurukshetra/400/300', hint: 'kurukshetra temple', attractions: 15, homestays: 30, knownFor: 'A holy city, known as the land of the Mahabharata.' },
  ],
  'himachal-pradesh': [
    { name: 'Shimla', slug: 'shimla', image: 'https://picsum.photos/seed/shimla/400/300', hint: 'shimla mountains', attractions: 28, homestays: 120, knownFor: 'A popular colonial-era hill station with stunning mountain views.' },
    { name: 'Manali', slug: 'manali', image: 'https://picsum.photos/seed/manali/400/300', hint: 'manali snow', attractions: 22, homestays: 150, knownFor: 'A high-altitude resort town famous for adventure sports and natural beauty.' },
  ],
  'jharkhand': [
    { name: 'Ranchi', slug: 'ranchi', image: 'https://picsum.photos/seed/ranchi/400/300', hint: 'ranchi waterfall', attractions: 17, homestays: 35, knownFor: 'Known as the "City of Waterfalls" for its numerous scenic falls.' },
    { name: 'Jamshedpur', slug: 'jamshedpur', image: 'https://picsum.photos/seed/jamshedpur/400/300', hint: 'jamshedpur city', attractions: 14, homestays: 40, knownFor: 'A well-planned industrial city with parks and a zoo.' },
  ],
  'karnataka': [
    { name: 'Bengaluru', slug: 'bengaluru', image: 'https://picsum.photos/seed/bengaluru/400/300', hint: 'bengaluru city', attractions: 40, homestays: 250, knownFor: 'The "Silicon Valley of India", known for its parks and nightlife.' },
    { name: 'Mysuru', slug: 'mysuru', image: 'https://picsum.photos/seed/mysuru/400/300', hint: 'mysuru palace', attractions: 25, homestays: 80, knownFor: 'Famous for the opulent Mysore Palace and rich cultural heritage.' },
    { name: 'Hampi', slug: 'hampi', image: 'https://picsum.photos/seed/hampi/400/300', hint: 'hampi ruins', attractions: 18, homestays: 60, knownFor: 'A UNESCO World Heritage Site with ancient ruins of the Vijayanagara Empire.' },
  ],
  'kerala': [
    { name: 'Kochi', slug: 'kochi', image: 'https://picsum.photos/seed/kochi/400/300', hint: 'kochi backwaters', attractions: 35, homestays: 130, knownFor: 'A vibrant port city with a mix of colonial history and modern culture.' },
    { name: 'Munnar', slug: 'munnar', image: 'https://picsum.photos/seed/munnar/400/300', hint: 'munnar tea plantations', attractions: 20, homestays: 90, knownFor: 'Famous for its sprawling tea plantations and stunning landscapes.' },
    { name: 'Alleppey', slug: 'alleppey', image: 'https://picsum.photos/seed/alleppey/400/300', hint: 'alleppey houseboats', attractions: 10, homestays: 110, knownFor: 'Known for its tranquil backwaters and houseboat cruises.' },
  ],
  'madhya-pradesh': [
    { name: 'Bhopal', slug: 'bhopal', image: 'https://picsum.photos/seed/bhopal/400/300', hint: 'bhopal lake', attractions: 22, homestays: 50, knownFor: 'The "City of Lakes", with a mix of historical and modern attractions.' },
    { name: 'Khajuraho', slug: 'khajuraho', image: 'https://picsum.photos/seed/khajuraho/400/300', hint: 'khajuraho temples', attractions: 12, homestays: 40, knownFor: 'Famous for its stunning temples adorned with intricate sculptures.' },
  ],
  'maharashtra': [
    { name: 'Mumbai', slug: 'mumbai', image: 'https://picsum.photos/seed/mumbai/400/300', hint: 'mumbai skyline', attractions: 50, homestays: 300, knownFor: 'The vibrant financial capital of India, famous for Bollywood and iconic landmarks.' },
    { name: 'Pune', slug: 'pune', image: 'https://picsum.photos/seed/pune/400/300', hint: 'pune city', attractions: 30, homestays: 150, knownFor: 'A cultural hub with historical sites and a thriving IT industry.' },
  ],
  'manipur': [
    { name: 'Imphal', slug: 'imphal', image: 'https://picsum.photos/seed/imphal/400/300', hint: 'imphal kangla fort', attractions: 15, homestays: 30, knownFor: 'Known for the historic Kangla Fort and the beautiful Loktak Lake.' },
  ],
  'meghalaya': [
    { name: 'Shillong', slug: 'shillong', image: 'https://picsum.photos/seed/shillong/400/300', hint: 'shillong city', attractions: 20, homestays: 50, knownFor: 'The "Scotland of the East", with beautiful landscapes and a vibrant music scene.' },
    { name: 'Cherrapunji', slug: 'cherrapunji', image: 'https://picsum.photos/seed/cherrapunji/400/300', hint: 'cherrapunji waterfalls', attractions: 10, homestays: 25, knownFor: 'Famous for its living root bridges and being one of the wettest places on Earth.' },
  ],
  'mizoram': [
    { name: 'Aizawl', slug: 'aizawl', image: 'https://picsum.photos/seed/aizawl/400/300', hint: 'aizawl city', attractions: 12, homestays: 20, knownFor: 'A picturesque hill city with a rich cultural heritage.' },
  ],
  'nagaland': [
    { name: 'Kohima', slug: 'kohima', image: 'https://picsum.photos/seed/kohima/400/300', hint: 'kohima war cemetery', attractions: 10, homestays: 30, knownFor: 'Known for its historic war cemetery and the vibrant Hornbill Festival.' },
  ],
  'odisha': [
    { name: 'Bhubaneswar', slug: 'bhubaneswar', image: 'https://picsum.photos/seed/bhubaneswar/400/300', hint: 'bhubaneswar temples', attractions: 28, homestays: 60, knownFor: 'The "Temple City of India", with hundreds of ancient temples.' },
    { name: 'Puri', slug: 'puri', image: 'https://picsum.photos/seed/puri/400/300', hint: 'puri beach', attractions: 15, homestays: 80, knownFor: 'A major pilgrimage site, home to the Jagannath Temple and a beautiful beach.' },
  ],
  'punjab': [
    { name: 'Amritsar', slug: 'amritsar', image: 'https://picsum.photos/seed/amritsar/400/300', hint: 'amritsar golden temple', attractions: 20, homestays: 70, knownFor: 'Home to the iconic Golden Temple, the spiritual center for Sikhs.' },
  ],
  'rajasthan': [
    { name: 'Jaipur', slug: 'jaipur', image: 'https://picsum.photos/seed/jaipur/400/300', hint: 'jaipur hawa mahal', attractions: 35, homestays: 150, knownFor: 'The "Pink City", known for its stunning palaces, forts, and vibrant markets.' },
    { name: 'Udaipur', slug: 'udaipur', image: 'https://picsum.photos/seed/udaipur/400/300', hint: 'udaipur lake palace', attractions: 28, homestays: 120, knownFor: 'The "City of Lakes", famous for its romantic setting and beautiful palaces.' },
    { name: 'Jodhpur', slug: 'jodhpur', image: 'https://picsum.photos/seed/jodhpur/400/300', hint: 'jodhpur blue city', attractions: 22, homestays: 90, knownFor: 'The "Blue City", dominated by the majestic Mehrangarh Fort.' },
  ],
  'sikkim': [
    { name: 'Gangtok', slug: 'gangtok', image: 'https://picsum.photos/seed/gangtok/400/300', hint: 'gangtok monastery', attractions: 25, homestays: 80, knownFor: 'A charming hill station with stunning views of the Himalayas and Buddhist monasteries.' },
  ],
  'tamil-nadu': [
    { name: 'Chennai', slug: 'chennai', image: 'https://picsum.photos/seed/chennai/400/300', hint: 'chennai beach', attractions: 40, homestays: 180, knownFor: 'A major cultural, economic, and educational center in South India.' },
    { name: 'Madurai', slug: 'madurai', image: 'https://picsum.photos/seed/madurai/400/300', hint: 'madurai meenakshi temple', attractions: 22, homestays: 70, knownFor: 'Famous for the magnificent Meenakshi Amman Temple and its rich cultural heritage.' },
  ],
  'telangana': [
    { name: 'Hyderabad', slug: 'hyderabad', image: 'https://picsum.photos/seed/hyderabad/400/300', hint: 'hyderabad charminar', attractions: 45, homestays: 200, knownFor: 'The "City of Pearls", known for its historic sites like the Charminar and Golconda Fort.' },
  ],
  'tripura': [
    { name: 'Agartala', slug: 'agartala', image: 'https://picsum.photos/seed/agartala/400/300', hint: 'agartala palace', attractions: 18, homestays: 35, knownFor: 'Known for its palaces, temples, and rich cultural history.' },
  ],
  'uttar-pradesh': [
    { name: 'Agra', slug: 'agra', image: 'https://picsum.photos/seed/agra/400/300', hint: 'agra taj mahal', attractions: 15, homestays: 100, knownFor: 'Home to the iconic Taj Mahal, a symbol of eternal love.' },
    { name: 'Varanasi', slug: 'varanasi', image: 'https://picsum.photos/seed/varanasi/400/300', hint: 'varanasi ganges', attractions: 30, homestays: 120, knownFor: 'A spiritual city on the banks of the Ganges, known for its ghats and temples.' },
  ],
  'uttarakhand': [
    { name: 'Rishikesh', slug: 'rishikesh', image: 'https://picsum.photos/seed/rishikesh/400/300', hint: 'rishikesh ganges', attractions: 25, homestays: 90, knownFor: 'The "Yoga Capital of the World", situated on the banks of the Ganges.' },
    { name: 'Nainital', slug: 'nainital', image: 'https://picsum.photos/seed/nainital/400/300', hint: 'nainital lake', attractions: 20, homestays: 110, knownFor: 'A popular hill station known for its beautiful lake and scenic views.' },
  ],
  'west-bengal': [
    { name: 'Kolkata', slug: 'kolkata', image: 'https://picsum.photos/seed/kolkata/400/300', hint: 'kolkata howrah bridge', attractions: 40, homestays: 160, knownFor: 'The cultural capital of India, with a rich history and artistic heritage.' },
    { name: 'Darjeeling', slug: 'darjeeling', image: 'https://picsum.photos/seed/darjeeling/400/300', hint: 'darjeeling tea gardens', attractions: 18, homestays: 80, knownFor: 'Famous for its tea plantations and stunning views of Kanchenjunga.' },
  ],
};
