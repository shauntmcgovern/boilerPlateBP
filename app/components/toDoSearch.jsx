var reactBase = require('react');
var {connect} = require('react-redux');
var actionToBeCompleted = require('actions');

export class toDoSearch extends reactBase.Component {
  render () {
    var {dispatch, showCompleted, searchText} = this.props;

    return (
      <div className="container__header">
        <div>
          <input type="search" ref="searchText" placeholder="Search To Dos" value={searchText} onChange={() => {
              var searchText = this.refs.searchText.value;
              dispatch(actions.setSearchText(searchText));
            }}/>
        </div>
        <div>
          <label>
            <input type="checkbox" ref="showCompleted" checked={showCompleted} onChange={() => {
                dispatch(actions.toggleShowCompleted());
              }}/>
            Show completed To Dos
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

(toDoSearch);
