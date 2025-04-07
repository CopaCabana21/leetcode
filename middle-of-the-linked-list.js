import {arrayToLinkedList} from './utility/linked list.js'


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
var middleNode = function(head) {

    let current = head;
    let middle = head;
    let count = 1;
    
    while(current){

        current = current.next;
        if(count % 2 === 0){
            middle = middle.next;
        }
        count++;
    }

    return middle;
    
};


// tc: O(1)
// sc: O(1)
console.log(arrayToLinkedList([1,2,3,4,5]));
console.log(middleNode(arrayToLinkedList([1,2,3,4,5])));


// -----------------------------------------------------------

// tortoise and hare

var middleNode2 = function(head) {

    let slow = head;
    let fast = head;
    
    while(fast && fast.next){

        slow = slow.next;
        fast = fast.next.next;
    }

    return slow;
    
};

// -----------------------------------------------------------

console.log(arrayToLinkedList([1,2,3,4,5]));
console.log(middleNode2(arrayToLinkedList([1,2,3,4,5])));



// 1 - 1 *
// 2 - 2
// 3 - 2
// 4 - 3
// 5 - 3
// 6 - 4
// 7 - 4
// 8 - 5
// 9 - 5
// 10 - 6
// 11 - 6