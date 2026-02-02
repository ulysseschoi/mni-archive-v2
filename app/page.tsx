import type { Metadata } from 'next';
import LandingPage from "@/components/LandingPage";

export const metadata: Metadata = {
  title: 'Home',
  description: "The chaotic yet lovely universe of Meenoi. Welcome to the first archive.",
  openGraph: {
    title: 'MNI Archive - Home',
    description: "The chaotic yet lovely universe of Meenoi. Welcome to the first archive.",
    type: 'website',
  },
};

export default function Home() {
  return <LandingPage />;
}
