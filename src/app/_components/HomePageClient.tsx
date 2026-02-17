'use client';

import { PokeList } from '@/app/_components/PokeList';
import styles from '@/app/page.module.scss';
import { PokeDetail } from '@/components/PokeDetail';
import { PokeTypeSearch } from '@/components/PokeTypeSearch';
import { QCProvider } from '@/providers/QCProvider';
import { useState } from 'react';

export function HomePageClient({ listData }: { listData: any }) {
  const [selectedType, setSelectedType] = useState('');
  const [selectedPokemon, setSelectedPokemon] = useState('');

  return (
    <QCProvider>
      <PokeTypeSearch
        selectedType={selectedType}
        onSelectType={setSelectedType}
      />
      <div className={styles.content}>
        <PokeList
          data={listData}
          selectedPokemon={selectedPokemon}
          onSelect={setSelectedPokemon}
        />
        <div className={styles.detailArea}>
          {selectedPokemon ? (
            <PokeDetail name={selectedPokemon} />
          ) : (
            <div className={styles.emptyDetail}>
              <p>左のリストからポケモンを選んでください</p>
            </div>
          )}
        </div>
      </div>
    </QCProvider>
  );
}
