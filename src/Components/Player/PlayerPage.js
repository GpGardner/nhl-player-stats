import React, { useState, useEffect } from "react";

//Constants
import { MARGIN_TOP } from "../../CONSTANTS";

//Components
import PlayerChart from "./PlayerChart";
import GoalieChart from "./GoalieChart";
//Material UI
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import Title from "../Title/Title";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: MARGIN_TOP,
  },
}));

export default function PlayerPage(props) {
  const classes = useStyles();

  const { playerId } = props;
  // const teamName = Object.keys(team).toString();
  // const teamId = Object.values(team).toString();

  const [player, setPlayer] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [position, setPosition] = useState("");
  const [statsRegularSeason, setStatsRegularSeason] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const callForPlayer = async () => {
      const URL = `https://cors-anywhere.herokuapp.com/https://statsapi.web.nhl.com/api/v1/people/${playerId}?expand=person.stats&stats=yearByYear,yearByYearPlayoffs,careerRegularSeason&expand=stats.team`;
      const response = await fetch(URL);
      const data = await response.json();
      console.log("Use Effect from PlayerPage ran again.");
      setTeamName(data.people[0].currentTeam.name);
      setPosition(data.people[0].primaryPosition);
      setStatsRegularSeason(data.people[0].stats[0].splits);
      setPlayer(data.people[0]);
      setLoading(false);
    };
    callForPlayer();
  }, [playerId]);

  console.log(statsRegularSeason);

  return (
    <Container className={classes.root}>
      {loading ? (
        <h1>Please wait, page loading</h1>
      ) : (
        <>
          <Title>
            {teamName} : #{player.primaryNumber} - {player.fullName} |{" "}
            {position.type} - {position.name}
          </Title>

          {position.name === "Goalie" ? (
            <GoalieChart playerStats={statsRegularSeason} />
          ) : (
            <PlayerChart playerStats={statsRegularSeason} />
          )}

          <TableContainer component={Paper} style={{ marginTop: "2%" }}>
            <Table className={classes.table} aria-label="Player Stats Table">
              <TableHead>
                <TableRow>
                  <TableCell>Team</TableCell>
                  <TableCell>Season</TableCell>
                  {position.name === "Goalie" ? (
                    <>
                      <TableCell align="right">Games</TableCell>
                      <TableCell align="right">Saves</TableCell>
                      <TableCell align="right">Total Shots Faced</TableCell>
                      <TableCell align="right">Shut Outs</TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell align="right">Games</TableCell>
                      <TableCell align="right">Goals</TableCell>
                      <TableCell align="right">Assists</TableCell>
                      <TableCell align="right">Points</TableCell>
                    </>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {statsRegularSeason.reverse().map((season, i) => (
                  <TableRow key={i}>
                    <TableCell>{season.team.name}</TableCell>
                    <TableCell>
                      {season.season.replace(/^(.{4})/, "$1-")}
                    </TableCell>
                    {position.name === "Goalie" ? (
                      <>
                        <TableCell align="right">{season.stat.games}</TableCell>
                        <TableCell align="right">{season.stat.saves}</TableCell>
                        <TableCell align="right">
                          {season.stat.shotsAgainst}
                        </TableCell>
                        <TableCell align="right">
                          {season.stat.shutouts}
                        </TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell align="right">{season.stat.games}</TableCell>
                        <TableCell align="right">{season.stat.goals}</TableCell>
                        <TableCell align="right">
                          {season.stat.assists}
                        </TableCell>
                        <TableCell align="right">
                          {season.stat.points}
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Container>
  );
}
