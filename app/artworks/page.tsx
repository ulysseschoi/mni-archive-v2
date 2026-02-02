import { artworksSEO } from '@/lib/seo';
import ArtworksClient from './ArtworksClient';

export const metadata = artworksSEO;

export default function ArtworksPage() {
  return <ArtworksClient />;
}
