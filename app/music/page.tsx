import { musicSEO } from '@/lib/seo';
import MusicPageClient from './MusicPageClient';

export const metadata = musicSEO;

export default function MusicPage() {
  return <MusicPageClient />;
}
