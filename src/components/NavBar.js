import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import {
    logoutUser,
    updateUsername,
    loadUser,
    updatePassword
} from "../redux/actions/actions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import CloseIcon from "@material-ui/icons/Close";
import { ListItem, ListItemText } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";

const mapStateToProps = state => {
    return {
        courses: state.courses.courses,
        user: state.user.user,
        isAuth: state.user.isAuth
    };
};

class NavBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            menuOpen: false,
            viewAssignmentOpen: false,
            passwordOpen: false,
            usernameOpen: false,
            anchorEl: null,
            newUsername: "",
            oldPassword: "",
            newPassword: "",
            newPasswordConfirm: "",
            passwordError: false,
            currentAssignments: []
        };
    }

    componentDidMount() {}

    validateForm() {
        return (
            this.state.newPassword.length > 0 &&
            this.state.newPassword === this.state.newPasswordConfirm
        );
    }

    handleUsernameOpen = e => {
        this.setState({ usernameOpen: true });
    };

    handleUsernameClose = e => {
        this.setState({ usernameOpen: false });
    };

    handlePasswordOpen = e => {
        this.setState({ passwordOpen: true });
    };

    handlePasswordClose = e => {
        this.setState({ passwordOpen: false });
    };

    handleViewAssignmentOpen = e => {
        let userCourses = this.props.courses.filter(x => {
            let isFound = false;
            this.props.user.courses.forEach(element => {
                if (element._id === x._id) {
                    isFound = true;
                }
            });
            return isFound;
        });
        let currentAssignments = [];
        userCourses.forEach(element => {
            if (element.semester === "Spring 2019") {
                currentAssignments = currentAssignments.concat(
                    element.assignments
                );
            }
        });
        this.setState({
            currentAssignments: currentAssignments
        });
        this.setState({ viewAssignmentOpen: true });
    };

    handleViewAssignmentClose = e => {
        this.setState({ viewAssignmentOpen: false });
    };

    handleMenuOpen = e => {
        this.setState({ menuOpen: true, anchorEl: e.currentTarget });
    };

    handleMenuClose = e => {
        this.setState({ menuOpen: false });
    };

    onSignOut = () => {
        localStorage.clear();
        this.props.logoutUser();
        this.context.router.history.push("/login");
    };

    onSignIn = () => {
        this.context.router.history.push("/login");
    };

    handleRefresh = () => {
        this.context.router.history.push("/");
    };

    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        });
    };

    onUpdateUsername = e => {
        this.props.updateUsername(
            {
                user_id: this.props.user._id,
                newUsername: this.state.newUsername
            },
            () => {
                this.props.loadUser(
                    {
                        user_id: this.props.user._id
                    },
                    () => {
                        this.handleUsernameClose();
                    }
                );
            }
        );
    };

    onUpdatePassword = e => {
        this.props.updatePassword(
            {
                user_id: this.props.user._id,
                oldPassword: this.state.oldPassword,
                newPassword: this.state.newPassword,
                newPasswordConfirm: this.state.newPasswordConfirm
            },
            err => {
                if (err) {
                    this.setState({ passwordError: true });
                } else {
                    this.setState({ passwordError: false });
                    this.handlePasswordClose();
                }
            }
        );
    };

    render() {
        let grid;

        if (this.props.isAuth) {
            grid = (
                <div>
                    <Grid item>
                        <Button
                            style={{ margin: "8px" }}
                            variant="contained"
                            color="primary"
                            onClick={this.handleMenuOpen}
                        >
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
                    <Menu
                        open={this.state.menuOpen}
                        onClose={this.handleMenuClose}
                        anchorEl={this.state.anchorEl}
                    >
                        <MenuItem onClick={this.handleUsernameOpen}>
                            Update Username
                        </MenuItem>
                        <MenuItem onClick={this.handlePasswordOpen}>
                            Update Password
                        </MenuItem>
                        <MenuItem onClick={this.handleViewAssignmentOpen}>
                            View Assignments for current Semester
                        </MenuItem>
                    </Menu>
                    <Dialog
                        open={this.state.usernameOpen}
                        onClose={this.handleUsernameClose}
                    >
                        <DialogTitle>Update Username</DialogTitle>
                        <DialogContent>
                            <TextField
                                id="newUsername"
                                label="New Username"
                                value={this.state.newUsername}
                                onChange={this.handleChange}
                                fullWidth
                                required
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button
                                onClick={this.handleUsernameClose}
                                color="primary"
                                fullWidth
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={this.onUpdateUsername}
                                color="primary"
                                fullWidth
                            >
                                Submit
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog
                        open={this.state.passwordOpen}
                        onClose={this.handlePasswordClose}
                    >
                        <DialogTitle>Update Password</DialogTitle>
                        <DialogContent>
                            {this.state.passwordError && (
                                <Typography color="error">
                                    Incorrect Password
                                </Typography>
                            )}
                            <TextField
                                id="oldPassword"
                                label="Old Password"
                                value={this.props.oldPassword}
                                onChange={this.handleChange}
                                fullWidth
                                required
                                type="password"
                            />
                            <TextField
                                id="newPassword"
                                label="New Password"
                                value={this.props.newPassword}
                                onChange={this.handleChange}
                                fullWidth
                                required
                                type="password"
                            />
                            <TextField
                                id="newPasswordConfirm"
                                label="New Password (Confirm)"
                                value={this.props.newPasswordConfirm}
                                onChange={this.handleChange}
                                fullWidth
                                required
                                type="password"
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button
                                onClick={this.handlePasswordClose}
                                color="primary"
                                fullWidth
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={this.onUpdatePassword}
                                color="primary"
                                fullWidth
                                disabled={!this.validateForm()}
                            >
                                Submit
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog
                        open={this.state.viewAssignmentOpen}
                        onClose={this.handleViewAssignmentClose}
                        fullScreen
                    >
                        <AppBar
                            style={{
                                position: "relative"
                            }}
                        >
                            <Toolbar>
                                <IconButton
                                    color="inherit"
                                    onClick={this.handleViewAssignmentClose}
                                    aria-label="Close"
                                >
                                    <CloseIcon />
                                </IconButton>
                                <Typography
                                    variant="h6"
                                    color="inherit"
                                    style={{
                                        flex: 1
                                    }}
                                >
                                    Assignments for Spring 2019
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <List>
                            {this.state.currentAssignments.map(element => {
                                return (
                                    <div key={element._id}>
                                        <ListItem divider={true}>
                                            <ListItemText
                                                primary={element.name}
                                                secondary={element.description}
                                            />
                                        </ListItem>
                                    </div>
                                );
                            })}
                        </List>
                    </Dialog>
                </div>
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
                <AppBar position="static" style={{ background: "#2E3B55" }}>
                    <Toolbar>
                        <Grid
                            justify="space-between" // Add it here :)
                            container
                        >
                            <Grid item>
                                <Typography
                                    style={{ cursor: "pointer" }}
                                    variant="h4"
                                    color="inherit"
                                    align="justify"
                                    onClick={this.handleRefresh}
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
    { logoutUser, updateUsername, loadUser, updatePassword }
)(NavBar);
