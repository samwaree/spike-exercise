import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import StarRateIcon from '@material-ui/icons/StarRate'
import InsertCommentIcon from '@material-ui/icons/InsertComment'
import AddIcon from '@material-ui/icons/Add'
import CardActions from '@material-ui/core/CardActions';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem'


const styles = theme => ({
    card: {
        maxWidth: 400,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    actions: {
        display: 'flex',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
});
  

const mapStateToProps = state => {
    return {
        isAuth: state.user.isAuth
    }
}

class CourseCard extends React.Component {
    
    shouldComponentUpdate(nextProps) {
        const different = this.props.gpa.toFixed(2) !== nextProps.gpa.toFixed(2);
        return different
    }

    render() {
        const name = this.props.name
        const semester = this.props.semester
        const assignments = this.props.assignments
        const gpa = this.props.gpa.toFixed(2)


        return (
            <Card className={this.props.card}>
                <CardHeader className={this.props.heading} title={name} subheader={semester}
                
                action={this.props.isAuth &&
                    <IconButton>
                        <InsertCommentIcon />
                    </IconButton>
                  }       
                  />
                  <CardContent>
                      <Typography>Overall Rating: {gpa}</Typography>
                  </CardContent>

                  <CardActions>
                      <ExpansionPanel >
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Assignments</Typography>
                        </ExpansionPanelSummary>
                        {assignments.map(data => {
                            return (<div key={data._id}>
                                <Assignment assignment_id={data._id} assignment={data.name} description={data.description} gpa={data.gpa}/>
                            </div>)
                        })}
                      </ExpansionPanel>
                      {this.props.isAuth &&
                      <IconButton>
                          <AddIcon />
                      </IconButton>
                      }
                  </CardActions>
            </Card>
        );
    }
}


class Assignment extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            options: [
                {
                    value: 0,
                    label: 'A'
                },
                {
                    value: 1,
                    label: 'A-'
                },
                {
                    value: 2,
                    label: 'B+'
                },
                {
                    value: 3,
                    label: 'B'
                },
                {
                    value: 4,
                    label: 'B-'
                },
                {
                    value: 5,
                    label: 'C+'
                },
                {
                    value: 6,
                    label: 'C'
                },
                {
                    value: 7,
                    label: 'C-'
                },
                {
                    value: 8,
                    label: 'D+'
                },
                {
                    value: 9,
                    label: 'D'
                },
                {
                    value: 10,
                    label: 'D-'
                },{
                    value: 11,
                    label: 'F'
                },
            ],
            open: false,
            grade: ""
        }
    }
    
        handleSelect = (e) => {
            this.setState({
                grade: e.target.value
            })
        }
      handleClickOpen = () => {
        this.setState({ open: true });
      };
    
      handleClose = () => {
        this.setState({ open: false });
      };

    render() {

        const assignment = this.props.assignment
        const description = this.props.description
        const id = this.props.assignment_id

        
        return(
            <div>
            <Card spacing="16">
                <CardHeader title={assignment} subheader={description}
                action = {
                    <IconButton onClick={this.handleClickOpen}>
                        <StarRateIcon/>
                    </IconButton>
                }
                />
            </Card>
            
            <Dialog open={this.state.open}onClose={this.handleClose}>
                <DialogTitle >Rate Assignment</DialogTitle>
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
                            <MenuItem id="semesterLabel" key={option.value} value={option.label}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </DialogContent>
                <DialogActions>
                <Button onClick={this.handleClose} color="primary" fullWidth>
                Cancel
                </Button>
                <Button onClick={this.handleClose} color="primary" fullWidth>
                Submit
                </Button>
                </DialogActions>
            </Dialog>
            </div>
        )
    }
}
export default connect(mapStateToProps)(withStyles(styles)(CourseCard));