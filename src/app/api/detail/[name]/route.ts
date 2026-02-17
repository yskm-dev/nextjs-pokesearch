async function fetchDetail(name: string) {
  'use cache';

  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`, {
    next: {
      revalidate: 1000 * 60 * 60 * 24 * 30, // 30日
      tags: ['poke-detail', name],
    },
  });
  return res.json();
}

type Props = {
  params: Promise<{ name: string }>;
};

export async function GET(_request: Request, { params }: Props) {
  const { name } = await params;

  try {
    const data = await fetchDetail(name);
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
