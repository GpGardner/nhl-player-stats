import React, { useState, useEffect } from "react";
//Components
import TeamCard from "./TeamCard";
//Material-UI
import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container"
// import Paper from "@material-ui/core/Paper"
//Constant
// import { DRAWER_WIDTH } from '../../CONSTANTS';
//CSS

const useStyles = makeStyles((theme) => ({}));

function TeamsList() {
  const URL = `https://statsapi.web.nhl.com/api/v1/teams/`;
  // const classes = useStyles();

  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const callForTeams = async () => {
      const response = await fetch(URL);
      const data = await response.json();
      setTeams(data.teams);
    };
    callForTeams();
  }, [URL]);

  return (
		<Container>
    <Grid container spacing={2}>
      {teams.map((team) => (
        <Grid key={team.id} alignContent="space-between" item xs={12} md={6} lg={4} xl={3}>
          <TeamCard
            name={team.name}
            conference={team.conference.name}
            division={team.division.nameShort}
            website={team.officialSiteURL}
          />
        </Grid>
      ))}
    </Grid>
		</Container>
  );
}

export default TeamsList;
