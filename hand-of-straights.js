class mMinHeap {

  constructor(arr = []) {
    this.heap = [];
    this.buildHeap(arr);

  }

  // Bulk heapify (Floyd’s)
  // tc: O(n)
  // each heapifyDown takes O(logn) but the agregated work takes O(n)
  buildHeap(arr) {
    this.heap = arr;
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

  _heapifyUp() {
    let heap = this.heap;
    let i = this.heap.length - 1;

    while (i > 0 && heap[this._parent(i)] > heap[i]) {
      let p = this._parent(i);
      [heap[p], heap[i]] = [heap[i], heap[p]]
      i = p;
    }
  }

  _heapifyDown(i) {
    let heap = this.heap;
    while (true) {
      let left = 2 * i + 1;
      let right = 2 * i + 2;
      let smallest = i;

      if (left < heap.length && heap[smallest] > heap[left]) smallest = left;
      if (right < heap.length && heap[smallest] > heap[right]) smallest = right;

      if (smallest === i) break;
      [heap[smallest], heap[i]] = [heap[i], heap[smallest]]
      i = smallest;
    }
  }

  insert(val) {
    this.heap.push(val);
    this._heapifyUp();
  }

  peek() {
    return this.heap[0];
  }

  pop() {
    if (this.heap.length === 0) return undefined;
    if (this.heap.length === 1) return this.heap.pop();

    let min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this._heapifyDown(0);

    return min;
  }

  size() {
    return this.heap.length;
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  length() {
    return this.heap.length;
  }

}


/**
 * @param {number[]} hand
 * @param {number} groupSize
 * @return {boolean}
 */


//* -------------------------------------------------------------------------

// naive min heap

var isNStraightHand = function (hand, groupSize) {

  if (hand.length % groupSize !== 0) return false;

  const heap = new mMinHeap(hand); // O(n)
  // O(nlogn) without buildHeap
  let dup = [];
  while (!heap.isEmpty()) { // roughly O(n / groupSize)
    let cont = groupSize - 1;
    let last = heap.pop(); // O(log n)
    while (cont--) { // O(groupSize)
      let curr = heap.pop(); // O(log n)
      if (last === curr) {
        dup.push(curr);
        cont++;
      }
      else if (curr - last !== 1) return false;
      else last = curr;
    }

    // when there are k duplicates
    while (dup.length > 0) { // O(k)
      heap.insert(dup.pop()); // O(logn)
    }
  }

  return true;
};

// tc:
// without duplicates: (n / groupSize) × groupSize × O(log n) = O(n log n).
// with duplicates in the worst case each element can be reinserted n times.
// The number of reinsertions is bounded by n per element,
// tc: O(n^2 log n)
// sc: O(n*k) -> O(n)

// console.log(isNStraightHand([1, 2, 3, 4, 5], 4));
// console.log(isNStraightHand([1, 2, 3, 6, 2, 3, 4, 7, 8], 3));


//* ----------------------------------------------------------------------

var isNStraightHand2 = function (hand, groupSize) {

  if (hand.length % groupSize !== 0) return false;

  const freqs = new Map();

  // O(n)
  for (const card of hand) {
    freqs.set(card, (freqs.get(card) || 0) + 1);
  }

  // m unique cards, sorting takes O(mlogm)
  const sorted = Array.from(freqs.keys()).sort((a, b) => a - b);

  for (const card of sorted) { // each m is visited
    const count = freqs.get(card);

    if (count > 0) {
      for (let i = 0; i < groupSize; i++) { // with W group size
        let next = card + i;
        if ((freqs.get(next) || 0) < count) return false;
        freqs.set(next, freqs.get(next) - count);
      }
    }
  }

  return true;
}

// tc: O(mlogm + m*W)
// sc: O(m)

console.log(isNStraightHand2([1, 2, 3, 6, 2, 3, 4, 7, 8], 3));
