import React, { useState, useEffect } from "react";

function useGiphy(query: string): [any[], boolean] {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const QUERY = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.REACT_APP_API_KEY}&q=${query}&limit=7&offset=0&lang=en`;
        const response = await fetch(QUERY);
        const { data } = await response.json();

        setResults(data.map((item: any) => item.images.preview.mp4));
      } finally {
        setLoading(false);
      }
    }
    if (query !== "") {
      fetchData();
    } else {
      setResults([]);
    }
  }, [query]);

  return [results, loading];
}

export default function HookedSearch() {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [results, loading] = useGiphy(query);

  return (
    <div>
      <header>
        <h1>Search the Giphy Gallery</h1>
      </header>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setQuery(search);
        }}
      >
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for GIFs here ..."
          autoComplete="search-gif"
        />

        <button>Search</button>
      </form>

      {/* Search results */}
      <div>
        {loading ? (
          "Loading"
        ) : (
          <div>
            {results.map((item) => {
              return <img alt={item} key={item} src={item} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
}
