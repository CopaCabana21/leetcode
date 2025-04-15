
var MyStack = function() {
    this.arr = [];
};

// The problem the fake queue would be an array with:
// enqueue: push : O(1)
// dequeue: shift: O(n)
// and from those 2 operations make a stack


/** 
 * @param {number} x
 * @return {void}
 */

// arr should be sorted from newest to oldest
// in order to perform shift

MyStack.prototype.push = function(x) {

    this.arr.push(x);
    
    // oldest, ... , newest, x

    for (let i = 0; i < this.arr.length - 1; i++) {
        
        this.arr.push(this.arr.shift())
        
    }
    // x, newest, ... , oldest

};

/**
 * @return {number}
 */
MyStack.prototype.pop = function() {
    return this.arr.shift();
};

/**
 * @return {number}
 */
MyStack.prototype.top = function() {
    return this.arr[0];
};

/**
 * @return {boolean}
 */
MyStack.prototype.empty = function() {
    return this.arr.length === 0;
};

/** 
 * Your MyStack object will be instantiated and called as such:
 * var obj = new MyStack()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.empty()
 */

// pop: O(n)
// push: O(n)