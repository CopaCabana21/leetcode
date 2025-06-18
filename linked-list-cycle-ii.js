/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

import { fa, sl } from "zod/v4/locales";
import { arrToll, nodeAt } from "./utility/linked list.js";

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function (head) {

  let check = new Set();
  let current = head;

  while (current) {
    if (check.has(current)) return current;

    check.add(current);
    current = current.next;
  }

  return null;
};

// tc: O(n)
// sc: O(n)

//--------------------------------------------------------


// best explained in

// https://takeuforward.org/data-structure/starting-point-of-loop-in-a-linked-list/

var detectCycle2 = function (head) {

  let slow = head, fast = head;

  while (fast && fast.next) {

    slow = slow.next;
    fast = fast.next.next;

    if (slow === fast) break;
  }

  if (!(fast && fast.next)) return null;

  while (head !== slow) {
    head = head.next;
    slow = slow.next;
  }

  return slow;
};


// tc: O(n)
// in any case we loop one time O(n)

// sc: O(1)

// console.log(arrayToLinkedList([3,2,0,-4]));
// let head = arrayToLinkedList([3, 2, 0, -4]);
// console.log(nodeAt(head,3));
// nodeAt(head, 3).next = nodeAt(head, 1);
// console.log(nodeAt(head,3));

// console.log(detectCycle2(head));



// ---------------------------------------------------------------
// redo

var detectCycle3 = function (head) {

  let visited = new Set();
  let curr = head;

  while (curr) {
    if (visited.has(curr)) return curr
    visited.add(curr);
    curr = curr.next;
  }

  return null;

}

// redo:
// improved space complexity

var detectCycle5 = function (head) {

  let slow = head, fast = head;

  // find first intersection
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;

    if (slow === fast) {

      // find start of loop
      slow = head;
      while (slow !== fast) {
        slow = slow.next;
        fast = fast.next;
      }

      return slow;

    }
  }

  return null;
}

const head2 = arrToll([1, 2, 3, 4, 5, 6, 7, 8, 9]);
nodeAt(head2, 8).next = nodeAt(head2, 2);
// console.log(nodeAt(head2, 8));

const head3 = arrToll([1, 2]);
nodeAt(head3, 1).next = nodeAt(head3, 0);

console.log(detectCycle5(head3));
