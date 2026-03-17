"use client";

import { useCallback, useState, useEffect, memo } from "react";

export interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

export const SearchBar = memo(function SearchBar({ onSearch, isLoading }: SearchBarProps): React.ReactElement {
  const [query, setQuery] = useState("");

  // Debounced search - waits 300ms after user stops typing
  useEffect(() => {
    if (!query.trim()) {
      onSearch("");
      return;
    }

    const timer = setTimeout(() => {
      onSearch(query.trim());
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [query, onSearch]);

  const handleClear = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <div className="relative w-full">
      <div className="relative flex items-center">
        <span className="absolute left-4 text-2xl">🔍</span>
        <input
          type="text"
          placeholder="Search student by name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={isLoading}
          className="clay-input pl-12 pr-12"
          autoComplete="off"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-4 text-lg text-clay-400 transition-colors hover:text-clay-600"
            type="button"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
});
