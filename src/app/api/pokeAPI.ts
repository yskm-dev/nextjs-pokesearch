import type {
  PokeDetailResponse,
  PokeListResponse,
  PokeTypeListResponse,
} from '@/types/pokeAPI';

// ポケモンAPIから一覧データを取得する関数
export const fetchPokeList = async () => {
  const response = await fetch(`/api/list?limit=10000`);
  if (!response.ok) {
    throw new Error('ポケモン一覧の取得に失敗しました');
  }
  return (await response.json()) as PokeListResponse;
};

// ポケモンAPIからタイプ別の一覧データを取得する関数
export const fetchPokeTypeList = async (name: string | null) => {
  const response = await fetch(`/api/type/${name}`);
  if (!response.ok) {
    throw new Error('ポケモン一覧の取得に失敗しました');
  }
  return (await response.json()) as PokeTypeListResponse;
};

// ポケモンの詳細を取得する関数
export const fetchPokeDetail = async (name: string) => {
  const response = await fetch(`/api/detail/${name}`);
  if (!response.ok) {
    throw new Error('ポケモンの詳細の取得に失敗しました');
  }
  return (await response.json()) as PokeDetailResponse;
};
