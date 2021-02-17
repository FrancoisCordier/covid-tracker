import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import "numeral/locales/fr";

const InfoBox = ({ label, cases, total }) => {
  return (
    <>
      <Card>
        <CardContent>
          <Typography variant="h4" color="textSecondary" gutterBottom>
            {label}
          </Typography>
          <Typography variant="h5" color="textPrimary" gutterBottom>
            {total !== "0" ? total : "Loading..."}
          </Typography>
          <Typography variant="body2" color="textPrimary" gutterBottom>
            {cases !== "+0" ? `${cases} today` : "Loading..."}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default InfoBox;
