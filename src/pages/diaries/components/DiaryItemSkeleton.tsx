import styles from "../styles/diaryItemSkeleton.module.css";

export const DiaryItemSkeleton = () => {
  return (
    <>
      <div className={styles.title} />
      <div className={styles.diaryBackground}>
        <div className={styles.image} />
      </div>
    </>
  );
};
export const PostListsSkeleton = () => {
  return (
    <div className={styles.postSkeleton}>
      {[1, 2, 3].map((_, index) => (
        <div key={index} className={styles.contentBox}>
          <p></p>
          <p></p>
        </div>
      ))}
    </div>
  );
};
export const DiaryPageSkeleton = () => {
  return (
    <>
      <DiaryItemSkeleton />
      <PostListsSkeleton />
    </>
  );
};
