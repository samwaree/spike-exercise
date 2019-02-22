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
import {
    rateAssignment,
    loadCourses,
    editDescription
} from "../redux/actions/actions";
import { connect } from "react-redux";
import mapLetterToGPA from "../utilities/assignment.util";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import EditIcon from "@material-ui/icons/Edit";
import Paper from "@material-ui/core/Paper";

import {
    Typography,
    ListItem,
    ListItemText,
    ListItemSecondaryAction
} from "@material-ui/core";

const styles = theme => ({
    main: {
        maxWidth: 400
    }
});

const mapStateToProps = state => {
    return {
        isAuth: state.user.isAuth
    };
};

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
            editDescription: "",
            grade: ""
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

    onRateSubmit = e => {
        this.props.rateAssignment(
            {
                id: this.props.assignment_id,
                rating: mapLetterToGPA(this.state.grade)
            },
            () => {
                this.handleRateClose();
                this.props.loadCourses();
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
                this.props.loadCourses();
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
                                                onClick={this.handleRateOpen}
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
                                </div>
                            )}
                        </Grid>
                    </Grid>
                </ListItem>

                <Dialog
                    open={this.state.rateOpen}
                    onClose={this.handleRateClose}
                >
                    <DialogTitle>Rate Assignment</DialogTitle>
                    <DialogContent>
                        <TextField
                            id="grade"
                            select
                            label="Select"
                            value={this.state.grade}
                            onChange={this.handleSelect}
                            fullWidth
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
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={this.handleRateClose}
                            color="primary"
                            fullWidth
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={this.onRateSubmit}
                            color="primary"
                            fullWidth
                        >
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={this.state.editOpen}
                    onClose={this.handleEditClose}
                >
                    <DialogTitle>Edit Assignment</DialogTitle>
                    <DialogContent>
                        <TextField
                            id="editDescription"
                            label="Edit Description"
                            value={this.state.editDescription}
                            onChange={this.handleChange}
                            fullWidth
                            multiline={true}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={this.handleEditClose}
                            color="primary"
                            fullWidth
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={this.onEditSubmit}
                            color="primary"
                            fullWidth
                        >
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

AssignmentCard.contextTypes = {
    router: PropTypes.object.isRequired
};

export default connect(
    mapStateToProps,
    { rateAssignment, loadCourses, editDescription }
)(withStyles(styles)(AssignmentCard));
