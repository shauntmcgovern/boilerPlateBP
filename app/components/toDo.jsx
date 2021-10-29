var reactBase = require('react');
var {connect} = require('react-redux');
var momentAction = require('moment');
var actionToBeCompleted = require('actions');

export class toDo extends reactBase.Component {
  render () {
    var {id, text, completed, createdAt, completedAt, dispatch} = this.props;
    var toDoClassName = completed ? 'toDo toDo-completed' : 'toDo';
    var renderDate = () => {
      var message = 'Created';
      var timeStamp = createdAt;

      if (completed) {
        message = 'Completed';
        timeStamp = completedAt;
      }

      return message + momentAction.unix(timeStamp).format('MMM Do YYYY @ h:mm a');
    };

    return (
      <div className={toDoClassName} onClick={() => {
          dispatch(actionToBeCompleted.startToggleToDo(id, !completed));
        }}>
        <div>
          <input type="checkbox" checked={completed}>
        </div>
        <div>
          <p>{text}</p>
          <p className="toDo__subtext">{renderDate()}</p>
        </div>
      </div>
    )
  }
};

export default connect()(toDo);
