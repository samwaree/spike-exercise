import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import InsertCommentIcon from "@material-ui/icons/InsertComment";
import AddIcon from "@material-ui/icons/Add";
import CardActions from "@material-ui/core/CardActions";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import AssignmentCard from "./AssignmentCard";
import EditIcon from "@material-ui/icons/Edit";
import List from "@material-ui/core/List";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {
    createAssignment,
    loadCourses,
    comment
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
        user_id: state.user.user._id
    };
};

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class CourseCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            addAssignmentOpen: false,
            commentOpen: false,
            assignmentName: "",
            assignmentDescription: "",
            commentContent: ""
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
                this.props.loadCourses();
            }
        );
        e.preventDefault();
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
                this.props.loadCourses();
            }
        );
    };

    render() {
        const name = this.props.name;
        const semester = this.props.semester;
        const assignments = this.props.assignments;
        const gpa = this.props.gpa.toFixed(2);
        const comments = this.props.commments;

        return (
            <div>
                <Card style={{ maxWidth: 440 }}>
                    <CardHeader
                        className={this.props.heading}
                        title={name}
                        subheader={semester}
                        action={
                            <IconButton onClick={this.handleCommentOpen}>
                                <InsertCommentIcon />
                            </IconButton>
                        }
                    />
                    <CardContent>
                        <Typography>Overall Rating: {gpa}</Typography>
                    </CardContent>

                    <CardActions>
                        <ExpansionPanel style={{ maxWidth: 320 }}>
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
                                                gpa={data.gpa}
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
                                <IconButton>
                                    <EditIcon />
                                </IconButton>
                            </div>
                        )}
                    </CardActions>
                </Card>

                <Dialog
                    open={this.state.addAssignmentOpen}
                    onClose={this.handleAddAssignmentClose}
                >
                    <DialogTitle>Add Assignment</DialogTitle>
                    <DialogContent>
                        <TextField
                            id="assignmentName"
                            label="Assignment Name"
                            value={this.state.assignmentName}
                            onChange={this.handleChange}
                            fullWidth
                            required
                        />
                        <TextField
                            id="assignmentDescription"
                            label="Description"
                            value={this.state.assignmentDescription}
                            onChange={this.handleChange}
                            fullWidth
                            multiline={true}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={this.handleAddAssignmentClose}
                            color="primary"
                            fullWidth
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={this.onAddAssignment}
                            color="primary"
                            fullWidth
                        >
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    fullScreen
                    open={this.state.commentOpen}
                    onClose={this.handleCommentClose}
                    TransitionComponent={Transition}
                >
                    <AppBar style={{ position: "relative" }}>
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                onClick={this.handleCommentClose}
                                aria-label="Close"
                            >
                                <CloseIcon />
                            </IconButton>
                            <Typography
                                variant="h6"
                                color="inherit"
                                style={{ flex: 1 }}
                            >
                                Comments for {name}
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <List>
                        {this.props.comments.map(element => {
                            return (
                                <div key={element._id}>
                                    <ListItem divider={true}>
                                        <ListItemText
                                            primary={element.content}
                                        />
                                    </ListItem>
                                </div>
                            );
                        })}
                    </List>
                    {this.props.isAuth && (
                        <Paper>
                            <InputBase
                                style={{ padding: 16, width: "94%" }}
                                placeholder="Comment..."
                                value={this.state.commentContent}
                                id="commentContent"
                                onChange={this.handleChange}
                            />
                            <IconButton onClick={this.onAddComment}>
                                <SendIcon />
                            </IconButton>
                        </Paper>
                    )}
                </Dialog>
                <Dialog />
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    { createAssignment, loadCourses, comment }
)(withStyles(styles)(CourseCard));
