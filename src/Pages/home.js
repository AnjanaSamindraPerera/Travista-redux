import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import ReviewSkeleton from '../util/skeltons/ReviewSkelton';
import StripeCheckout from 'react-stripe-checkout';
import { toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
//components
import Cover from '../Components/Cover.js';
import Review from '../Components/Review.js';
import Profile from '../Components/Profile';
import About from '../Components/About';
import Ad from '../Components/advertisment/Ad.js';

//redux
import { connect } from 'react-redux';
import { getAds } from '../redux/actions/dataAction';

//material-ui
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const styles = {
  card: {
    display: 'flex',
    marginBottom: 20
  },
  content: {
    padding: 25,
    objectFit: 'cover'
  }
};

export class home extends Component {
  state = {
    adId: null,
    product: {
      name: 'adverstisment',
      price: 64343.0
    }
  };

  componentDidMount() {
    this.props.getAds();

    const adId = this.props.match.params.adId;
    if (adId) this.setState({ adIdParam: adId });
  }

  handleToken = (token, addresses) => {
    console.log(token, addresses);

    axios
      .post('/checkout', { token })
      .then(res => {
        console.log(res.data);
        if (res.data === 'success') {
          toast('success ! check emails for details', { type: 'success' });
        } else {
          toast('something went wrong', { type: 'error' });
        }
      })
      .catch(err => console.log(err));
  };

  render() {
    const { ads, loading } = this.props.data;
    const { reviews } = this.props.user;
    const { adIdParam } = this.state;
    const { classes } = this.props;

    // let recentAdsMarkup = !loading ?  (
    //   ads.map(ad => <Ad key={ad.adId} ad={ad} />)
    // ) : (
    //   <h1>Loading..</h1>
    // );

    const recentAdsMarkup = loading ? (
      <h1>Loading..</h1>
    ) : ads.length === 0 ? (
      <Card className={classes.Card}>
        <CardContent className={classes.content}>
          <h3>No ads from this user</h3>
        </CardContent>
      </Card>
    ) : !adIdParam ? (
      ads.map(ad => <Ad key={ad.adId} ad={ad} />)
    ) : (
      ads.map(ad => {
        if (ad.adId !== adIdParam) return <Ad key={ad.adId} ad={ad} />;
        else return <Ad key={ad.adId} ad={ad} openDialog />;
      })
    );

    // let recentReviewsMarkup = !loading ? (
    //   reviews.map(review => <Review key={review.reviewId} review={review} />)
    // ) : (
    //   <ReviewSkeleton />
    // );

    const recentReviewsMarkup = loading ? (
      <ReviewSkeleton />
    ) : reviews.length === 0 ? (
      <Card className={classes.Card}>
        <CardContent className={classes.content}>
          <h3>No reviews yet</h3>
        </CardContent>
      </Card>
    ) : (
      reviews.map(review => <Review key={review.reviewId} review={review} />)
    );

    return (
      <div>
        <Grid container spacing={2}>
          <Grid item sm={8} xs={12}>
            <Cover />
          </Grid>

          <Grid item sm={4} xs={12}>
            <Profile />
          </Grid>

          <Grid item sm={8} xs={12}>
            {recentReviewsMarkup}
          </Grid>
          <Grid item sm={4} xs={12}>
            <About />
          </Grid>

          <Grid item sm={8} xs={12}>
            {recentAdsMarkup}
          </Grid>
          <Grid item sm={4} xs={12}>
            <StripeCheckout
              stripeKey="pk_test_o55sKIP63bGjToyA5jcmjvkn000h03tlSz"
              token={this.handleToken}
              billingAddress
              amount={this.state.product.price * 100}
            />
          </Grid>
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

export default connect(mapStateToProps, { getAds })(withStyles(styles)(home));
