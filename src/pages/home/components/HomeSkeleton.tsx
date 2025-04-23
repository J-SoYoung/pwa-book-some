import styles from "../styles/homeSkeleton.module.css";

export const HomeSkeleton = () => {
  return (
    <div className={styles.skeletonContainer}>
      <div className={styles.skeletonSubTitle}></div>
      <div className={styles.skeletonRecommended}>
        {[1, 2, 3].map((_, index) => (
          <div key={index} className={styles.skeletonItem} />
        ))}
      </div>
      <div className={styles.skeletonSubTitle}></div>
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
    </div>
  );
};
