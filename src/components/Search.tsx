import React, { useState, useEffect } from "react";
import "./grid.css"

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
        setResults(
          data.map(
            (item: any) => `https://media.giphy.com/media/${item.id}/giphy.gif`
          )
        );
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
        <h1 className="font-serif text-5xl m-4">Search the Giphy Gallery</h1>
      </header>

      <form className="item-center"
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
      </form>

      {/* Search results */}

      {loading ? (
        "Loading"
      ) : (
            <div className="grid">
              {results.map((item, index) => {      
                  return (
                    <div className={`div${index+1}`} key={index}>
                      <img
                        className="rounded shadow-md"
                        alt={item}
                        key={index}
                        src={item}
                      />
                    </div>
                  );
              })}
            </div>
       
      )}
    </div>
  );
}
