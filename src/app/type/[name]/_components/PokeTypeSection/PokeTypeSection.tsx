'use client';

import { PokeList } from '@/app/type/[name]/_components/PokeList';
import { PokeDetail } from '@/components/PokeDetail';
import { PokeTypeSearch } from '@/components/PokeTypeSearch';
import { QCProvider } from '@/providers/QCProvider';
import { useState } from 'react';
import styles from './PokeTypeSection.module.scss';

type Props = {
  name: string;
};

export function PokeTypeSection({ name }: Props) {
  const [selectedType, setSelectedType] = useState(name);
  const [selectedPokemon, setSelectedPokemon] = useState('');

  return (
    <QCProvider>
      <PokeTypeSearch
        selectedType={selectedType}
        onSelectType={setSelectedType}
      />
      <div className={styles.content}>
        <PokeList
          name={name}
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
