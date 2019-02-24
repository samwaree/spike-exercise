import React from "react";
import IconButton from "@material-ui/core/IconButton";
import StarRateIcon from "@material-ui/icons/StarRate";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import List from "@material-ui/core/List";
import Menu from "@material-ui/core/Menu";
import {
    rateAssignment,
    loadCourses,
    editDescription,
    deleteAssignment
} from "../redux/actions/actions";
import { connect } from "react-redux";
import mapLetterToGPA from "../utilities/assignment.util";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import EditIcon from "@material-ui/icons/Edit";
import Slide from "@material-ui/core/Slide";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CloseIcon from "@material-ui/icons/Close";
import { Typography, ListItem, ListItemText } from "@material-ui/core";

const styles = theme => ({
    main: {
        maxWidth: 400
    }
});

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

const mapStateToProps = state => {
    return {
        isAuth: state.user.isAuth
    };
};

const EditDialog = props => (
    <Dialog open={props.editOpen} onClose={props.handleEditClose}>
        <DialogTitle>Edit Assignment</DialogTitle>
        <DialogContent>
            <TextField
                id="editDescription"
                label="Edit Description"
                value={props.editDescription}
                onChange={props.handleChange}
                fullWidth
                multiline={true}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={props.handleEditClose} color="primary" fullWidth>
                Cancel
            </Button>
            <Button onClick={props.onEditSubmit} color="primary" fullWidth>
                Submit
            </Button>
            <Button onClick={props.onDelete} color="secondary">
                Delete
            </Button>
        </DialogActions>
    </Dialog>
);

const RateDialog = props => (
    <Dialog open={props.rateOpen} onClose={props.handleRateClose}>
        <DialogTitle>Rate Assignment</DialogTitle>
        <DialogContent>
            <TextField
                id="grade"
                select
                label="Select"
                value={props.grade}
                onChange={props.handleSelect}
                fullWidth
            >
                {props.options.map(option => (
                    <MenuItem
                        id="semesterLabel"
                        key={option.value}
                        value={option.label}
                    >
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                id="rateFeedback"
                label="Rating Feedback"
                value={props.rateFeedback}
                onChange={props.handleChange}
                fullWidth
                multiline={true}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={props.handleRateClose} color="primary" fullWidth>
                Cancel
            </Button>
            <Button onClick={props.onRateSubmit} color="primary" fullWidth>
                Submit
            </Button>
        </DialogActions>
    </Dialog>
);

const ViewRatingsDialog = props => (
    <Dialog
        open={props.viewRateOpen}
        onClose={props.handleViewRateClose}
        fullScreen
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
                    onClick={props.handleViewRateClose}
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
                    Ratings for {props.assignment}
                </Typography>
            </Toolbar>
        </AppBar>
        <List>
            {props.ratings.map(element => {
                return (
                    <div key={element._id}>
                        <ListItem divider={true}>
                            <ListItemText
                                primary={element.number}
                                secondary={element.description}
                            />
                        </ListItem>
                    </div>
                );
            })}
        </List>
    </Dialog>
);

class AssignmentCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            options: [
                {
                    value: 0,
                    label: "A"
                },
                {
                    value: 1,
                    label: "A-"
                },
                {
                    value: 2,
                    label: "B+"
                },
                {
                    value: 3,
                    label: "B"
                },
                {
                    value: 4,
                    label: "B-"
                },
                {
                    value: 5,
                    label: "C+"
                },
                {
                    value: 6,
                    label: "C"
                },
                {
                    value: 7,
                    label: "C-"
                },
                {
                    value: 8,
                    label: "D+"
                },
                {
                    value: 9,
                    label: "D"
                },
                {
                    value: 10,
                    label: "F"
                }
            ],
            rateOpen: false,
            editOpen: false,
            viewRateOpen: false,
            rateMenuOpen: false,
            editDescription: "",
            anchorEl: null,
            grade: "",
            rateFeedback: ""
        };
    }

    handleSelect = e => {
        this.setState({
            grade: e.target.value
        });
    };

    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        });
    };

    handleEditOpen = () => {
        this.setState({ editOpen: true });
    };

    handleEditClose = () => {
        this.setState({ editOpen: false });
    };

    handleRateOpen = () => {
        this.setState({ rateOpen: true });
    };

    handleRateClose = () => {
        this.setState({ rateOpen: false });
    };

    handleViewRateOpen = () => {
        this.setState({ viewRateOpen: true });
    };

    handleViewRateClose = () => {
        this.setState({ viewRateOpen: false });
    };

    handleRateMenuOpen = e => {
        this.setState({ rateMenuOpen: true, anchorEl: e.currentTarget });
    };

    handleRateMenuClose = () => {
        this.setState({ rateMenuOpen: false });
    };

    onDelete = e => {
        this.props.deleteAssignment(
            {
                assignment_id: this.props.assignment_id
            },
            () => {
                this.handleRateClose();
                this.props.loadCourses(() => {
                    this.props.updateUserCourses();
                });
            }
        );
    };

    onRateSubmit = e => {
        this.props.rateAssignment(
            {
                id: this.props.assignment_id,
                rating: mapLetterToGPA(this.state.grade),
                description: this.state.rateFeedback
            },
            () => {
                this.handleRateClose();
                this.props.loadCourses(() => {
                    this.props.updateUserCourses();
                });
            }
        );
        e.preventDefault();
    };

    onEditSubmit = e => {
        this.props.editDescription(
            {
                id: this.props.assignment_id,
                description: this.state.editDescription
            },
            () => {
                this.handleEditClose();
                this.setState({
                    editDescription: ""
                });
                this.props.loadCourses(() => {
                    this.props.updateUserCourses();
                });
            }
        );
        e.preventDefault();
    };
    render() {
        const assignment = this.props.assignment;
        const description = this.props.description;

        return (
            <div className={styles.main}>
                <ListItem alignItems="flex-start" divider={true}>
                    <Grid
                        justify="space-between" // Add it here :)
                        container
                        spacing={0}
                    >
                        <Grid
                            item
                            style={{
                                maxWidth: "82%"
                            }}
                        >
                            <ListItemText
                                primary={assignment}
                                secondary={description}
                            />
                        </Grid>
                        <Grid item>
                            {this.props.isAuth && (
                                <div>
                                    <Grid style={{ width: "flex" }}>
                                        <Grid item>
                                            <IconButton
                                                onClick={
                                                    this.handleRateMenuOpen
                                                }
                                            >
                                                <StarRateIcon fontSize="small" />
                                            </IconButton>
                                        </Grid>
                                        <Grid item>
                                            <IconButton
                                                onClick={this.handleEditOpen}
                                            >
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                    <Menu
                                        open={this.state.rateMenuOpen}
                                        onClose={this.handleRateMenuClose}
                                        anchorEl={this.state.anchorEl}
                                    >
                                        <MenuItem onClick={this.handleRateOpen}>
                                            Rate Assignment
                                        </MenuItem>
                                        <MenuItem
                                            onClick={this.handleViewRateOpen}
                                        >
                                            View Ratings
                                        </MenuItem>
                                    </Menu>
                                </div>
                            )}
                        </Grid>
                    </Grid>
                </ListItem>

                <RateDialog
                    rateOpen={this.state.rateOpen}
                    handleRateClose={this.handleRateClose}
                    grade={this.state.grade}
                    handleSelect={this.handleSelect}
                    handleChange={this.handleChange}
                    options={this.state.options}
                    onRateSubmit={this.onRateSubmit}
                    rateFeedback={this.state.rateFeedback}
                />
                <EditDialog
                    editOpen={this.state.editOpen}
                    handleEditClose={this.handleEditClose}
                    editDescription={this.state.editDescription}
                    handleChange={this.handleChange}
                    onEditSubmit={this.onEditSubmit}
                    onDelete={this.onDelete}
                />
                <ViewRatingsDialog
                    viewRateOpen={this.state.viewRateOpen}
                    handleViewRateClose={this.handleViewRateClose}
                    assignment={this.props.assignment}
                    ratings={this.props.ratings}
                />
            </div>
        );
    }
}

AssignmentCard.contextTypes = {
    router: PropTypes.object.isRequired
};

export default connect(
    mapStateToProps,
    { rateAssignment, loadCourses, editDescription, deleteAssignment }
)(withStyles(styles)(AssignmentCard));
