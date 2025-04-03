/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} node
 * @return {void} Do not return anything, modify node in-place instead.
 */
var deleteNode = function(node) {
    
    let current = node;

    while(current.next.next){
        current.val = current.next.val;
        current = current.next;
    }

    current.val = current.next.val;
    current.next = null;

};

// ------------------------------------

import {arrayToLinkedList, noteAt, linkedListToArray} from './utility/linked list.js'

const linked = arrayToLinkedList([4,5,1,9]);
console.log(linked);
console.log(nodeAt(linked, 2));
console.log(linkedListToArray(linked));
deleteNode(nodeAt(linked, 2));
console.log(linkedListToArray(linked));


// ------------------------------------

var deleteNode2 = function(node) {
    
    node.val = node.next.val;
    node.next = node.next.next

};