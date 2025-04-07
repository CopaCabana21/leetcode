/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */

import { arrayToLinkedList } from "./utility/linked list.js";

// iterative

var reverseList = function(head) {

    if(!head) return head;
    
    let current = head;
    let back = null, forward;

    while(current){

        forward = current.next;
        current.next = back;
        back = current;
        current = forward;
    }
    

    return back;

};

// console.log(reverseList(arrayToLinkedList([1,2,3,4,5])));


/// --------------------------------------------------------

// recursive

var reverseList2 = function(head) {

    if(!head || !head.next){
        return head;
    }

    let newHead = reverseList2(head.next);
    let forward = head.next;
    forward.next = head;
    head.next = null;

    return newHead;

};

// * -> * -> * -> * -> null
// * <- * -> * -> * -> null


console.log(JSON.stringify(reverseList2(arrayToLinkedList([]))));