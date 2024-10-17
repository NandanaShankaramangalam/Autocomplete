import { useState } from "react";
import "./App.css";
import AutoComplete from "./components/AutoComplete";

function App() {
  const staticData = [
    "apple",
    "banana",
    "cherry",
    "date",
    "elderberry",
    "fig",
    "grape",
    "honeydew",
  ];
  const fetchSuggestions = async (query) => {
    const response = await fetch(
      `https://dummyjson.com/recipe/search?q=${query}`
    );
    if (!response.ok) {
      throw new Error("Network response not ok");
    }
    const result = await response.json();
    return result.recipes;
  };
  return (
    <>
      <div>
        <h1>AutoComplete</h1>
      </div>
      <AutoComplete
        placeHolder={"Enter Recipe"}
        fetchSuggestions={fetchSuggestions}
        dataKey={"name"}
        customLoading={<>Loading Recipes...</>}
        onSelect={(res) => console.log(res)}
        onChange={(input) => {}}
        onBlur={(e) => {}}
        onFocus={(e) => {}}
        customStyles={{}}
      />
    </>
  );
}

export default App;
