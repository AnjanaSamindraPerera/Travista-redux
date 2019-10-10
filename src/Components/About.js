import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';

import EditAbout from './EditAbout';
//MUI stuff
import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

//icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';

import LocalPhoneIcon from '@material-ui/icons/LocalPhone';
import PublicIcon from '@material-ui/icons/Public';

//redux
import { connect } from 'react-redux';

const styles = theme => ({
  paper: {
    padding: 20
  },
  profile: {
    '& .image-wrapper': {
      textAlign: 'center',
      position: 'relative',
      '& button': {
        position: 'absolute',
        top: '80%',
        left: '70%'
      }
    },
    '& .profile-image': {
      width: 200,
      height: 200,
      objectFit: 'cover',
      maxWidth: '100%',
      borderRadius: '50%'
    },
    '& .profile-details': {
      textAlign: 'center',
      '& span, svg': {
        verticalAlign: 'middle'
      },
      '& a': {
        color: theme.palette.primary.main
      }
    },
    '& hr': {
      border: 'none',
      margin: '0 0 10px 0'
    },
    '& svg.button': {
      '&:hover': {
        cursor: 'pointer'
      }
    }
  },
  buttons: {
    textAlign: 'center',
    '& a': {
      margin: '20px 10px'
    }
  }
}); //wrap around () to return from function straight away

class Profile extends Component {
  render() {
    const {
      classes,
      user: {
        credentials: { bio, website, location, telNo },
        loading,
        authenticated
      }
    } = this.props;

    let profileMarkup = !loading ? (
      authenticated ? (
        <Paper className={classes.paper}>
          <div className={classes.profile}>
            <hr />
            <div className="profile-details">
              <PublicIcon color="action" />
              <b>Intro</b>
              <hr />
              {bio && <Typography variant="body2">{bio}</Typography>}
              <hr />
              {location && (
                <Fragment>
                  <LocationOn color="primary" />

                  <span>{location}</span>
                  <hr />
                </Fragment>
              )}
              {website && (
                <Fragment>
                  <LinkIcon color="primary" />
                  <a href={website} target="_blank" rel="noopener noreferrer">
                    {' '}
                    {website}
                  </a>
                  <hr />
                </Fragment>
              )}
              {telNo && (
                <Fragment>
                  <LocalPhoneIcon color="primary" />

                  <span>{telNo}</span>
                  <hr />
                </Fragment>
              )}
            </div>
            <EditAbout />
          </div>
        </Paper>
      ) : (
        <Paper className={classes.paper}>
          <Typography variant="body2" align="center">
            No profile found please login again
            <div className={classes.buttons}>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/login"
              >
                Login
              </Button>
              <Button
                variant="contained"
                color="secondary"
                component={Link}
                to="/signup"
              >
                Signup
              </Button>
            </div>
          </Typography>
        </Paper>
      )
    ) : (
      <p>loading...</p>
    );

    return profileMarkup;
  }
}

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});
export default connect(mapStateToProps)(withStyles(styles)(Profile));
