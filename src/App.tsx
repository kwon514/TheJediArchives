import axios from "axios";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import "./App.css";
import { Box, Button, Grid, Paper, Skeleton } from "@mui/material";

function App() {
  const [characterName, setCharacterName] = useState("");
  const [characterData, setCharacterData] = useState<undefined | any>(undefined);

  const SWAPI_BASE_URL = "https://swapi.dev/api/";

  return (
    <div>
            <div className="search-field">
        <h1>Pokédex Search</h1>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <TextField
            id="search-bar"
            className="text"
            value={characterName}
            onChange={(prop) => {
              setCharacterName(prop.target.value);
            }}
            label="Enter a Character Name..."
            variant="outlined"
            placeholder="Search..."
            size="medium"
          />
          <Button
            onClick={() => {
              search();
            }}
          >
            <SearchIcon style={{ fill: "blue" }} />
            Search
          </Button>
        </div>
      </div>

      {characterData === undefined || characterData === null? (
        <p>Character not found.</p>
      ) : (
        <div id="character-result">
          <h1></h1>>
        </div>
      )}
    </div>
  );

  function search() {
    axios.get(SWAPI_BASE_URL + "people/?search=" + characterName).then((res) => {
      setCharacterData(res.data);
    });
  }
}
export default App;