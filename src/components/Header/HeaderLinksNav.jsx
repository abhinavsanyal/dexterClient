/*eslint-disable*/
import React from "react";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";
import Button from "components/CustomButtons/Button.jsx";

import headerLinksStyle from "assets/jss/material-kit-react/components/headerLinksStyle.jsx";

function HeaderLinksNav({ ...props }) {
  const { classes } = props;

  let confirmLogout =()=>{
   
        this.props.loginStore.logout();
  }
  return (
    <List className={classes.list}>
  
      <ListItem className={classes.listItem}>
        <Button
          href="/question"
          color="transparent"
          target="_blank"
          className={classes.navLink}
        >
          Challenges
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href="/question"
          color="transparent"
          target="_blank"
          className={classes.navLink}
        >
         Learn
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href="/question"
          color="transparent"
          className={classes.navLink}
          onClick={confirmLogout}
        >
          Logout
        </Button>
      </ListItem>
     
     
    </List>
  );
}

export default withStyles(headerLinksStyle)(HeaderLinksNav);
