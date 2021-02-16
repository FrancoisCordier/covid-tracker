import React, { useState, useEffect } from "react";
import { Container, Grid } from "@material-ui/core/";
import InfoBox from "./components/InfoBox";
import diseaseAPI from "./apis/diseaseAPI";
import numeral from "numeral";
import "numeral/locales/fr";
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

numeral.locale("en");
const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

const App = () => {
  const [globalData, setGlobalData] = useState([]);
  const [countryData, setCountryData] = useState({});
  const [countries, setCountries] = useState([]);

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

  useEffect(() => {
    const getGlobalData = async () => {
      const response = await diseaseAPI.get("/v3/covid-19/all");
      setGlobalData(response.data);
    };

    getGlobalData();
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      const response = await diseaseAPI.get("/v3/covid-19/countries");
      const countries = response.data.map((country) => ({
        countryName: country.country,
        countryCode: country.countryInfo.iso2,
        countryFlag: country.countryInfo.flag,
      }));
      setCountries(countries);
    };

    getCountriesData();
  }, []);

  console.log(countries);
  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">COVID-19 Tracker</Typography>
          </Toolbar>
        </AppBar>
        <Container maxWidth={false}>
          <h1>Worldwide data</h1>
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
