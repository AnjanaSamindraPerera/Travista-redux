import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";

//components
import Cover from "../Components/Cover.js";
import Review from "../Components/Review.js";

export class home extends Component {
  state = {
    screams: null
  };

  componentDidMount() {
    axios
      .get("http://localhost:5000/screams")
      .then(res => {
        this.setState({
          screams: res.data
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    let recentScreamsMarkup = this.state.screams ? (
      this.state.screams.map(scream => (
        <Review key={scream.screamId} scream={scream} />
      ))
    ) : (
      <p>Loading.../</p>
    );
    return (
      <div>
        <Grid container spacing={10}>
          <Grid item sm={10} xs={12}>
            <Cover />
          </Grid>
          <Grid item sm={2} xs={12}>
            <p>profile....</p>
          </Grid>
        </Grid>

        <Grid container spacing={10}>
          <Grid item sm={10} xs={12}>
            {recentScreamsMarkup}
            {/* <Review/> */}
          </Grid>
          <Grid item sm={2} xs={12}>
            <p>About....</p>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default home;
