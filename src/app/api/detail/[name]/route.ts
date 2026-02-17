import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-static';

type Props = {
  params: Promise<{ name: string }>;
};

export async function GET(request: NextRequest, { params }: Props) {
  const { name } = await params;

  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`, {
      next: {
        revalidate: 1000 * 60 * 60 * 24 * 30, // 30日
        tags: ['poke-detail', name],
      },
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
