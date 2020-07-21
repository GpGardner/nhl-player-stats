import React, {useState, useEffect} from 'react';
//Packages
import {Switch, Route} from "react-router-dom";
//Components
import TeamsList from "./Components/Teams/TeamsList"
import TeamPage from "./Components/Team/TeamPage"
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
  const URL = `https://statsapi.web.nhl.com/api/v1/teams/`;
  const classes = useStyles();
  const teams = [{"devils": 1}, {"islanders": 2}, {"rangers": 3}, {"flyers": 4}, {"penguins": 5}, {"bruins": 6}, {"sabres": 7}, {"canadiens": 8}, {"senators": 9}, {"maple leafs": 10}, {"hurricanes": 12}, {"panthers": 13}, {"lightning": 14}, {"capitals": 15}, {"blackhawks": 16}, {"red wings": 17}, {"predators": 18}, {"blues": 19}, {"flames": 20}, {"avalanche": 21}, {"oilers": 22}, {"canucks": 23}, {"ducks": 24}, {"stars": 25}, {"kings": 26}, {"sharks": 28}, {"blue jackets": 29}, {"wild": 30}, {"jets": 52}, {"coyotes": 53}, {"golden knights": 54}] 

  const findTeam = (value) => {
    return teams.find((team) => {
      return value === Object.keys(team).toString();
    });
    
  }

  // 

  return (
    
    <div className={classes.root}>
    
    <Navbar />
    <Switch>
      <Route exact path="/:team" render={routeProps => (<TeamPage 
      
        team={findTeam(routeProps.match.params.team)}
      
      />)}/>
      <Route exact path="/" render={routeProps => (<TeamsList />)}/>
    </Switch>
    </div>
  );
}

export default App;
