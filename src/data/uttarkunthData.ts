import { Venture, FutureSector, MediaStory, ProcessStage } from '../types';

export const BRAND_INFO = {
  name: 'Uttarkunth',
  founder: 'Gaurav Negi',
  motto: 'Learn by Doing. Grow by Serving.',
  brandline: 'Ideas born in the Himalayas. Built through people.',
  coreNiche: 'Community Development through Entrepreneurship',
  contactEmail: 'uttarkunth@gmail.com',
  address: 'Jari, Kullu, Himachal Pradesh 175105, India',
  socialLinks: {
    youtube: 'https://www.youtube.com/@UttarkunthLivingUniversity',
    instagram: 'https://www.instagram.com/uttarkunth?stkn=enJ2M2VpdDA4aTI4&utm_source=qr',
    founderInstagram: 'https://www.instagram.com/gaurav_negi_._?stkn=MWMxMzNwbHI3N2o1Zw%3D%3D&utm_source=qr',
  },
  summary:
    'A Himalayan-born entrepreneurial ecosystem exploring how sustainable businesses, creativity, learning, and collective action can contribute to meaningful community development.',
  signatureEquation: [
    { label: 'UNITY', desc: 'People coming together with shared responsibility' },
    { label: 'ACTION', desc: 'Moving from contemplation to practical real-world work' },
    { label: 'EXPERIENCE', desc: 'Encountering challenges, mistakes, and grassroots realities' },
    { label: 'CAPABILITY', desc: 'Developing practical skills, systems, and self-reliance' },
    { label: 'DEVELOPMENT', desc: 'Meaningful, lasting community transformation' },
  ],
};

export const PROCESS_STAGES: ProcessStage[] = [
  {
    step: 1,
    name: 'OBSERVE',
    shortDesc: 'Notice real ground challenges and community realities with an open, honest mind.',
    fullDesc:
      'Observation is where every genuine enterprise begins. Rather than imposing imported blueprints, we observe the environmental pressures, migration patterns, cultural erosion, and unmet needs of Himalayan villages.',
    keyAction: 'Listen to villagers, study local constraints, identify genuine human needs.',
  },
  {
    step: 2,
    name: 'BUILD',
    shortDesc: 'Create practical, sustainable enterprise vehicles that operate in the real economy.',
    fullDesc:
      'We design and launch for-profit ventures—homestays, cafes, media projects—that can support themselves financially rather than relying indefinitely on donations.',
    keyAction: 'Bootstrap viable small-scale operations with local resources and craftsmanship.',
  },
  {
    step: 3,
    name: 'EARN',
    shortDesc: 'Generate honest, self-sustaining revenue to fuel longevity and independence.',
    fullDesc:
      'Financial sustainability is the bedrock of independence. A business must stand on its own two feet, cover fair wages, and generate surpluses to have long-term community value.',
    keyAction: 'Deliver real customer value in hospitality, dining, content, and local produce.',
  },
  {
    step: 4,
    name: 'LEARN',
    shortDesc: 'Treat daily operations, mistakes, and customer feedback as an open laboratory.',
    fullDesc:
      'Theoretical knowledge pales before real operations. When an experiment stumbles, we analyze what failed, refine operational standards, and adapt to mountain realities.',
    keyAction: 'Embrace trial, error, inventory challenges, and continuous skill refinement.',
  },
  {
    step: 5,
    name: 'CONNECT',
    shortDesc: 'Bring together local youth, artisans, travelers, and knowledgeable collaborators.',
    fullDesc:
      'Isolated efforts burn out; connected networks flourish. We bridge urban travelers, rural craftspeople, young professionals, and elders into a collaborative network.',
    keyAction: 'Foster trust, fair relationships, cross-disciplinary exchange, and collective goodwill.',
  },
  {
    step: 6,
    name: 'SERVE',
    shortDesc: 'Channel organizational strength, resources, and time into community welfare.',
    fullDesc:
      'Businesses are the vehicles; community development is the purpose. As ventures stabilize, we channel a voluntary portion of surplus and team bandwidth into local village priorities.',
    keyAction: 'Support local cleanliness drives, youth skill sessions, and cultural preservation.',
  },
  {
    step: 7,
    name: 'DOCUMENT',
    shortDesc: 'Record processes, lessons, and cultural narratives transparently through media.',
    fullDesc:
      'Unrecorded progress cannot be studied or taught. Through videos, field logs, and archival stories, we document both successes and hurdles for public learning.',
    keyAction: 'Produce films, vlogs, and open-source operational notes for others to reference.',
  },
  {
    step: 8,
    name: 'IMPROVE',
    shortDesc: 'Refine workflows, upgrade hospitality standards, and strengthen local capacity.',
    fullDesc:
      'Continuous iteration is the spirit of Karmayog. We do not rest on early outcomes; we tighten supply lines, train local teams, and elevate quality steadily.',
    keyAction: 'Incorporate customer feedback and village consensus to upgrade systems.',
  },
  {
    step: 9,
    name: 'SCALE',
    shortDesc: 'Gradually share tested models so other mountain communities can adapt them.',
    fullDesc:
      'Our ultimate aim is not a monolithic corporate empire, but open, decentralized frameworks that other mountain villages and young entrepreneurs can adapt for their own homes.',
    keyAction: 'Replicate principles across new villages, regions, and aligned sectors.',
  },
];

export const CURRENT_VENTURES: Venture[] = [
  {
    id: 'yash-homestay',
    name: 'Yash Home Stay',
    category: 'Hospitality',
    status: 'Operational',
    tagline: 'The founder’s foundational venture in mountain tourism, financing the Uttarkunth vision.',
    description:
      'Yash Home Stay is Gaurav Negi’s first commercial venture in the tourism sector. Perched on a scenic Himalayan mountain slope with sweeping valley panoramas, this welcoming homestay was established as an independent, self-sustaining business to generate the essential capital and resources needed to bootstrap the larger Uttarkunth vision.',
    details: [
      'The founder’s first independent enterprise in Himalayan hospitality and tourism',
      'Established to generate self-sustaining commercial revenue that finances the Uttarkunth vision',
      'Modern, comfortable mountain stay featuring solar water heating, scenic terrace, and valley views',
      'Provides authentic mountain retreat hospitality while acting as a financial engine for future growth',
    ],
    image: '/src/assets/images/yash_homestay_actual_1791099565133.jpg',
    location: 'Jari, Kullu, Himachal Pradesh 175105',
    focusArea: 'Tourism & Vision Financing',
  },
  {
    id: 'uttarkunth-cafe',
    name: 'Uttarkunth Café',
    category: 'Food & Community',
    status: 'Active Development',
    tagline: 'A welcoming space for honest food, regional brews, and collaborative dialogue.',
    description:
      'More than a commercial eatery, Uttarkunth Café is conceptualized as a warm community hearth where locals, travelers, and young creators gather over mountain herbal teas, clean wholesome food, and meaningful conversations.',
    details: [
      'Showcases local mountain ingredients, millets (Mandua/Jhangora), and herbal infusions',
      'Acts as a creative community hub for workshops, discussions, and open dialogue',
      'Builds local youth skills in culinary arts, hygiene, barista craft, and customer service',
      'Serves as an operational proving ground for local retail and food service systems',
    ],
    image: '/src/assets/images/uttarkunth_cafe_ambiance_1791084743353.jpg',
    location: 'Jari, Kullu, Himachal Pradesh 175105',
    focusArea: 'Culinary Enterprise & Community Space',
  },
  {
    id: 'media-storytelling',
    name: 'Media & Storytelling',
    category: 'Media & Storytelling',
    status: 'Operational',
    tagline: 'Capturing the spirit of the Himalayas, living traditions, and the entrepreneurial journey.',
    description:
      'Digital storytelling through YouTube, cultural vlogs, documentary shorts, and the flagship series "Aaj Ka Devta". We document unheralded mountain heroes, environmental questions, and the honest trials of building grassroots enterprises.',
    details: [
      'Flagship documentary series "Aaj Ka Devta" exploring village guardians and elder wisdom',
      'Behind-the-scenes documentation of building Uttarkunth ventures from the ground up',
      'Thoughtful commentary on Himalayan environmental challenges and cultural shifts',
      'Independent digital platform reaching youth across India with constructive stories',
    ],
    image: '/src/assets/images/media_storytelling_camera_1791084753811.jpg',
    location: 'Digital Broadcast & Field Production',
    focusArea: 'Documentary, Cultural Preservation & Public Learning',
  },
];

export const FUTURE_SECTORS: FutureSector[] = [
  {
    id: 'tourism-experiences',
    title: 'Responsible Tourism & Trail Experiences',
    nature: 'Future Exploration',
    rationale:
      'Moving beyond generic mass tourism toward respectful nature walks, heritage trails, and conservation-minded exploration led entirely by village youths.',
    potentialActivities: [
      'Low-impact hiking and botanical exploration trails',
      'Village homestay federation and host training networks',
      'Ecological sensitivity workshops for pilgrims and travelers',
    ],
    readiness: 'Planned',
  },
  {
    id: 'apparel-clothing',
    title: 'Himalayan Apparel & Natural Fiber Clothing',
    nature: 'Future Exploration',
    rationale:
      'Revitalizing traditional mountain weaving, hemp, and wool craftsmanship into durable, ethical lifestyle clothing created by local artisans.',
    potentialActivities: [
      'Partnerships with mountain weavers and knitters',
      'Natural-dyed contemporary mountain workwear and winter apparel',
      'Fair-trade direct-to-consumer artisanal collections',
    ],
    readiness: 'Conceptual',
  },
  {
    id: 'food-products',
    title: 'Regional Food & Indigenous Mountain Harvest',
    nature: 'Future Exploration',
    rationale:
      'Processing indigenous Himalayan crops (finger millet, amaranth, wild honey, local kidney beans) at the source to add value within the village economy.',
    potentialActivities: [
      'Packaged high-altitude organic grains and herbal teas',
      'Village-level post-harvest processing and packaging units',
      'Direct link between mountain farmers and conscious urban households',
    ],
    readiness: 'Planned',
  },
  {
    id: 'film-theatre',
    title: 'Film, Theatre & Audio-Visual Production',
    nature: 'Future Exploration',
    rationale:
      'Nurturing Himalayan artistic voices, folktales, and contemporary mountain dilemmas through original cinema, stage plays, and musical documentation.',
    potentialActivities: [
      'Original independent short films and web series based in mountain villages',
      'Local youth theatre workshops and scriptwriting residencies',
      'Audio archives of fading folk songs and oral histories',
    ],
    readiness: 'Conceptual',
  },
  {
    id: 'workshops-learning',
    title: 'Artisanal Workshops & Experiential Learning',
    nature: 'Future Exploration',
    rationale:
      'Offering hands-on residencies where city professionals and students learn traditional masonry, wood carving, natural farming, and mountain architecture.',
    potentialActivities: [
      'Himalayan vernacular architecture and stone craft apprenticeships',
      'Youth entrepreneurship bootcamps in rural settings',
      'Permaculture and high-altitude soil rejuvenation residencies',
    ],
    readiness: 'Exploratory',
  },
  {
    id: 'agriculture-nature',
    title: 'Sustainable Agriculture & Nature-Linked Initiatives',
    nature: 'Future Exploration',
    rationale:
      'Protecting fragile slopes through native tree reforestation, spring-water catchment revival, and natural multi-cropping systems.',
    potentialActivities: [
      'Community tree nurseries focusing on broadleaf oak and rhododendron',
      'Revival of traditional water springs (Dharas and Naulas)',
      'Bee-keeping and agro-forestry demonstration plots',
    ],
    readiness: 'Planned',
  },
  {
    id: 'technology-digital',
    title: 'Decentralized Technology & Mountain Digital Tools',
    nature: 'Future Exploration',
    rationale:
      'Leveraging digital infrastructure to connect remote mountain producers directly to markets, transparent supply chains, and distributed work opportunities.',
    potentialActivities: [
      'Open-source software tools for rural homestay operators',
      'Village inventory and fair pricing transparency platforms',
      'Remote digital skill hubs enabling youth to work from their ancestral homes',
    ],
    readiness: 'Exploratory',
  },
];

export const MEDIA_STORIES: MediaStory[] = [
  {
    id: 'aaj-ka-devta-intro',
    title: 'Aaj Ka Devta: The Guardians of the Sacred Ridges',
    category: 'Aaj Ka Devta',
    duration: '18 min',
    description:
      'A documentary celebration of village elders, traditional healers, and silent custodians of Himalayan heritage who embody the divine spirit through selfless community service.',
    featuredQuote: '“A devta is not just in stone temples; a devta is anyone who gives life to others without demanding applause.”',
    thumbnail: '/src/assets/images/media_storytelling_camera_1791084753811.jpg',
    videoId: 'aaj-ka-devta-ep1',
    releaseDate: 'October 2026',
  },
  {
    id: 'stone-masons',
    title: 'The Mountain Masons of Kullu Valley: Vernacular Architecture',
    category: 'Cultural Reflection',
    duration: '14 min',
    description:
      'Documenting the vanishing art of indigenous mountain stone construction and vernacular design across Kullu and Parvati Valley that has withstood Himalayan earthquakes for centuries.',
    featuredQuote: '“When you chisel mountain stone with patience, the mountain welcomes you inside.”',
    thumbnail: '/src/assets/images/hero_himalayan_valley_1791084719943.jpg',
    videoId: 'vernacular-architecture',
    releaseDate: 'August 2026',
  },
  {
    id: 'building-cafe',
    title: 'Behind the Counter: Building Uttarkunth Café From Scratch',
    category: 'Founder Vlog',
    duration: '22 min',
    description:
      'An unvarnished look at the real trials of opening a mountain cafe: material transit over landslide-prone roads, sourcing local timber, plumbing challenges, and training our first youth team.',
    featuredQuote: '“Think 5%. Do 95%. When you stand in the dust and mix the cement yourself, real clarity begins.”',
    thumbnail: '/src/assets/images/uttarkunth_cafe_ambiance_1791084743353.jpg',
    videoId: 'cafe-building-log',
    releaseDate: 'June 2026',
  },
  {
    id: 'rainshadow-wisdom',
    title: 'Living With the Seasons: Mountain Resilience in Changing Weather',
    category: 'Field Notes',
    duration: '16 min',
    description:
      'How Himalayan villages historically adapted to extreme weather, flash floods, and changing monsoon patterns, and what modern climate action can learn from them.',
    featuredQuote: '“We must not only visit the mountains; we must learn how to listen to their limits.”',
    thumbnail: '/src/assets/images/hero_himalayan_valley_1791084719943.jpg',
    videoId: 'mountain-resilience',
    releaseDate: 'April 2026',
  },
];

export const FOUNDER_BIO = {
  name: 'Gaurav Negi',
  title: 'Founder, Uttarkunth',
  quote:
    '“Is there any practical solution to these problems — and who will create it? The only honest answer we arrived at is: We the people. Not through slogans or dependence on others, but by building enterprises that sustain life, hone capability, and serve our communities.”',
  story: [
    'The idea for Uttarkunth took root while Gaurav Negi was deep in preparation for competitive civil services examinations. Like many young people from the Himalayas, he was studying governance systems, policy frameworks, and development theory.',
    'Yet, looking out at his surrounding mountain homeland, the theoretical concepts stood in sharp contrast to the stark ground reality: fragile hillsides scarred by unchecked excavation, recurring monsoon floods, swelling plastic waste in holy river corridors, the cultural dislocation of youth, and a steady exodus of young families abandoning villages due to lack of viable livelihoods.',
    'A central question began to gnaw at him: If everyone leaves, or waits for government machinery or distant NGOs to intervene, who will create the ground-level solutions? The insight was simple yet demanding: "We the people."',
    'Instead of waiting for an external savior, Gaurav decided to set aside conventional career paths and begin on the ground. Uttarkunth was founded not as an NGO asking for handouts, but as an entrepreneurial ecosystem where businesses serve as the vehicles, practical work serves as the school, and community development is the uncompromising north star.',
  ],
  image: '/src/assets/images/founder_gaurav_negi_1791084765809.jpg',
};
