import * as React from 'react';
import Homepage from './Homepage';
import LoginForm from './LoginForm';
import '../main.scss';

const apiUrl = 'http://www.snagfilms.com/apis/films.json?limit=10';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInAccount: null,
      loadingApi: false,
      films: []
    };
  }

  handleLogin = email => {
    this.setState({ loggedInAccount: email, loadingApi: true });
    fetch(apiUrl)
      .then(res => res.json())
      .then(res => {
        this.setState({ films: res.films.film, loadingApi: false });
      });
  };

  render() {
    const { loggedInAccount, films } = this.state;
    return (
      <div id="App">
        <header>
          <div className="logo">LoginCo</div>
          {loggedInAccount && (
            <div className="loggedInAs">
              Logged in as:{' '}
              <span className="accountEmail">{loggedInAccount}</span>
            </div>
          )}
        </header>
        {loggedInAccount ? (
          <Homepage films={films} />
        ) : (
          <LoginForm onLogin={this.handleLogin} />
        )}
      </div>
    );
  }
}
