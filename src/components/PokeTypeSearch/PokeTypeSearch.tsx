import { TYPES } from '@/constants/types';
import Link from 'next/link';
import { PokeTypeIcon } from '../PokeTypeIcon';
import styles from './PokeTypeSearch.module.scss';

export const PokeTypeSearch = function PokeTypeSearch({
  selectedType,
  onSelectType,
}: {
  selectedType: string;
  onSelectType: (type: string) => void;
}) {
  return (
    <div className={styles.typeFilter}>
      <ul className={styles.typeIcons}>
        {TYPES.map((type) => (
          <li key={type.name}>
            <Link
              className={`${styles.typeLabel} ${selectedType === type.name ? styles.typeLabelActive : ''}`}
              href={`/type/${type.name}`}
            >
              <PokeTypeIcon name={type.name} label={type.name} />
              <span className={styles.typeName}>
                {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
