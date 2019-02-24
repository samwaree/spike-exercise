import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { logoutUser } from "../redux/actions/actions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const mapStateToProps = state => {
    return {
        user: state.user.user,
        isAuth: state.user.isAuth
    };
};

class NavBar extends React.Component {
    onSignOut = () => {
        localStorage.clear();
        this.props.logoutUser();
        this.context.router.history.push("/login");
    };

    onSignIn = () => {
        this.context.router.history.push("/login");
    };

    render() {
        let grid;

        if (this.props.isAuth) {
            grid = (
                <Grid item>
                    <Button variant="contained" color="primary">
                        Profile
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.onSignOut}
                    >
                        Sign Out
                    </Button>
                </Grid>
            );
        } else {
            grid = (
                <Grid item>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.onSignIn}
                    >
                        Sign In
                    </Button>
                </Grid>
            );
        }
        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <Grid
                            justify="space-between" // Add it here :)
                            container
                            spacing={24}
                        >
                            <Grid item>
                                <Typography
                                    style={{ cursor: "pointer" }}
                                    variant="title"
                                    color="inherit"
                                    align="justify"
                                >
                                    UW Rate 'Em
                                </Typography>
                            </Grid>

                            {grid}
                        </Grid>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

NavBar.contextTypes = {
    router: PropTypes.object.isRequired
};
export default connect(
    mapStateToProps,
    { logoutUser }
)(NavBar);
