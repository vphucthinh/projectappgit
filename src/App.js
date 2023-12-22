import React, { Component } from "react";
import { connect } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";
import { Chat, AccountBalanceWalletRounded, HomeRounded, Favorite, SummarizeRounded, Settings } from "@mui/icons-material";
import { useEffect } from "react";

// import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import 'antd/dist/reset.css';
import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import MenuContainer from "./components/MenuContainer";


import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

import { history } from './helpers/history';

// import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };

    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }
  

  componentDidMount() {
    const user = this.props.user;

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user?.roles?.includes("ROLE_MODERATOR"),
        showAdminBoard: user?.roles?.includes("ROLE_ADMIN"),
      });
    }

    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    this.props.dispatch(logout());
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }



  render() {

    return (
      <Router history={history}>
        <div>
          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/home"]} component={Home} />
              {/* <Route exact path="/login" component={Login} />*/}
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile" component={Profile} />

            </Switch>
          </div>

          {/* <AuthVerify logOut={this.logOut}/> */}
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}


export default connect(mapStateToProps)(App);
