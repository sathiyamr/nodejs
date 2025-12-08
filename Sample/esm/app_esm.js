// require('./xyz')
// const obj = require("./sum");
import {calculateSum, x} from "./sum_esm.js";
var  name = "Sathiyamoorthy";
var a = 10;
var b = 20;

console.log(global === globalThis);


calculateSum(10,20);

console.log(x);
