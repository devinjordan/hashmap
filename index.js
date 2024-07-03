import Hashmap from "./hashmap.js";

const test = new Hashmap;

test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')

// cause hashmap to grow
test.set('moon', 'silver');

// overwrite
test.set('apple', 'green');

console.log(test.buckets);