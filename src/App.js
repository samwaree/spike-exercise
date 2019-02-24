import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Feed from "./components/Feed";
import "typeface-roboto";
import NavBar from "./components/NavBar";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import CreateCourse from "./components/CreateCourse";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles.css";

class App extends Component {
    render() {
        return (
            <div className="styles">
                <NavBar />
                <Switch>
                    <Route exact path="/" component={Feed} />
                    <Route exact path="/login" component={SignIn} />
                    <Route exact path="/signup" component={SignUp} />
                    <Route
                        exact
                        path="/createcourse"
                        component={CreateCourse}
                    />
                </Switch>
            </div>
        );
    }
}

export default withStyles(styles)(App);
