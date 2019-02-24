import React, { Component } from "react";
import { connect } from "react-redux";
import { loadCourses } from "../redux/actions/actions";
import CourseCard from "./CourseCard";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

const mapStateToProps = state => {
    return {
        courses: state.courses.courses,
        isAuth: state.user.isAuth,
        username: state.user.user.username,
        user_courses: state.user.user.courses
    };
};

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

class Feed extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nonUserCourses: [],
            userCourses: []
        };
    }
    componentWillMount() {
        this.props.loadCourses(() => {
            this.updateUserCourses();
        });
    }

    onAdd = () => {
        this.context.router.history.push("/createcourse");
    };

    updateUserCourses = () => {
        let nonUserCourses = this.props.courses.filter(x => {
            let isFound = false;
            this.props.user_courses.forEach(element => {
                if (element._id === x._id) {
                    isFound = true;
                }
            });
            return !isFound;
        });
        let userCourses = this.props.courses.filter(x => {
            let isFound = false;
            this.props.user_courses.forEach(element => {
                if (element._id === x._id) {
                    isFound = true;
                }
            });
            return isFound;
        });
        this.setState({
            nonUserCourses: nonUserCourses,
            userCourses: userCourses
        });
    };

    render() {
        return (
            <main className={this.props.main}>
                <Paper
                    style={{
                        margin: "auto",
                        marginTop: "32px",
                        minHeight: "86vh",
                        maxWidth: "70vw",
                        textalign: "center"
                    }}
                >
                    <div>
                        {this.props.isAuth && (
                            <Typography
                                variant="h2"
                                align="center"
                                style={{ padding: "8px" }}
                            >
                                Welcome, {this.props.username}
                            </Typography>
                        )}

                        <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="center"
                            spacing={16}
                        >
                            {!this.props.isAuth &&
                                this.props.courses.map(data => {
                                    return (
                                        <Grid key={data._id} item>
                                            <CourseCard
                                                name={data.name}
                                                semester={data.semester}
                                                assignments={data.assignments}
                                                gpa={data.gpa}
                                                id={data._id}
                                                comments={data.comments}
                                            />
                                        </Grid>
                                    );
                                })}
                            {this.props.isAuth &&
                                this.state.userCourses.map(data => {
                                    return (
                                        <Grid key={data._id} item>
                                            <CourseCard
                                                name={data.name}
                                                semester={data.semester}
                                                assignments={data.assignments}
                                                gpa={data.gpa}
                                                id={data._id}
                                                comments={data.comments}
                                                updateUserCourses={
                                                    this.updateUserCourses
                                                }
                                            />
                                        </Grid>
                                    );
                                })}
                            {this.props.isAuth &&
                                this.state.nonUserCourses.map(data => {
                                    return (
                                        <Grid key={data._id} item>
                                            <CourseCard
                                                name={data.name}
                                                semester={data.semester}
                                                assignments={data.assignments}
                                                gpa={data.gpa}
                                                id={data._id}
                                                comments={data.comments}
                                                updateUserCourses={
                                                    this.updateUserCourses
                                                }
                                            />
                                        </Grid>
                                    );
                                })}
                            {this.props.isAuth && (
                                <Grid item>
                                    <IconButton onClick={this.onAdd}>
                                        <AddIcon />
                                    </IconButton>
                                </Grid>
                            )}
                        </Grid>
                    </div>
                </Paper>
            </main>
        );
    }
}

Feed.contextTypes = {
    router: PropTypes.object.isRequired
};

export default connect(
    mapStateToProps,
    { loadCourses }
)(withStyles(styles)(Feed));
