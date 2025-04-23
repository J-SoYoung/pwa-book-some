import styles from "../styles/myBookSkeleton.module.css";

export const MyBookSkeleton = () => {
  return (
    <>
      <div className={styles.skeletonTitle}></div>
      <div className={styles.skeletonContainer}>
        {[1, 2, 3].map((_, index) => (
          <div key={index} className={styles.skeletonItem} />
        ))}
      </div>
      <div className={styles.skeletonTitle}></div>
      <div className={styles.skeletonContainer}>
        {[1, 2, 3].map((_, index) => (
          <div key={index} className={styles.skeletonItem} />
        ))}
      </div>
    </>
  );
};
