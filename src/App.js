import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Feed from "./components/Feed";
import "typeface-roboto";
import NavBar from "./components/NavBar";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import CreateCourse from "./components/CreateCourse";

class App extends Component {
    render() {
        return (
            <div
                style={{
                    height: "100vh",
                    width: "100vw",
                    margin: "0",
                    padding: "0",
                    backgroundColor: "gray"
                }}
            >
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

export default App;
