import React from 'react';
//Material-UI
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
//Components

//CSS

//Constant

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function TeamCard(props) {
  const classes = useStyles();
  const {name, conference, division, website, image} = props;

  console.log(image)

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          {conference} - {division}
        </CardContent>
        <img src={require(`../../images/NHLTeamLogo/${image.replace(/ /g,"_")}.png`)} style={{marginLeft: "50%", transform: "translateX(-50%)"}}/>
      </CardActionArea>
      {/* <CardActions>
      </CardActions> */}
    </Card>
  );
}
