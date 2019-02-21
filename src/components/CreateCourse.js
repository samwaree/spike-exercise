import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CssBaseline, withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem'

const styles = theme => ({
    main: {
      width: 'auto',
      display: 'block', // Fix IE 11 issue.
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
        width: 400,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    paper: {
      marginTop: theme.spacing.unit * 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
      margin: theme.spacing.unit,
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing.unit,
    },
    submit: {
      marginTop: theme.spacing.unit * 3,
    },
});

const semesters = [
    {
        value: 0,
        label: 'Spring 2019'
    },
    {
        value: 1,
        label: 'Fall 2018'
    }
]



class CreateCourse extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            name: "",
            semester: "",
            label: "",
            user: ""
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    
    render() {
        const { classes } = this.props;

        return(
            <main className={classes.main}>
            <CssBaseline/>
            <Paper className={classes.paper}>
            <Typography component="h1" variant="h5">
            Create Course
            </Typography>
            <form className={classes.form} >
                <FormControl margin="normal" required fullWidth value={this.state.name} onChange={this.handleChange}>
                    <InputLabel>Name</InputLabel>
                    <Input name="name" id="name"/>
                </FormControl>
                <FormControl margin="normal" required fullWidth value="Spring 2019" >
                    <TextField
                        id="semester"
                        select
                        label="Select"
                        value={this.state.semester}
                        onChange={this.handleChange}
                    >
                        {semesters.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </FormControl>
            </form>
            </Paper>
            </main>
        )
    }
}

export default withStyles(styles)(CreateCourse)