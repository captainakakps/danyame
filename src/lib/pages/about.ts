export type AboutStripImage = {
  src: string;
  alt: string;
};

export type AboutPageData = {
  hero: {
    image: string;
    title: string;
    description: string;
  };
  intro: {
    label: string;
    welcomeHeading: string;
    primaryImage: string;
    primaryImageAlt: string;
    sinceCard: {
      image: string;
      label: string;
      text: string;
    };
    paragraph: string;
  };
  leadership: {
    intro: string;
    image: string;
    imageAlt: string;
    paragraphs: string[];
  };
  stripImages: AboutStripImage[];
  missionVision: {
    mission: {
      icon: string;
      title: string;
      text: string;
    };
    vision: {
      icon: string;
      title: string;
      text: string;
    };
  };
  location: {
    backgroundImage: string;
    pinIcon: string;
    text: string;
  };
  map: {
    title: string;
    embedUrl: string;
    link: string;
  };
};

export const staticAboutPage: AboutPageData = {
  hero: {
    image: "/assets/about/hero.jpg",
    title: "Elevating Lives, Creating Memories.",
    description:
      "Danyame Recreational Village is a vibrant lifestyle and entertainment hub located in Boadua-Topremang, designed to bring people together through shared experiences.",
  },
  intro: {
    label: "ABOUT DANYAME",
    welcomeHeading:
      "Welcome to Danyame Recreational Village, where leisure meets excellence and every visit becomes a memorable experience.",
    primaryImage: "/assets/about/intro-primary.jpg",
    primaryImageAlt: "Danyame Recreational Village exterior",
    sinceCard: {
      image: "/assets/about/since-2024.jpg",
      label: "SINCE 2024",
      text: "Creating memorable experiences through recreation and hospitality.",
    },
    paragraph:
      "Established and officially opened for operations in December 2024, Danyame Recreational Village was founded on a passion for hospitality, recreation, and community development. Since its inception, it has grown into one of Ghana’s emerging lifestyle destinations, offering a unique environment where people can relax, celebrate, connect, and create lasting memories.",
  },
  leadership: {
    intro:
      "Under the visionary leadership of Mr. Daniel Nyame, our Chief Executive Officer",
    image: "/assets/about/ceo-portrait.jpg",
    imageAlt: "Mr. Daniel Nyame, Chief Executive Officer",
    paragraphs: [
      "We are committed to delivering exceptional recreational and hospitality experiences that cater to individuals, families, corporate organizations, and the wider community.",
      "We offer a wide range of recreational experiences, including delicious dining, refreshing beverages, sporting activities, family outings, private events, corporate gatherings, and exciting festivals.",
    ],
  },
  stripImages: [
    { src: "/assets/about/strip-1.jpg", alt: "Colorful mural at Danyame" },
    { src: "/assets/about/strip-2.jpg", alt: "Dining at Danyame" },
    { src: "/assets/about/strip-3.jpg", alt: "Pool area at Danyame" },
    { src: "/assets/about/strip-4.jpg", alt: "Danyame entrance walkway" },
    { src: "/assets/about/strip-5.jpg", alt: "Bar at Danyame" },
  ],
  missionVision: {
    mission: {
      icon: "/assets/about/mission-icon.svg",
      title: "Our Mission",
      text: "To provide high-quality leisure services in a safe, welcoming, and enjoyable environment while fostering social interaction, youth empowerment, and community development.",
    },
    vision: {
      icon: "/assets/about/vision-icon.svg",
      title: "Our Vision",
      text: "To become Ghana’s leading recreational and lifestyle destination, delivering exceptional experiences that promote relaxation, entertainment, and community engagement.",
    },
  },
  location: {
    backgroundImage: "/assets/about/quote-bg.jpg",
    pinIcon: "/assets/about/location-pin.svg",
    text: "Located at Boadua-Topremang in the Eastern Region of Ghana, Danyame Recreational Village sits at the heart of a growing community.",
  },
  map: {
    title: "Locate Us Here",
    embedUrl:
      "https://maps.google.com/maps?q=6.0602346,-0.7972018&z=17&output=embed",
    link: "https://www.google.com/maps/place/Danyame+Recreational+Village./@6.0602346,-0.7972018,17z",
  },
};
