/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

import { arrayToLinkedList } from "./utility/linked list.js";

/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
    
    let slow = head, fast = head;
    let count = 1;
    let length;

    while(fast && fast.next){
        slow = slow.next;
        fast = fast.next.next;
        count++;
    }
    
    if(!fast){
        length = 2*(count-1);
    }else{
        length = 2*count - 1
    }

    let index = length - n;

    count = 0;
    let current = head;

    if(index === 0){
        return head.next;
    }

    while(count < index - 1){
        current = current.next;
        count++;
    }

    current.next = current.next.next;

    return head;

};

// tc: O(n)
// sc: O(1)

// console.log(JSON.stringify(removeNthFromEnd(arrayToLinkedList([1]),1)));

// --------------------------------------

var removeNthFromEnd2 = function(head, n) {

    let slow = head, fast = head;

    for (let i = 0; i < n; i++) {
        fast = fast.next;
    }

    if(!fast) return head.next;
    
    while(fast.next){ // to get the previous
        fast = fast.next;
        slow = slow.next;
    }
    
    slow.next = slow.next.next;

    return head;
}




console.log(JSON.stringify(removeNthFromEnd2(arrayToLinkedList([2,3,4,5]),2)));
