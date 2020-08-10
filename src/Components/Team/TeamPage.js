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
import { Link } from "react-router-dom";

//Consts
import { MARGIN_TOP } from "../../CONSTANTS";

const useStyles = makeStyles({
  root: {
    marginTop: MARGIN_TOP,
  },
  table: {
    minWidth: 650,
  },
});

export default function TeamPage(props) {
  const classes = useStyles();
  const [roster, setRoster] = useState([]);
  const [sortDirection, setSortDirection] = useState("");
  const [sortType, setSortType] = useState("");

  const ASC = "ascending";
  const DSC = "descending";

  const { team } = props;
  const teamName = Object.keys(team).toString();
  const teamId = Object.values(team).toString();

  useEffect(() => {
    const callForPlayers = async () => {
      // let playerObject = {
      //   jerseyNumber: {jerseyNumber},
      //   fullName: {person.fullName},

      // }
      const URL = `https://statsapi.web.nhl.com/api/v1/teams/${teamId}?expand=team.roster`;
      const response = await fetch(URL);
      const data = await response.json();
      console.log("Use Effect from TeamPage ran again.");
      setRoster(data.teams[0].roster.roster);
    };
    callForPlayers();
  }, [teamId]);

  const sortList = (e) => {
    let sortArray = [...roster];
    const types = {
      jerseyNumber: "Jersey #",
      fullName: "Player name",
      type: "Type",
      name: "Position",
    };

    switch (e.target.innerHTML) {
      case "Jersey #":
        if (sortType === "") {
          setSortType(DSC);
          setRoster(
            sortArray.sort((a, b) =>
              parseInt(a.jerseyNumber) < parseInt(b.jerseyNumber) ? -1 : 1
            )
          );
        } else if (sortType === ASC) {
          setSortType(DSC);
          setRoster(
            sortArray.sort((a, b) =>
              parseInt(a.jerseyNumber) < parseInt(b.jerseyNumber) ? -1 : 1
            )
          );
        } else {
          setSortType(ASC);
          setRoster(
            sortArray.sort((a, b) =>
              parseInt(a.jerseyNumber) < parseInt(b.jerseyNumber) ? 1 : -1
            )
          );
        }
        break;
      case "Player name":
        console.log("name");
        break;
      case "Type":
        console.log("type");
        break;
      case "Position":
        console.log("position");
        break;
      default:
        break;
    }


    

    if (sortType === "") {
      setSortType(DSC);
      setRoster(
        sortArray.sort((a, b) =>
          parseInt(a.jerseyNumber) < parseInt(b.jerseyNumber) ? -1 : 1
        )
      );
    } else if (sortType === ASC) {
      setSortType(DSC);
      setRoster(
        sortArray.sort((a, b) =>
          parseInt(a.jerseyNumber) < parseInt(b.jerseyNumber) ? -1 : 1
        )
      );
    } else {
      setSortType(ASC);
      setRoster(
        sortArray.sort((a, b) =>
          parseInt(a.jerseyNumber) < parseInt(b.jerseyNumber) ? 1 : -1
        )
      );
    }

  };

  return (
    <Container className={classes.root}>
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          aria-label={`table for nhl team ${teamName}`}
        >
          <TableHead>
            <TableRow>
              <TableCell align="left" onClick={sortList}>
                Jersey #
              </TableCell>
              <TableCell align="left" onClick={sortList}>
                Player name
              </TableCell>
              <TableCell align="right" onClick={sortList}>
                Type
              </TableCell>
              <TableCell align="right" onClick={sortList}>
                Position
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roster.map((player) => (
              <TableRow
                key={player.person.id}
                component={Link}
                to={`/${teamName}/${player.person.id}`}
                style={{ textDecoration: "none" }}
              >
                <TableCell align="left">{player.jerseyNumber}</TableCell>
                <TableCell align="left">{player.person.fullName}</TableCell>
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