function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

import { arrayToLinkedList, linkedListToArray } from "./utility/linked list.js";

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

var reverseKGroup3 = function (head, k) {

  const lookForTail = (head) => {
    let count = 1;
    let curr = head;
    while (count % k && curr) {
      curr = curr.next;
      count++;
    }

    return curr
  }

  let tail = lookForTail(head);
  if (!tail) return head;

  let dummy = new ListNode(-1, head);
  let curr = head, prev = null, next;
  head = tail;
  let temp;

  while (curr) {
    console.log(curr.val);

    if (curr === tail) {
      console.log('H');
      
      next = curr.next;
      curr.next = prev;
      prev = curr;
      curr = next;

      temp = dummy.next;
      dummy.next.next = next;
      dummy.next = prev;
      dummy = temp;

      tail = lookForTail(curr);
      if (!tail) break;
      continue;
    }

    next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;

  }
  return head;
};

let reversedLL = reverseKGroup3(arrayToLinkedList([1,2,3,4,5]), 2)
console.log(linkedListToArray(reversedLL));