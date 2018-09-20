import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'

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

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        name: '',
        password: '',
        email: ''
      },
      submitted: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }
  errorPass = false;

  handleChange(event) {
    const { name, value } = event.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value
      }
    });
  }

  handleSubmit(event) {
    // var regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    var regex = /^(?=.*?[A-Z])(?=.*\d)(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{10,}$/;

    event.preventDefault();

    this.setState({ submitted: true });

    const { user } = this.state;
    const { dispatch } = this.props;
    if (!regex.exec(user.password)) {
      debugger
      this.errorPass = true;
    }
    else if (user.name && user.email && user.password) {
      this.errorPass = false;
      dispatch(userActions.register(user));
    }
  }

  setRedirectBack = () => {
    this.setState({
      redirectBack: true
    })
  }

  renderRedirectBack = () => {
    if (this.state.redirectBack) {
      return <Redirect to='/login' />
    }
  }

  render() {
    const { registering } = this.props;
    const { user, submitted } = this.state;

    return (
      <div className="app">
        <React.Fragment>
          <CssBaseline />
          <main className="layout box-shadow border-center">
            <Paper className="paper">
              <Avatar className="avatar">
                <LockIcon />
              </Avatar>
              <Typography variant="headline">Registrar</Typography>
              <form id="registerForm" className="form" onSubmit={this.handleSubmit}>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="nome">Nome</InputLabel>
                  <Input
                    id="name"
                    name="name"
                    autoComplete="nome"
                    autoFocus
                    value={user.name}
                    onChange={this.handleChange} />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="email">E-mail</InputLabel>
                  <Input
                    id="email"
                    name="email"
                    autoComplete="email"
                    value={user.email}
                    onChange={this.handleChange} />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input
                    name="password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={user.password}
                    onChange={this.handleChange}
                  />
                  {submitted && this.errorPass &&
                    <div className="help-block">A senha deve conter no mínimo 10 caracteres, dos quais deve possuir no mínimo 1 letra maiúscula, 1
                    número e 1 caractere especial
                  </div>}
                </FormControl>
                <Button
                  type="submit"
                  fullWidth
                  variant="raised"
                  color="primary"
                  className="button-signin"
                >
                  Cadastrar
            </Button>
                <Button
                  type="button"
                  fullWidth
                  variant="raised"
                  color="primary"
                  className="button-signin"
                  onClick={this.setRedirectBack}
                >
                  {this.renderRedirectBack()}
                  Voltar
            </Button>
              </form>
            </Paper>
          </main>
        </React.Fragment>
      </div>
    );
  }

}

// RegisterPage.propTypes = {
//   classes: PropTypes.object.isRequired,
// };


function mapStateToProps(state) {
  const { registering } = state.registration;
  return {
    registering
  };
}

const connectedRegisterPage = connect(mapStateToProps)(RegisterPage);
export { connectedRegisterPage as RegisterPage };