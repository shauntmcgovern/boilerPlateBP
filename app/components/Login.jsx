import ReactBase from 'react';
import * as Redux from 'react-redux';

import * as actionToBeCompleted from 'actions';

export class Login extends ReactBase.Component {
  constructor (props) {
    super(props);
    this.onLogin = this.onLogin.bind(this);
  }
  onLogin () {
    var {dispatch} = this.props;

    dispatch(actionToBeCompleted.startLogin());
  }
  render () {
    return (
      <div>
        <h1 className="page-title">Boiler Plate FireBase</h1>

        <div className="row">
          <div className="columns small-centered small-10 medium-6 large-4">
            <div className="callout callout-auth">
              <h3>LOGIN</h3>
              <p>
                Login with GitHub account below.
              </p>
              <button className="button" onClick={this.onLogin}>Login With GitHub</button>
            </div>
          </div>
        </div>

      </div>
    );
  }
};

export default Redux.connect()(Login);
