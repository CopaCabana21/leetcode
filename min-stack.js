
var MinStack = function() {
    this.arr = [];
    this.min = undefined;
};

/** 
 * @param {number} val
 * @return {void}
 */
MinStack.prototype.push = function(val) {

    if(val <= this.min || this.min === undefined){
        this.arr.push(this.min);
        this.min = val;
    }
    this.arr.push(val);
    
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
    if(this.arr.pop() === this.min) this.min = this.arr.pop();
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
    return this.arr[this.arr.length - 1]
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function() {
    
    return this.min;
};

/** 
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(val)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */


const minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
minStack.getMin(); // return -3
minStack.pop();
console.log(minStack.top()); // return 0
console.log(minStack.getMin()); // return -2