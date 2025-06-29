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


var getSkyline = function (buildings) {

  let active = [Number.NEGATIVE_INFINITY, buildings[0][1] + 1, 0];
  let pq = new PQ();
  let skyline = [];

  for (const block of [...buildings, [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, 0]]) {
    let [block_l, block_r, block_h] = block;
    let [active_l, active_r, active_h] = active;

    if (block_l <= active_r) {
      if (block_h > active_h) {
        skyline.push([active_l, active_h]);
        pq.insert(active, active_h);
        active = block;
      } else {
        pq.insert(block, block_h)
      }
    } else {
      // console.log('--', active, block[0]);
      // console.log(skyline);
      // ppPriorityQueue(pq);
      skyline.push([active[0], active[2]]);
      while (active[1] < block_l) {
        if (pq.isEmpty()) {
          skyline.push([active[1], 0]);
          active = block;
          break;
        };
        let fall = pq.pop();
        // console.log('*', active, fall);
        // console.log(skyline);
        if (fall[1] > active[1]) {
          if (active[2] !== fall[2]) {
            skyline.push([active[1], fall[2]])
          };
          active = fall;
        }
      }

    }
  }

  // ppPriorityQueue(pq);
  return skyline.slice(1);
}

// const skyline = getSkyline([[2, 9, 10], [3, 7, 15], [5, 12, 12], [15, 20, 10], [19, 24, 8]]);
// const skyline = getSkyline([[0, 2, 3], [2, 5, 3]]);
const skyline = getSkyline([[0, 1, 3]]);


console.log(skyline);

