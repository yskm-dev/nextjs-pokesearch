import Image from "next/image";
import styles from "./PokeTypeIcon.module.scss";

// ポケモンのタイプアイコンを表示するコンポーネント
export function PokeTypeIcon({ name, label }: { name: string; label?: string }) {
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