import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-static';

export async function GET(request: NextRequest) {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=10000`, {
      next: { revalidate: 86400, tags: ['poke-type-list'] },
    });
    return NextResponse.json(await res.json());
  } catch (error: any) {
    console.error('Fetch Error:', error);

    if (error.response?.status === 404) {
      return NextResponse.json({ error: 'Not Found' }, { status: 404 });
    }

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
