import React, { Component } from "react";
import { connect } from "react-redux";
import { loadCourses } from "../redux/actions/actions";
import CourseCard from "./CourseCard";
import Grid from "@material-ui/core/Grid";
import mapSemesterToNumber from "../utilities/semester.util";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";

const mapStateToProps = state => {
    return {
        courses: state.courses.courses,
        isAuth: state.user.isAuth,
        username: state.user.user.username,
        user_courses: state.user.user.courses
    };
};

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
        userCourses.sort((a, b) => {
            return (
                mapSemesterToNumber(a.semester) -
                mapSemesterToNumber(b.semester)
            );
        });
        nonUserCourses.sort((a, b) => {
            return (
                mapSemesterToNumber(a.semester) -
                mapSemesterToNumber(b.semester)
            );
        });
        this.setState({
            nonUserCourses: nonUserCourses,
            userCourses: userCourses
        });
    };

    render() {
        return (
            <main>
                <div>
                    {this.props.isAuth && (
                        <div>
                            <Typography
                                variant="h2"
                                align="center"
                                style={{ marginTop: "24px" }}
                            >
                                Welcome, {this.props.username}
                            </Typography>

                            <Typography
                                variant="h3"
                                align="center"
                                style={{ marginTop: "24px" }}
                            >
                                My Courses
                            </Typography>
                        </div>
                    )}
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        style={{ marginTop: "24px", marginBottom: "24px" }}
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
                                            isUserCourse={true}
                                        />
                                    </Grid>
                                );
                            })}
                    </Grid>
                    {this.props.isAuth && (
                        <div>
                            <Typography
                                variant="h3"
                                align="center"
                                style={{ marginTop: "24px" }}
                            >
                                Other Courses
                            </Typography>

                            <Grid
                                container
                                direction="row"
                                justify="center"
                                alignItems="center"
                                style={{
                                    marginTop: "24px",
                                    marginBottom: "24px"
                                }}
                            >
                                {this.props.isAuth &&
                                    this.state.nonUserCourses.map(data => {
                                        return (
                                            <Grid key={data._id} item>
                                                <CourseCard
                                                    name={data.name}
                                                    semester={data.semester}
                                                    assignments={
                                                        data.assignments
                                                    }
                                                    gpa={data.gpa}
                                                    id={data._id}
                                                    comments={data.comments}
                                                    updateUserCourses={
                                                        this.updateUserCourses
                                                    }
                                                    isUserCourse={false}
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
                    )}
                </div>
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
)(Feed);
