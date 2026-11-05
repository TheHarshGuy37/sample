import { Vendor, MuhuratDate, BudgetItem, CeremonialEvent, RoyalGuest } from '../types';

export interface CityInfo {
  name: string;
  tagline: string;
}

export const POPULAR_CITIES: CityInfo[] = [
  { name: 'Visakhapatnam', tagline: 'City of Destiny' },
  { name: 'Jaipur', tagline: 'Pink City' },
  { name: 'Hyderabad', tagline: 'City of Pearls' },
  { name: 'Bengaluru', tagline: 'Garden City' },
  { name: 'Delhi NCR', tagline: 'Heart of the Nation' },
  { name: 'Mumbai', tagline: 'City of Dreams' },
  { name: 'Chennai', tagline: 'Gateway to South India' },
  { name: 'Kolkata', tagline: 'City of Joy' },
  { name: 'Goa', tagline: 'Beach Capital' },
  { name: 'Lucknow', tagline: 'City of Nawabs' },
  { name: 'Udaipur', tagline: 'City of Lakes' },
  { name: 'Ahmedabad', tagline: 'Heritage City' },
  { name: 'Pune', tagline: 'Cultural Capital' },
];

export const INITIAL_VENDORS: Vendor[] = [
  // 1. Vizag
  {
    id: 'v-vizag-1',
    name: 'Sai Priya Beach Resort & Beachside Lawns',
    category: 'Wedding Venues & Banquet Halls',
    city: 'Visakhapatnam',
    cityTagline: 'City of Destiny',
    rating: 4.85,
    reviewsCount: 168,
    basePrice: 250000,
    priceUnit: 'per day lawn + hall rent',
    image: '/assets/images/vizag_beach_venue_1793919694696.jpg',
    ceremonies: ['Sangeet', 'Wedding', 'Reception'],
    verified: true,
    budgetTier: 'Mid-Range',
    capacity: '400 - 1,200 Guests',
    description: 'Beautiful beach-facing wedding lawn right on Rushikonda Beach with sea breeze, open dining area, and 45 guest rooms.',
    features: [
      'Direct beach view open-air lawn and covered dining hall',
      '45 air-conditioned rooms for groom and bride family stay',
      'Ample parking space for 200+ cars with valet assistance',
      'Backup generator and basic stage lighting included'
    ],
    packages: [
      {
        id: 'pkg-v1',
        name: 'Complete 2-Day Wedding Package',
        price: 450000,
        description: 'Includes full lawn, banquet hall, and 25 rooms for 24 hours.',
        inclusions: [
          'Full access to beachside lawn and AC hall',
          '25 Deluxe AC rooms for close guests',
          'Free bride and groom dressing suites'
        ]
      },
      {
        id: 'pkg-v2',
        name: 'Single Day Reception Package',
        price: 250000,
        description: 'Lawn and dining hall booking for evening reception.',
        inclusions: [
          '6 hours evening lawn access',
          '2 complimentary day-use rooms'
        ]
      }
    ],
    availableDates: ['2026-11-28', '2026-11-29', '2026-12-12', '2027-01-18', '2027-02-14']
  },

  // 2. Hyderabad
  {
    id: 'v-hyd-1',
    name: 'Classic Convention Three & AC Banquet Halls',
    category: 'Wedding Venues & Banquet Halls',
    city: 'Hyderabad',
    cityTagline: 'City of Pearls',
    rating: 4.90,
    reviewsCount: 220,
    basePrice: 380000,
    priceUnit: 'per day hall booking',
    image: '/assets/images/hyderabad_convention_hall_1793919694607.jpg',
    ceremonies: ['Sangeet', 'Wedding', 'Reception'],
    verified: true,
    budgetTier: 'Mid-Range',
    capacity: '600 - 2,500 Guests',
    description: 'Spacious air-conditioned convention center in Shamshabad with grand chandeliers, large dining area, and easy airport connectivity.',
    features: [
      'Spacious pillarless hall accommodating up to 2,500 guests',
      'Separate dining hall with 800-seat capacity at a time',
      'Dedicated rooms for bride and groom with full mirrors',
      'Central AC and modern sound acoustics'
    ],
    packages: [
      {
        id: 'pkg-hyd1',
        name: 'Grand Wedding Day Package',
        price: 550000,
        description: 'Full convention hall with dining section and 10 guest rooms.',
        inclusions: [
          'Main hall, dining section, and kitchen access',
          '10 AC guest rooms for immediate family',
          'Dedicated cleaning staff during the event'
        ]
      }
    ],
    availableDates: ['2026-11-28', '2026-12-12', '2027-01-18', '2027-02-14', '2027-03-04']
  },

  // 3. Pan-India / Real Candid Photographers
  {
    id: 'v-photo-1',
    name: 'Pixel Stories — Candid Wedding Films & Photo',
    category: 'Photographers & Videographers',
    city: 'Hyderabad',
    cityTagline: 'City of Pearls',
    rating: 4.94,
    reviewsCount: 310,
    basePrice: 120000,
    priceUnit: 'for 2-day wedding coverage',
    image: '/assets/images/indian_wedding_photography_1793919694846.jpg',
    ceremonies: ['Mehendi', 'Sangeet', 'Haldi', 'Wedding', 'Reception'],
    verified: true,
    budgetTier: 'Mid-Range',
    capacity: 'Team of 6 Photographers',
    description: 'Friendly team capturing real smiles, candid family moments, traditional rituals, and cinematic highlight videos without awkward posing.',
    features: [
      'Candid photography + Traditional group photography',
      'Full HD cinematic 4-5 minute teaser and 45-minute film',
      'Two premium hardbound photo albums (300 photos each)',
      'All edited photos delivered on pendrive and online link'
    ],
    packages: [
      {
        id: 'pkg-p1',
        name: 'Complete 2-Day Wedding Package',
        price: 160000,
        description: 'Covers Sangeet, Haldi, Wedding ceremony, and Reception.',
        inclusions: [
          '3 Candid Photographers + 2 Traditional Videographers + Drone',
          'Same day 60-second teaser reel for Instagram/WhatsApp',
          '2 Premium layflat albums with lifetime binding warranty'
        ]
      },
      {
        id: 'pkg-p2',
        name: 'Budget Wedding Day Only',
        price: 80000,
        description: 'Single day wedding ceremony and reception coverage.',
        inclusions: [
          '2 Photographers + 1 Videographer',
          '1 Premium 40-page photo album'
        ]
      }
    ],
    availableDates: ['2026-11-28', '2026-11-29', '2026-12-12', '2027-01-18', '2027-02-14', '2027-03-04']
  },

  // 4. Catering & Food
  {
    id: 'v-cater-1',
    name: 'Annapurna Grand Wedding Caterers & Live Counters',
    category: 'Catering & Food Services',
    city: 'Bengaluru',
    cityTagline: 'Garden City',
    rating: 4.88,
    reviewsCount: 280,
    basePrice: 550,
    priceUnit: 'per plate (Veg buffet with live counters)',
    image: '/assets/images/indian_catering_buffet_1793919695382.jpg',
    ceremonies: ['Sangeet', 'Wedding', 'Haldi', 'Reception'],
    verified: true,
    budgetTier: 'Budget-Friendly',
    capacity: '200 - 3,000 Guests',
    description: 'Famous for mouth-watering South Indian breakfast, authentic North Indian dinner buffets, live dosa counters, and fresh hot jalebis.',
    features: [
      'Live counters: Dosa, Chaat, Tandoor rotis, and Ice Cream',
      'Separate pure vegetarian and Jain cooking utensils',
      'Uniformed serving staff and clean stainless steel chafing dishes',
      'Free food tasting session for 6 family members before booking'
    ],
    packages: [
      {
        id: 'pkg-c1',
        name: 'Grand Wedding Dinner Buffet (45 items)',
        price: 680,
        description: 'Per plate cost for welcome drink, 4 starters, 3 curries, biryani, and 3 sweets.',
        inclusions: [
          'Paneer Butter Masala, Dal Makhani, Veg Dum Biryani, Rotis',
          'Live Dosa counter with 6 varieties',
          'Hot Gulab Jamun with Rabri & Choice of 2 Ice Creams'
        ]
      },
      {
        id: 'pkg-c2',
        name: 'Traditional South Indian Plantain Leaf Meal',
        price: 450,
        description: 'Traditional sit-down lunch with 24 festive Andhra/Kannada dishes.',
        inclusions: [
          'Ghee Pulihora, Sambar, Rasam, 3 Poriyals, Payasam, Appalam',
          'Fresh banana leaves and traditional servers'
        ]
      }
    ],
    availableDates: ['2026-11-28', '2026-11-29', '2026-12-12', '2027-01-18', '2027-02-14']
  },

  // 5. Chennai Bridal Silks
  {
    id: 'v-saree-1',
    name: 'Nalli Silks & Bridal Kanjeevaram Studio',
    category: 'Bridal Wear & Groom Outfits',
    city: 'Chennai',
    cityTagline: 'Gateway to South India',
    rating: 4.92,
    reviewsCount: 410,
    basePrice: 35000,
    priceUnit: 'per authentic Kanjeevaram bridal saree',
    image: '/assets/images/south_indian_bridal_saree_1793919696441.jpg',
    ceremonies: ['Wedding', 'Reception'],
    verified: true,
    budgetTier: 'Mid-Range',
    capacity: 'Ready-to-wear & Custom Blouses',
    description: 'Trusted bridal destination for pure silk Kanjeevaram sarees with genuine zari, matching groom dhotis, and custom maggam embroidery blouses.',
    features: [
      'Pure mulberry silk with Silk Mark certification',
      'In-house expert tailoring for designer bridal blouses',
      'Matching silk angavastram and dhoti sets for the groom',
      'Video shopping assistance for families living outside Chennai'
    ],
    packages: [
      {
        id: 'pkg-s1',
        name: 'Bridal Muhurtham Saree + Blouse Combo',
        price: 55000,
        description: 'Heavy gold zari Kanjeevaram saree with custom hand-stitched maggam work blouse.',
        inclusions: [
          'Pure silk red/gold Kanjeevaram wedding saree',
          'Hand-embroidered zardozi blouse tailored to fit',
          'Complementary matching silk stole'
        ]
      }
    ],
    availableDates: ['2026-11-28', '2026-11-29', '2026-12-12', '2027-01-18', '2027-02-14', '2027-03-04']
  },

  // 6. Bengaluru Lawn
  {
    id: 'v-blr-1',
    name: 'Gayatri Vihar & Princess Shrine Lawns (Palace Grounds)',
    category: 'Wedding Venues & Banquet Halls',
    city: 'Bengaluru',
    cityTagline: 'Garden City',
    rating: 4.86,
    reviewsCount: 195,
    basePrice: 350000,
    priceUnit: 'per day lawn rental',
    image: '/assets/images/bengaluru_garden_lawn_1793919714165.jpg',
    ceremonies: ['Sangeet', 'Wedding', 'Reception'],
    verified: true,
    budgetTier: 'Mid-Range',
    capacity: '500 - 3,000 Guests',
    description: 'Lush green wedding lawn surrounded by heritage trees at Palace Grounds, ideal for evening fairy-light receptions and open-air ceremonies.',
    features: [
      'Huge open lawn with natural green canopy and garden archways',
      'Covered waterproof dining shelter for 1,000 guests',
      'Over 400 dedicated car parking spots inside the campus',
      'Easy access from Bellary Road and central city'
    ],
    packages: [
      {
        id: 'pkg-blr1',
        name: 'Full Evening Reception Lawn',
        price: 450000,
        description: 'Rent for 8 hours including garden lights and stage platform.',
        inclusions: [
          'Full lawn access from 2 PM to 11 PM',
          'Fairy light tree illumination included',
          '4 fully furnished green rooms'
        ]
      }
    ],
    availableDates: ['2026-11-28', '2026-11-29', '2026-12-12', '2027-01-18', '2027-02-14']
  },

  // 7. Mehendi & Makeup
  {
    id: 'v-mehendi-1',
    name: 'Shringar Bridal Mehendi & Makeover Studio',
    category: 'Mehendi & Makeup Artists',
    city: 'Pune',
    cityTagline: 'Cultural Capital',
    rating: 4.91,
    reviewsCount: 180,
    basePrice: 12000,
    priceUnit: 'for bridal mehendi (both hands & feet)',
    image: '/assets/images/indian_bridal_mehendi_1793919714650.jpg',
    ceremonies: ['Mehendi', 'Haldi', 'Wedding'],
    verified: true,
    budgetTier: 'Budget-Friendly',
    capacity: 'Bride + 25 Family Members',
    description: 'Expert bridal henna artist using 100% natural organic Sojat mehendi with guaranteed dark reddish-brown stain. Fast and comfortable application.',
    features: [
      'Natural chemical-free henna with eucalyptus oil blend',
      'Custom designs: Portraits, Dulha-Dulhan figures, and Love story motifs',
      'Team of 4 assistants to quickly apply mehendi for all cousins and aunts',
      'Home service available across the city'
    ],
    packages: [
      {
        id: 'pkg-m1',
        name: 'Bridal Henna + 15 Family Guests',
        price: 18000,
        description: 'Full bridal hands (elbow length) and feet + 15 guests palm designs.',
        inclusions: [
          'Lead artist for bride',
          '3 assistant artists for family members for 4 hours'
        ]
      }
    ],
    availableDates: ['2026-11-28', '2026-11-29', '2026-12-12', '2027-01-18', '2027-02-14', '2027-03-04']
  },

  // 8. Delhi Brass Band & Dhol
  {
    id: 'v-band-1',
    name: 'Jea Band & Royal Dhol Troupe',
    category: 'DJ, Band & Entertainment',
    city: 'Delhi NCR',
    cityTagline: 'Heart of the Nation',
    rating: 4.89,
    reviewsCount: 340,
    basePrice: 35000,
    priceUnit: 'per baraat procession (2 hours)',
    image: '/assets/images/delhi_wedding_band_1793919715402.jpg',
    ceremonies: ['Wedding'],
    verified: true,
    budgetTier: 'Budget-Friendly',
    capacity: '15 - 35 Musicians Troupe',
    description: 'Delhi’s most popular wedding brass band with smart uniforms, energetic Punjabi dhol players, brass trumpets, and vintage flower-lit chandeliers.',
    features: [
      '21-member brass band with turbans and traditional uniforms',
      '4 high-energy Nashik and Punjabi dhol players for dancing',
      'Portable generator trolley with bright warm chandelier lights',
      'Plays mix of popular Bollywood hits, wedding songs, and folk beats'
    ],
    packages: [
      {
        id: 'pkg-b1',
        name: 'Complete Baraat Brass Band + 4 Dhols',
        price: 45000,
        description: '2 hours of non-stop energetic procession music.',
        inclusions: [
          '21 band players + 4 dholis + 6 vintage umbrella lights',
          'Decorated horse/ghodi sound cart coordination'
        ]
      }
    ],
    availableDates: ['2026-11-28', '2026-11-29', '2026-12-12', '2027-01-18', '2027-02-14']
  },

  // 9. Traditional Kalyana Mandapam (Tamil Nadu / AP)
  {
    id: 'v-mandapam-1',
    name: 'Sri Padmavathi Kalyana Mandapam',
    category: 'Wedding Venues & Banquet Halls',
    city: 'Chennai',
    cityTagline: 'Gateway to South India',
    rating: 4.82,
    reviewsCount: 260,
    basePrice: 180000,
    priceUnit: 'per day traditional hall rent',
    image: '/assets/images/traditional_kalyana_mandapam_1793919715979.jpg',
    ceremonies: ['Wedding', 'Reception'],
    verified: true,
    budgetTier: 'Budget-Friendly',
    capacity: '400 - 1,000 Guests',
    description: 'Authentic South Indian wedding hall with carved stone pillars, raised wooden homa stage, banana tree entrance, and spacious dining hall for leaf meals.',
    features: [
      'Traditional raised wooden stage ideal for homams and pheras',
      'Spacious ground floor dining hall with granite tables for banana leaf service',
      '12 attached AC guest rooms with geysers',
      'Approved purohit and nadaswaram priest facilities'
    ],
    packages: [
      {
        id: 'pkg-mand1',
        name: '24-Hour Traditional Wedding Package',
        price: 240000,
        description: 'Full hall from morning muhurtham till evening reception.',
        inclusions: [
          'Main hall, homam setup, dining hall, and 12 rooms',
          'Vessel store access for caterers'
        ]
      }
    ],
    availableDates: ['2026-11-28', '2026-11-29', '2026-12-12', '2027-01-18', '2027-02-14', '2027-03-04']
  },

  // 10. Kolkata Banquet
  {
    id: 'v-kol-1',
    name: 'PC Chandra Gardens & Heritage Banquet',
    category: 'Wedding Venues & Banquet Halls',
    city: 'Kolkata',
    cityTagline: 'City of Joy',
    rating: 4.90,
    reviewsCount: 175,
    basePrice: 320000,
    priceUnit: 'per day banquet & lawn',
    image: '/assets/images/kolkata_wedding_banquet_1793919741232.jpg',
    ceremonies: ['Wedding', 'Reception'],
    verified: true,
    budgetTier: 'Mid-Range',
    capacity: '500 - 1,500 Guests',
    description: 'Well-known wedding destination in Kolkata on EM Bypass featuring warm ambient lighting, floral chandeliers, and separate areas for phere and dinner.',
    features: [
      'Indoor AC banquet hall plus connected open-air lawn',
      'Dedicated space for traditional Bengali Saat Paake Bandha and Sindoor Daan',
      'Parking for 250 vehicles with security guards',
      'Tie-ups with top Kolkata caterers for authentic kosha mangsho & mishti'
    ],
    packages: [
      {
        id: 'pkg-k1',
        name: 'Biar Utsab Evening Package',
        price: 420000,
        description: 'Full evening booking with basic floral hall decoration.',
        inclusions: [
          'Banquet hall + lawn + 4 AC dressing rooms',
          'Basic stage lighting and audio system'
        ]
      }
    ],
    availableDates: ['2026-11-28', '2026-11-29', '2026-12-12', '2027-01-18', '2027-02-14']
  },

  // 11. Goa Beach Mandap
  {
    id: 'v-goa-1',
    name: 'Kenilworth Beach Resort & Sunset Mandap',
    category: 'Wedding Venues & Banquet Halls',
    city: 'Goa',
    cityTagline: 'Beach Capital',
    rating: 4.93,
    reviewsCount: 215,
    basePrice: 480000,
    priceUnit: 'per day beachfront venue',
    image: '/assets/images/goa_beach_mandap_1793919741126.jpg',
    ceremonies: ['Sangeet', 'Wedding', 'Reception'],
    verified: true,
    budgetTier: 'Premium',
    capacity: '150 - 600 Guests',
    description: 'Dream sunset wedding venue right on Utorda Beach, South Goa. Wooden pergola mandap, white-and-peach floral drapes, and ocean waves in the background.',
    features: [
      'Private beach access with scenic sunset view for wedding vows',
      'Beachside wooden mandap with fairy light canopy and comfortable seating',
      'Cocktail lawn adjacent to resort pool',
      'Full resort room blocks available with special guest discounts'
    ],
    packages: [
      {
        id: 'pkg-g1',
        name: 'Sunset Beach Vows Package',
        price: 650000,
        description: 'Includes beach mandap setup, sound system, and cocktail lawn.',
        inclusions: [
          'Beach lawn access from 3 PM to midnight',
          'Mandap decor with fresh flowers and fairy lights',
          'Bridal makeup villa for full day'
        ]
      }
    ],
    availableDates: ['2026-11-28', '2026-11-29', '2026-12-12', '2027-01-18', '2027-02-14', '2027-03-04']
  },

  // 12. Jaipur Mandap Decor
  {
    id: 'v-jpr-decor',
    name: 'Devkaran & Sons Wedding Stage & Floral Decor',
    category: 'Wedding Decor & Stage',
    city: 'Jaipur',
    cityTagline: 'Pink City',
    rating: 4.91,
    reviewsCount: 145,
    basePrice: 150000,
    priceUnit: 'per wedding stage & mandap setup',
    image: '/assets/images/utsava_mandap_decor_1793915760484.jpg',
    ceremonies: ['Haldi', 'Mehendi', 'Wedding', 'Reception'],
    verified: true,
    budgetTier: 'Mid-Range',
    capacity: 'Custom Sized Stages',
    description: 'Expert wedding decorators creating traditional flower mandaps with marigolds and fresh roses, royal stage backdrops, and photo booths.',
    features: [
      'Fresh flower mandap with marigold and rose garlands',
      'Grand wedding entrance floral arch and selfie photobooth',
      'Warm LED focus lights and ambient fairy lighting',
      'Clean setup completed 4 hours before ceremony start'
    ],
    packages: [
      {
        id: 'pkg-j1',
        name: 'Complete Wedding Day Floral Setup',
        price: 220000,
        description: 'Mandap, main stage, entry gate, and guest walkway decor.',
        inclusions: [
          '16x16 ft decorated floral mandap with havan kund seating',
          'Grand entrance archway with flowers and welcome board',
          'Stage sofa and flower backdrop for couple photos'
        ]
      }
    ],
    availableDates: ['2026-11-28', '2026-11-29', '2026-12-12', '2027-01-18', '2027-02-14']
  },

  // 13. Delhi Bridal Couture
  {
    id: 'v-delhi-couture',
    name: 'Suryavanshi Bridal Lehengas & Sherwani Store',
    category: 'Bridal Wear & Groom Outfits',
    city: 'Delhi NCR',
    cityTagline: 'Heart of the Nation',
    rating: 4.88,
    reviewsCount: 290,
    basePrice: 45000,
    priceUnit: 'per bridal lehenga ensemble',
    image: '/assets/images/utsava_bridal_couture_1793915761159.jpg',
    ceremonies: ['Sangeet', 'Wedding', 'Reception'],
    verified: true,
    budgetTier: 'Mid-Range',
    capacity: 'Chandni Chowk & South Ex Showrooms',
    description: 'Direct bridal wear store in Chandni Chowk offering bridal lehengas, reception gowns, and groom sherwanis at honest, affordable prices.',
    features: [
      'Ready-to-wear and customized bridal lehengas in red, pink, and pastel',
      'Matching groom sherwani with safa (turban) and stole',
      'Free alteration and fitting trial within 7 days of delivery',
      'Video call selection and pan-India safe courier delivery'
    ],
    packages: [
      {
        id: 'pkg-d1',
        name: 'Bride & Groom Wedding Day Match Combo',
        price: 75000,
        description: 'Heavy bridal lehenga + Groom embroidered sherwani with safa.',
        inclusions: [
          'Embroidered bridal velvet/silk lehenga with double dupatta',
          'Groom sherwani with custom-tied royal safa and pearl mala'
        ]
      }
    ],
    availableDates: ['2026-11-28', '2026-11-29', '2026-12-12', '2027-01-18', '2027-02-14']
  },

  // 14. Mumbai Sangeet DJ & Sound
  {
    id: 'v-mum-sangeet',
    name: 'Rang Mahal Sangeet DJ, Sound & LED Stage',
    category: 'DJ, Band & Entertainment',
    city: 'Mumbai',
    cityTagline: 'City of Dreams',
    rating: 4.90,
    reviewsCount: 205,
    basePrice: 65000,
    priceUnit: 'per sangeet night',
    image: '/assets/images/utsava_sangeet_celebration_1793915762348.jpg',
    ceremonies: ['Sangeet', 'Reception'],
    verified: true,
    budgetTier: 'Mid-Range',
    capacity: 'Events up to 1,500 guests',
    description: 'High energy wedding DJ with professional sound line-arrays, moving head lights, LED stage screens, and special song mixes for family dance entries.',
    features: [
      'Experienced wedding DJ + energetic MC (host) to get family dancing',
      'Concert-grade JBL sound system and wireless cordless mics',
      'Cold pyro sparklers and dry-ice cloud fog for bride-groom couple dance',
      'Custom pre-mixed audio tracks for family choreography performances'
    ],
    packages: [
      {
        id: 'pkg-mum1',
        name: 'Full Sangeet Rocker Package',
        price: 95000,
        description: 'Complete DJ setup, MC host, moving lights, and special effects.',
        inclusions: [
          'DJ setup for up to 5 hours + 4 cold sparkler fountains',
          'LED backdrop wall for playing family throwback videos'
        ]
      }
    ],
    availableDates: ['2026-11-28', '2026-11-29', '2026-12-12', '2027-01-18', '2027-02-14', '2027-03-04']
  },

  // 15. Lucknow Awadhi Feasts
  {
    id: 'v-lko-food',
    name: 'Khansama Shahi Catering & Awadhi Biryani',
    category: 'Catering & Food Services',
    city: 'Lucknow',
    cityTagline: 'City of Nawabs',
    rating: 4.95,
    reviewsCount: 230,
    basePrice: 650,
    priceUnit: 'per plate (Veg & Non-Veg feast)',
    image: '/assets/images/utsava_royal_feast_1793915761998.jpg',
    ceremonies: ['Wedding', 'Reception'],
    verified: true,
    budgetTier: 'Mid-Range',
    capacity: '150 - 2,000 Guests',
    description: 'Authentic Lucknowi wedding catering famous for slow-cooked Dum Awadhi Biryani, Galouti kebabs, Roomali rotis, and Shahi Tukda.',
    features: [
      'Original Lucknowi recipes prepared in copper handis',
      'Separate vegetarian live counter with paneer tikkas and dal makhani',
      'Traditional brass tableware setup and polite uniformed service team',
      'Complimentary Paan and Kesari tea counter after meals'
    ],
    packages: [
      {
        id: 'pkg-lko1',
        name: 'Awadhi Wedding Dastarkhwan (32 Items)',
        price: 850,
        description: 'Complete feast with Biryani, Kebabs, 4 curries, rotis, and sweets.',
        inclusions: [
          'Dum Biryani (Veg/Mutton/Chicken), Galouti Kebab, Paneer Qorma',
          'Shahi Tukda, Kulfi Falooda, and live Meetha Paan'
        ]
      }
    ],
    availableDates: ['2026-11-28', '2026-11-29', '2026-12-12', '2027-01-18', '2027-02-14']
  },

  // 16. Udaipur Lake Palace Venue
  {
    id: 'v-udr-palace',
    name: 'The Jagmandir Island & Lakeview Lawns',
    category: 'Wedding Venues & Banquet Halls',
    city: 'Udaipur',
    cityTagline: 'City of Lakes',
    rating: 4.97,
    reviewsCount: 160,
    basePrice: 850000,
    priceUnit: 'per celebration day',
    image: '/assets/images/utsava_palace_venue_1793915760225.jpg',
    ceremonies: ['Sangeet', 'Wedding', 'Reception'],
    verified: true,
    budgetTier: 'Luxury',
    capacity: '300 - 800 Guests',
    description: 'Iconic island palace on Lake Pichola with historic marble courtyards, boat arrivals, and panoramic water views for unforgettable weddings.',
    features: [
      'Ferry boat transfers across the lake for all wedding guests',
      'Historic marble garden courtyard illuminated with warm amber lanterns',
      'Dedicated bridal suite with lake panorama',
      'Coordinated sound and lighting permissions until midnight'
    ],
    packages: [
      {
        id: 'pkg-u1',
        name: 'Palace Wedding Day Package',
        price: 1200000,
        description: 'Complete island lawn access, boat ferry, and suites.',
        inclusions: [
          'Full island courtyard access for 8 hours',
          'Private boat transfers for up to 500 guests',
          'Complimentary Lakeview Dressing Suite'
        ]
      }
    ],
    availableDates: ['2026-11-28', '2026-11-29', '2026-12-12', '2027-01-18', '2027-02-14']
  }
];

export const AUSPICIOUS_MUHURATS: MuhuratDate[] = [
  {
    date: '2026-11-28',
    dayOfWeek: 'Saturday',
    month: 'November 2026',
    tithi: 'Shukla Dashami',
    nakshatra: 'Rohini (Very Auspicious)',
    muhuratWindow: '05:42 PM to 07:35 PM (Sunset / Godhuli Time)',
    muhuratName: 'Godhuli Bela (Sunset)',
    season: 'Winter Wedding Season',
    suitabilityScore: 99,
    simpleExplanation: 'Considered one of the most auspicious wedding dates of the year. Peaceful planetary alignment bringing lifelong happiness and strong family bonds.',
    highlightColor: '#b90538',
    isPeak: true
  },
  {
    date: '2026-11-29',
    dayOfWeek: 'Sunday',
    month: 'November 2026',
    tithi: 'Dev Uthani Ekadashi',
    nakshatra: 'Mrigashirsha',
    muhuratWindow: '06:15 PM to 09:40 PM',
    muhuratName: 'Amrit Kaal',
    season: 'Winter Wedding Season',
    suitabilityScore: 98,
    simpleExplanation: 'Dev Uthani Ekadashi marks the start of wedding season in India. A great weekend date with high availability of priests.',
    highlightColor: '#D97706',
    isPeak: true
  },
  {
    date: '2026-12-12',
    dayOfWeek: 'Saturday',
    month: 'December 2026',
    tithi: 'Shukla Chaturthi',
    nakshatra: 'Uttara Phalguni',
    muhuratWindow: '04:50 PM to 06:25 PM',
    muhuratName: 'Godhuli Sunset',
    season: 'Winter Wedding Season',
    suitabilityScore: 96,
    simpleExplanation: 'Pleasant winter evening date. Favorable for vows around the sacred fire and family harmony.',
    highlightColor: '#b90538',
    isPeak: true
  },
  {
    date: '2027-01-18',
    dayOfWeek: 'Monday',
    month: 'January 2027',
    tithi: 'Shukla Navami',
    nakshatra: 'Hasta & Rohini',
    muhuratWindow: '06:30 PM to 09:15 PM',
    muhuratName: 'Subham Time',
    season: 'Winter Wedding Season',
    suitabilityScore: 95,
    simpleExplanation: 'First major wedding muhurat after Sankranti / Pongal. Fresh, prosperous start for new couples.',
    highlightColor: '#D97706',
    isPeak: false
  },
  {
    date: '2027-02-14',
    dayOfWeek: 'Sunday',
    month: 'February 2027',
    tithi: 'Shukla Saptami',
    nakshatra: 'Anuradha',
    muhuratWindow: '05:15 PM to 07:45 PM',
    muhuratName: 'Godhuli Sunset',
    season: 'Spring Wedding Season',
    suitabilityScore: 97,
    simpleExplanation: 'Great weather across India. Anuradha nakshatra is known for mutual friendship, understanding, and long marriage.',
    highlightColor: '#b90538',
    isPeak: true
  },
  {
    date: '2027-03-04',
    dayOfWeek: 'Thursday',
    month: 'March 2027',
    tithi: 'Krishna Dwadashi',
    nakshatra: 'Uttara Ashadha',
    muhuratWindow: '07:10 PM to 10:30 PM',
    muhuratName: 'Abhijit Muhurat',
    season: 'Spring Wedding Season',
    suitabilityScore: 94,
    simpleExplanation: 'Springtime wedding date with clear skies. Excellent for outdoor receptions and lively celebrations.',
    highlightColor: '#006947',
    isPeak: false
  }
];

export const INITIAL_BUDGET_ITEMS: BudgetItem[] = [
  {
    id: 'b-1',
    category: 'Wedding Venues & Banquet Halls',
    title: 'Sai Priya Beach Resort — Hall & 25 Rooms',
    vendorName: 'Sai Priya Beach Resort, Vizag',
    allocatedAmount: 450000,
    advancePaid: 150000,
    dueDate: '2026-10-15',
    status: 'Advance Paid',
    notes: 'Advance paid for hall booking; remaining balance due 15 days before wedding.'
  },
  {
    id: 'b-2',
    category: 'Catering & Food Services',
    title: 'Wedding Dinner Buffet (800 Plates)',
    vendorName: 'Annapurna Grand Wedding Caterers',
    allocatedAmount: 520000,
    advancePaid: 150000,
    dueDate: '2026-11-10',
    status: 'Advance Paid',
    notes: 'Tasting done; 45 menu items approved by elders.'
  },
  {
    id: 'b-3',
    category: 'Photographers & Videographers',
    title: '2-Day Photo & Cinematic Video Package',
    vendorName: 'Pixel Stories Photography',
    allocatedAmount: 160000,
    advancePaid: 60000,
    dueDate: '2026-11-12',
    status: 'Advance Paid',
    notes: 'Includes 2 photo albums and drone coverage.'
  },
  {
    id: 'b-4',
    category: 'Wedding Decor & Stage',
    title: 'Stage Flower Decor & Entrance Archway',
    vendorName: 'Devkaran & Sons Floral Decor',
    allocatedAmount: 180000,
    advancePaid: 50000,
    dueDate: '2026-11-15',
    status: 'Advance Paid',
    notes: 'Design sample selected from catalog.'
  },
  {
    id: 'b-5',
    category: 'Bridal Wear & Groom Outfits',
    title: 'Bridal Saree & Sherwani Outfits',
    vendorName: 'Nalli Silks & Manyavar Studio',
    allocatedAmount: 95000,
    advancePaid: 95000,
    dueDate: '2026-10-01',
    status: 'Fully Paid',
    notes: 'Outfits stitched, fitted, and brought home.'
  },
  {
    id: 'b-6',
    category: 'DJ, Band & Entertainment',
    title: 'Baraat Brass Band & Dhol Players',
    vendorName: 'Jea Band & Royal Dhol Troupe',
    allocatedAmount: 45000,
    advancePaid: 15000,
    dueDate: '2026-11-20',
    status: 'Advance Paid',
    notes: '21-member band booked for 2 hours groom procession.'
  },
  {
    id: 'b-7',
    category: 'Mehendi & Makeup Artists',
    title: 'Bridal Mehendi & Family Henna',
    vendorName: 'Shringar Bridal Mehendi Studio',
    allocatedAmount: 18000,
    advancePaid: 5000,
    dueDate: '2026-11-25',
    status: 'Advance Paid',
    notes: 'Booked for bride + 15 family members at home.'
  },
  {
    id: 'b-8',
    category: 'Travel & Cars',
    title: '3 Mini Buses & 4 Innova Cars for Relatives',
    vendorName: 'City Travel Services',
    allocatedAmount: 65000,
    advancePaid: 20000,
    dueDate: '2026-11-22',
    status: 'Payment Due',
    notes: 'Pickups from railway station and airport.'
  }
];

export const INITIAL_EVENTS: CeremonialEvent[] = [
  {
    id: 'ev-1',
    title: 'Mehendi & Sangeet Evening',
    day: 'Day 1 (Evening)',
    date: '2026-11-27',
    timeRange: '05:00 PM to 10:30 PM',
    muhuratTiming: '06:00 PM (Lamp Lighting)',
    venuePavilion: 'Community Banquet Hall / Home Lawn',
    dressCode: 'Comfortable Indian Festive / Yellow & Green',
    dressCodeColors: 'Yellow, Light Green, Peach',
    description: 'Relaxed evening with family henna application, Bollywood dance performances by cousins, and dinner buffet.',
    assignedVendors: ['Shringar Bridal Mehendi', 'Annapurna Grand Caterers'],
    checklist: [
      { id: 'c1', task: 'Mehendi artist table and comfortable seating set up', completed: true },
      { id: 'c2', task: 'Sound speaker and mic tested for cousin dances', completed: true },
      { id: 'c3', task: 'Snacks and hot tea counter ready for arriving guests', completed: true },
      { id: 'c4', task: 'Gifts and bangles arranged for ladies', completed: false }
    ],
    tag: 'Mehendi'
  },
  {
    id: 'ev-2',
    title: 'Haldi Ceremony',
    day: 'Day 2 (Morning)',
    date: '2026-11-28',
    timeRange: '09:30 AM to 12:30 PM',
    muhuratTiming: '10:15 AM (Auspicious Haldi Start)',
    venuePavilion: 'Open Terrace / Resort Lawn',
    dressCode: 'Bright Yellow Cotton / Kurta Pajama',
    dressCodeColors: 'Turmeric Yellow, White, Orange',
    description: 'Fun family ritual of applying turmeric paste with lots of laughter, flower petals shower, and morning South Indian breakfast.',
    assignedVendors: ['Pixel Stories Photography', 'Annapurna Grand Caterers'],
    checklist: [
      { id: 'c5', task: 'Fresh turmeric and sandalwood paste prepared', completed: true },
      { id: 'c6', task: 'Flower petal baskets arranged for photo moments', completed: true },
      { id: 'c7', task: 'Extra towels and changing rooms ready for bride and groom', completed: true }
    ],
    tag: 'Haldi'
  },
  {
    id: 'ev-3',
    title: 'Wedding Ceremony & Muhurtham (Pheras)',
    day: 'Day 2 (Evening)',
    date: '2026-11-28',
    timeRange: '05:00 PM to 09:30 PM',
    muhuratTiming: '05:42 PM to 07:35 PM (Shubh Muhurtham)',
    venuePavilion: 'Main Mandap Stage at Wedding Hall',
    dressCode: 'Traditional Silk Sarees & Dhoti / Kurta',
    dressCodeColors: 'Red, Maroon, Gold, Cream',
    description: 'The main wedding rituals: Baraat arrival, Jaimala garland exchange, Kanyadaan, and 7 sacred vows around the fire.',
    assignedVendors: ['Sai Priya Beach Resort', 'Pixel Stories Photography', 'Devkaran Stage Decor'],
    checklist: [
      { id: 'c8', task: 'Purohit / Pandit ji arrived with puja samagri list', completed: true },
      { id: 'c9', task: 'Fresh Jaimala flower garlands ready in cool room', completed: true },
      { id: 'c10', task: 'Mangalsutra and toe rings kept in safe tray', completed: true },
      { id: 'c11', task: 'Havan firewood and pure ghee ready at mandap', completed: false }
    ],
    tag: 'Wedding'
  },
  {
    id: 'ev-4',
    title: 'Grand Wedding Reception & Dinner',
    day: 'Day 3 (Evening)',
    date: '2026-11-29',
    timeRange: '07:00 PM to 11:00 PM',
    muhuratTiming: '07:30 PM (Stage Entry)',
    venuePavilion: 'Main Banquet Hall Lawn',
    dressCode: 'Formal Party Wear / Suits & Designer Sarees',
    dressCodeColors: 'Navy Blue, Wine Red, Emerald, Black',
    description: 'Grand reception for all extended family, neighbors, colleagues, and well-wishers with stage greeting and full buffet dinner.',
    assignedVendors: ['Annapurna Grand Caterers', 'Pixel Stories Photography'],
    checklist: [
      { id: 'c12', task: 'Stage sofa and photo backdrop checked', completed: true },
      { id: 'c13', task: 'Dinner buffet counters opened on time at 7:30 PM', completed: false },
      { id: 'c14', task: 'Return gift bags placed near the exit counter', completed: false }
    ],
    tag: 'Reception'
  }
];

export const INITIAL_GUESTS: RoyalGuest[] = [
  {
    id: 'g-1',
    name: 'Suresh & Lakshmi Rao (Uncle & Aunt)',
    familySide: "Bride's Side",
    partySize: 4,
    suiteAssigned: 'Room 102 (First Floor)',
    rsvpStatus: 'Confirmed',
    dietaryPreference: 'Vegetarian',
    airportConcierge: 'Need Car Pickup',
    welcomeHamperDelivered: true,
    contact: '+91 98480 12345'
  },
  {
    id: 'g-2',
    name: 'Venkatesh & Sunita Sharma',
    familySide: "Groom's Side",
    partySize: 3,
    suiteAssigned: 'Room 105 (First Floor)',
    rsvpStatus: 'Confirmed',
    dietaryPreference: 'Vegetarian',
    airportConcierge: 'Coming on Own',
    welcomeHamperDelivered: true,
    contact: '+91 98201 67890'
  },
  {
    id: 'g-3',
    name: 'K. Satyanarayana (Grandfather)',
    familySide: 'Close Family',
    partySize: 2,
    suiteAssigned: 'Ground Floor Room 12 (Easy Walk)',
    rsvpStatus: 'Confirmed',
    dietaryPreference: 'Vegetarian',
    airportConcierge: 'Need Car Pickup',
    welcomeHamperDelivered: true,
    contact: '+91 94401 55667'
  },
  {
    id: 'g-4',
    name: 'Praveen Kumar & College Friends',
    familySide: 'Friends & Colleagues',
    partySize: 5,
    suiteAssigned: 'Dormitory Hall A',
    rsvpStatus: 'Confirmed',
    dietaryPreference: 'Non-Vegetarian',
    airportConcierge: 'Coming on Own',
    welcomeHamperDelivered: false,
    contact: '+91 99880 33441'
  },
  {
    id: 'g-5',
    name: 'Anand & Meera Verma (Delhi Relatives)',
    familySide: 'Outstation Guests',
    partySize: 3,
    suiteAssigned: 'Room 204 (Second Floor)',
    rsvpStatus: 'Pending',
    dietaryPreference: 'Vegetarian',
    airportConcierge: 'Need Car Pickup',
    welcomeHamperDelivered: false,
    contact: '+91 98110 44332'
  }
];
