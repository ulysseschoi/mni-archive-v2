import { writingsSEO } from '@/lib/seo';
import WritingsPageClient from './WritingsPageClient';

export const metadata = writingsSEO;

export default function WritingsPage() {
  return <WritingsPageClient />;
}
