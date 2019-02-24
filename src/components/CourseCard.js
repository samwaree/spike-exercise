import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AddIcon from "@material-ui/icons/Add";
import CardActions from "@material-ui/core/CardActions";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import AssignmentCard from "./AssignmentCard";
import MenuItem from "@material-ui/core/MenuItem";
import List from "@material-ui/core/List";
import Menu from "@material-ui/core/Menu";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
//import MoreVertIcon from "@material-ui/icons/MoreVert";
import {
    createAssignment,
    loadCourses,
    comment,
    addCourse,
    loadUser,
    removeCourse
} from "../redux/actions/actions";
import Slide from "@material-ui/core/Slide";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CloseIcon from "@material-ui/icons/Close";
import { ListItem, ListItemText, InputBase } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import SendIcon from "@material-ui/icons/Send";

const styles = theme => ({
    card: {
        maxWidth: "400px"
    },
    media: {
        height: 0,
        paddingTop: "56.25%" // 16:9
    },
    actions: {
        display: "flex"
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular
    }
});

const mapStateToProps = state => {
    return {
        isAuth: state.user.isAuth,
        user_courses: state.user.user.courses,
        user_id: state.user.user._id
    };
};

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

const AddAssignment = props => (
    <Dialog
        open={props.addAssignmentOpen}
        onClose={props.handleAddAssignmentClose}
    >
        <DialogTitle>Add Assignment</DialogTitle>
        <DialogContent>
            <TextField
                id="assignmentName"
                label="Assignment Name"
                value={props.assignmentName}
                onChange={props.handleChange}
                fullWidth
                required
            />
            <TextField
                id="assignmentDescription"
                label="Description"
                value={props.assignmentDescription}
                onChange={props.handleChange}
                fullWidth
                multiline={true}
            />
        </DialogContent>
        <DialogActions>
            <Button
                onClick={props.handleAddAssignmentClose}
                color="primary"
                fullWidth
            >
                Cancel
            </Button>
            <Button onClick={props.onAddAssignment} color="primary" fullWidth>
                Submit
            </Button>
        </DialogActions>
    </Dialog>
);

const CommentDialog = props => (
    <Dialog
        fullScreen
        open={props.commentOpen}
        onClose={props.handleCommentClose}
        TransitionComponent={Transition}
    >
        <AppBar
            style={{
                position: "relative"
            }}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    onClick={props.handleCommentClose}
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
                    Comments for {props.name}
                </Typography>
            </Toolbar>
        </AppBar>
        <List>
            {props.comments.map(element => {
                return (
                    <div key={element._id}>
                        <ListItem divider={true}>
                            <ListItemText primary={element.content} />
                        </ListItem>
                    </div>
                );
            })}
        </List>
        {props.isAuth && (
            <Paper>
                <InputBase
                    style={{
                        padding: 16,
                        width: "94%"
                    }}
                    placeholder="Comment..."
                    value={props.commentContent}
                    id="commentContent"
                    onChange={props.handleChange}
                />
                <IconButton onClick={props.onAddComment}>
                    <SendIcon />
                </IconButton>
            </Paper>
        )}
    </Dialog>
);

class CourseCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            addAssignmentOpen: false,
            commentOpen: false,
            assignmentName: "",
            assignmentDescription: "",
            commentContent: "",
            menuOpen: "",
            anchorEl: null
        };
    }

    handleCommentOpen = () => {
        this.setState({
            commentOpen: true
        });
    };

    handleCommentClose = () => {
        this.setState({
            commentOpen: false
        });
    };

    handleAddAssignmentOpen = () => {
        this.setState({
            addAssignmentOpen: true
        });
    };

    handleAddAssignmentClose = () => {
        this.setState({
            addAssignmentOpen: false
        });
    };

    handleMenuOpen = e => {
        this.setState({ menuOpen: true, anchorEl: e.currentTarget });
    };

    handleMenuClose = e => {
        this.setState({ menuOpen: false });
    };

    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        });
    };

    onAddAssignment = e => {
        this.props.createAssignment(
            {
                course_id: this.props.id,
                name: this.state.assignmentName,
                description: this.state.assignmentDescription
            },
            () => {
                this.handleAddAssignmentClose();
                this.props.loadCourses(() => {
                    this.props.updateUserCourses();
                });
            }
        );
        e.preventDefault();
    };

    onSaveCourse = e => {
        this.props.addCourse(
            {
                user_id: this.props.user_id,
                course_id: this.props.id
            },
            () => {
                this.handleMenuClose();
                this.props.loadUser(
                    {
                        user_id: this.props.user_id
                    },
                    () => {
                        this.props.loadCourses(() => {
                            this.props.updateUserCourses();
                        });
                    }
                );
            }
        );
        e.preventDefault();
    };

    onRemoveCourse = e => {
        this.props.removeCourse(
            {
                user_id: this.props.user_id,
                course_id: this.props.id
            },
            () => {
                this.handleMenuClose();
                this.props.loadUser(
                    {
                        user_id: this.props.user_id
                    },
                    () => {
                        this.props.loadCourses(() => {
                            this.props.updateUserCourses();
                        });
                    }
                );
            }
        );
    };

    onAddComment = e => {
        this.props.comment(
            {
                course_id: this.props.id,
                content: this.state.commentContent,
                user_id: this.props.user_id
            },
            () => {
                this.handleCommentClose();
                this.setState({
                    commentContent: ""
                });
                this.props.loadCourses(() => {
                    this.props.updateUserCourses();
                });
            }
        );
    };

    render() {
        const name = this.props.name;
        const semester = this.props.semester;
        const assignments = this.props.assignments;
        const gpa = this.props.gpa.toFixed(2);
        const id = this.props.id;

        return (
            <div>
                <Card style={{ width: "20vw", margin: "8px" }}>
                    <CardHeader
                        className={this.props.heading}
                        title={name}
                        subheader={semester}
                        action={
                            <div>
                                <IconButton onClick={this.handleMenuOpen}>
                                    <MoreVertIcon />
                                </IconButton>
                                <Menu
                                    open={this.state.menuOpen}
                                    onClose={this.handleMenuClose}
                                    anchorEl={this.state.anchorEl}
                                >
                                    {this.props.isAuth &&
                                        !this.props.isUserCourse && (
                                            <MenuItem
                                                onClick={this.onSaveCourse}
                                            >
                                                Save Course to 'My Courses'
                                            </MenuItem>
                                        )}
                                    {this.props.isAuth &&
                                        this.props.isUserCourse && (
                                            <MenuItem
                                                onClick={this.onRemoveCourse}
                                            >
                                                Remove Assignment to 'My
                                                Courses'
                                            </MenuItem>
                                        )}
                                    <MenuItem onClick={this.handleCommentOpen}>
                                        View Comments
                                    </MenuItem>
                                </Menu>
                            </div>
                        }
                    />
                    <CardContent>
                        <Typography>Overall Rating: {gpa}</Typography>
                    </CardContent>

                    <CardActions>
                        <ExpansionPanel style={{ width: "16.5vw" }}>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                            >
                                <Typography>Assignments</Typography>
                            </ExpansionPanelSummary>
                            <List>
                                {assignments.map(data => {
                                    return (
                                        <div key={data._id}>
                                            <AssignmentCard
                                                assignment_id={data._id}
                                                assignment={data.name}
                                                description={data.description}
                                                ratings={data.ratings}
                                                gpa={data.gpa}
                                                course_id={id}
                                                updateUserCourses={
                                                    this.props.updateUserCourses
                                                }
                                            />
                                        </div>
                                    );
                                })}
                            </List>
                        </ExpansionPanel>
                        {this.props.isAuth && (
                            <div>
                                <IconButton
                                    onClick={this.handleAddAssignmentOpen}
                                >
                                    <AddIcon />
                                </IconButton>
                            </div>
                        )}
                    </CardActions>
                </Card>

                <AddAssignment
                    addAssignmentOpen={this.state.addAssignmentOpen}
                    handleAddAssignmentClose={this.handleAddAssignmentClose}
                    assignmentName={this.state.assignmentName}
                    handleChange={this.handleChange}
                    assignmentDescription={this.state.assignmentDescription}
                    onAddAssignment={this.onAddAssignment}
                />
                <CommentDialog
                    commentOpen={this.state.commentOpen}
                    handleCommentClose={this.handleCommentClose}
                    comments={this.props.comments}
                    isAuth={this.props.isAuth}
                    commentContent={this.state.commentContent}
                    handleChange={this.handleChange}
                    onAddComment={this.onAddComment}
                    name={name}
                />
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    {
        createAssignment,
        loadCourses,
        comment,
        addCourse,
        loadUser,
        removeCourse
    }
)(withStyles(styles)(CourseCard));
