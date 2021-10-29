import reactBase from 'react';
import * as Redux from 'react-redux';

import toDoList from 'toDoList'
import addToDo from 'addToDo';
import toDoSearch from 'toDoSearch';
import * as actionToBeCompleted from 'actions';

export class toDoApp extends reactBase.Component {
  onLogout (e) {
    var {dispatch} = this.props;
    e.preventDefault();

    dispatch(actionToBeCompleted.startLogout());
  }
  render () {
    return (
      <div>
        <div className="page-actions">
          <a href="#" onClick={this.onLogout.bind(this)}>Logout</a>
        </div>

        <h1 className="page-title">to Do App</h1>

        <div className="row">
          <div className="column small-centered small-11 medium-6 large-5">
            <div className="container">
              <ToDoSearch/>
              <ToDoList/>
              <AddToDo/>
            </div>
          </div>
        </div>
      </div>
    )
  }
};

export default Redux.connect()(toDoApp);
