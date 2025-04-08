/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {
    
    let current = head;

    while (current) {
        if(current.val === '#') return true;
        current.val = "#";
        current = current.next;
    }

    return false;
};


import { arrayToLinkedList } from "./utility/linked list.js";

console.log(hasCycle(arrayToLinkedList([3,2,0,-4])));

// tc: O(n)
// sc: O(1)

// ----------------------------------------

// Floyd’s cycle-finding hare and tortoise

var hasCycle2 = function(head) {

    let slow = head;
    let fast = head;

    while(fast !== null && fast.next !== null){
        slow = slow.next;
        fast = fast.next.next;

        if(slow === fast) return true;
    }
    
    return false;

};
