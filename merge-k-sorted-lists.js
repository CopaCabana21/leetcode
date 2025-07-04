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
    while (i > 0 && this.heap[this._parent(i)].priority > this.heap[i].priority) {
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
      let lowest = i;

      if (left < heap.length && heap[lowest].priority > heap[left].priority) lowest = left;
      if (right < heap.length && heap[lowest].priority > heap[right].priority) lowest = right;

      if (lowest === i) break;
      this._swap(i, lowest);
      i = lowest;
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
  let i = 0;
  let curr = lists[i];

  while (finished.size < lists.length) {

    curr = lists[i];
    // console.log('====================');
    // console.log('finished: ', finished);
    // console.log(' curr: ', !curr ? [curr, i] : [curr.val, i]);
    // console.log(' lists: ', lists.map(ele => !ele ? ele : ele.val));
    // console.log(pq.heap.map(ele => !ele.value[0] ? ele.value[0] : [ele.value[0].val, ele.value[1]]));
    // console.log(' res: ', llToArr(dummy.next));

    if (!curr) {
      if (!finished.has(i)) finished.add(i);
      i = (i + 1) % lists.length;
      continue;
    }

    pq.insert([curr, i], curr.val);
    lists[i] = curr.next;

    if (pq.size() < lists.length) {
      i = (i + 1) % lists.length;
    } else {
      min = pq.pop();

      res.next = new ListNode(min[0].val);
      res = res.next;

      i = min[1];
    }
  }
  // res.next = curr;
  while (pq.size()) {
    min = pq.pop();
    res.next = new ListNode(min[0].val);
    res = res.next;
  }

  return dummy.next;
};

// tc: O(N*logK + (max length list))
// sc: O(2*K)

// let lists = [[1, 4, 5], [1, 3, 4], [2, 6]]
// let lists = [[], [-1, 5, 11], [], [6, 10]]
// let lists = [[1, 3, 4, 6, 8, 9, 12], [1, 2, 5, 7, 11, 21, 24], [-4, 0, 4, 7, 10, 14, 22, 29]]
// let lists = [[0, 2, 5]]
let lists = [[-8, -7, -6, -3, -2, -2, 0, 3], [-10, -6, -4, -4, -4, -2, -1, 4], [-10, -9, -8, -8, -6], [-10, 0, 4]]

lists = lists.map(ele => arrToll(ele))

// console.log(llToArr(mergeKLists(lists)));
// console.log(llToArr(mergeKLists([])));
// console.log(llToArr(mergeKLists([arrToll([])])));
// console.log(llToArr(mergeKLists(lists)));


// --------------------------------------------------

// simpler version of min priority queue

var mergeKLists2 = function (lists) {

  const dummy = new ListNode(-1);
  let res = dummy;
  let mpq = new mPriorityQueue();

  for (const node of lists) {
    if(node) mpq.insert(node, node.val);
  }

  while(!mpq.isEmpty()){
    const min = mpq.pop();
    res.next = min;
    res = min;

    if(min.next) mpq.insert(min.next, min.next.val);
  }

  return dummy.next;
};

// tc: O(N*logK)
// sc: O(k)

console.log(llToArr(mergeKLists2(lists)));
