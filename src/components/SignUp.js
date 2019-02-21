import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import { createUser } from '../redux/actions/actions'
import { Redirect } from 'react-router-dom';

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


const mapStateToProps = (state) => {
    return {
        isAuth: state.user.isAuth
    }
}

class SignUp extends React.Component  {
    
    constructor(props) {
        super(props)

        this.state = {
            username: "",
            password: "",
            passwordConfirm: "",
        }
    }

    handleUserInput = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    handlePassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    handlePasswordConfirm = (e) => {
        this.setState({
            passwordConfirm: e.target.value
        })
    }

    validateForm() {
        return (
            this.state.username.length > 0 && this.state.password.length > 0 && this.state.password === this.state.passwordConfirm
        )
    }

    onSubmit = (e) => {
        this.props.createUser( {
            username: this.state.username,
            password: this.state.password
        })
        e.preventDefault()
    }

    renderRedirect = () => {
        if (this.props.isAuth) {
          this.context.router.history.push('/')
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <main className={classes.main}>
            {this.renderRedirect()}
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={this.onSubmit}>
          <FormControl margin="normal" required fullWidth value={this.state.username} onChange={this.handleUserInput}>
            <InputLabel htmlFor="email">Username</InputLabel>
            <Input id="email" name="email" autoComplete="email" autoFocus />
          </FormControl>
          <FormControl margin="normal" required fullWidth value={this.state.password} onChange={this.handlePassword}>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input name="password" type="password" id="password" />
          </FormControl>
          <FormControl margin="normal" required fullWidth value={this.state.passwordConfirm} onChange={this.handlePasswordConfirm}>
            <InputLabel htmlFor="password">Confirm Password</InputLabel>
            <Input name="password" type="password" id="password" />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!this.validateForm()}
          >
            Sign Up
          </Button>
        </form>
      </Paper>
    </main>
        );
    }

}

SignUp.contextTypes = {
    router: PropTypes.object.isRequired
}

export default connect(mapStateToProps, { createUser })(withStyles(styles)(SignUp));