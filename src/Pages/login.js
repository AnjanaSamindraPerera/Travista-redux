import React, { Component } from 'react';
import Pic from '../images/Pic.png';
import { Link } from 'react-router-dom';

//material ui
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

//bring grid
import Grid from '@material-ui/core/Grid';

//redux
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userAction';

const styles = {
  //classes.these atributes

  form: {
    textAlign: 'center'
  },
  pageTittle: {
    // color:'#43a047',
    margin: '20px auto 20px auto'
  },
  image: {
    margin: '20px auto 20px auto',
    width: '600px',
    height: '600px'
  },
  textField: {
    margin: '10px auto 10px auto'
  },
  button: {
    marginTop: 20,
    position: 'relative'
  },
  customError: {
    color: 'red',
    fontSize: '0.8rem',
    marginTop: 10
  },
  progress: {
    position: 'absolute'
  }
};

class login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) this.setState({ errors: nextProps.UI.errors }); //get errors and set them to local state
  }

  handleSubmit = event => {
    event.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData, this.props.history);
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const {
      classes,
      UI: { loading }
    } = this.props;
    const { errors } = this.state;

    return (
      <Grid container spacing={10} className={classes.form}>
        <Grid item sm>
          <img src={Pic} alt="logo" className={classes.image} />
        </Grid>

        <Grid item sm>
          <Typography variant="h2" className={classes.pageTittle}>
            Login
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="email"
              type="email"
              name="email"
              label="Email"
              className={classes.textField}
              value={this.state.email}
              onChange={this.handleChange}
              helperText={errors.email}
              error={errors.email ? true : false}
              fullWidth
            />
            <TextField
              id="password"
              type="password"
              name="password"
              label="Password"
              className={classes.textField}
              value={this.state.password}
              onChange={this.handleChange}
              helperText={errors.password}
              error={errors.password ? true : false}
              fullWidth
            />
            {errors.general && (
              <Typography variant="body2" className={classes.customError}>
                {errors.general}
              </Typography>
            )}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={loading}
            >
              Login
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
            <br />
            <br />
            <small>
              don't have an account ?sign up <Link to="/signup">here</Link>
            </small>
            <br />
            <small>
              Forgot your password? <Link to="/forgotPassword">click here</Link>
            </small>
          </form>
        </Grid>
      </Grid>
    );
  }
}

login.propTypes = {
  //propTypes used for Typechecking purposes ..will be easy in near future not now though
  // You can chain any of the above with `isRequired` to make sure a warning
  // is shown if the prop isn't provided.

  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
};

//from global state
const mapStateToProps = state => ({
  user: state.user,
  UI: state.UI //objects
});

//which action we use
const mapActionToProps = {
  loginUser //function
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(login));
