async function fetchType(name: string) {
  'use cache';

  const res = await fetch(`https://pokeapi.co/api/v2/type/${name}`, {
    next: { revalidate: 86400, tags: ['poke-type-list', name] },
  });
  return res.json();
}

type Props = {
  params: Promise<{ name: string }>;
};

export async function GET(_request: Request, { params }: Props) {
  const { name } = await params;

  try {
    const data = await fetchType(name);
    return Response.json(data);
  } catch (error: any) {
    console.error('Fetch Error:', error);

    if (error.response?.status === 404) {
      return Response.json({ error: 'Not Found' }, { status: 404 });
    }

    return Response.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
