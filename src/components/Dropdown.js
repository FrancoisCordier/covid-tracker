import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

const Dropdown = ({ countries }) => {
  // const renderedCountries = countries.map((country) => {
  //   return <li key={country.countryName}>{country.countryName}</li>;
  // });

  return (
    <Autocomplete
      style={{ width: 300 }}
      options={countries}
      autoHighlight
      getOptionLabel={(option) => option.countryName}
      renderOption={(option) => (
        <React.Fragment>
          <span>
            <img
              style={{ height: "20px", width: "30px", marginRight: "5px" }}
              src={option.countryFlag}
              alt="flag"
            />
          </span>
          {option.countryName}
        </React.Fragment>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose a country"
          variant="outlined"
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password", // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
};

export default Dropdown;
