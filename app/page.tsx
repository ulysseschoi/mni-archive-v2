import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MNI Archive',
  description: 'The chaotic yet lovely universe of Meenoi. Welcome to the first archive.',
};

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center px-6">
        <h1 className="text-6xl md:text-8xl font-light tracking-wider mb-6">
          MNI
        </h1>
        <p className="text-xl md:text-2xl font-light text-gray-400 tracking-wide">
          The chaotic yet lovely universe of Meenoi
        </p>
        <p className="mt-8 text-sm text-gray-600">
          Welcome to the first archive.
        </p>
      </div>
    </main>
  );
}
