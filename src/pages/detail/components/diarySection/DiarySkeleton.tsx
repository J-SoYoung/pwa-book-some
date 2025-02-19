import styles from "./_diarySection.module.css";

export const DiarySkeleton = () => {
  return (
    <>
      {[1, 2, 3].map((_, index) => (
        <div key={index} className={styles.diarySkeleton}>
          <div className={styles.image}></div>
          <div className={styles.contentBox}>
            <p className={styles.subTitle}></p>
            <p className={styles.content}></p>
          </div>
        </div>
      ))}
    </>
  );
};
