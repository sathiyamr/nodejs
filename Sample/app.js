const objInit = require("./xyz");

console.log(require.cache);
console.log(objInit.a)
const objInit2 =require("./xyz");
console.log(objInit2.a, objInit2.acall());
const obj = require("./math");
const data = require("./data.json");

console.log(data);
var name = "Sathiyamoorthy";
var a = 10;
var b = 20;

console.log(global === globalThis);

obj.calculateSum(10, 20);
