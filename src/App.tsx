import axios from "axios";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import "./App.css";
import { Box, Button, Grid, Paper, Skeleton } from "@mui/material";
import { red } from "@mui/material/colors";

function App() {
  const [characterName, setCharacterName] = useState("");
  const [characterData, setCharacterData] = useState<undefined | any>(undefined);

  const SWAPI_BASE_URL = "https://swapi.dev/api/";

  return (
    <div>
      <div id="navbar">
        <h1 id="header">The Jedi Archives</h1>
      </div>

      <div id="search-field">
        <div id="text-box">
          <TextField id="search-bar" className="text" value={characterName} onChange={(prop) => { setCharacterName(prop.target.value); }} label="Enter a Character Name..." variant="outlined" placeholder="Search..." size="medium" />
          <Button onClick={() => { search(); }}>
            <SearchIcon style={{ fill: "blue" }} />
            Search
          </Button>
        </div>
      </div>

      {characterData === undefined ? (
        <div></div>
      ) : (
        <div id="character-box">
          <Paper sx={{ backgroundColor: red }}>
            <Grid item>
              <Box>
                {characterData === undefined || characterData === null ? (
                  <h1> Character not found</h1>
                ) : (
                  <div>
                    <h1>{characterData.results[0].name}</h1>
                    <p className="data">
                      Height: {(characterData.results[0].height) / 100} meters
                      <br />
                      Mass: {characterData.results[0].mass} kilograms
                      <br />
                      Hair Colour: {characterData.results[0].hair_color}
                      <br />
                      Skin Colour: {characterData.results[0].skin_color}
                      <br />
                      Eye Colour: {characterData.results[0].eye_color}
                      <br />
                      Birth Year: {characterData.results[0].birth_year}
                      <br />
                      Gender: {characterData.results[0].gender}
                      <br />
                    </p>
                  </div>
                )}
              </Box>
            </Grid>
          </Paper>
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