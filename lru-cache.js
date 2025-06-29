class Node {
  constructor(val, key, next, prev) {
    this.key = key
    this.val = val
    this.next = next
    this.prev = prev
  }
}

// goes from least to most recent used from left to right

class DoubleLL {
  constructor() {
    this.first = null;
    this.last = null;
  }
  push(node) { // O(1)

    if (!this.last) {
      this.first = node;
      this.last = node;
    } else {
      this.first.prev = node;
      node.next = this.first;
      node.prev = null;
      this.first = node;
    }

    return this;
  }

  pop() {

    if (!this.last) return null;

    const last = this.last;

    if (this.first === this.last) {
      this.first = null;
      this.last = null;
    } else {
      this.last = this.last.prev;
      this.last.next = null;
    };

    return last
  }

  popAt(node) { // O(1)

    if (node.prev) node.prev.next = node.next;
    else this.first = node.next;

    if (node.next) node.next.prev = node.prev;
    else this.last = node.prev;

  }

  moveToFront(node) {
    // remove from queue
    this.popAt(node); // O(1)
    // move to top
    this.push(node); // O(1)
  }
}


var LRUCache = function (capacity) {
  // key to objects
  this.map = new Map();
  // object to values
  this.queue = new DoubleLL();
  // cache
  this.capacity = capacity;
};

LRUCache.prototype.get = function (key) { // O(3)

  const node = this.map.get(key); // O(1)

  if (!node) return -1; // O(1)

  this.queue.moveToFront(node); //  O(1)
  return node.val;
};

LRUCache.prototype.put = function (key, value) {
  const node = this.map.get(key);
  if (node) {
    // update value
    node.val = value;
    this.queue.moveToFront(node); //  O(1)
  } else {

    const newNode = new Node(value, key);
    this.map.set(key, newNode);
    this.queue.push(newNode);

    if (this.map.size > this.capacity) {
      const least = this.queue.pop();
      this.map.delete(least.key);
    }
  }


};

//* Big O
// tc: get: // O(3) -> O(1)
// tc: put: // O(3) -> O(1)
// sc: put: // O(n + n) -> O(n)

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */

// -------------------------------------------------------
// var obj = new LRUCache(2);
// obj.put('a', 1);
// obj.put('b', 2);

// console.log(obj);

// console.log('-'.repeat(70));


// obj.get('a');
// console.log(obj);
// console.log('-'.repeat(70));

// obj.put('c', 3);
// console.log(obj);
// console.log('-'.repeat(70));

// console.log(obj.get('a'));
// console.log(obj.get('b'));
// console.log(obj);

// ------------------------------------------