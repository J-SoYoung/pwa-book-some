import styles from "../styles/detailPageSkeleton.module.css";

export const DetailPageSkeleton = () => {
  return (
    <>
      <div className={styles.bookSkeleton}>
        <div className={styles.title} />
        <div className={styles.image} />
        <p className={styles.author} />
        <p className={styles.description} />
      </div>
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
