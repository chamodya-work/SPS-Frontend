import React, { useState, useEffect } from "react";

const SearchWithAutocomplete = ({ onSearchSelect }) => {
  const [searchText, setSearchText] = useState("");
  const [cities, setCities] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await fetch("https://slcities.live/api/cities");
        const data = await res.json();
        const arr = data.cities ?? data;
        setCities(arr);
      } catch (err) {
        console.error("Failed to fetch cities", err);
      }
    };

    fetchCities();
  }, []);

  const handleChange = (e) => {
    const val = e.target.value;
    setSearchText(val);

    if (!val.trim()) {
      setSuggestions([]);
      return;
    }

    const filtered = cities.filter((c) =>
      c.name.toLowerCase().startsWith(val.toLowerCase())
    );
    setSuggestions(filtered.slice(0, 10));
  };

  const handleSelect = (city) => {
    setSearchText(city.name);
    setSuggestions([]);
    onSearchSelect(city);
  };

  return (
    <div style={{ position: "relative", width: "220px" }}>
      <input
        type="text"
        placeholder="Enter location"
        value={searchText}
        onChange={handleChange}
        style={{
          width: "100%",
          padding: "8px 12px",
          border: "1px solid #cbd5e1",
          borderRadius: "8px",
        }}
      />
      {suggestions.length > 0 && (
        <ul
          style={{
            position: "absolute",
            top: "36px",
            left: 0,
            right: 0,
            border: "1px solid #cbd5e1",
            borderRadius: "4px",
            listStyle: "none",
            margin: 0,
            padding: 0,
            maxHeight: "200px",
            overflowY: "auto",
            zIndex: 1000,
          }}
        >
          {suggestions.map((city, idx) => (
            <li
              key={idx}
              onClick={() => handleSelect(city)}
              style={{
                padding: "8px 10px",
                cursor: "pointer",
                borderBottom:
                  idx < suggestions.length - 1 ? "1px solid #eee" : "none",
              }}
            >
              {city.name}
            </li>
          ))}
        </ul>
      )}
      <button
        className="app-btn app-btn--ghost"
        style={{
          padding: "8px 16px",
          border: "none",
          borderRadius: "8px",
          background: "#e5edf577",
          boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
          color: "#000",
          cursor: "pointer",
          transition: "all 0.2s ease-in-out",
          marginTop: 8,
          width: "100%",
        }}
        onClick={() => {
          const match = cities.find(
            (c) => c.name.toLowerCase() === searchText.toLowerCase()
          );
          if (match) {
            onSearchSelect(match);
          } else {
            alert("No matching city found");
          }
        }}
      >
        Search
      </button>
    </div>
  );
};

export const LocationSearch = ({ value, onChange, onSearch }) => {
  return (
    <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
      <input
        type="text"
        placeholder="Enter location"
        value={value}
        onChange={onChange}
        style={{
          flex: 1,
          padding: 6,
          borderRadius: 6,
          border: "1px solid #cbd5e1",
        }}
      />
      <button
        className="app-btn app-btn--ghost"
        onClick={onSearch}
        style={{
          padding: "8px 16px",
          border: "none",
          borderRadius: "8px",
          background: "#e5edf577",
          boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
          color: "#000",
          cursor: "pointer",
          transition: "all 0.2s ease-in-out",
        }}
      >
        Search
      </button>
    </div>
  );
};

export default SearchWithAutocomplete;