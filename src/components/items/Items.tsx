import { Link } from "react-router-dom";
import styles from "./items.module.css";

interface ItemsProps {
  data: {
    url: string;
    imageUrl: string;
    title: string;
  };
}
export const Items = ({ data }: ItemsProps) => {
  const { url, imageUrl, title } = data;

  return (
    <Link to={url} key={url} className={styles.bookItem}>
      <img src={imageUrl} alt={title} />
      <h3>{title}</h3>
    </Link>
  );
};
