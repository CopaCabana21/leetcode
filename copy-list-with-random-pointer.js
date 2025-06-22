function _Node(val, next, random) {
  this.val = val;
  this.next = next;
  this.random = random;
};

/**
 * @param {_Node} head
 * @return {_Node}
 */

import { arrToll, llToArr, nodeAt } from "./utility/linked list.js";

var copyRandomList = function (head) {

  if (!head) return head;

  let curr = head.next;
  let newHead = new _Node(head.val, null, head.random);
  let prevNode = newHead;

  let map = new Map();
  map.set(head, newHead);

  while (curr) {
    let newNode = new _Node(curr.val, null, curr.random);
    prevNode.next = newNode;
    prevNode = newNode;

    map.set(curr, newNode);

    curr = curr.next;
  }

  curr = newHead;
  while (curr) {
    curr.random = map.get(curr.random)
    curr = curr.next;
  }

  // console.log(map);
  return newHead;

};


const oldH = arrToll([7, 13, 11, 10, 1]);
let curr = oldH;
oldH.random = null;
while (curr) {
  curr.random = nodeAt(oldH, Math.floor(Math.random() * 4))
  curr = curr.next;
}

// console.log(oldH);

const newH = copyRandomList(oldH);
console.log(newH === oldH);


// console.log(llToArr(newH));
// console.log(JSON.stringify(newH, null, 2));

let currNew = newH;
let currOld = oldH;

while (currOld.next) {
  console.log('-'.repeat(70));
  console.log(currOld.val, currOld.next.val, '---', currNew.val, currNew.next.val)
  console.log(currOld.random.val, '---', currNew.random.val)
  // console.log(currOld.val, currOld.next.val, currOld.random.val, '---', currNew.val, currNew.next.val, currNew.random.val);
  currNew = currNew.next;
  currOld = currOld.next;
}


// BigO

// tc: O(2n) -> O(n)
// sc: O(n)
// is O n space only due to the map

// ----------------------------------------------------------
// do the map first

var copyRandomList = function (head) {

  if (!head) return head;

  let curr = head;
  let map = new Map();

  while (curr) {
    map.set(curr, new _Node(curr.val));
    curr = curr.next;
  }

  curr = head;
  while (curr) {
    let copy = map.get(curr);
    copy.next = curr.next ? map.get(curr.next) : null;
    copy.random = curr.random ? map.get(curr.random) : null;
    curr = curr.next;
  }

  return map.get(head);

};

// --------------------------------------------------------------
// interleave the new nodes

var copyRandomList2 = function (head) {

  if (!head) return head;
  let curr = head;

  // create nodes, set next node and interleave in the original list
  while (curr) {
    const newNode = new _Node(curr.val);
    let next = curr.next;

    newNode.next = next;
    curr.next = newNode;
    curr = next;
  }

  // add random nodes
  curr = head;
  while (curr) {
    if (curr.random) {
      curr.next.random = curr.random.next;
    }
    curr = curr.next.next;
  }

  // separate the output list
  curr = head;
  const dummy = new _Node(-1);
  let prev = dummy;
  while (curr) {
    const copy = curr.next;
    prev.next = copy;
    prev = copy;

    curr.next = copy.next; // restore origianl list
    curr = curr.next;
  }

  return dummy.next;
};