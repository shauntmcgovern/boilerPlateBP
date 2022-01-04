var moment = require('moment');

console.log(moment().format());

// January 4th 2022 @3:30pm -> -60
// January 5th 2022 @3:30pm -> -60

var now = moment();
console.log('Current timestamp', now.unix());

var timestamp = 1459111648;
var currentMoment = moment.unix(timestamp);
console.log('current moment', currentMoment.format('MMM D, YY @ h:mm a'));

// January 4th, 2022 @ 03:30 PM
console.log('current moment', currentMoment.format('MMMM Do, YYYY @ h:mm A'));
