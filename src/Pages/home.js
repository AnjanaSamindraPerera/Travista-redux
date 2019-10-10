import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import PropTypes from 'prop-types';

//components
import Cover from '../Components/Cover.js';
import Review from '../Components/Review.js';
import Profile from '../Components/Profile';
import About from '../Components/About';
import Ad from '../Components/Ad.js';

//redux
import { connect } from 'react-redux';
import { getAds } from '../redux/actions/dataAction';

export class home extends Component {
  state = {
    screams: null
  };

  componentDidMount() {
    this.props.getAds();

    axios
      .get('/screams')
      .then(res => {
        this.setState({
          screams: res.data
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { ads, loading } = this.props.data;

    let recentScreamsMarkup = this.state.screams ? (
      this.state.screams.map(scream => (
        <Review key={scream.screamId} scream={scream} />
      ))
    ) : (
      <p>Loading...</p>
    );

    let recentAdsMarkup = !loading ? (
      ads.map(ad => <Ad key={ad.adId} ad={ad} />)
    ) : (
      <h1>Loading..</h1>
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

          {/* <Grid item sm={8} xs={12}>
            <p>Post advertisments</p>
          </Grid> */}
          <Grid item sm={8} xs={12}>
            {recentScreamsMarkup}
          </Grid>
          <Grid item sm={4} xs={12}>
            <About />
          </Grid>

          <Grid item sm={8} xs={12}>
            {recentAdsMarkup}
          </Grid>
        </Grid>
      </div>
    );
  }
}

home.propTypes = {
  getAds: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  data: state.data
});

export default connect(
  mapStateToProps,
  { getAds }
)(home);
