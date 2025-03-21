import { AiOutlineLoading3Quarters } from "react-icons/ai";
import styles from "./styles/loadingSpinner.module.css";

export const LoadingSpinner = () => {
  return (
    <div className={styles.loadingSpinner}>
      <AiOutlineLoading3Quarters />
    </div>
  );
};
