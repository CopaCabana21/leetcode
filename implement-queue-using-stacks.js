
var MyQueue = function() {
    
    this.input = [];
    this.output = [];
};

/** 
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function(x) {

    // reverse input to output
    while(this.input.length > 0){
        this.output.push(this.input.pop());
    }

    this.output.push(x);

    // reverse output into input
    while(this.output.length > 0){
        this.input.push(this.output.pop());
    }

    
};

/**
 * @return {number}
 */
MyQueue.prototype.pop = function() {

    return this.input.pop();

};

/**
 * @return {number}
 */
MyQueue.prototype.peek = function() {

    return this.input[this.input.length - 1];

};

/**
 * @return {boolean}
 */
MyQueue.prototype.empty = function() {
    
    return this.input.length === 0;

};

/** 
 * Your MyQueue object will be instantiated and called as such:
 * var obj = new MyQueue()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.empty()
 */

// only push is O(n)

var obj = new MyQueue();

console.log('-'.repeat(70));
var param_3 = obj.peek();

console.log(param_3);
console.log(obj.empty());

console.log('-'.repeat(70));
obj.push(10)
console.log(obj);

console.log('-'.repeat(70));
console.log(obj.peek());

console.log('-'.repeat(70));

console.log(obj.empty());

console.log('-'.repeat(70));

obj.push(20);
obj.push(30)
console.log(obj);

console.log('-'.repeat(70));

var param_2 = obj.pop()
console.log(param_2);
console.log(obj);

console.log('-'.repeat(70));
var param_4 = obj.pop()
console.log(param_4);
console.log(obj);

console.log('-'.repeat(70));
var param_4 = obj.pop()
console.log(param_4);
console.log(obj);
