import styles from "./items.module.css";

export const ItemSkeleton = () => {
  return (
    <div className={styles.skeletonContainer}>
      {[1, 2, 3].map((_, index) => (
        <div key={index} className={styles.skeletonItem} />
      ))}
    </div>
  );
};
