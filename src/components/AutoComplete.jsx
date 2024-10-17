import React, { useCallback, useEffect, useState } from "react";
import "./styles.css";
import SuggestionsList from "./Suggestions-list";
import debounce from "lodash/debounce";

const AutoComplete = ({
  placeHolder = "",
  staticData,
  fetchSuggestions,
  dataKey = "",
  customLoading = "Loading...",
  onSelect = () => {},
  onChange = () => {},
  onBlur = () => {},
  onFocus = () => {},
  customStyles = {},
}) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInptChange = (event) => {
    setInputValue(event.target.value);
    onChange(event.target.value);
  };

  const getSuggestions = async (query) => {
    setError(null);
    setLoading(true);
    try {
      let result;
      if (staticData) {
        result = staticData.filter((item) => {
          return item.toLowerCase().includes(query.toLowerCase());
        });
      } else if (fetchSuggestions) {
        result = await fetchSuggestions(query);
      }

      setSuggestions(result);
    } catch (error) {
      setError("Failed to fetch suggestions.");
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const getSuggestionsDebounce = useCallback(debounce(getSuggestions, 300),[]); 

  useEffect(() => {
    if (inputValue.length > 1) {
        getSuggestionsDebounce(inputValue);
    } else {
      setSuggestions([]);
    }
  }, [inputValue]);

  const handleSuggetsionClick = (suggestion) => {
    setInputValue(dataKey ? suggestion[dataKey] : dataKey);
    onSelect(suggestion);
    setSuggestions([]);
  };
  return (
    <div className="container">
      <input
        type="text"
        value={inputValue}
        placeholder={placeHolder}
        style={customStyles}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={handleInptChange}
      />
      {(suggestions || loading || error) && (
        <ul className="suggestions-list">
          {error && <div className="error">{error}</div>}
          {loading && <div className="loading">{customLoading}</div>}
          <SuggestionsList
            dataKey={dataKey}
            highlight={inputValue}
            suggestions={suggestions}
            onSuggestionClick={handleSuggetsionClick}
          />
        </ul>
      )}
    </div>
  );
};

export default AutoComplete;
