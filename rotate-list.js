/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */

import { arrToll, llToArr } from "./utility/linked list.js";

var rotateRight = function (head, k) {

  if (!head) return head;

  let end = head, curr = head;
  let count = k, length = 0;

  while (count > 0) {
    end = end.next;
    length++;
    count--;

    if (!end) {
      count = k % length;
      end = head;
    };
  }

  while (end.next) {
    curr = curr.next;
    end = end.next;
  }

  end.next = head;
  head = curr.next;
  curr.next = null;

  return head;
};

// let res = rotateRight(arrToll([1, 2, 3, 4, 5]), 2);
let res = rotateRight(arrToll([0, 1, 2]), 4);
// let res = rotateRight(arrToll([]), 0);
console.log(llToArr(res));


// tc: O(n + n) -> O(n)
// sc: O(1)