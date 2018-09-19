import React from 'react';
import { Redirect } from 'react-router-dom'

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { userActions } from '../../_actions';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      submit: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  setRedirect = () => {
    this.setState({
      redirect: true,
      submit: false
    })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/register' />
    }
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({ submitted: true });

    const { email, password } = this.state;
    const { dispatch } = this.props;
    debugger
    if (email && password) {
      dispatch(userActions.login(email, password));
    }
  }


  render() {
    const { loggingIn } = this.props;
    const { email, password, submitted } = this.state;
    return (
      <React.Fragment>
        <CssBaseline />
        <main className="layout box-shadow border-center">
          <Paper className="paper">
            <Avatar className="avatar">
              <LockIcon />
            </Avatar>
            <Typography variant="headline">Autenticação</Typography>
            <form id="loginForm" className="form" onSubmit={this.handleSubmit}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email Address</InputLabel>
                <Input
                  id="email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={this.handleChange} />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={this.handleChange}
                />
                {
                  this.state.alert &&
                   <div className="help-block" >{this.state.alert.message}</div>
                }
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="raised"
                color="primary"
                className="button-signin"
              >
                Entrar
            </Button>

              <Button
                type="button"
                fullWidth
                variant="raised"
                color="primary"
                className="button-signin"
                onClick={this.setRedirect}
              >
                {this.renderRedirect()}
                Não tem conta? Registre-se
            </Button>
            </form>
          </Paper>
        </main>
      </React.Fragment>
    );
  }

}

// LoginPage.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

function mapStateToProps(state) {
  const { loggingIn } = state.authentication;
  return {
    loggingIn
  };
}
// export default withStyles(styles)(LoginPage);
const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage }; 