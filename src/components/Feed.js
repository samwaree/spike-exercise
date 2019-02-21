import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadCourses } from '../redux/actions/actions'
import CourseCard from './CourseCard'
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

const mapStateToProps = state => {
    return {
        courses: state.courses.courses
    }
}

const styles = theme => ({
    buttonPadding: {    
      padding: '16px',   
    },
});

class Feed extends Component {

    componentWillMount() {
        this.props.loadCourses()
    }

    render() {  
        const { classes } = this.props;
        return (
            <Grid className={classes.buttonPadding} container direction="row" justify="center" alignItems="center" spacing={16}> 
                {this.props.courses.map(data => {
                    return (<Grid key={data._id} item>
                        <CourseCard name={data.name} semester={data.semester} assignments={data.assignments} gpa={data.gpa}/>
                    </Grid>)
                })}
            </Grid>
        );
    }
}
export default connect(mapStateToProps, { loadCourses })(withStyles(styles)(Feed));