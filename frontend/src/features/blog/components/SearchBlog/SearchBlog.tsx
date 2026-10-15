import { useState } from "react";
import { FaSearch } from "react-icons/fa";

import "./SearchBlog.css";

interface SearchBlogProps {
    onSearch: (value: string) => void;
    placeholder?: string;
}

const SearchBlog = ({
    onSearch,
    placeholder = "Search articles...",
}: SearchBlogProps) => {
    const [value, setValue] = useState("");

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const searchValue = event.target.value;

        setValue(searchValue);
        onSearch(searchValue);
    };

    return (
        <div className="search-blog">
            <FaSearch
                className="search-icon"
                aria-hidden="true"
            />

            <input
                id="blog-search"
                type="search"
                name="search"
                value={value}
                placeholder={placeholder}
                aria-label="Search articles"
                onChange={handleChange}
            />
        </div>
    );
};

export default SearchBlog;