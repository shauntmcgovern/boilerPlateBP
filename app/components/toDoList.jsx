var reactBase = require('react');
var {connect} = require('react-redux');
import toDo from 'toDo';
var toDoAPI = require('toDoAPI');

export class toDoList extends reactBase.Component 
{
  render () 
  {
    var {toDos, showCompleted, searchText} = this.props;
    var renderToDos = () => 
    {
      var filteredToDos = toDoAPI.filtertoDos(toDos, showCompleted, searchText);
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
(toDoList);
