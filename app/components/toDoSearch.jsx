var ReactBase = require('react');
var {connect} = require('react-redux');
var actionToBeCompleted = require('actions');

export class ToDoSearch extends ReactBase.Component {
  render () {
    var {dispatch, showCompleted, searchText} = this.props;

    return (
      <div className="container__header">
        <div>
          <input type="search" ref="searchText" placeholder="Search toDos" value={searchText} onChange={() => {
              var searchText = this.refs.searchText.value;
              dispatch(actions.setSearchText(searchText));
            }}/>
        </div>
        <div>
          <label>
            <input type="checkbox" ref="showCompleted" checked={showCompleted} onChange={() => {
                dispatch(actions.toggleShowCompleted());
              }}/>
            Show completed toDos
          </label>
        </div>
      </div>
    )
  }
};

export default connect(
  (state) => {
    return {
      showCompleted: state.showCompleted,
      searchText: state.searchText
    }
  }
)

(ToDoSearch);
