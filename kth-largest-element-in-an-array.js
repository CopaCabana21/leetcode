/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number}
 */
import { ppBinaryHeap } from "./utilities/heaps.js"

//* ------------------------------------------------------------
// brute force

var findKthLargest = function (arr, k) {
  return arr.sort()[arr.length - k]
};

// tc: O(nlogn)
// sc: O(1)

// console.log(findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4));


//* --------------------------------------------------------------
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


//* ----------------------------------------------------------------
// quick select

// tc: O(n) on average only if we use a random pivot
// worst case is O(n^2) for example in a array of [1,1,1,1,1,1,1,1,1]
// sc: O(1)

// - pivot at the right edge.
// - iterative

var findKthLargest2 = function (arr, k) {


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


// console.log(findKthLargest2([3, 2, 1, 5, 6, 4], 2));

// * ---------------------------------------------------------------
// quick select
// randomize the pivot

var findKthLargest3 = function (arr, k) {

  const target = arr.length - k;

  function swap(arr, i, j) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  function partition(arr, left, right) {

    const pivotIndex = left + Math.floor(Math.random() * (right - left + 1));
    const pivot = arr[pivotIndex];
    swap(arr, pivotIndex, right);

    let pointer = left;
    for (let i = left; i < right; i++) {
      if (arr[i] <= pivot) {
        swap(arr, pointer, i);
        pointer++;
      }
    }
    swap(arr, pointer, right);

    return pointer;
  }

  let left = 0, right = arr.length - 1;
  let pointer;
  while (true) {
    pointer = partition(arr, left, right);
    if (pointer === target) break;
    else if (pointer < target) left = pointer + 1;
    else right = pointer - 1;
  }

  return arr[pointer]
}

// console.log(findKthLargest3([1, 2, 3, 4, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -5, -4, -3, -2, -1], 17));
// console.log(findKthLargest3([3, 2, 1, 5, 6, 4], 2));
// console.log(findKthLargest3([-1, -1], 2));


//* ----------------------------------------------------------------

// leetcode added a test [1,1,1,1,....,1,1] which makes a time limit exceded
// random pivot, lotumo's partition in-place

var findKthLargest5 = function (arr, k) {

  const target = arr.length - k;

  function swap(arr, i, j) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  function partition(arr, left, right) {

    const pivotIndex = left + Math.floor(Math.random() * (right - left + 1));
    const pivot = arr[pivotIndex];
    let i = left, lt = left, gt = right;
    while (i <= gt) {
      if (arr[i] < pivot) {
        swap(arr, lt, i);
        i++;
        lt++;
      } else if (arr[i] > pivot) {
        swap(arr, gt, i);
        gt--;
      } else {
        i++;
      }
    }
    return [lt, gt];
  }

  let left = 0, right = arr.length - 1;
  let lt, gt;
  while (left <= right) {
    [lt, gt] = partition(arr, left, right);
    console.log(lt, gt);
    if (target < lt) right = lt - 1;
    else if (target > gt) left = gt + 1;
    else break;
  }

  return arr[lt]
}

// console.log(findKthLargest5([1, 2, 3, 4, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -5, -4, -3, -2, -1], 17));
console.log(findKthLargest5([3, 2, 1, 5, 6, 4], 2));
// console.log(findKthLargest5([-1, -1], 2));
