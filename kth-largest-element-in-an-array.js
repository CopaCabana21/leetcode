/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number}
 */
import { ppBinaryHeap } from "./utility/heaps.js"

// ------------------------------------------------------------
// brute force

var findKthLargest = function (arr, k) {
  return arr.sort()[arr.length - k]
};

// tc: O(nlogn)
// sc: O(1)

// console.log(findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4));


// --------------------------------------------------------------
// using min heap with k elements at max

// min heap implementation
class MinH {
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


  insert(val) {
    this.arr.push(val);
    this._heapifyUp();
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
      let largest = i;

      if (left < arr.length && arr[largest] > arr[left]) largest = left;
      if (right < arr.length && arr[largest] > arr[right]) largest = right;

      if (largest === i) break;
      [arr[largest], arr[i]] = [arr[i], arr[largest]]
      i = largest;
    }
  }
  pop() {
    if (this.arr.length === 0) return undefined;
    if (this.arr.length === 1) return this.arr.pop();

    let min = this.arr[0];
    this.arr[0] = this.arr.pop();
    this._heapifyDown(0);

    return min;
  }
  peek() {
    return this.arr[0];
  }
  size() {
    return this.arr.length;
  }
}

var findKthLargest = function (arr, k) {

  let minH = new MinH();
  for (const ele of arr) {
    minH.insert(ele);
    if (minH.size() > k) minH.pop();
  }

  return minH.peek();
};

// tc: O(n*logk)
// sc: O(k)

// console.log(findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4));
// console.log(findKthLargest([3, 2, 1, 5, 6, 4], 2));


// ----------------------------------------------------------------
// quick select

// tc: O(n) on average
// worst case is O(n^2) for example in a array of [1,1,1,1,1,1,1,1,1]
// sc: O(1)

// - pivot at the right edge.
// - iterative

var findKthLargest = function (arr, k) {


  // because the quick sort finds the nth lowest, 
  // we change the variable to the nth = N - kth lowest
  // and since we want the next one we add 1
  let target = arr.length - k + 1;

  function partition(arr, left, right) {

    let pivot = arr[right];
    let pointer = left;

    for (let i = left; i < right; i++) {
      if (arr[i] <= pivot) {
        [arr[i], arr[pointer]] = [arr[pointer], arr[i]];
        pointer++;
      }
    }
    [arr[pointer], arr[right]] = [arr[right], arr[pointer]];

    return pointer;
  }

  let left = 0, right = arr.length - 1;
  let pivotPos;

  while (true) {

    pivotPos = partition(arr, left, right);

    if (pivotPos === target - 1) break;
    else if (target - 1 < pivotPos) right = pivotPos - 1;
    else left = pivotPos + 1;
  }

  return arr[pivotPos];

};


// console.log(findKthLargest([3, 2, 1, 5, 6, 4], 2));

// ----------------------------------------------------------------
// quick select

// randomize the pivot

var findKthLargest2 = function (arr, k) {

  let target = arr.length - k + 1;

  function partition(arr, left, right) {

    let pivot = arr[right];
    let pointer = left;

    for (let i = left; i < right; i++) {
      if (arr[i] <= pivot) {
        [arr[i], arr[pointer]] = [arr[pointer], arr[i]];
        pointer++;
      }
    }
    [arr[pointer], arr[right]] = [arr[right], arr[pointer]];

    return pointer;
  }

  function paritionRandomized(arr, left, right) {
    let randomPivot = left + Math.floor(Math.random() * (right - left + 1));
    [arr[right], arr[randomPivot]] = [arr[randomPivot], arr[right]];
    return partition(arr, left, right)
  }

  let left = 0, right = arr.length - 1;
  let pivotPos;

  while (true) {

    pivotPos = paritionRandomized(arr, left, right);

    if (pivotPos === target - 1) break;
    else if (target - 1 < pivotPos) right = pivotPos - 1;
    else left = pivotPos + 1;
  }

  return arr[pivotPos];

};

// console.log(findKthLargest2([3, 2, 1, 5, 6, 4], 2));
console.log(findKthLargest2([1, 2, 3, 4, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -5, -4, -3, -2, -1], 17));


// ----------------------------------------------------------------
// quick select

// leetcode added a test [1,1,1,1,....,1,1] which makes a time linit exceded

var findKthLargest3 = function (arr, k) {

  let target = arr.length - k;
  let dupLength;

  function partition(arr, left, right) {
    dupLength = 0;
    let pivot = arr[right];
    let pointer = left;

    for (let i = left; i < right; i++) {
      if (arr[i] < pivot) {
        [arr[i], arr[pointer]] = [arr[pointer], arr[i]];
        pointer++;
      }
    }

    for (let i = pointer; i < right; i++) {
      if (arr[i] === pivot) {
        [arr[i], arr[pointer]] = [arr[pointer], arr[i]];
        pointer++;
        dupLength++;
      }
    }

    [arr[pointer], arr[right]] = [arr[right], arr[pointer]];
    // console.log('*', pivot, left, right, arr, dupLength, pivotPos);

    return pointer;
  }

  let left = 0, right = arr.length - 1;
  let pivotPos;

  while (true) {
    pivotPos = partition(arr, left, right);
    // console.log(arr, left, right, '--', dupLength, pivotPos);

    if (pivotPos - dupLength <= target && target <= pivotPos) break;
    else if (target < pivotPos) right = pivotPos - 1;
    else left = pivotPos + 1;
  }

  return arr[pivotPos];
};

console.log(findKthLargest3([1, 2, 3, 4, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -5, -4, -3, -2, -1], 17));
