import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import MyButton from '../util/MyButton';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import DeleteAd from './DeleteAd';
//material-ui
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';

//icons
import ChatIcon from '@material-ui/icons/Chat';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
//style
import './Ad.css';

//redux

import { connect } from 'react-redux';
import { likeAd, unlikeAd } from '../redux/actions/dataAction';

const styles = {
  card: {
    display: 'flex',
    marginBottom: 20
  },
  image: {
    minWidth: 20,
    minHeight: 20
  },
  content: {
    padding: 25,
    objectFit: 'cover'
  }
};

class Ad extends Component {
  likedAd = () => {
    //check likedAds
    if (
      this.props.user.likes &&
      this.props.user.likes.find(like => like.adId === this.props.ad.adId)
    )
      return true;
    else return false;
  };

  likeAd = () => {
    //methods to like and unlike
    this.props.likeAd(this.props.ad.adId);
  };

  unlikeAd = () => {
    this.props.unlikeAd(this.props.ad.adId);
  };

  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      ad: {
        body,
        adId,
        adImage,
        userHandle,
        createdAt,
        userImage,
        likeCount,
        commentCount
      },
      user: {
        authenticated,
        credentials: { handle }
      }
    } = this.props;

    const likeButton = !authenticated ? (
      <MyButton tip="Like">
        <Link to="/login">
          <FavoriteBorder color="primary" />
        </Link>
      </MyButton>
    ) : this.likedAd() ? (
      <MyButton tip="undo like" onClick={this.unlikeAd}>
        <FavoriteIcon color="primary" />
      </MyButton>
    ) : (
      <MyButton tip="Like" onClick={this.likeAd}>
        <FavoriteBorder color="primary" />
      </MyButton>
    );

    const deleteButton =
      authenticated && userHandle === handle ? <DeleteAd adId={adId} /> : null;
    return (
      <Card className="Post">
        <div className="Post-user">
          <div className="Post-user-avatar">
            <img src={userImage} alt="Chris" />
          </div>
          <Typography variant="h5" color="primary">
            {userHandle}
          </Typography>
          <div className="Post-caption">
            <Typography variant="body2" color="textSecondary">
              {dayjs(createdAt).fromNow()}
            </Typography>
          </div>
        </div>
        {deleteButton}
        <CardContent className={classes.content}>
          {/* <Typography
              className="Post-caption"
              variant="body1"
              color="textSecondary"
            >
              <strong> {body}</strong>
            </Typography> */}

          <div className="Post-caption">
            <strong>{body}</strong>
          </div>

          <div className="Post-image">
            <div className="Post-image-bg">
              <img
                alt=""
                src={adImage}
                onError={e => (e.target.style.display = 'none')}
              />
            </div>
          </div>
          {likeButton}
          <span>{likeCount} Likes</span>

          <MyButton tip="comments">
            <ChatIcon color="primary" />
          </MyButton>

          <span>{commentCount} comments</span>
        </CardContent>
      </Card>
    );
  }
}

Ad.propTypes = {
  likeAd: PropTypes.func.isRequired,
  unlikeAd: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  ad: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

const mapActionsToprops = {
  likeAd,
  unlikeAd
};

export default connect(
  mapStateToProps,
  mapActionsToprops
)(withStyles(styles)(Ad));
