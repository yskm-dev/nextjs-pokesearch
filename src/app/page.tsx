'use client';
import { PokeList } from '@/app/_components/PokeList';
import { PokeDetail } from '@/components/PokeDetail';
import { PokeTypeSearch } from '@/components/PokeTypeSearch';
import { QCProvider } from '@/providers/QCProvider';
import { useState } from 'react';
import styles from './page.module.scss';

export default function Page() {
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
