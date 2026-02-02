import { getAllArtworks } from "@/lib/sanity";
import ArtworksClient from "./ArtworksClient";

// Mock data fallback
const mockArtworks = [
  {
    _id: "1",
    title: "Chaotic Dreams",
    slug: { current: "chaotic-dreams" },
    image: "/mni-artwork-sample.png",
    description:
      "A spontaneous doodle capturing the chaotic yet lovely essence of everyday dreams. Drawn in one sitting with no regrets.",
    category: "doodle",
    createdAt: "2026-01-28",
    featured: true,
  },
  {
    _id: "2",
    title: "Black Briar Skater",
    slug: { current: "black-briar-skater" },
    image: "/mni-artwork-sample.png",
    description:
      "A happy skateboarder living their best life. Simple lines, pure vibes.",
    category: "character",
    createdAt: "2026-01-25",
    featured: false,
  },
  {
    _id: "3",
    title: "Curious Cat",
    slug: { current: "curious-cat" },
    image: "/mni-artwork-sample.png",
    description:
      "A cat with big eyes wondering about the universe. Aren't we all?",
    category: "doodle",
    createdAt: "2026-01-22",
    featured: true,
  },
  {
    _id: "4",
    title: "House B",
    slug: { current: "house-b" },
    image: "/mni-artwork-sample.png",
    description:
      "A simple house with a big 'B'. Maybe it stands for 'Beautiful' or 'Brave'. You decide.",
    category: "sketch",
    createdAt: "2026-01-20",
    featured: false,
  },
  {
    _id: "5",
    title: "Urban Building",
    slug: { current: "urban-building" },
    image: "/mni-artwork-sample.png",
    description:
      "A tall building with windows. Each window tells a story we'll never know.",
    category: "sketch",
    createdAt: "2026-01-18",
    featured: false,
  },
  {
    _id: "6",
    title: "Mystery Box",
    slug: { current: "mystery-box" },
    image: "/mni-artwork-sample.png",
    description:
      "An open box with wild lines coming out. Is it chaos? Is it creativity? Yes.",
    category: "illustration",
    createdAt: "2026-01-15",
    featured: true,
  },
];

export default async function ArtworksPage() {
  let artworks = mockArtworks;
  let usingSanity = false;

  // Try to fetch from Sanity if configured
  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    try {
      const sanityData = await getAllArtworks();
      if (sanityData && sanityData.length > 0) {
        artworks = sanityData;
        usingSanity = true;
      }
    } catch (error) {
      console.log("Sanity fetch failed, using mock data:", error);
    }
  }

  return <ArtworksClient artworks={artworks} usingSanity={usingSanity} />;
}
