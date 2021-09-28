var ReactBase = require('react');
var {connect} = require('react-redux');
var actionToBeCompleted = require('actions');

export class AddToDo extends ReactBase.Component {
  handleSubmit (e) {
    e.preventDefault();
    var {dispatch} = this.props;
    var toDoText = this.refs.toDoText.value;

    if (toDoText.length > 0) {
      this.refs.toDoText.value = '';
      dispatch(actions.startAddToDo(toDoText));
    } else {
      this.refs.toDoText.focus();
    }
  }
  render () {
    return (
      <div className="container__footer">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type="text" ref="toDoText" placeholder="What do you need to do?">
          <button className="button expanded">Add ToDo</button>
        </form>
      </div>
    );
  }
};

export default connect()(AddToDo);
