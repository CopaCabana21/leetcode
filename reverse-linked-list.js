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

console.log(reverseList(arrayToLinkedList([1,2,3,4,5])));