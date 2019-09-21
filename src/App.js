import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import jwtDecode from "jwt-decode";

//pages
import home from "./Pages/home";
import login from "./Pages/login";
import signup from "./Pages/signup";

//components
import Navbar from "./Components/Navbar";
import AuthRoute from "./util/AuthRoute";

//redux
// import { Provider } from "react-redux";
// import store from "./redux/store";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#33c9dc",
      main: "#00bcd4", //color primary have this  //green-#43a047
      dark: "#008394",
      contrastText: "#fff" //text color on element
    },
    secondary: {
      light: "#ff6333",
      main: "#ff3d00", //color secondary have this
      dark: "#b22a00",
      contrastText: "#fff"
    }
  },
  typography: {
    useNextVariants: true
  }
});

const token = localStorage.FBIdToken;
let authenticated = false;

console.log("hello1", token);
if (token) {
  //decode firebase token to set expiry date
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = "/login";
    authenticated = false;
  } else {
    authenticated = true;
  }
}

console.log("hello2", authenticated);

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <Router>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={home} />
                <AuthRoute
                  exact
                  path="/login"
                  component={login}
                  authenticated={authenticated}
                />
                <AuthRoute
                  exact
                  path="/signup"
                  component={signup}
                  authenticated={authenticated}
                />
              </Switch>
            </div>
          </Router>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
