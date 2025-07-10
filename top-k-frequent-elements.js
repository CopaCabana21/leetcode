/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */

import { ppPriorityQueue } from "./utilities/heaps.js";

class mPriorityQueue {

  constructor(objectArr = []) {
    this.heap = [];
    this.buildPriorityQueue(objectArr);
  }

  // Bulk heapify (Floyd’s)
  // tc: O(n)
  // each heapifyDown takes O(logn) but the agregated work takes O(n)
  buildPriorityQueue(objectArr) {
    // this should validate that each element is a object
    this.heap = objectArr;

    const startIdx = Math.floor(this.heap.length / 2) - 1;
    for (let i = startIdx; i >= 0; i--) {
      this._heapifyDown(i);
    }
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
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  _heapifyUp(i) {
    while (i > 0 && this.heap[this._parent(i)].priority < this.heap[i].priority) {
      let p = this._parent(i);
      this._swap(p, i);
      i = p;
    }
  }

  _heapifyDown(i) {
    let heap = this.heap;

    while (true) {
      let left = this._left(i);
      let right = this._right(i);
      let highest = i;

      if (left < heap.length && heap[highest].priority < heap[left].priority) highest = left;
      if (right < heap.length && heap[highest].priority < heap[right].priority) highest = right;

      if (highest === i) break;
      this._swap(i, highest);
      i = highest;
    }
  }

  insert(value, priority) {
    this.heap.push({ value, priority });
    this._heapifyUp(this.heap.length - 1);
  }

  peek() {
    return this.heap[0].value;
  }

  pop() {
    if (this.heap.length === 0) return undefined;
    if (this.heap.length === 1) return this.heap.pop().value;

    let top = this.heap[0];
    this.heap[0] = this.heap.pop();
    this._heapifyDown(0);

    return top.value;
  }

  size() {
    return this.heap.length;
  }

  isEmpty() {
    return this.heap.length === 0;
  }

}

var topKFrequent = function (nums, k) {

  // the conditions guarante a unique answer
  if (nums.length === k) return nums;
  let freqs = new Map();
  // O(n)
  for (const ele of nums) {
    freqs.set(ele, (freqs.get(ele) || 0) + 1);
  }

  let entries = [];
  // O(n)
  for (const [value, priority] of freqs.entries()) {
    entries.push({ value, priority })
  }

  // O(n)
  let maxh = new mPriorityQueue(entries);
  // we can improve this a bit by making it be a size k heap


  let res = [];
  let last, curr;
  // O(k*logn)
  while (res.length < k) {
    res.push(maxh.pop());
  }
  ppPriorityQueue(maxh)

  return res;
};

// console.log(topKFrequent([1, 1, 1, 2, 2, 3], 2));

// tc: O(n + klog(n))
// sc: O(n)

// ---------------------------------------------------
// same method as before but improved tc in the creation of the heap

var topKFrequent2 = function (nums, k) {

  // the conditions guarante a unique answer
  if (nums.length === k) return nums;


  let freqs = new Map();
  // O(n)
  for (const ele of nums) {
    freqs.set(ele, (freqs.get(ele) || 0) + 1);
  }

  // We can improve this a bit by making it be a size k heap
  // using as min heap
  let minh = new mPriorityQueue();
  // at worst with 1 freq for all
  // the first k insert are klog(k) after that (n-k) pops, (n-k)log(k)
  // so O(nlog(k)) in total
  for (const [value, priority] of freqs.entries()) {
    minh.insert(value, -priority);
    if (minh.size() > k) minh.pop();
  }

  let res = [];
  let last, curr;
  // O(k*log(k))
  while (minh.size()) {
    res.push(minh.pop());
  }

  return res;
};


// tc: O(n + nlog(k)) -> O(nlog(k))
// compared to the previous if k << n
// k log n < n log k
// sc: O(n)

// console.log(topKFrequent2([1, 1, 1, 2, 2, 3], 2));

// -----------------------------------------------------
// quick select

var topKFrequent3 = function (arr, k) {

  if (arr.length === k) return arr;

  let freqs = new Map();

  for (const ele of arr) {
    freqs.set(ele, (freqs.get(ele) || 0) + 1);
  }

  let entries = [...freqs.entries()];
  // console.log(entries);

  function partition(left, right) {
    // random pivot to guarantee a O(n) on average
    let rand = Math.floor(Math.random() * (right - left + 1));
    // console.log(rand);
    let pivotIndex = left + rand;
    // console.log('pivot', entries[pivotIndex]);
    [entries[right], entries[pivotIndex]] = [entries[pivotIndex], entries[right]];
    let pointer = left;
    for (let i = left; i < right; i++) {
      if (entries[i][1] >= entries[right][1]) {
        [entries[i], entries[pointer]] = [entries[pointer], entries[i]];
        pointer++;
      }
    }
    [entries[right], entries[pointer]] = [entries[pointer], entries[right]];

    return pointer;
  }

  let left = 0, right = entries.length - 1, pivotIndex;
  // Due to random pivot, the average is O(n)
  while (true) {
    pivotIndex = partition(left, right);

    if (pivotIndex === k - 1) break;
    else if (pivotIndex < k - 1) left = pivotIndex + 1;
    else right = pivotIndex - 1;
  }

  // console.log(entries);
  return entries.slice(0, pivotIndex + 1).map(ele => ele[0]);
};

// tc: O(n + n)
// sc: O(n)

// console.log(topKFrequent3([1, 1, 1, 2, 2, 3], 2));
// console.log(topKFrequent3([1], 1));

//* ------------------------------------------------------------

// bucket sort

var topKFrequent4 = function (nums, k) {

  if (nums.length === k) return nums;

  const freqs = new Map();

  // O(n)
  for (const ele of nums) {
    freqs.set(ele, (freqs.get(ele) || 0) + 1);
  }

  // O(n)
  let max = Math.max(...freqs.values());
  const buckets = Array(max).fill().map(() => []);

  // O(n)
  for (const [val, freq] of freqs.entries()) {
    buckets[freqs.get(val) - 1].push(val)
  }

  let res = [];
  // O(n)
  for (let i = buckets.length - 1; i >= 0 && res.length < k; i--) {
    if (buckets[i].length > 0) {
      res.push(...buckets[i]);
    }
  }

  return res.slice(0, k);
}

// tc: O(n)
// sc: O(maxFreq)

console.log(topKFrequent4([1, 1, 2, 2, 3, 3], 2));
