import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
//import { uriBase} from "../const"
import {Link as RLink } from "react-router-dom"
import CustomizedMenus from "./menuButton"


import { createMuiTheme } from '@material-ui/core/styles';

import grey from '@material-ui/core/colors/grey';

const theme = createMuiTheme({
  palette: {
    primary: grey,
   
  },
});


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));


export default function ButtonAppBar(props) {
  // let onClickHandler = (event)=>{
  //   console.log("working",props.history)
  //   this.props.history.push("/profile")
  // }
  const classes = useStyles();

  return (
    
    <div className={classes.root}>
      
      <AppBar position="static" color="primary"  >
      
        <Toolbar>
          {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon color="inherit" className={classes.menuButton}  />
          </IconButton> */}


          <CustomizedMenus></CustomizedMenus>

          <Typography variant="h6" className={classes.title}>
           In the Future There is Only War
          </Typography>
          <Button color="inherit" to="/login" component= {RLink}>Logout</Button>
        </Toolbar>
        
      </AppBar>
     
    </div>
    
  );

}
