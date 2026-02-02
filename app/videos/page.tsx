import { videosSEO } from '@/lib/seo';
import VideosPageClient from './VideosPageClient';

export const metadata = videosSEO;

export default function VideosPage() {
  return <VideosPageClient />;
}
