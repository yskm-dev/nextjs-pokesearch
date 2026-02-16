import { fetchPokeDetail } from '@/app/api/pokeAPI';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { memo } from 'react';
import { PokeTypeIcon } from '../PokeTypeIcon';
import styles from './PokeDetail.module.scss';

export const PokeDetail = memo(function PokemonDetail({
  name,
}: {
  name: string;
}) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['pokemonDetail', name],
    queryFn: () => fetchPokeDetail(name),
    enabled: !!name,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) {
    return (
      <div className={styles.detailPanel}>
        <div className={styles.loading}>
          <div className={styles.spinner} />
          <p>読み込み中...</p>
        </div>
      </div>
    );
  }
  if (isError) {
    return (
      <div className={styles.detailPanel}>
        <p className={styles.error}>エラー: {error.message}</p>
      </div>
    );
  }
  if (!data) {
    return (
      <div className={styles.detailPanel}>
        <p className={styles.muted}>データがありません</p>
      </div>
    );
  }
  console.log(data);
  const imageUrl =
    data.sprites.other?.['official-artwork']?.front_default ??
    data.sprites.front_default ??
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`;

  return (
    <div className={styles.detailPanel}>
      <div className={styles.detailMedia}>
        <Image src={imageUrl} alt={data.name} width={240} height={240} />
      </div>
      <div className={styles.detailInfo}>
        <h2 className={styles.detailName}>{data.name}</h2>
        <div className={styles.detailTypes}>
          {data.types.map((item) => (
            <div
              key={item.slot}
              className={styles.detailTypeBadge}
              data-type={item.type.name}
            >
              <PokeTypeIcon name={item.type.name} />
              <span>{item.type.name}</span>
            </div>
          ))}
        </div>
        <div className={styles.detailStats}>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>たかさ</span>
            <span className={styles.statValue}>{data.height / 10}m</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>おもさ</span>
            <span className={styles.statValue}>{data.weight / 10}kg</span>
          </div>
          <div className={styles.statsTable}>
            {data?.stats?.map((stat) => (
              <div key={stat.stat.name} className={styles.statsRow}>
                <span className={styles.statsName}>{stat.stat.name}</span>
                <span className={styles.statsValue}>{stat.base_stat}</span>
                <div className={styles.statsGaugeTrack}>
                  <div
                    className={styles.statsGaugeFill}
                    style={{
                      width: `${Math.min((stat.base_stat / 180) * 100, 100)}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});
