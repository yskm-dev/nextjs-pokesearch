import { PokeTypeSection } from '@/app/type/[name]/_components/PokeTypeSection';

type Props = {
  params: Promise<{ name: string }>;
};

export default async function Page({ params }: Props) {
  'use cache';
  const name = (await params).name;
  const res = await fetch(`https://pokeapi.co/api/v2/type/${name}`, {
    next: { revalidate: 86400, tags: ['poke-type-list', name] },
  });
  const data = await res.json();
  return <PokeTypeSection name={name} listData={data} />;
}
