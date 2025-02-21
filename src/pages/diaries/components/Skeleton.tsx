import styles from "./skeleton.module.css";

export const Skeleton = () => {
  return (
    <div>
      <div className={styles.title} />
      <div className={styles.diaryBackground}>
        <div className={styles.image} />
      </div>
      <div className={styles.postSkeleton}>
        {[1, 2, 3].map((_, index) => (
          <div key={index} className={styles.contentBox}>
            <p></p>
            <p></p>
          </div>
        ))}
      </div>
    </div>
  );
};
