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

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [];

export default function TeamPage(props) {
  const classes = useStyles();
	
	const {team} = props;
	const teamName = Object.keys(team).toString();
	const teamId = Object.values(team).toString();

	
  const [roster, setRoster] = useState([]);
	
  useEffect(() => {
		const callForPlayers = async () => {
			const URL = `https://statsapi.web.nhl.com/api/v1/teams/${teamId}?expand=team.roster`
      const response = await fetch(URL);
      const data = await response.json();
      console.log('Use Effect from TeamPage ran again.')
      setRoster(data.teams[0].roster.roster);
    };
    callForPlayers();
  }, [URL]);


  return (
		<TableContainer component={Paper}>
      <Table className={classes.table} aria-label={`table for nhl team ${teamName}`}>
        <TableHead>
          <TableRow>
            <TableCell align="left">Jersey #</TableCell>
            <TableCell>Player name</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">Position</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {roster.map((player) => (
            <TableRow key={player.person.id}>
              <TableCell align="left">{player.jerseyNumber}</TableCell>
              <TableCell component="th" scope="row">{player.person.fullName}</TableCell>
              <TableCell align="right">{player.position.type}</TableCell>
              <TableCell align="right">{player.position.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
