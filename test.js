/* jshint node:true */

var c = require('./').CircularList;
var t = new c();
var i = new c.Item('hello world');
console.log(c);
console.log(t);
console.log(i);