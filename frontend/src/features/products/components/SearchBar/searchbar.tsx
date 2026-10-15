import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./searchbar.css";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
}

const SearchBar = ({
  placeholder = "Search products...",
  onSearch,
}: SearchBarProps) => {
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    onSearch?.(search.trim());
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="search-bar">

      <input
        type="text"
        placeholder={placeholder}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <button onClick={handleSearch}>
        <FaSearch />
        Search
      </button>

    </div>
  );
};

export default SearchBar;