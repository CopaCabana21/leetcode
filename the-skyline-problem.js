/**
 * @param {number[][]} buildings
 * @return {number[][]}
 */

import { ppPriorityQueue } from "./utility/heaps.js"

class PQ {

  constructor() {
    this.heap = []
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

    while (this._left(i) < heap.length) {
      let l = this._left(i);
      let r = this._right(i);

      let highest = l;
      if (r < heap.length && heap[r].priority > heap[l].priority) {
        highest = r;
      }

      if (heap[i].priority >= heap[highest].priority) break;
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

function arraysEqual(a, b) {
  return a.length === b.length && a.every((val, i) => val === b[i]);
}



var getSkyline = function (buildings) {

  let active = [0, 0, -1];
  let pq = new PQ();
  // pq.insert(active, Number.NEGATIVE_INFINITY);
  let res = [];


  for (const block of [...buildings, [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, 0]]) {

    const [l, r, h] = block;
    // console.log('*', block, active);
    // console.log('--', res);
    // ppPriorityQueue(pq)

    if (l > active[1]) {

      while (!pq.isEmpty() && active[1] <= l) {
        let fall = pq.peek();
        if (fall[1] > active[1]) {
          res.push([active[1], fall[2]]);
          active = fall;
        }
        if (fall[1] <= l) pq.pop();
      }

      if (pq.isEmpty()) {
        res.push([active[1], 0]);
        res.push([l, h]);
        active = block;
        continue;
      }
    }

    if (l <= active[1]) {
      if (h > active[2]) {
        pq.insert(active, active[2]);
        res.push([l, h])
        active = block;
      } else {
        pq.insert(block, h);
      }
    }

  }

  // ppPriorityQueue(pq);
  return res.slice(1, -1);
}

// const skyline = getSkyline([[2, 9, 10], [3, 7, 15], [5, 12, 12], [8, 17, 5], [15, 20, 10], [19, 24, 8]]);
// const skyline = getSkyline([[2, 9, 10], [3, 7, 15], [5, 12, 12], [15, 20, 10], [19, 24, 8]]);
// const skyline = getSkyline([[0, 2, 3], [2, 5, 3]]);
// const skyline = getSkyline([[0, 1, 3]]);
// const skyline = getSkyline([[1, 2, 1], [1, 2, 2], [1, 2, 3]]);
// const skyline = getSkyline([[0, 2, 3], [2, 4, 3], [4, 6, 3]]);


// let temp = [[1, 38, 219], [2, 19, 228], [2, 64, 106], [3, 80, 65], [3, 84, 8], [4, 12, 8], [4, 25, 14], [4, 46, 225], [4, 67, 187], [5, 36, 118], [5, 48, 211], [5, 55, 97], [6, 42, 92], [6, 56, 188], [7, 37, 42], [7, 49, 78], [7, 84, 163], [8, 44, 212], [9, 42, 125], [9, 85, 200], [9, 100, 74], [10, 13, 58], [11, 30, 179], [12, 32, 215], [12, 33, 161], [12, 61, 198], [13, 38, 48], [13, 65, 222], [14, 22, 1], [15, 70, 222], [16, 19, 196], [16, 24, 142], [16, 25, 176], [16, 57, 114], [18, 45, 1], [19, 79, 149], [20, 33, 53], [21, 29, 41], [23, 77, 43], [24, 41, 75], [24, 94, 20], [27, 63, 2], [31, 69, 58], [31, 88, 123], [31, 88, 146], [33, 61, 27], [35, 62, 190], [35, 81, 116], [37, 97, 81], [38, 78, 99], [39, 51, 125], [39, 98, 144], [40, 95, 4], [45, 89, 229], [47, 49, 10], [47, 99, 152], [48, 67, 69], [48, 72, 1], [49, 73, 204], [49, 77, 117], [50, 61, 174], [50, 76, 147], [52, 64, 4], [52, 89, 84], [54, 70, 201], [57, 76, 47], [58, 61, 215], [58, 98, 57], [61, 95, 190], [66, 71, 34], [66, 99, 53], [67, 74, 9], [68, 97, 175], [70, 88, 131], [74, 77, 155], [74, 99, 145], [76, 88, 26], [82, 87, 40], [83, 84, 132], [88, 99, 99]];

// const skyline = getSkyline(temp);

// console.log(skyline);



// ----------------------------------------------------------

// tc: O(n * log n)
// for every n there's an insert of log n and also a pop that contains a O(1) lookup in a set

// sc: O(2n + n + n) -> O(nh)

var getSkyline = function (buildings) {

  let points = [];

  buildings.map((val, index) => points.push([val[0], val[2], -1, index]));
  buildings.map((val, index) => points.push([val[1], val[2], 1, index]));

  points.sort((a, b) => {
    // sort by x
    if (a[0] !== b[0]) return a[0] - b[0];
    // if equal then sort by signed height.
    // negative for start and positive for end of building
    return (a[1] * a[2]) - (b[1] * b[2]);
  });

  let pq = new PQ();
  // this will add the start of a building at 0 but never closes
  pq.insert([0, -1], 0);
  // this check the index of the building
  let active = new Set([-1]);
  let res = [];

  for (const [x, h, sign, index] of points) {
    // console.log('--', [x, h, sign], res);
    // ppPriorityQueue(pq)
    // if a building started then add it to active
    if (sign === -1) active.add(index);
    else active.delete(index); // if it ended remove it

    if (sign === -1) {
      // if it is a building start greater that the pq peek, add the left edge
      if (h > pq.peek()[0]) res.push([x, h]);
      // and add to heap
      pq.insert([h, index], h);
    } else {
      // if a building has ended find the fall
      if (h === pq.peek()[0]) {
        // use lazy deletion
        // the last element [0,-1] is never deleted
        while (!pq.isEmpty() && !active.has(pq.peek()[1])) {
          pq.pop();
        }
      }

      // add the right edge at the height of the drop
      if (pq.peek()[0] !== res.at(-1)[1]) res.push([x, pq.peek()[0]]);
    }
  }

  return res

}

const skyline = getSkyline([[2, 9, 10], [3, 7, 15], [5, 12, 12], [15, 20, 10], [19, 24, 8]]);

console.log(skyline);
