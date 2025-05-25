import {
  arFoodView,
  benefitIcon1,
  benefitIcon2,
  benefitIcon3,
  benefitIcon4,
  benefitImage2,
  card1,
  card2,
  card3,
  card4,
  card5,
  card6,
  choseMeal,
  chromecast,
  dinerLogo,
  disc02,
  discord,
  discordBlack,
  facebook,
  figma,
  file02,
  framer,
  galaLogo,
  glovoLogo,
  homeSmile,
  instagram,
  monumentLogo,
  notification2,
  notification3,
  notification4,
  notion,
  order,
  photoshop,
  plusSquare,
  protopie,
  qrScan,
  raindrop,
  recording01,
  recording03,
  searchMd,
  slack,
  sliders04,
  telegram,
  twitter,
  tabuLogo,
} from "../assets";

export const navigation = [
  {
    id: "0",
    title: "Pocetna",
    url: "/#hero",
  },
  {
    id: "1",
    title: "Sadrzaj",
    url: "/#features",
  },
  {
    id: "2",
    title: "Mogucnosti",
    url: "/#how-to-use",
  },
  {
    id: "3",
    title: "Komentari",
    url: "/#comments",
  },
];

export const dashboardHeader = [
  {
    id: "4",
    title: "Dashboard",
    url: "/#dashboard",
  },
  {
    id: "5",
    title: "Kursevi",
    url: "/#courses",
  },
  {
    id: "6",
    title: "Podesavanja",
    url: "/#settings",
  },
];

export const heroIcons = [homeSmile, file02, searchMd, plusSquare];

export const notificationImages = [notification4, notification3, notification2];

export const companyLogos = [
  glovoLogo,
  dinerLogo,
  galaLogo,
  monumentLogo,
  tabuLogo,
];

export const brainwaveServices = [
  "Photo generating",
  "Photo enhance",
  "Seamless Integration",
];

export const brainwaveServicesIcons = [
  recording03,
  recording01,
  disc02,
  chromecast,
  sliders04,
];

export const roadmap = [
  {
    id: "0",
    title: "Scan the qr code",
    text: "The qr codes can be found on the restaurant menu next to the dish you want to see in ar",
    date: "May 2023",
    status: "done",
    imageUrl: qrScan,
    colorful: true,
  },
  {
    id: "1",
    title: "Open the meal in Ar",
    text: "Press on the button that is next to the meal to see it in Ar",
    date: "May 2023",
    status: "done",
    imageUrl: arFoodView,
  },
  {
    id: "2",
    title: "Take a look at other meals",
    text: "Under the meal you can find a slider with other dishes from the restaurant",
    date: "May 2023",
    status: "done",
    imageUrl: choseMeal,
  },
  {
    id: "3",
    title: "Make your choice",
    text: "After seeing what the restaurant has to offer you can make yor order with no hesitation",
    date: "May 2023",
    status: "done",
    imageUrl: order,
  },
];
export const collabText =
  "With smart automation and top-notch security, it's the perfect solution for teams looking to work smarter.";

export const collabContent = [
  {
    id: "0",
    title: "Seamless Integration",
    text: collabText,
  },
  {
    id: "1",
    title: "Smart Automation",
  },
  {
    id: "2",
    title: "Top-notch Security",
  },
  {
    id: "3",
    title: "Top-notch Security",
  },
  {
    id: "4",
    title: "Top-notch Security",
  },
];

export const howToUse = [
  {
    id: "0",
    title: "Scan the qr code to see what a restaurant offers",
    // text: collabText,
  },
  {
    id: "1",
    title: "Select a meal you want to see in AR",
  },
  {
    id: "2",
    title: "Press on the cube in the right corner of the model",
  },
  {
    id: "3",
    title: "Scan a surface where you want to place the model",
  },
  {
    id: "4",
    title:
      "Rotate, zoom, adjust the model as you please and inspect it from all angles",
  },
];

export const collabApps = [
  {
    id: "0",
    title: "Figma",
    icon: figma,
    width: 26,
    height: 36,
  },
  {
    id: "1",
    title: "Notion",
    icon: notion,
    width: 34,
    height: 36,
  },
  {
    id: "2",
    title: "Discord",
    icon: discord,
    width: 36,
    height: 28,
  },
  {
    id: "3",
    title: "Slack",
    icon: slack,
    width: 34,
    height: 35,
  },
  {
    id: "4",
    title: "Photoshop",
    icon: photoshop,
    width: 34,
    height: 34,
  },
  {
    id: "5",
    title: "Protopie",
    icon: protopie,
    width: 34,
    height: 34,
  },
  {
    id: "6",
    title: "Framer",
    icon: framer,
    width: 26,
    height: 34,
  },
  {
    id: "7",
    title: "Raindrop",
    icon: raindrop,
    width: 38,
    height: 32,
  },
];

export const pricing = [
  {
    id: "0",
    title: "Basic",
    description: "5 AR Models",
    price: "99",
    features: [
      "Get high-quality 3D models of your dishes",
      "Real-time Updates – Modify descriptions and prices anytime",
    ],
  },
  {
    id: "1",
    title: "Premium",
    description: "10 AR Models",
    price: "199",
    features: [
      "Get high-quality 3D models of your dishes",
      "Real-time Updates – Modify descriptions and prices anytime",
      "Bonus Models – Add 5 extra models every 6 months for free",
    ],
  },
  {
    id: "2",
    title: "Enterprise",
    description: "Unlimited Models – No restrictions, scale as needed",
    price: null,
    features: [
      "24/7 Support – Instant assistance whenever you need it",
      "Priority Support – Faster response times for any requests",
      "Get high-quality 3D models of your dishes",
      "Real-time Updates – Modify descriptions and prices anytime",
    ],
  },
];

export const benefits = [
  {
    id: "1",
    title: "Innovative Dining Experience",
    text: "Sets you apart from the competition and offers innovative dining experience",
    backgroundUrl: card1,
    iconUrl: benefitIcon1,
    imageUrl: benefitImage2,
  },

  {
    id: "2",
    title: "Improved Portion Understanding",
    text: "Customers can visualize portion sizes more accurately, reducing confusion and enhancing satisfaction with their orders.",
    backgroundUrl: card2,
    iconUrl: benefitIcon2,
    imageUrl: benefitImage2,
  },
  {
    id: "3",
    title: "Hygienic and Contact-Free",
    text: "AR menus reduce the need for physical contact, offering a safer and more hygienic alternative to traditional menus.",
    backgroundUrl: card3,
    iconUrl: benefitIcon4,
    imageUrl: benefitImage2,
    light: true,
  },
  {
    id: "4",
    title: "Engages Customers",
    text: "By allowing customers to interact with and explore menu items in real-time, the experience becomes more engaging and personalized.",
    backgroundUrl: card4,
    iconUrl: benefitIcon1,
    imageUrl: benefitImage2,
  },

  {
    id: "5",
    title: "Boosts Social Media Buzz",
    text: "The novelty of AR technology encourages customers to share their experience online, creating organic word-of-mouth marketing.",
    backgroundUrl: card5,
    iconUrl: benefitIcon2,
    imageUrl: benefitImage2,
    light: true,
  },

  {
    id: "6",
    title: "Adds the Wow Factor",
    text: "3D AR menus captivate customers in a way traditional menus can't, making their dining experience memorable and immersive.",
    backgroundUrl: card6,
    iconUrl: benefitIcon3,
    imageUrl: benefitImage2,
  },
];

export const socials = [
  {
    id: "0",
    title: "Discord",
    iconUrl: discordBlack,
    url: "#",
  },
  {
    id: "1",
    title: "Twitter",
    iconUrl: twitter,
    url: "#",
  },
  {
    id: "2",
    title: "Instagram",
    iconUrl: instagram,
    url: "#",
  },
  {
    id: "3",
    title: "Telegram",
    iconUrl: telegram,
    url: "#",
  },
  {
    id: "4",
    title: "Facebook",
    iconUrl: facebook,
    url: "#",
  },
];
