import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
//icons
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import MailIcon from '@material-ui/icons/Mail';

import { withStyles } from '@material-ui/styles';
import { MenuList, MenuItem } from '@material-ui/core';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const styles = {
  root: {
    display: 'flex'
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  //   toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    color: '#00bcd4'
    // backgroundColor: theme.palette.background.default,
    // padding: theme.spacing(3)
  }
};

class Sidebar extends Component {
  render() {
    const classes = this.props;
    return (
      <div>
        {/* <CssBaseline /> */}
        {/* <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" noWrap>
              Permanent drawer
            </Typography>
          </Toolbar>
        </AppBar> */}
        {/* <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper
          }}
          anchor="left"
        > */}
        <div className={classes.toolbar} />
        <Divider />

        <MenuList>
          <MenuItem component={Link} to="/settingsEmail">
            <MailIcon /> Change Email
          </MenuItem>
          <MenuItem component={Link} to="/settingsPassword">
            <VpnKeyIcon /> Change Password
          </MenuItem>
          <MenuItem component={Link} to="/settingsAcc">
            <DeleteForeverIcon /> Delete Account
          </MenuItem>
        </MenuList>

        {/* <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List> */}
        <Divider />
        {/* <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List> */}
        {/* </Drawer> */}
        <MenuList>
          <MenuItem component={Link} to="/settingsLogout">
            <ExitToAppIcon /> Logout
          </MenuItem>
        </MenuList>
      </div>
    );
  }
}

export default withStyles(styles)(Sidebar);
