/**
 * @param {number[]} hand
 * @param {number} groupSize
 * @return {boolean}
 */

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

var isNStraightHand = function (hand, groupSize) {

  let mh = new mMinHeap();
  let dup = [];

  for (const card of hand) {
    mh.insert(card);
  }

  let currSet = [];
  while (!mh.isEmpty()) {
    let next = mh.pop();

    console.log(next, currSet, dup);

    if (!currSet.length) {
      currSet.push(next);
    } else {
      let top = currSet.at(-1);
      if (next === top) {
        dup.push(next);
      } else if (next === top + 1) {
        currSet.push(next);
      } else {
        return false
      }
    }

    if (currSet.length === groupSize) {
      currSet = [];
      while(dup.length){
        mh.insert(dup.pop())
      }
    };
  }

  return currSet.length === 0;
};


// n: number of cards
// k: group size
// u: number of cards without duplicates
// maxFreqCard
// max reinserts per card ≤ g = floor(n / k)


// tc: dont know which is
// sc: O(n)

// console.log(isNStraightHand([1, 2, 3, 6, 2, 3, 4, 7, 8], 3));
// console.log(isNStraightHand([1,2,3,4,5], 4));
console.log(isNStraightHand([34, 80, 89, 15, 38, 69, 19, 17, 97, 98, 26, 77, 8, 31, 79, 70, 103, 3, 13, 21, 81, 53, 33, 14, 60, 68, 33, 59, 84, 23, 97, 90, 76, 82, 66, 83, 23, 22, 16, 18, 98, 25, 16, 61, 84, 100, 4, 68, 101, 25, 23, 9, 10, 55, 2, 67, 39, 52, 102, 99, 40, 11, 83, 24, 81, 53, 96, 23, 13, 24, 99, 67, 22, 51, 31, 58, 78, 88, 5, 15, 24, 32, 81, 91, 96, 16, 54, 22, 56, 69, 14, 82, 32, 34, 83, 24, 37, 82, 54, 21,96,96,96]
  , 4));