// function add (a, b) {
//   return a + b;
// }
//
// console.log(add(3, 1));
//
// var toAdd = [9, 5];
// console.log(add(...toAdd));

// var groupA = ['Logs', 'Branches'];
// var groupB = ['Sticks'];
// var final = [...groupB, 3, ...groupA];
//
// console.log(final);

var person = ['Charcoal', 8];
var personTwo = ['Logs', 35];
// Hi ShaunPersonNamedShaun, you are 35

function greet (name, age) {
  console.log('Hi ' + name + ', you are ' + age);
}
greet(...person);
greet(...personTwo);

var names = ['Charcoal', 'Logs'];
var final = ['Fire', ...names];
// Hi Shaun

final.forEach(function (name) {
  console.log('Hi ' + name);
});
