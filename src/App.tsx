import axios from "axios";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import "./App.css";
import { Box, Button, Grid, Paper } from "@mui/material";

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
        <div>
          <Paper id="data-box">
            <Grid item>
              <Box>
                {characterData.count === 0 || characterData === null ? (
                  <h1 className="box-header"> Character not found</h1>
                ) : (
                  <div>
                    <h1 className="box-header">{characterData.results[0].name}</h1>
                    <table className="data">
                      <tbody>
                        <tr>
                          <td>Height:</td>
                          <td>{(characterData.results[0].height) / 100} meters</td>
                        </tr>
                        <tr>
                          <td>Mass:</td>
                          <td>{characterData.results[0].mass} kilograms</td>
                        </tr>
                        <tr>
                          <td>Hair Colour:</td>
                          <td>{toTitleCase(characterData.results[0].hair_color)}</td>
                        </tr>
                        <tr>
                          <td>Skin Colour:</td>
                          <td>{toTitleCase(characterData.results[0].skin_color)}</td>
                        </tr>
                        <tr>
                          <td>Eye Colour:</td>
                          <td>{toTitleCase(characterData.results[0].eye_color)}</td>
                        </tr>
                        <tr>
                          <td>Birth Year:</td>
                          <td>{characterData.results[0].birth_year}</td>
                        </tr>
                        <tr>
                          <td>Gender:</td>
                          <td>{toTitleCase(characterData.results[0].gender)}</td>
                        </tr>
                      </tbody>
                    </table>
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
    if (characterName === undefined || characterName === "") {
      return;
    }

    axios.get(SWAPI_BASE_URL + "people/?search=" + characterName).then((res) => {
      setCharacterData(res.data);
    })
      .catch(() => {
        setCharacterData(null);
      });
  }
  function toTitleCase(str: string) {
    if (str == "n/a") {
      return "N/A";
    }
    return str.toLowerCase().split(' ').map(function(word) {
      return word.replace(word[0], word[0].toUpperCase());
    }).join(' ');
  }
}
export default App;