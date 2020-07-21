import React, { useState, useEffect } from "react";
//Components
import TeamCard from "./TeamCard";
import {Link} from "react-router-dom"
import Images from "../../images/images"
//Material-UI
import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
// import Paper from "@material-ui/core/Paper"
//Constant
// import { DRAWER_WIDTH } from '../../CONSTANTS';
//CSS

const useStyles = makeStyles((theme) => ({}));

function TeamsList(props) {
  // const classes = useStyles();

  const [teams, setTeams] = useState([]);

  const URL = `https://statsapi.web.nhl.com/api/v1/teams/`;
  useEffect(() => {
    const callForTeams = async () => {
      const response = await fetch(URL);
      const data = await response.json();
      console.log("Use Effect from TeamsList ran again.");
      setTeams(data.teams);
    };
    callForTeams();
  }, [URL]);

  return (
    <Container>
      <Grid container alignContent="space-between" spacing={5}>
        {teams.map((team) => (
          <Grid key={team.id} item xs={12} sm={6} lg={4} xl={3}>
            <Link to={`/${team.teamName.toLowerCase()}`} style={{ textDecoration: 'none' }}>
            <TeamCard
              name={team.name}
              conference={team.conference.name}
              division={team.division.nameShort}
              website={team.officialSiteURL}
              image={team.teamName.toLowerCase()}
            />
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default TeamsList;
