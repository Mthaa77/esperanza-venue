// Shared site data for Esperanza Wedding Venue
// Centralises nav links, chapel/animal/package content, contact details.

export const CONTACT = {
  businessName: "Esperanza Wedding Venue",
  tagline: "Wedding Venue with a difference",
  secondaryTagline: "Not your ordinary wedding venue",
  address: "Plot 588 Mooiplaats, Volstruis Street, Pretoria East, Pretoria, 0036, Gauteng",
  addressShort: "Mooiplaats, Pretoria East, Gauteng",
  phoneMarina: "076 857 6886",
  phoneMarinaDisplay: "076 857 6886",
  phoneChrista: "076 259 5633",
  phoneChristaDisplay: "076 259 5633",
  phoneGoogle: "+27 76 184 5660",
  email: "esperanzaweddings@gmail.com",
  whatsapp: "27768576886", // international format, no +
  whatsappChrista: "27762595633",
  hours: "Viewings by appointment only · WhatsApp preferred (mobile signal on the farm is poor for voice calls)",
  mapQuery: "Plot+588+Mooiplaats+Volstruis+Street+Pretoria+East",
  stats: {
    rating: 4.4,
    reviewCount: 225,
    fbLikes: 7029,
    fbCheckins: 1098,
    igPosts: 326,
  },
  social: {
    facebookWedding: "https://www.facebook.com/espereranzaweddings",
    facebookEquestrian:
      "https://www.facebook.com/p/Esperanza-Equestrian-Centre-and-Venue-100057376881511",
    facebookParty: "https://www.facebook.com/esperanzaparty",
    instagram: "https://www.instagram.com/esperanzaweddingsvenue",
  },
};

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Chapels", href: "#chapels" },
  { label: "Barn", href: "#barn" },
  { label: "Packages", href: "#packages" },
  { label: "Animals", href: "#animals" },
  { label: "Day flow", href: "#day-flow" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#testimonials" },
  { label: "Weddings", href: "#real-weddings" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export const CHAPELS = [
  {
    name: "Forest Chapel",
    tagline: "By the river",
    description:
      "Our signature bushveld ceremony spot — a clearing in the indigenous trees on the banks of the Pienaars River, with wooden bench pews, dappled light through the canopy and a rustic wooden arbor dressed in seasonal florals.",
    image: "/images/forest-chapel.png",
    features: ["Wooden bench pews", "Floral arbor", "River backdrop", "Dappled shade"],
    accent: "forest",
  },
  {
    name: "Chapel on the Dam",
    tagline: "Water & reflection",
    description:
      "A small wooden deck extending out over the farm dam, set inside the horses' old lunging ring. Ceremony chairs face the water with a mountain-bushveld reflection behind you — magical at golden hour.",
    image: "/images/dam-chapel.png",
    features: ["Deck over water", "Reflection shots", "Sunset ceremony", "Reed backdrop"],
    accent: "gold",
  },
  {
    name: "Stables as your Chapel",
    tagline: "Barn-wood ceremony",
    description:
      "Our working horse stables, transformed for the day with white draping, fairy lights and eucalyptus. Wooden stalls become the aisle, the dirt floor becomes the chapel — true rustic farm character.",
    image: "/images/stables-chapel.png",
    features: ["Working stables", "White draping", "Fairy-lit aisle", "All-weather"],
    accent: "barn",
  },
  {
    name: "Garden Ceremony",
    tagline: "Under the oaks",
    description:
      "An outdoor garden ceremony under our old oak trees, white chairs in rows on the lawn, with the barn as your backdrop. The most flexible of our ceremony settings — pairs with any reception option.",
    image: "/images/garden-chapel.png",
    features: ["Lawn aisle", "Oak canopy", "Barn backdrop", "Seats 200+"],
    accent: "forest",
  },
];

export const ANIMALS = [
  {
    title: "Donkeys Serving Drinks",
    description:
      "Our signature cocktail-hour moment: a donkey in a flower collar carries a wooden tray of welcome drinks and canapés through your guests. The single most photographed — and most talked-about — moment of the day.",
    icon: "wine",
    highlight: true,
  },
  {
    title: "Photos with our Horses",
    description:
      "Real working horses, not photo-prop animals. Couples and guests can be photographed alongside our warmbloods in the paddock or stables — a wedding album moment no city venue can match.",
    icon: "horse",
  },
  {
    title: "Donkeys, Cows, Calves, Sheep & Peacocks",
    description:
      "The whole farmyard walks the property. Guests interact with our donkeys, cows and calves, sheep and free-roaming peacocks. Particularly magical for couples with kids in the wedding party.",
    icon: "paw",
  },
  {
    title: "Arrive on Horseback",
    description:
      "Make an entrance nobody forgets. The bride (or groom) can be walked down the aisle on horseback, or arrive at the ceremony via donkey cart. Add-on, subject to rider availability.",
    icon: "rider",
  },
  {
    title: "Donkey & Pony Cart Hire",
    description:
      "A donkey or pony cart can circulate guests between ceremony, reception and dressing rooms — practical transport and an experience in one. Big hit with kids and grandparents alike.",
    icon: "cart",
  },
  {
    title: "Pony & Horse Rides for Guests",
    description:
      "Led pony rides for the little ones and supervised horse rides for braver guests — included as an add-on for daytime receptions and kids' parties. Our riding-school staff handle everything.",
    icon: "riding",
  },
  {
    title: "We are Pet Friendly",
    description:
      "Well-behaved dogs on lead are welcome as part of the wedding party — ring-bearer duties, family photos, the works. We'll happily coordinate meet-and-greets with our farm dogs too.",
    icon: "dog",
  },
];

export const ACCOMMODATION = [
  {
    name: "Honeybee Cottage",
    description:
      "Our largest on-site dressing room — perfect for the bride, bridesmaids and overnight parents. White linen, rustic wood, fairy lights.",
    image: "/images/room-honeybee.png",
    sleeps: 2,
    type: "Bride suite",
  },
  {
    name: "Horse Room",
    description:
      "Adjacent to the stables — a quirky, themed dressing room with riding memorabilia on the walls. Popular with the groom's party.",
    image: "/images/room-horse.png",
    sleeps: 2,
    type: "Groom suite",
  },
  {
    name: "Donkey Room",
    description:
      "Cosy ground-floor room near the barn — ideal for flower girls, page boys or as a quiet room for little ones during the reception.",
    image: "/images/room-donkey.png",
    sleeps: 2,
    type: "Family",
  },
  {
    name: "River Cabin",
    description:
      "Set apart near the forest chapel — a private cabin for getting ready away from the bustle, with the river audible through the window.",
    image: "/images/room-river.png",
    sleeps: 2,
    type: "Private",
  },
  {
    name: "Hen's Nest",
    description:
      "Bright, airy room above the barn — the perfect bridesmaids' HQ for hair, makeup and champagne, with a view over the dam.",
    image: "/images/room-hens-nest.png",
    sleeps: 3,
    type: "Bridal party",
  },
];

export const COMING_SOON_ROOMS = ["River Cabin No. 1", "Stallion Cottage"];

export const SNACKBAR = [
  {
    name: "Welcome Drinks",
    tagline: "Arrival toast",
    description:
      "A selection of sparkling, white and rosé wine plus a seasonal welcome cocktail, served as guests arrive from the ceremony. Often delivered by donkey, weather permitting.",
    icon: "champagne",
  },
  {
    name: "The Juice Box",
    tagline: "Non-alcoholic",
    description:
      "Our kids- and teetotaller-friendly offering: cold-pressed seasonal fruit juices, infused waters and a DIY spritzer station. A genuine alternative to the bar, not an afterthought.",
    icon: "juice",
  },
  {
    name: "Gin & Cocktails",
    tagline: "Craft bar",
    description:
      "A rotating craft gin shelf, signature botanical cocktails and old standards made well. Our bartenders work to your budget — from a lean cash bar to an open craft cocktail experience.",
    icon: "gin",
  },
];

export const INCLUDED = [
  { label: "Two dressing rooms", icon: "door" },
  { label: "Banquet tables & chairs", icon: "table" },
  { label: "Fairy-light installation", icon: "lights" },
  { label: "Braai facilities on site", icon: "flame" },
  { label: "On-site bar & snack bar", icon: "bar" },
  { label: "Farm animal interaction", icon: "paw" },
  { label: "Multiple photo locations", icon: "camera" },
  { label: "Ample on-site parking", icon: "car" },
  { label: "Built-in sound system", icon: "music" },
  { label: "Power & backup lighting", icon: "power" },
  { label: "Ceremony seating", icon: "chair" },
  { label: "Ladies' & gents' ablutions", icon: "toilet" },
];

export const ENTERTAINMENT = [
  "DJ + live bands",
  "Classical / rock / Afrikaans / Latin / opera singers",
  "Donkey-served cocktail hour",
  "Donkey & pony cart rides",
  "Horseback entrance for the couple",
  "Lasso / roping demonstration",
  "Boeresport games",
  "Jumping castle & waterslide (kids' parties)",
];

/** Add-ons with indicative pricing (in ZAR) for the "Build my package" selector.
 *  Prices are "starting from" — final quote depends on guest count and duration. */
export interface AddOn {
  name: string;
  description: string;
  priceFrom: number; // ZAR, whole rands
  icon: "music" | "mic" | "sparkles" | "cart" | "horse" | "lasso" | "gamepad" | "waves";
  popular?: boolean;
}

export const ADD_ONS: AddOn[] = [
  {
    name: "DJ + live bands",
    description: "DJ for the full reception, plus optional live band sets. We book and coordinate.",
    priceFrom: 6500,
    icon: "music",
    popular: true,
  },
  {
    name: "Live singers",
    description: "Classical, rock, Afrikaans, Latin or opera singers for ceremony or cocktail hour.",
    priceFrom: 3500,
    icon: "mic",
  },
  {
    name: "Donkey-served cocktail hour",
    description: "Our signature moment — a donkey in a flower collar carries welcome drinks. Most photographed.",
    priceFrom: 1800,
    icon: "sparkles",
    popular: true,
  },
  {
    name: "Donkey & pony cart rides",
    description: "Cart circulates guests between ceremony, reception and dressing rooms. Big hit with kids & grandparents.",
    priceFrom: 2200,
    icon: "cart",
  },
  {
    name: "Horseback entrance",
    description: "The bride (or groom) is walked down the aisle on horseback. Subject to rider availability.",
    priceFrom: 3000,
    icon: "horse",
  },
  {
    name: "Lasso / roping demo",
    description: "Western-riding demonstration and guest roping session. Farm entertainment with a twist.",
    priceFrom: 1500,
    icon: "lasso",
  },
  {
    name: "Boeresport games",
    description: "Traditional South African farm games — sack races, three-legged races, tug-of-war. Great for daytime receptions.",
    priceFrom: 1200,
    icon: "gamepad",
  },
  {
    name: "Kids jumping castle & waterslide",
    description: "Jumping castle, waterslide, trampoline and playground for kids' parties and daytime receptions.",
    priceFrom: 2000,
    icon: "waves",
  },
];

export const GALLERY_IMAGES = [
  // NEW — premium real-wedding photos
  { src: "/images/couple-dancing.jpg", alt: "Bride and groom dancing under golden string lights at twilight", tag: "First dance", category: "Reception" },
  { src: "/images/confetti-ceremony.jpeg", alt: "Bride and groom in Scottish kilt walking through confetti shower", tag: "Confetti send-off", category: "Ceremony" },
  { src: "/images/collage-floral-arch.jpg", alt: "Couple under floral arch of pampas grass and white blooms", tag: "Floral arch", category: "Ceremony" },
  { src: "/images/wine-tasting.jpeg", alt: "Rustic wine tasting setup with sage green linens and eucalyptus garlands", tag: "Wine tasting", category: "Reception" },
  // Original real-wedding + venue photos
  { src: "/images/767031647_1366843728976729_3817482498980574108_n.jpeg", alt: "Bride and groom on the lawn with rustic barn backdrop", tag: "Real wedding", category: "Ceremony" },
  { src: "/images/819012125_1144231561504722_1542940861248284015_n.jpeg", alt: "Rustic barn reception interior with fairy lights and long farm tables", tag: "Barn reception", category: "Reception" },
  { src: "/images/702306491_1389339173000734_2859274000603076407_n.jpg", alt: "Rustic wedding entrance with floral arch and LOVE sign", tag: "Entrance", category: "Details" },
  { src: "/images/754066387_1582196683552068_5524149596110241383_n.jpeg", alt: "Twilight pergola with string lights and rustic brick barn", tag: "Twilight", category: "Reception" },
  { src: "/images/forest-chapel.png", alt: "Forest chapel ceremony in bushveld grove by the river", tag: "Forest chapel", category: "Ceremony" },
  { src: "/images/dam-chapel.png", alt: "Wooden chapel deck extending over the farm dam", tag: "Dam chapel", category: "Ceremony" },
  { src: "/images/stables-chapel.png", alt: "Stables transformed into wedding chapel with white draping", tag: "Stables chapel", category: "Ceremony" },
  { src: "/images/garden-chapel.png", alt: "Garden ceremony under old oak trees", tag: "Garden", category: "Ceremony" },
  { src: "/images/barn-twilight.png", alt: "Barn venue exterior at twilight with fairy lights", tag: "Barn exterior", category: "Reception" },
  { src: "/images/horses.png", alt: "Brown horses in green paddock on the equestrian farm", tag: "Horses", category: "Animals" },
  { src: "/images/donkey-drinks.png", alt: "Donkey carrying tray of welcome drinks during cocktail hour", tag: "Donkey drinks", category: "Animals" },
  { src: "/images/cabin-interior.png", alt: "Rustic cabin accommodation interior with white linen and fairy lights", tag: "Dressing room", category: "Rooms" },
];

/** Brand assets from the uploaded 3D logo upgrade */
export const BRAND_ASSETS = {
  logo3dSign: "/images/logo-3d-sign.jpg",
  poster3d: "/images/poster-3d.jpg",
  collageFloralArch: "/images/collage-floral-arch.jpg",
  ponyPackageFlyer: "/images/pony-package-flyer.png",
};
