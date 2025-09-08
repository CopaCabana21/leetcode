function ListNode(val, next) {
  this.val = (val === undefined ? 0 : val)
  this.next = (next === undefined ? null : next)
}

import { arrToll, llToArr } from "./utilities/linked list.js";

/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
// iterative
var mergeTwoLists = function (l1, l2) {

  let dummy = new ListNode(-1);
  let curr = dummy;

  while (l1 && l2) {

    if (l1.val < l2.val) {
      curr.next = l1;
      l1 = l1.next;
    } else {
      curr.next = l2;
      l2 = l2.next;
    }

    curr = curr.next;
  }

  curr.next = l1 ? l1 : l2;

  return dummy.next;
}

// tc: O(n+m) -> O(n)
// sc: O(1)

// console.log(mergeTwoLists(arrToll([1,2,3]),arrToll([])));
// let temp = mergeTwoLists(arrToll([1, 2, 5, 6]), arrToll([3, 4, 7, 9]));
// let temp = mergeTwoLists(arrToll([1, 2, 3]), arrToll([]));
// console.log(llToArr(temp));



// ------------------------------------------------------

// recursive

var mergeTwoLists = function (list1, list2) {


  if (!list1) return list2;
  if (!list2) return list1;

  if (list1.val <= list2.val) {
    list1.next = mergeTwoLists(list1.next, list2);
    return list1;
  } else {
    list2.next = mergeTwoLists(list2.next, list1);
    return list2;
  }

};


// console.log(mergeTwoLists(arrToll([1,2,5,6]),arrToll([3,4,7])));


//* -------------------------------------------------------------------

// again recursive

var mergeTwoLists6 = function (l1, l2) {

  if (!l1) return l2;
  if (!l2) return l1;

  let curr;
  if (l1.val < l2.val) {
    curr = l1;
    curr.next = mergeTwoLists6(l1.next, l2);
  } else {
    curr = l2;
    curr.next = mergeTwoLists6(l1, l2.next);
  }

  return curr;
}



// let res3 = mergeTwoLists4(arrToll([1, 2, 4]), arrToll([1, 3, 4]));
// console.log(llToArr(res3));

// -------------------------------------------------------------------

// again: crappy way using OR

var mergeTwoLists5 = function (l1, l2) {

  let dummy = new ListNode(-1);
  let curr = dummy;

  while (l1 || l2) {

    if (l1?.val < l2?.val) {
      curr.next = l1;
      l1 = l1.next;
    } else if (l2?.val < l1?.val) {
      curr.next = l2;
      l2 = l2.next;
    } else if (l1) {
      curr.next = l1;
      l1 = l1.next;
    } else if (l2) {
      curr.next = l2;
      l2 = l2.next;
    }

    curr = curr.next;
  }

  return dummy.next;
}

// let res3 = mergeTwoLists5(arrToll([1, 2, 4]), arrToll([1, 3, 4]));
// let res3 = mergeTwoLists5(arrToll([1, 2]), arrToll([]));
// console.log(llToArr(res3));
