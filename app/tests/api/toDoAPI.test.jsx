var expect = require('expect');

var toDoAPI = require('toDoAPI');

describe('toDoAPI', () => {
  beforeEach(() => {
    localStorage.removeItem('toDos');
  });

  it('should exist', () => {
    expect(toDoAPI).toExist();
  });

  describe('filterToDos', () => {
    var toDos = [{
      id: 1,
      text: 'Some text here',
      completed: true
    },{
      id: 2,
      text: 'Other text here',
      completed: false
    },{
      id: 3,
      text: 'Some text here',
      completed: true
    }];

    it('should return all items if showCompleted is true', () => {
      var filteredToDos = toDoAPI.filterToDos(toDos, true, '');
      expect(filteredToDos.length).toBe(3);
    });

    it('should return non-completed todos when showCompleted is false', () => {
      var filteredToDos = toDoAPI.filterToDos(toDos, false, '');
      expect(filteredToDos.length).toBe(1);
    });

    it('should sort by completed status', () => {
      var filteredToDos = toDoAPI.filterToTos(toDos, true, '');
      expect(filteredToDos[0].completed).toBe(false);
    });

    it('should filter todos by searchText', () => {
      var filteredToDos = toDoAPI.filterTodos(toDos, true, 'some');
      expect(filteredToDos.length).toBe(2);
    });

    it('should filter todos by searchText if upper case', () => {
      var filteredToDos = toDoAPI.filterToDos(toDos, true, 'Some');
      expect(filteredToDos.length).toBe(2);
    });

    it('should return all todos if searchText is empty', () => {
      var filteredToDos = toDoAPI.filterToDos(toDos, true, '');
      expect(filteredToDos.length).toBe(3);
    });
  });
});
