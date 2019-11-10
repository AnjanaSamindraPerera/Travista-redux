import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import ReviewSkeleton from '../util/skeltons/ReviewSkelton';

//components
import Cover from '../Components/Cover.js';
import Review from '../Components/Review.js';
import Profile from '../Components/Profile';
import About from '../Components/About';
import Ad from '../Components/advertisment/Ad.js';

//redux
import { connect } from 'react-redux';
import { getAds } from '../redux/actions/dataAction';

export class home extends Component {
  state = {
    adId: null
  };

  componentDidMount() {
    this.props.getAds();

    const adId = this.props.match.params.adId;
    if (adId) this.setState({ adIdParam: adId });
  }

  render() {
    const { ads, loading } = this.props.data;
    const { reviews } = this.props.user;
    const { adIdParam } = this.state;

    // let recentAdsMarkup = !loading ?  (
    //   ads.map(ad => <Ad key={ad.adId} ad={ad} />)
    // ) : (
    //   <h1>Loading..</h1>
    // );

    const recentAdsMarkup = ads.map(ad => {
      if (ad.adId === adIdParam) return <Ad key={ad.adId} ad={ad} openDialog />;
    });

    let recentReviewsMarkup = !loading ? (
      reviews.map(review => <Review key={review.reviewId} review={review} />)
    ) : (
      <ReviewSkeleton />
    );

    return (
      <div>
        <Grid container spacing={2}>
          {/* <Grid item sm={8} xs={12}>
            <Cover />
          </Grid> */}

          {/* <Grid item sm={4} xs={12}>
            <Profile />
          </Grid> */}

          {/* <Grid item sm={8} xs={12}>
            {recentReviewsMarkup}
          </Grid> */}
          {/* <Grid item sm={4} xs={12}>
            <About />
          </Grid> */}

          <Grid item>{recentAdsMarkup}</Grid>
        </Grid>
      </div>
    );
  }
}

home.propTypes = {
  getAds: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  data: state.data,
  user: state.user
});

export default connect(
  mapStateToProps,
  { getAds }
)(home);
