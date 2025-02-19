import styles from "./_bookSection.module.css";

export const BookSkeleton = () => {
  return (
    <div className={styles.bookSkeleton}>
      <div className={styles.title} />
      <div className={styles.image} />
      <p className={styles.author} />
      <p className={styles.description} />
    </div>
  );
};
