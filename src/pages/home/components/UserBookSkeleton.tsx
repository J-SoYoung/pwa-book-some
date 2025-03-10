import styles from "../styles/userBooks.module.css";

export const UserBookSkeleton = () => {
  return (
    <div>
      {[1, 2, 3].map((_, index) => (
        <div key={index} className={styles.skeletonUserBook}>
          <div className={styles.skeletonImage} />
          <div className={styles.skeletonText}>
            <div className={styles.skeletonTitle} />
            <div className={styles.skeletonDesc} />
            <div className={styles.skeletonDesc} />
            <div className={styles.skeletonDesc} />
            <div className={styles.skeletonDesc} />
          </div>
        </div>
      ))}
    </div>
  );
};
