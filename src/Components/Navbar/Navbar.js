import React, { useEffect, useState } from "react";
import { capitalize } from "../../helper";
import axios from "axios";

//Components
import { Link } from "react-router-dom";
//Material-UI
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import MenuIcon from "@material-ui/icons/Menu";
import GroupIcon from '@material-ui/icons/Group';
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import StarIcon from "@material-ui/icons/Star";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  starColor: {
    color: "gold",
  }
}));

function ResponsiveDrawer(props) {
  const { window, displayTeam, team, playerPage } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [favoritePlayers, setFavoritePlayers] = useState([]);

  const URL = "https://nhlfavoriteplayerlist.herokuapp.com/players";

  useEffect(() => {
    const callForPlayers = async () => {
      console.log(`calling to ${URL}`);
      const response = await axios.get(URL);
      setFavoritePlayers(...favoritePlayers, response.data);
    };
    callForPlayers();
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <ListItem button component={Link} to={"/"}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText>Home</ListItemText>
        </ListItem>
      </List>
      <Divider />

      {displayTeam ? (
        <List>
          <ListItem button component={Link} to={`/${Object.keys(team)}`}>
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText>{capitalize(Object.keys(team))}</ListItemText>
          </ListItem>
        </List>
      ) : (
        <List></List>
      )}

      <Divider />

      {favoritePlayers && !playerPage ? (
        favoritePlayers?.map((player) => (
          <>
            <List>
              <ListItem
                button
                component={Link}
                to={`/${player.team}/${player.id}`}
              >
                <ListItemIcon>
                  <StarIcon className={classes.starColor}/>
                </ListItemIcon>
                <ListItemText>{player.name}</ListItemText>
              </ListItem>
            </List>
          </>
        ))
      ) : (
        <List></List>
      )}
      {!playerPage && <Divider />}
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            NHL STATS
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
