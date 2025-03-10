import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/searchBar.module.css";

export const SearchBar=()=> {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form className={styles.searchBar} onSubmit={handleSearch}>
      <input
        type="text"
        value={query}
        placeholder="Search"
        className={styles.input}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" className={styles.searchButton}>
        🔍
      </button>
    </form>
  );
}
