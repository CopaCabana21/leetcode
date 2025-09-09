/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */

function ListNode(val, next) {
  this.val = (val === undefined ? 0 : val)
  this.next = (next === undefined ? null : next)
}


import { arrToll, llToArr } from "./utilities/linked list.js";

var addTwoNumbers = function (l1, l2) {

  let sum, carry = 0;
  let dummy = new ListNode(-1);
  let current = dummy;


  while (l1 || l2 || carry) {

    // resolve when on linked list reaches the end
    const val1 = l1 ? l1.val : 0;
    const val2 = l2 ? l2.val : 0;

    sum = val1 + val2 + carry;
    current.next = new ListNode(sum % 10);
    carry = Math.floor(sum / 10);

    current = current.next;
    l1 = l1 ? l1.next : l1;
    l2 = l2 ? l2.next : l2;
  }

  return dummy.next;
};

const l1 = arrToll([9, 9, 9, 9, 9, 9, 9]);
const l2 = arrToll([9, 9, 9, 9]);

// console.log(JSON.stringify(addTwoNumbers(l1, l2)));
// console.log(llToArr(addTwoNumbers(l1,l2)));


// -------------------------------------------------------------------------
// again

var addTwoNumbers4 = function (l1, l2) {

  let carry = 0;
  const dummy = new ListNode(-1);
  let curr = dummy;
  while (l1 || l2 || carry) {
    let val1 = l1 ? l1.val : 0;
    let val2 = l2 ? l2.val : 0;
    let add = val1 + val2 + carry;
    carry = Math.floor(add / 10);
    let digit = new ListNode(add % 10);
    curr.next = digit;

    l1 = l1 ? l1.next : l1;
    l2 = l2 ? l2.next : l2;
    curr = digit;
  }

  return dummy.next;
}

console.log(llToArr(addTwoNumbers4(arrToll([2, 4, 3]), arrToll([5, 6, 4]))));
