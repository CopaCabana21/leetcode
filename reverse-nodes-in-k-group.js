function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

import { arrToll, llToArr } from "./utilities/linked list.js";

/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function (head, k) {
  let count = 1;

  let dummy = new ListNode(-1);
  dummy.next = head;

  let last = dummy,
    curr = head,
    forth;

  while (curr) {
    forth = curr.next;

    if (count % k === 0) {
      curr.next = null;
      let tail = last.next;
      last.next = reverseLL(last.next);
      last = tail;
      last.next = forth;
    }

    count++;
    curr = forth;
  }

  return dummy.next;
};

function reverseLL(head) {
  let curr = head,
    back,
    forth;

  while (curr) {
    forth = curr.next;
    curr.next = back;
    back = curr;
    curr = forth;
  }

  head.next = null;

  return back;
}

// tc: O(2n)
// sc: O(1)

// console.log(JSON.stringify(reverseKGroup(arrayToLinkedList([1,2,3,4,5]), 3)));
// console.log(JSON.stringify(reverseLL(arrayToLinkedList([1,2,3,4,5]))));

// -------------------------------------------------------------------

var reverseKGroup2 = function (head, k) {
  let dummy = new ListNode(-1),
    curr = head;
  dummy.next = head;

  let last = dummy,
    back = null,
    forth;
  let count = 0;

  while (curr) {
    // console.log('count: %d\n node:\n %o', count, curr);

    // reverse nodes
    forth = curr.next;
    curr.next = back;
    back = curr;
    curr = forth;

    // if(count === 1) console.log('count: %d\n node:\n %o', count, back);

    if ((count + 1) % k === 0) {
      let temp = last.next;
      last.next = back;

      temp.next = curr;
      last = temp;
      // console.log('count: %d\n node:\n %o', count, getKnode(curr, k));
      // check if there's still a group to process.
      // If not then get out of loop
      if (getKnode(curr, k) === -1) {
        break;
      }
    }

    count++;
  }

  function getKnode(head, k) {
    let curr = head;

    while (curr && k !== 1) {
      curr = curr.next;
      k--;
    }

    return curr === null ? -1 : curr;
  }

  // console.log('count: %d\n node:\n %o', count, dummy.next);

  return dummy.next;
};

// JSON.stringify(
//   reverseKGroup2(arrayToLinkedList([1, 2, 3, 4, 5, 6, 7, 8]), 5)
// );

// -----------------------------------------------------------------------------
// again

var reverseKGroup4 = function (head, k) {

  const lookForTail = (head, count) => {
    let curr = head;
    while (count-- && curr) {
      curr = curr.next;
    }
    return curr;
  }

  const dummy = new ListNode(-1, head);
  let prev = dummy;

  while (true) {
    let curr = head;
    let newHead = lookForTail(prev, k);
    if (!newHead) break;

    prev.next = newHead;

    // console.log([prev, curr, head, newHead]);
    let saveNext = newHead.next;
    while (curr !== saveNext) {
      const next = curr.next;
      curr.next = prev;
      prev = curr;
      curr = next;
    }
    prev = head;
    head.next = curr;
    head = curr;
  }

  return dummy.next;
};

// tc: O(n + n/k) -> O(n)
// sc: O(1)

console.log(llToArr(reverseKGroup4(arrToll([1, 2, 3, 4, 5]), 3)));