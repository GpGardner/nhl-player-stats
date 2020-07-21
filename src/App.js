import React from 'react';
//Packages
import {Switch, Route} from "react-router-dom";
//Components
import TeamsList from "./Components/Teams/TeamsList"
import Navbar from "./Components/Navbar/Navbar"
//Constants
import {DRAWER_WIDTH} from "./CONSTANTS"
//CSS

//Material-UI
import {makeStyles} from "@material-ui/core"


const useStyles = makeStyles((theme) => ({
  root: {
      paddingLeft: `${DRAWER_WIDTH}px`
  }
}));

function App() {

  const classes = useStyles();

  return (
    <div className={classes.root}>
    <Navbar />
    <Switch>
      <Route exact path="/:team" render={routeProps => (<TeamPage
        team={routeProps.match.params.id}
      />)}/>
      <Route exact path="/" render={routeProps => (<TeamsList />)}/>
    </Switch>
    </div>
  );
}

export default App;
