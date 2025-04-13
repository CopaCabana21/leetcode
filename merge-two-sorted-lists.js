function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}

import { arrayToLinkedList } from "./utility/linked list.js";

/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
// iterative
var mergeTwoLists = function(l1, l2){

    let dummy = new ListNode(-1);
    let curr = dummy;

    // compare and add to last node
    while(l1 && l2){
        if(l1.val <= l2.val){
            curr.next = l1;
            curr = l1;
            l1 = l1.next;
        }else{
            curr.next = l2;
            curr = l2;
            l2 = l2.next;
        }
    }

    // add leftovers
    curr.next = l1 || l2;
    // console.log('%o', curr);

    return dummy.next;
}

// tc: O(n+m) -> O(n)
// sc: O(1)


// console.log(mergeTwoLists(arrayToLinkedList([1,2,3]),arrayToLinkedList([4,5,6])));
// console.log(mergeTwoLists(arrayToLinkedList([1,2,3]),arrayToLinkedList([])));
let temp = mergeTwoLists(arrayToLinkedList([1,2,5,6]),arrayToLinkedList([3,4,7,9]));
console.log(JSON.stringify(temp, null, 2));



// ------------------------------------------------------

// recursive

var mergeTwoLists = function(list1, list2) {


    if(!list1) return list2;
    if(!list2) return list1;

    if(list1.val <= list2.val){
        list1.next = mergeTwoLists(list1.next, list2);
        return list1;
    }else{
        list2.next = mergeTwoLists(list2.next, list1);
        return list2;
    }

};




// console.log(mergeTwoLists(arrayToLinkedList([1,2,5,6]),arrayToLinkedList([3,4,7])));


// ------------------------------------------------------------------------

// iterative
var mergeTwoListsAgain = function(l1, l2){

    let dummy = new ListNode(-1);
    let curr = dummy;

    // compare and add to last node
    while(l1 && l2){

        let less = (l1.val <= l2.val)? l1 : l2;

        if(l1.val <= l2.val){
            curr.next = l1;
            curr = l1;
            l1 = l1.next;
        }else{
            curr.next = l2;
            curr = l2;
            l2 = l2.next;
        }
    }

    // add leftovers
    curr.next = l1 || l2;
    // console.log('%o', curr);

    return dummy.next;
}

temp = mergeTwoListsAgain(arrayToLinkedList([1,2,5,6]),arrayToLinkedList([3,4,7,9]));
console.log(JSON.stringify(temp, null, 2));
