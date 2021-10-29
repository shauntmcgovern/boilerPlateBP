import moment from 'moment';

import fireBase, {fireBaseRef, githubProvider} from 'app/fireBase/';

export var setSearchText = (searchText) => {
  return {
    type: 'SET_SEARCH_TEXT',
    searchText
  };
};

export var toggleShowCompleted = () => {
  return {
    type: 'TOGGLE_SHOW_COMPLETED'
  };
};

export var addTodo = (todo) => {
  return {
    type: 'ADD_TODO',
    todo
  };
};

export var startAddToDo = (text) => {
  return (dispatch, getState) => {
    var todo = {
      text,
      completed: false,
      createdAt: moment().unix(),
      completedAt: null
    };
    var uid = getState().auth.uid;
    var toDoRef = fireBaseRef.child(`users/${uid}/toDos`).push(toDo);

    return toDoRef.then(() => {
      dispatch(addToDo({
        ...toDo,
        id: toDoRef.key
      }));
    });
  };
};

export var addToDos = (toDos) => {
  return {
    type: 'ADD_TODOS',
    toDos
  };
};

export var startAddToDos = () => {
  return (dispatch, getState) => {
    var uid = getState().auth.uid;
    var toDosRef = fireBaseRef.child(`users/${uid}/toDos`);

    return toDosRef.once('value').then((snapshot) => {
      var todos = snapshot.val() || {};
      var parsedToDos = [];

      Object.keys(todos).forEach((toDoId) => {
        parsedToDos.push({
          id: toDoId,
          ...toDos[toDoId]
        });
      });

      dispatch(addToDos(parsedToDos));
    });
  };
};

export var updateToDo = (id, updates) => {
  return {
    type: 'UPDATE_TODO',
    id,
    updates
  };
};

export var startToggleToDo = (id, completed) => {
  return (dispatch, getState) => {
    var uid = getState().auth.uid;
    var toDoRef = fireBaseRef.child(`users/${uid}/toDos/${id}`);
    var updates = {
      completed,
      completedAt: completed ? moment().unix() : null
    };

    return toDoRef.update(updates).then(() => {
      dispatch(updateToDo(id, updates));
    });
  };
};

export var login = (uid) => {
  return {
    type: 'LOGIN',
    uid
  };
};

export var startLogin = () => {
  return (dispatch, getState) => {
    return fireBase.auth().signInWithPopUp(githubProvider).then((result) => {
      console.log('Auth worked!', result);
    }, (error) => {
      console.log('Unable to auth', error);
    });
  };
};

export var logout = () => {
  return {
    type: 'LOGOUT'
  };
};

export var startLogout = () => {
  return (dispatch, getState) => {
    return fireBase.auth().signOut().then(() => {
      console.log('Logged out!');
    });
  };
};
