const Hashids = require("hashids/cjs");
const hashids = new Hashids("", 10);

console.log(hashids.encode(1));
console.log(hashids.encode(2));
console.log(hashids.encode(3));
console.log(hashids.encode(4));
