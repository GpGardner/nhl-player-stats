import React from "react";
//Packages
import { Switch, Route } from "react-router-dom";
//Components
import TeamsList from "./Components/Teams/TeamsList";
import TeamPage from "./Components/Team/TeamPage";
import Navbar from "./Components/Navbar/Navbar";
//Constants
import { DRAWER_WIDTH } from "./CONSTANTS";
//CSS

//Material-UI
import { makeStyles } from "@material-ui/core";
import PlayerPage from "./Components/Player/PlayerPage";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up("sm")]: {
      paddingLeft: `${DRAWER_WIDTH}px`,
    },
  },
}));

function App() {
  const classes = useStyles();
  const teams = [
    { devils: 1 },
    { islanders: 2 },
    { rangers: 3 },
    { flyers: 4 },
    { penguins: 5 },
    { bruins: 6 },
    { sabres: 7 },
    { canadiens: 8 },
    { senators: 9 },
    { maple_leafs: 10 },
    { hurricanes: 12 },
    { panthers: 13 },
    { lightning: 14 },
    { capitals: 15 },
    { blackhawks: 16 },
    { red_wings: 17 },
    { predators: 18 },
    { blues: 19 },
    { flames: 20 },
    { avalanche: 21 },
    { oilers: 22 },
    { canucks: 23 },
    { ducks: 24 },
    { stars: 25 },
    { kings: 26 },
    { sharks: 28 },
    { blue_jackets: 29 },
    { wild: 30 },
    { jets: 52 },
    { coyotes: 53 },
    { golden_knights: 54 },
  ];

  const findTeam = (value) => {
    return teams.find((team) => {
      return value === Object.keys(team).toString();
    });
  };

  return (
    <div className={classes.root}>
      <Switch>
        <Route
          exact
          path="/:team/:playerId"
          render={(routeProps) => (
            <>
              <Navbar
                displayTeam={true}
                team={findTeam(routeProps.match.params.team)}
                playerPage={true}
              />
              <PlayerPage
                team={findTeam(routeProps.match.params.team)}
                playerId={routeProps.match.params.playerId}
                {...routeProps}
              />
            </>
          )}
        />
        <Route
          exact
          path="/:team"
          render={(routeProps) => (
            <>
              <Navbar />
              <TeamPage
                team={findTeam(routeProps.match.params.team)}
                {...routeProps}
              />
            </>
          )}
        />
        <Route
          exact
          path="/"
          render={(routeProps) => (
            <>
              <Navbar />
              <TeamsList />
            </>
          )}
        />
      </Switch>
    </div>
  );
}

export default App;
