import React, { useEffect, useState } from "react";

//Material-UI
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";

//Components
import {Link} from "react-router-dom"

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function TeamPage(props) {
  const classes = useStyles();
  const [roster, setRoster] = useState([]);

  const { team } = props;
  const teamName = Object.keys(team).toString();
  const teamId = Object.values(team).toString();

  
  
  useEffect(() => {
    const callForPlayers = async () => {
      const URL = `https://statsapi.web.nhl.com/api/v1/teams/${teamId}?expand=team.roster`;
      const response = await fetch(URL);
      const data = await response.json();
      console.log("Use Effect from TeamPage ran again.");
      setRoster(data.teams[0].roster.roster);
    };
    callForPlayers();
  }, [teamId]); 
  
  return (
    <Container>
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          aria-label={`table for nhl team ${teamName}`}
        >
          <TableHead>
            <TableRow>
              <TableCell align="left">Jersey #</TableCell>
              <TableCell align="left">Player name</TableCell>
              <TableCell align="right">Type</TableCell>
              <TableCell align="right" >Position</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roster.map((player) => (
              <TableRow key={player.person.id} component={Link} to={`/${teamName}/${player.person.fullName.toLowerCase().replace(/ /g,"_")}`} style={{textDecoration: "none"}}>
                <TableCell align="left">{player.jerseyNumber}</TableCell>
                <TableCell align="left">
                  {player.person.fullName}
                </TableCell>
                <TableCell align="right">{player.position.type}</TableCell>
                <TableCell align="right">{player.position.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}


