import { HomePageClient } from '@/app/_components/HomePageClient';

export default async function Page() {
  'use cache';
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=10000`, {
    next: { revalidate: 86400, tags: ['poke-type-list'] },
  });
  if (!res.ok) return null;
  const data = await res.json();
  return <HomePageClient listData={data} />;
}
