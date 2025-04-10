/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

import { arrayToLinkedList, linkedListToArray } from "./utility/linked list.js";

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteMiddle = function(head) {
    
    if(!head.next) return null;
    let slow = head, fast = head.next.next;


    while(fast && fast.next){
        slow = slow.next;
        fast = fast.next.next
    }

    slow.next = slow.next.next;
    return head;
};

// tc: O(n)
// sc: O(1)

console.log(linkedListToArray(deleteMiddle(arrayToLinkedList([1,2]))));
