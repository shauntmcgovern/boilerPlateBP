var ReactBase = require('react');
var {connect} = require('react-redux');
import ToDo from 'ToDo';
var ToDoAPI = require('ToDoAPI');

export class ToDoList extends ReactBase.Component 
{
  render () 
  {
    var {toDos, showCompleted, searchText} = this.props;
    var renderToDos = () => 
    {
      var filteredToDos = ToDoAPI.filterToDos(toDos, showCompleted, searchText);
      if (filteredToDos.length === 0) 
      {
        return (<p className="container__message">Nothing To Do</p>);
      }
      return filteredToDos.map((toDo) => 
      {
        return (<ToDo key={toDo.id} {...toDo}/>);
      });
    };

    return (
      <div>
        {renderTodos()}
      </div>
    )
  }
};

export default connect((state) => {return state;}) 
(ToDoList);
