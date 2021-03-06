import React from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import { loginUser } from "../redux/actions/actions";
import { connect } from "react-redux";
import { push } from "connected-react-router";

const styles = theme => ({
    main: {
        width: "auto",
        display: "block", // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: "auto",
            marginRight: "auto"
        }
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit *
            3}px ${theme.spacing.unit * 3}px`
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing.unit
    },
    submit: {
        marginTop: theme.spacing.unit * 3
    }
});

const mapStateToProps = state => {
    return {
        user: state.user.user,
        loginError: state.user.loginError,
        isAuth: state.user.isAuth
    };
};

class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: ""
        };
    }

    onRegister = () => {
        this.context.router.history.push("/signup");
    };

    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        });
    };

    onSignIn = e => {
        this.props.loginUser({
            username: this.state.username,
            password: this.state.password
        });
        e.preventDefault();
    };

    renderRedirect = e => {
        if (this.props.isAuth) {
            this.context.router.history.push("/");
        }
    };

    onRedirect = () => {
        this.context.router.history.push("/");
    };

    validateForm = () => {
        return this.state.username.length > 0 && this.state.password.length > 0;
    };

    render() {
        const { classes } = this.props;
        return (
            <main className={classes.main}>
                {this.renderRedirect()}
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    {this.props.loginError && (
                        <Typography color="error">
                            Username or Password is incorrect
                        </Typography>
                    )}
                    <form className={classes.form} onSubmit={this.onSignIn}>
                        <FormControl
                            margin="normal"
                            required
                            fullWidth
                            onChange={this.handleChange}
                        >
                            <InputLabel htmlFor="email">Username</InputLabel>
                            <Input
                                id="username"
                                name="username"
                                autoComplete="username"
                                autoFocus
                            />
                        </FormControl>
                        <FormControl
                            margin="normal"
                            required
                            fullWidth
                            onChange={this.handleChange}
                        >
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input
                                name="password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                        </FormControl>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={!this.validateForm()}
                        >
                            Sign in
                        </Button>
                        <Button fullWidth onClick={this.onRegister}>
                            Register
                        </Button>
                        <Button fullWidth onClick={this.onRedirect}>
                            View Content (Not allowed to contribute)
                        </Button>
                    </form>
                </Paper>
            </main>
        );
    }
}

SignIn.propTypes = {
    classes: PropTypes.object.isRequired
};

SignIn.contextTypes = {
    router: PropTypes.object.isRequired
};

export default connect(
    mapStateToProps,
    { loginUser, push }
)(withStyles(styles)(SignIn));
