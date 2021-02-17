import React, { useState, useEffect } from "react";
import InfoBox from "./components/InfoBox";
import diseaseAPI from "./apis/diseaseAPI";
import Dropdown from "./components/Dropdown";
import numeral from "numeral";
import "numeral/locales/fr";

// Material-UI imports
import {
  Container,
  Grid,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Box,
} from "@material-ui/core/";
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";

numeral.locale("en");
const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

const convertUnixTime = (time) => {
  return (time = new Intl.DateTimeFormat("fr-FR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(time));
};

const App = () => {
  const [globalData, setGlobalData] = useState([]);
  //const [countryData, setCountryData] = useState({});
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    getCountriesData();
    getGlobalData();
  }, []);

  const getGlobalData = async () => {
    const response = await diseaseAPI.get("/v3/covid-19/all");
    setGlobalData(response.data);
  };

  const getCountriesData = async () => {
    const response = await diseaseAPI.get("/v3/covid-19/countries");

    const countries = response.data.map((country) => ({
      countryName: country.country,
      countryCode: country.countryInfo.iso2,
      countryFlag: country.countryInfo.flag,
    }));
    setCountries(countries);
  };

  console.log(countries);
  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h5">COVID-19 Tracker</Typography>
          </Toolbar>
        </AppBar>

        <Container maxWidth="xl">
          <Box style={{ display: "flex" }} m={1} ml={0}>
            <Dropdown countries={countries} />
          </Box>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={3}
          >
            <Grid item xs>
              <InfoBox
                label="Total cases"
                total={numeral(globalData.cases).format()}
                cases={numeral(globalData.todayCases).format("+0,0")}
              />
            </Grid>
            <Grid item xs>
              <InfoBox
                label="Total deaths"
                total={numeral(globalData.deaths).format()}
                cases={numeral(globalData.todayDeaths).format("+0,0")}
              />
            </Grid>
            <Grid item xs>
              <InfoBox
                label="Recovered"
                cases={numeral(globalData.todayRecovered).format("+0,0")}
                total={numeral(globalData.recovered).format()}
              />
            </Grid>
          </Grid>
          <small>Last update: {convertUnixTime(globalData.updated)}</small>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default App;
