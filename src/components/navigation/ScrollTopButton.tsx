import styles from "./navigation.module.css";

export const ScrollTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  // ⭕ 모바일 데스크탑 따로 해야함 -> 중간에 어중간한 부분은 화면 밖을 나가게됨
  return (
    <button className={styles.scrollToTop} onClick={scrollToTop}>
      위로
    </button>
  );
};
