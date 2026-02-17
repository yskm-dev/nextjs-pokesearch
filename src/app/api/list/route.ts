async function fetchList() {
  'use cache';

  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=10000`, {
    next: { revalidate: 86400, tags: ['poke-type-list'] },
  });
  return res.json();
}

export async function GET() {
  try {
    const data = await fetchList();
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
