/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

import { arrayToLinkedList, nodeAt} from "./utility/linked list.js";

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function(head) {

    let check = new Set();
    let current = head;

    while(current){
        if(check.has(current)) return current;

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

var detectCycle2 = function(head) {

    let slow = head, fast = head;

    while(fast && fast.next){

        slow = slow.next;
        fast = fast.next.next;

        if(slow === fast) break;
    }

    if(!(fast && fast.next)) return null;

    while(head !== slow){
        head = head.next;
        slow = slow.next;
    }

    return slow;
};


// tc: O(n)

// in the worst case a loop two times O(n + n) but that still is O(n)

// sc: O(1)

// console.log(arrayToLinkedList([3,2,0,-4]));
let head = arrayToLinkedList([3,2,0,-4]);
// console.log(nodeAt(head,3));
nodeAt(head,3).next = nodeAt(head,1);
// console.log(nodeAt(head,3));

console.log(detectCycle2(head));
