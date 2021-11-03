import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
var expect = require('expect');

import fireBase, {fireBaseRef} from 'app/fireBase/';
var actions = require('actions');

var createMockStore = configureMockStore([thunk]);

describe('Actions', () => {
  it('should generate search text action', () => {
    var action = {
      type: 'SET_SEARCH_TEXT',
      searchText: 'Some search text'
    };
    var res = actions.setSearchText(action.searchText);

    expect(res).toEqual(action);
  });

  it('should generate toggle show completed action', () => {
    var action = {
      type: 'TOGGLE_SHOW_COMPLETED'
    };
    var res = actions.toggleShowCompleted();

    expect(res).toEqual(action);
  });

  it('should generate add toDo action', () => {
    var action = {
      type: 'ADD_TODO',
      toDo: {
        id: '123abc',
        text: 'Anything we like',
        completed: false,
        createdAt: 0
      }
    };
    var res = actions.addToDo(action.toDo);

    expect(res).toEqual(action);
  });

  it('should generate add toDos action object', () => {
    var toDos = [{
      id: '111',
      text: 'anything',
      completed: false,
      completedAt: undefined,
      createdAt: 33000
    }];
    var action = {
      type: 'ADD_TODOS',
      toDos
    };
    var res = actions.addToDos(toDos);

    expect(res).toEqual(action);
  });

  it('should generate update todo action', () => {
    var action = {
      type: 'UPDATE_TODO',
      id: '123',
      updates: {completed: false}
    };
    var res = actions.updateToDo(action.id, action.updates);

    expect(res).toEqual(action);
  });

  it('should generate login action object', () => {
    const action = {
      type: 'LOGIN',
      uid: '123abc'
    };
    const res = actions.login(action.uid);

    expect(res).toEqual(action);
  });

  it('should generate logout action object', () => {
    const action = {
      type: 'LOGOUT'
    };
    const res = actions.logout();

    expect(res).toEqual(action);
  });

  describe('Tests with fireBase toDos', () => {
    var testToDoRef;
    var uid;
    var toDosRef;

    beforeEach((done) => {
      fireBase.auth().signInAnonymously().then((user) => {
        uid = user.uid;
        toDosRef = fireBaseRef.child(`users/${uid}/toDos`);

        return toDosRef.remove();
      }).then(() => {
        testToDoRef = toDosRef.push();

        return testToDoRef.set({
          text: 'Something to do',
          completed: false,
          createdAt: 23453453
        });
      })
      .then(() => done())
      .catch(done);
    });

    afterEach((done) => {
      toDosRef.remove().then(() => done());
    });

    it('should toggle toDo and dispatch UPDATE_TODO action', (done) => {
      const store = createMockStore({auth: {uid}});
      const action = actions.startToggleToDo(testToDoRef.key, true);

      store.dispatch(action).then(() => {
        const mockActions = store.getActions();

        expect(mockActions[0]).toInclude({
          type: 'UPDATE_TODO',
          id: testToDoRef.key
        });
        expect(mockActions[0].updates).toInclude({
          completed: true
        });
        expect(mockActions[0].updates.completedAt).toExist();

        done();
      }, done);
    });

    it('should populate toDos and dispatch ADD_TODOS', (done) => {
      const store = createMockStore({auth: {uid}});
      const action = actions.startAddToDos();

      store.dispatch(action).then(() => {
        const mockActions = store.getActions();

        expect(mockActions[0].type).toEqual('ADD_TODOS');
        expect(mockActions[0].todos.length).toEqual(1);
        expect(mockActions[0].todos[0].text).toEqual('Something to do');

        done();
      }, done)
    });

    it('should create toDo and dispatch ADD_TODO', (done) => {
      const store = createMockStore({auth: {uid}});
      const toDoText = 'My toDo item';

      store.dispatch(actions.startAddToDo(toDoText)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toInclude({
          type: 'ADD_TODO'
        });
        expect(actions[0].toDo).toInclude({
          text: toDoText
        });
        done();
      }).catch(done);
    });
  });
});
