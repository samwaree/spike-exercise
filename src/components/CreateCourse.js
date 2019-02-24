import React, { Component } from "react";
import { connect } from "react-redux";
import { CssBaseline, withStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import { createCourse, loadCourses, loadUser } from "../redux/actions/actions";
import PropTypes from "prop-types";

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
        user_id: state.user.user._id,
        isAuth: state.user.isAuth
    };
};

class CreateCourse extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            options: [
                {
                    value: 0,
                    label: "Spring 2019"
                },
                {
                    value: 1,
                    label: "Fall 2018"
                },
                {
                    value: 2,
                    label: "Summer 2018"
                },
                {
                    value: 3,
                    label: "Spring 2018"
                },
                {
                    value: 4,
                    label: "Fall 2017"
                },
                {
                    value: 5,
                    label: "Summer 2017"
                },
                {
                    value: 6,
                    label: "Spring 2017"
                },
                {
                    value: 7,
                    label: "Fall 2016"
                },
                {
                    value: 8,
                    label: "Summer 2016"
                },
                {
                    value: 9,
                    label: "Spring 2016"
                },
                {
                    value: 10,
                    label: "Fall 2015"
                },
                {
                    value: 11,
                    label: "Summer 2015"
                },
                {
                    value: 12,
                    label: "Spring 2015"
                }
            ],
            name: "",
            semesterLabel: "",
            redirect: false
        };
    }

    handleSelect = e => {
        this.setState({
            semesterLabel: e.target.value
        });
    };

    handleChange = e => {
        this.setState({
            name: e.target.value
        });
    };

    onSubmit = e => {
        if (!this.props.isAuth) {
            this.context.router.history.push("/login");
        } else {
            this.props.createCourse(
                {
                    user_id: this.props.user_id,
                    name: this.state.name,
                    semester: this.state.semesterLabel
                },
                () => {
                    this.props.loadUser({
                        user_id: this.props.user_id
                    });
                    this.setState({
                        redirect: true
                    });
                }
            );
            e.preventDefault();
        }
    };

    renderRedirect = e => {
        if (this.state.redirect) {
            this.context.router.history.push("/");
        }
    };
    render() {
        const { classes } = this.props;

        return (
            <main className={classes.main}>
                {this.renderRedirect()}
                <CssBaseline />
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Create Course
                    </Typography>
                    <form className={classes.form} onSubmit={this.onSubmit}>
                        <FormControl
                            margin="normal"
                            required
                            fullWidth
                            value={this.state.name}
                            onChange={this.handleChange}
                        >
                            <InputLabel>Name</InputLabel>
                            <Input name="name" id="name" />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <TextField
                                id="semesterLabel"
                                select
                                label="Select"
                                value={this.state.semesterLabel}
                                onChange={this.handleSelect}
                            >
                                {this.state.options.map(option => (
                                    <MenuItem
                                        id="semesterLabel"
                                        key={option.value}
                                        value={option.label}
                                    >
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </FormControl>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Submit
                        </Button>
                    </form>
                </Paper>
            </main>
        );
    }
}

CreateCourse.contextTypes = {
    router: PropTypes.object.isRequired
};

export default connect(
    mapStateToProps,
    { createCourse, loadCourses, loadUser }
)(withStyles(styles)(CreateCourse));
