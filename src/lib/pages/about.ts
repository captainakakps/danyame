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
  bodyParagraphs: string[];
  stripImages: AboutStripImage[];
  quote: {
    backgroundImage: string;
    text: string;
  };
};

export const staticAboutPage: AboutPageData = {
  hero: {
    image: "/assets/about/hero.jpg",
    title: "About Danyame Recreational Village",
    description:
      "Danyame Recreational Village is a vibrant lifestyle and entertainment hub located in Akwatia, designed to bring people together through shared experiences.",
  },
  bodyParagraphs: [
    "At its core, Danyame Recreational Village is designed to be more than just a venue — it's a place where different experiences come together seamlessly.",
    "We cater to individuals, families, and corporate groups looking for a dynamic environment that blends relaxation, entertainment, and social interaction.",
    "Over time, Danyame has grown into a go-to destination for events, weekend outings, and memorable gatherings in the Eastern Region. Whether you're celebrating something special or simply looking for a place to unwind, Danyame offers a space where every visit feels alive.",
  ],
  stripImages: [
    { src: "/assets/about/strip-1.jpg", alt: "Danyame venue 1" },
    { src: "/assets/about/strip-2.jpg", alt: "Danyame venue 2" },
    { src: "/assets/about/strip-3.jpg", alt: "Danyame venue 3" },
    { src: "/assets/about/strip-4.jpg", alt: "Danyame venue 4" },
    { src: "/assets/about/strip-5.jpg", alt: "Danyame venue 5" },
  ],
  quote: {
    backgroundImage: "/assets/about/quote-bg.jpg",
    text: "Located in Akwatia in the Eastern Region of Ghana, Danyame Recreational Village sits at the heart of a growing community.",
  },
};
