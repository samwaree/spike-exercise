import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadCourses } from '../redux/actions/actions'
import CourseCard from './CourseCard'
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add'
import PropTypes from 'prop-types';

const mapStateToProps = state => {
    return {
        courses: state.courses.courses,
        isAuth: state.user.isAuth
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

    onAdd = () => {
        this.context.router.history.push('/createcourse')
    }

    render() {  
        const { classes } = this.props;
        return (
            <Grid className={classes.buttonPadding} container direction="row" justify="center" alignItems="center" spacing={16}> 
                {this.props.courses.map(data => {
                    return (<Grid key={data._id} item sm>
                        <CourseCard name={data.name} semester={data.semester} assignments={data.assignments} gpa={data.gpa}/>
                    </Grid>)
                })}
                {this.props.isAuth &&
                    <Grid item>
                    <IconButton
                        onClick={this.onAdd}
                    >
                        <AddIcon/>
                    </IconButton>
                </Grid>
                }
                
            </Grid>
        );
    }
}

Feed.contextTypes = {
    router: PropTypes.object.isRequired
}

export default connect(mapStateToProps, { loadCourses })(withStyles(styles)(Feed));