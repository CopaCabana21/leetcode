function ListNode(val, next) {
  this.val = (val === undefined ? 0 : val)
  this.next = (next === undefined ? null : next)
}
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */

import { arrToll, llToArr } from "./utility/linked list.js"

class mPriorityQueue {

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

var mergeKLists = function (lists) {

  if (lists.length === 0) return null;
  let finished = new Set();

  let pq = new mPriorityQueue();
  let dummy = new ListNode(-1);
  let res = dummy, min;

  while (finished.size < lists.length) {
    for (let i = 0; i < lists.length; i++) {

      let curr = lists[i];

      console.log('====================');
      console.log(' curr: ', curr);
      console.log(' lists: ', lists);
      console.log(' res: ', llToArr(dummy.next));
      if (!curr) {
        if (!finished.has(i)) finished.add(i);
        continue;
      }

      if (pq.size() < 2) {
        pq.insert(curr, -curr.val);
      } else {
        min = curr;
        while (curr) {
          console.log('******************');
          console.log(' ', pq);
          pq.insert(curr, -curr.val);
          min = pq.pop();

          res.next = new ListNode(min.val);
          res = res.next;

          if (curr !== min) break;
          curr = curr.next;
      console.log(' res: ', llToArr(dummy.next));
        }

      }
      lists[i] = curr ? curr.next : curr;
    }
  }

  while (pq.size()) {
    min = pq.pop();
    res.next = new ListNode(min.val);
    res = res.next;
  }
  
  return dummy.next;
};

// let lists = [[1,4,5],[1,3,4],[2,6]]
// let lists = [[], [-1, 5, 11], [], [6, 10]]
let lists = [[1,3,4,6,8,9,12],[1,2,5,7,11,21,24],[-4,0,4,7,10,14,22,29]]

lists = lists.map(ele => arrToll(ele))

// console.log(llToArr(mergeKLists(lists)));
// console.log(llToArr(mergeKLists([])));
// console.log(llToArr(mergeKLists([arrToll([])])));
console.log(llToArr(mergeKLists(lists)));