import axios from "axios";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import "./App.css";
import { Box, Button, Grid, Paper } from "@mui/material";
import { motion } from "framer-motion";

function App() {
  const [characterName, setCharacterName] = useState("");
  const [characterData, setCharacterData] = useState<undefined | any>(undefined);

  const SWAPI_BASE_URL = "https://swapi.dev/api/";

  return (
    <div>
      <div id="navbar">
        <a href="index.html"><motion.h1 id="header" whileTap={{ scale: 0.95 }} initial={{ x: -1000 }} animate={{ x: 0 }} transition={{ duration: 0.3 }}>The Jedi Archives</motion.h1></a>
      </div>

      <motion.div id="search-field"
        initial={{ x: -1000 }}
        animate={{ x: 0 }}
        transition={{ delay: 0.4, duration: 0.3 }}>
        <div id="text-box">
          <TextField id="search-bar" className="text" value={characterName} onKeyDown={event => handleKeyDown(event)} onChange={(prop) => { setCharacterName(prop.target.value); }} label="Enter a Character Name..." variant="outlined" placeholder="Search..." size="medium" />
          <Button onClick={() => { search(); }}>
            <SearchIcon style={{ fill: "blue" }} />
            Search
          </Button>
        </div>
      </motion.div>

      {characterData === undefined ? (
        <div></div>
      ) : (
        <motion.div
          initial={{ scale: 1, opacity: 0, x: -1000 }}
          animate={{ scale: 1, opacity: 100, x: 0 }}
          transition={{ duration: 0.2 }}>
          <Paper id="data-box">
            <Grid item>
              <Box>
                {characterData.count === 0 || characterData === null ? (
                  <h1 className="box-header"> Character not found</h1>
                ) : (
                  <div>
                    <h1 className="box-header">{characterData.results[0].name}</h1>
                    <table>
                      <tbody>
                        <tr>
                          <td>Height:</td>
                          <td className="data">{(characterData.results[0].height) / 100} meters</td>
                        </tr>
                        <tr>
                          <td>Mass:</td>
                          <td className="data">{characterData.results[0].mass} kilograms</td>
                        </tr>
                        <tr>
                          <td>Hair Colour:</td>
                          <td className="data">{toTitleCase(characterData.results[0].hair_color)}</td>
                        </tr>
                        <tr>
                          <td>Skin Colour:</td>
                          <td className="data">{toTitleCase(characterData.results[0].skin_color)}</td>
                        </tr>
                        <tr>
                          <td>Eye Colour:</td>
                          <td className="data">{toTitleCase(characterData.results[0].eye_color)}</td>
                        </tr>
                        <tr>
                          <td>Birth Year:</td>
                          <td className="data">{characterData.results[0].birth_year}</td>
                        </tr>
                        <tr>
                          <td>Gender:</td>
                          <td className="data">{toTitleCase(characterData.results[0].gender)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </Box>
            </Grid>
          </Paper>
        </motion.div>
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
    return str.toLowerCase().split(' ').map(function (word) {
      return word.replace(word[0], word[0].toUpperCase());
    }).join(' ');
  }

  function handleKeyDown(event: any) {
    if (event.key === "Enter") {
      search();
    }
  }
}
  export default App;