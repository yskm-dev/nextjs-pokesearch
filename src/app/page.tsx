'use client';
import {
  isServer,
  QueryClient,
  QueryClientProvider,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import Image from 'next/image';
import { memo, useState } from 'react';
import styles from './page.module.scss';

const TYPES = [
  {
    name: 'normal',
    label: 'ノーマルタイプ',
  },
  {
    name: 'fire',
    label: 'ほのおタイプ',
  },
  {
    name: 'water',
    label: 'みずタイプ',
  },
  {
    name: 'electric',
    label: 'でんきタイプ',
  },
  {
    name: 'grass',
    label: 'くさタイプ',
  },
  {
    name: 'ice',
    label: 'こおりタイプ',
  },
  {
    name: 'fighting',
    label: 'かくとうタイプ',
  },
  {
    name: 'poison',
    label: 'どくタイプ',
  },
  {
    name: 'ground',
    label: 'じめんタイプ',
  },
  { name: 'flying', label: 'ひこうタイプ' },
  {
    name: 'psychic',
    label: 'エスパータイプ',
  },
  {
    name: 'bug',
    label: 'むしタイプ',
  },
  {
    name: 'rock',
    label: 'いわタイプ',
  },
  {
    name: 'ghost',
    label: 'ゴーストタイプ',
  },
  {
    name: 'dragon',
    label: 'ドラゴンタイプ',
  },
  {
    name: 'dark',
    label: 'あくタイプ',
  },
  {
    name: 'steel',
    label: 'はがねタイプ',
  },
  {
    name: 'fairy',
    label: 'フェアリータイプ',
  },
];

type PokemonListResponse = {
  count: number;
  prev: string | null;
  next: string | null;
  results: {
    name: string;
    url: string;
  }[];
};

type PokemonDetailResponse = {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string | null;
    other?: {
      'official-artwork'?: {
        front_default: string | null;
      };
    };
  };
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
};

export default function Page() {
  const [selectedType, setSelectedType] = useState('');
  const [selectedPokemon, setSelectedPokemon] = useState('');
  const [pageURL, setPageURL] = useState<string | null>(
    'https://pokeapi.co/api/v2/pokemon?limit=10'
  );

  return (
    <QCProvider>
      <div className={styles.page}>
        <div className={styles.header}>
          <h1 className={styles.title}>PokeSearch</h1>
          <PokemonTypeSearch
            selectedType={selectedType}
            onSelectType={setSelectedType}
          />
        </div>
        <div className={styles.content}>
          <PokemonList
            pageURL={pageURL}
            setPageURL={setPageURL}
            onSelect={setSelectedPokemon}
          />
          {selectedPokemon && <PokemonDetail name={selectedPokemon} />}
        </div>
      </div>
    </QCProvider>
  );
}

// ポケモン一覧を取得する関数
const fetchPokemonList = async (url: string | null) => {
  const response = await fetch(
    url ?? `https://pokeapi.co/api/v2/pokemon?limit=10`
  );

  if (!response.ok) {
    throw new Error('ポケモン一覧の取得に失敗しました');
  }

  return (await response.json()) as PokemonListResponse;
};

// ポケモン一覧を表示するコンポーネント
const PokemonList = memo(function PokemonList({
  pageURL,
  setPageURL,
  onSelect,
}: {
  pageURL: string | null;
  setPageURL: (url: string | null) => void;
  onSelect: (name: string) => void;
}) {
  console.log('[render] PokemonList', { pageURL });

  // useQueryフックを使ってデータを取得する
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['pokemonList', pageURL], // クエリのキー
    queryFn: () => fetchPokemonList(pageURL), // データを取得する関数
  });

  if (isLoading) {
    return <p>読み込み中...</p>;
  }

  if (isError) {
    return <p>エラー: {error.message}</p>;
  }

  if (!data) {
    return <p>データがありません</p>;
  }

  return (
    <div className={styles.listPanel}>
      {/* 取得したデータをリスト表示する */}
      {data.count}匹のポケモンが見つかりました。
      <ul>
        {data.results.map((pokemon) => (
          <li key={pokemon.name}>
            <PokemonItem name={pokemon.name} onSelect={onSelect} />
          </li>
        ))}
      </ul>
      <nav aria-label="ポケモン一覧のナビゲーション">
        {data.prev && (
          <button
            onClick={() => {
              setPageURL(data.prev);
            }}
          >
            前のページ
          </button>
        )}
        {data.next && (
          <button
            onClick={() => {
              setPageURL(data.next);
            }}
          >
            次のページ
          </button>
        )}
      </nav>
    </div>
  );
});

const PokemonItem = memo(function PokemonItem({
  name,
  onSelect,
}: {
  name: string;
  onSelect: (name: string) => void;
}) {
  const queryClient = useQueryClient();

  const handlePrefetch = (name: string) => {
    // すでにキャッシュされている場合はプリフェッチしない
    if (queryClient.getQueryData(['pokemonDetail', name])) return;
    queryClient.prefetchQuery({
      queryKey: ['pokemonDetail', name],
      queryFn: () => fetchPokemonDetail(name),
      staleTime: 60 * 1000, // 詳細useQueryと揃える
    });
  };

  return (
    <button
      type="button"
      onClick={() => onSelect(name)}
      onMouseEnter={() => handlePrefetch(name)}
      onFocus={() => handlePrefetch(name)}
    >
      {name}
    </button>
  );
});

//

function PokemonTypeIcon({ name, label }: { name: string; label?: string }) {
  return (
    <div className={styles.typeIcon} data-type={name}>
      <Image
        src={`/type/${name}.svg`}
        alt={label ?? name}
        width={24}
        height={24}
        className={styles.typeIconImage}
      />
    </div>
  );
}

// ポケモンの詳細を取得する関数
async function fetchPokemonDetail(name: string) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);

  if (!response.ok) {
    throw new Error('ポケモンの詳細の取得に失敗しました');
  }

  return (await response.json()) as PokemonDetailResponse;
}

const PokemonTypeSearch = function PokemonTypeSearch({
  selectedType,
  onSelectType,
}: {
  selectedType: string;
  onSelectType: (type: string) => void;
}) {
  return (
    <div>
      <h2>タイプ検索</h2>
      <div>
        タイプアイコンをクリックすると、そのタイプのポケモンを検索できます（未実装）。
      </div>
      <div>選択中: {selectedType}</div>
      <ul className={styles.typeIcons}>
        {TYPES.map((type) => (
          <li key={type.name}>
            <label htmlFor={type.name}>
              <PokemonTypeIcon name={type.name} label={type.label} />
              <input
                type="radio"
                name="type"
                id={type.name}
                checked={selectedType === type.name}
                onChange={() => onSelectType(type.name)}
              />
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

const PokemonDetail = memo(function PokemonDetail({ name }: { name: string }) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['pokemonDetail', name], // クエリのキー
    queryFn: () => fetchPokemonDetail(name), // データを取得する関数
    enabled: !!name, // nameが空でないときだけクエリを実行する
  });

  if (isLoading) {
    return <p>読み込み中...</p>;
  }
  if (isError) {
    return <p>エラー: {error.message}</p>;
  }
  if (!data) {
    return <p>データがありません</p>;
  }

  const imageUrl =
    data.sprites.other?.['official-artwork']?.front_default ??
    data.sprites.front_default ??
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`;

  return (
    <div className={styles.detailPanel}>
      <div className={styles.detailHeader}>
        <h2>{data.name}</h2>
      </div>
      <Image src={imageUrl} alt={data.name} width={200} height={200} />
      <ul className={styles.typeIcons}>
        {data.types.map((item) => (
          <li key={item.slot}>
            <PokemonTypeIcon name={item.type.name} />
          </li>
        ))}
      </ul>
      <p>高さ: {data.height / 10}m</p>
      <p>重さ: {data.weight / 10}kg</p>
    </div>
  );
});

// クエリクライアントを作成する関数
function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });
}

// ブラウザでクエリクライアントをキャッシュするための変数
let browserQueryClient: QueryClient | undefined = undefined;

// クライアントとサーバーで同じクエリクライアントを共有しないようにする
function getQueryClient() {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

// クエリクライアントプロバイダー
export function QCProvider({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();
  console.log('[render] QCProvider');

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
