import { PokeItem } from '@/components/PokeItem';
import { PokeTypeListResponse } from '@/types/pokeAPI';
import { memo, useState } from 'react';
import styles from './PokeList.module.scss';

export const PokeList = memo(function PokeList({
  name,
  data,
  selectedPokemon,
  onSelect,
}: {
  name: string;
  data: PokeTypeListResponse;
  selectedPokemon: string;
  onSelect: (name: string) => void;
}) {
  const [pokeResults, setPokeResults] = useState({
    results: data
      ? data.pokemon
          .map((p) => ({
            name: p.pokemon.name,
            url: p.pokemon.url,
          }))
          .slice(0, 20)
      : [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = data ? Math.ceil(data.pokemon.length / 20) : 0;

  function setNewPokeResults(page: number) {
    if (!data) return;
    const startIndex = (page - 1) * 20;
    const newResults = data.pokemon
      .map((p) => ({
        name: p.pokemon.name,
        url: p.pokemon.url,
      }))
      .slice(startIndex, startIndex + 20);
    setPokeResults({ results: newResults });
    setCurrentPage(page);
  }

  if (!data) {
    return (
      <div className={styles.listPanel}>
        <p className={styles.muted}>データがありません</p>
      </div>
    );
  } else {
    if (pokeResults.results.length === 0 && data.pokemon.length > 0) {
      setNewPokeResults(1);
    }
  }

  return (
    <div className={styles.listPanel}>
      <div className={styles.listHeader}>
        <span className={styles.listCount}>{data?.pokemon.length}匹</span>
      </div>
      <ul className={styles.list}>
        {pokeResults.results.map((pokemon) => (
          <li key={pokemon.name}>
            <PokeItem
              name={pokemon.name}
              isActive={selectedPokemon === pokemon.name}
              onSelect={onSelect}
            />
          </li>
        ))}
      </ul>
      <nav className={styles.pagination}>
        <button
          className={styles.paginationButton}
          disabled={currentPage === 1}
          onClick={() => setNewPokeResults(currentPage - 1)}
        >
          前へ
        </button>
        <button
          className={styles.paginationButton}
          disabled={currentPage === totalPages}
          onClick={() => setNewPokeResults(currentPage + 1)}
        >
          次へ
        </button>
      </nav>
    </div>
  );
});
