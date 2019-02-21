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
import { stat } from 'fs';
import { connect } from 'react-redux';

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
                                <Assignment assignment={data.name} description={data.description} gpa={data.gpa}/>
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
    render() {
        const assignment = this.props.assignment
        const description = this.props.description

        return(
            <Card spacing="16">
                <CardHeader title={assignment} subheader={description}
                action = {
                    <IconButton>
                        <StarRateIcon/>
                    </IconButton>
                }
                />
            </Card>
        )
    }
}
export default connect(mapStateToProps)(withStyles(styles)(CourseCard));