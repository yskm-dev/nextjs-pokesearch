import { PokeTypeSection } from '@/app/type/[name]/_components/PokeTypeSection';

type Props = {
  params: Promise<{ name: string }>;
};

export default async function Page({ params }: Props) {
  const name = (await params).name;

  return <PokeTypeSection name={name} />;
}
