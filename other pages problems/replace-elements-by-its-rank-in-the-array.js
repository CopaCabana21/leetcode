// https://www.geeksforgeeks.org/problems/replace-elements-by-its-rank-in-the-array/1

class mMinHeap {

  constructor() {
    this.arr = []
  }

  _left(i) {
    return 2 * i + 1
  }

  _right(i) {
    return 2 * i + 2
  }

  _parent(i) {
    return Math.floor((i - 1) / 2)
  }

  _swap(i, j) {
    [this.arr[i], this.arr[j]] = [this.arr[j], this.arr[i]];
  }

  _heapifyUp() {
    let arr = this.arr;
    let i = this.arr.length - 1;

    while (i > 0 && arr[this._parent(i)] > arr[i]) {
      let p = this._parent(i);
      [arr[p], arr[i]] = [arr[i], arr[p]]
      i = p;
    }
  }

  _heapifyDown(i) {
    let arr = this.arr;
    while (true) {
      let left = 2 * i + 1;
      let right = 2 * i + 2;
      let smallest = i;

      if (left < arr.length && arr[smallest] > arr[left]) smallest = left;
      if (right < arr.length && arr[smallest] > arr[right]) smallest = right;

      if (smallest === i) break;
      [arr[smallest], arr[i]] = [arr[i], arr[smallest]]
      i = smallest;
    }
  }

  insert(val) {
    this.arr.push(val);
    this._heapifyUp();
  }

  peek() {
    return this.arr[0];
  }

  pop() {
    if (this.arr.length === 0) return undefined;
    if (this.arr.length === 1) return this.arr.pop();

    let min = this.arr[0];
    this.arr[0] = this.arr.pop();
    this._heapifyDown(0);

    return min;
  }

  size() {
    return this.arr.length;
  }

  isEmpty() {
    return this.arr.length === 0;
  }


}


// User function Template for javascript
/**
 * @param {number} N
 * @param {number[]} arr
 * @returns {number[]}
 */

class Solution {
  // Function to replace each element of the array with its rank.
  replaceWithRank(N, arr) {
    let map = {};
    let res = arr.slice().sort((a, b) => a - b);
    let c = 1;

    for (let i = 0; i < res.length; i++) {
      if (res[i - 1] !== res[i]) map[res[i]] = c++;
    }
    return arr.map(val => map[val]);
  }
}

let sol = new Solution();
console.log(sol.replaceWithRank(6, [20, 15, 26, 2, 98, 6]));
console.log(sol.replaceWithRank(6, [2, 2, 1, 6]));