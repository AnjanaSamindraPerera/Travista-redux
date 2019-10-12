import React, { Component, Fragment } from 'react';

import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

//redux
import { connect } from 'react-redux';
import { postAd, postAdImage } from '../redux/actions/dataAction';

//MUI stuff
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip'; //five info when hover over
import CircularProgress from '@material-ui/core/CircularProgress';
//icons
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';

//form dialogs
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MyButton from '../util/MyButton';

const styles = {
  form: {
    textAlign: 'center'
  },
  pageTittle: {
    // color:'#43a047',
    margin: '20px auto 20px auto'
  },
  image: {
    margin: '20px auto 20px auto'
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
  },
  submitButton: {
    position: 'relative'
  },
  progressSpinner: {
    position: 'absolute'
  },
  closeButton: {
    position: 'absolute',
    left: '90%',
    top: '10%'
  }
};

class PostAd extends Component {
  state = {
    open: false,
    body: '',
    errors: {},
    imageState: false
  };

  handleEditPicture = () => {
    const fileInput = document.getElementById('imageInput');
    fileInput.click();
  };

  handleImageChange = event => {
    // console.log('in cover1');
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append('image', image, image.name);

    this.props.uploadCoverImage(formData);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) this.setState({ errors: nextProps.UI.errors }); //get errors and set them to local state
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({ body: '' });
      this.handleClose();
    }
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false, errors: {} });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.postAd({ body: this.state.body });
    this.setState({ imageState: true, open: true });
  };

  render() {
    const { errors, image } = this.state;
    const {
      classes,
      UI: { loading }
    } = this.props;

    const Add = image ? (
      <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        fullWidth
        maxWidth="sm"
      >
        <MyButton
          tip="Close"
          onClick={this.handleClose}
          tipClassName={classes.closeButton}
        >
          <CloseIcon />
        </MyButton>
        <DialogTitle>Add a Image</DialogTitle>
        <DialogContent>
          <Tooltip title="Edit Cover picture" placement="top">
            <IconButton onClick={this.handleEditPicture} className="button">
              <AddAPhotoIcon color="primary" />
            </IconButton>
          </Tooltip>
        </DialogContent>
      </Dialog>
    ) : null;

    return (
      <Fragment>
        <MyButton onClick={this.handleOpen} tip="Post advertisment">
          <AddIcon />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <MyButton
            tip="Close"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogTitle>Post a new Advertisment</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name="body"
                type="text"
                label="ADVERTISMENT"
                multiline
                rows="4"
                placeholder="Caption"
                error={errors.body ? true : false}
                helperText={errors.body}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submitButton}
                disabled={loading}
              >
                Submit
                {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
        {Add}
      </Fragment>
    );
  }
}

PostAd.propTypes = {
  postAd: PropTypes.func.isRequired,
  // postAdImage: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  UI: state.UI,
  data: state.data
});

const mapActionsToprops = {
  postAd,
  postAdImage
};

export default connect(
  mapStateToProps,
  mapActionsToprops
)(withStyles(styles)(PostAd));
