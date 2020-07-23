import React, { useState, useEffect } from "react";
//Components
import TeamCard from "./TeamCard";
import { Link } from "react-router-dom";
import Images from "../../images/images";
//Material-UI
import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Dropdown from "../Dropdown/TeamsListSortBy";
// import Paper from "@material-ui/core/Paper"
//Constant
// import { DRAWER_WIDTH } from '../../CONSTANTS';
//CSS

const useStyles = makeStyles((theme) => ({}));

function TeamsList(props) {
  // const classes = useStyles();

  const [teams, setTeams] = useState([]);
  const [divisionSort, setDivisionSort] = useState("All");

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

  const handleChange = (value) => {
    setDivisionSort(value);
  };

  const filterDivision = () => {
    if (divisionSort === "Eastern" || divisionSort === "Western") {
      return teams.filter((team) => {
        return team.conference.name === divisionSort;
      });
    } else {
      return teams.filter((team) => {
        return team.division.nameShort === divisionSort;
      });
    }
  };

  return (
    <Container>
      <div>
        <Dropdown changeSort={handleChange} />
      </div>
      <Grid container alignContent="space-between" spacing={5}>
        {divisionSort === "All"
          ? teams.map((team) => (
              <Grid key={`${team.id} - All`} item xs={12} sm={6} lg={4} xl={3}>
                <Link
                  to={`/${team.teamName.toLowerCase().replace(/ /g,"_")}`}
                  style={{ textDecoration: "none" }}
                >
                  <TeamCard
                    name={team.name}
                    conference={team.conference.name}
                    division={team.division.nameShort}
                    website={team.officialSiteURL}
                    image={team.teamName.toLowerCase().replace(/ /g,"_")}
                  />
                </Link>
              </Grid>
            ))
          : filterDivision().map((team) => (
              <Grid key={`${team.id} - All`} item xs={12} sm={6} lg={4} xl={3}>
                <Link
                  to={`/${team.teamName.toLowerCase().replace(/ /g,"_")}`}
                  style={{ textDecoration: "none" }}
                >
                  <TeamCard
                    name={team.name}
                    conference={team.conference.name}
                    division={team.division.nameShort}
                    website={team.officialSiteURL}
                    image={team.teamName.toLowerCase().replace(/ /g,"_")}
                  />
                </Link>
              </Grid>
            ))}
      </Grid>
    </Container>
  );
}

export default TeamsList;
