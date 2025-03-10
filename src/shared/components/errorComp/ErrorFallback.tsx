import styles from "./errorFallback.module.css";

export const ErrorFallback = ({ error }: { error: Error }) => {
  console.error("ErrorBoundary에서 감지한 에러:", error);
  return (
    <div className={styles.errorFallback}>
      <p>{` ❌ ${error.message} ❌`}</p>
      <p>데이터를 로드하는 데 문제가 발생하였습니다</p>
    </div>
  );
};
