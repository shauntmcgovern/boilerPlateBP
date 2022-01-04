import fireBase from 'fireBase';

var config = {
  apiKey: "AIzaSyD_9fsTH8TiSdhYGD_4mzGbzwDxA7vW5w0",
  authDomain: "mead-todo-app-23821.firebaseapp.com",
  databaseURL: "https://mead-todo-app-23821.firebaseio.com",
  storageBucket: "mead-todo-app-23821.appspot.com",
};
fireBase.initializeApp(config);

var fireBaseRef = fireBase.database().ref();

fireBaseRef.set({
  app: {
    name: 'Todo App',
    version: '1.0.0'
  },
  isRunning: true,
  user: {
    name: 'YourNameIsShaun',
    age: 35
  }
});

var toDosRef = fireBaseRef.child('toDos');

toDosRef.on('child_added', (snapshot) => {
  console.log('New toDo added', snapshot.key, snapshot.val());
});

toDosRef.push({
  text: 'ToDo 1'
});

toDosRef.push({
  text: 'ToDo 2'
});
