import { memo } from 'react';
import styles from './PokeItem.module.scss';

export const PokeItem = memo(function PokeItem({
  name,
  isActive,
  onSelect,
}: {
  name: string;
  isActive: boolean;
  onSelect: (name: string) => void;
}) {
  return (
    <button
      type="button"
      className={isActive ? styles.listItemActive : styles.listItem}
      onClick={() => onSelect(name)}
    >
      <span className={styles.listName}>{name}</span>
    </button>
  );
});
