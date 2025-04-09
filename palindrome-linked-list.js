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
 * @return {boolean}
 */
var isPalindrome = function(head) {
    
    let current = head;
    let arr = [];

    while(current){
        arr.push(current.val);
        current = current.next;
    }
    


    for( let i=0,j=arr.length-1; i<Math.floor(arr.length/2); i++,j--){
        if(arr[i] !== arr[j]) return false;
    }


    return true;
};

// tc: O(2n) -> O(n)
// sc: O(n)

// console.log(isPalindrome(arrayToLinkedList([1,2,1,3,2,1])));


// ---------------------------------------------------------------

// reverse the first half of the linked list
var isPalindrome2 = function(head) {
    
    let current = head;
    let length = 0;

    while(current){
        current = current.next;
        length++;
    }

    let count = 0;
    let back = null, forward;
    current = head;

    while(count < Math.floor(length/2)){
        
        forward = current.next;
        current.next = back;
        back = current;
        current = forward;
        count++;
    }


    current = back;
    if(length % 2 !== 0 && forward){
        forward = forward.next;
    }

    while(current){
        if(current.val !== forward.val) return false;
        // console.log('cu',current, 'for', forward, 'e');
        current = current.next;
        forward = forward.next;

    }

    return true;
};

// tc: O(2n) -> O(n)
// sc: O(1)

// console.log(isPalindrome2(arrayToLinkedList([1,2,3,4,5,6,7])));
// console.log(isPalindrome2(arrayToLinkedList([1,2,2,1])));
// console.log(isPalindrome2(arrayToLinkedList([1])));


// ---------------------------------------------------------------

// reverse the second half of the LL


var isPalindrome3 = function(head) {

    let slow = head, fast = head;

    // get to the middle
    while(fast && fast.next){

        slow = slow.next;
        fast = fast.next.next;
    }


    // reverse the second half
    let back = null;
    while(slow){
        let forth = slow.next;
        slow.next = back;
        back = slow;
        slow = forth;
    }

    // traverse to the center and compare
    let newhead = back;

    slow = head;
    while(back){
        // console.log('slow:', slow, 'back:', back);
        if(slow.val !== back.val) return false;
        slow = slow.next;
        back = back.next;
    }

    //optional: restore the original LL
    // while(back){
    //     if(slow.val !== back.val){
    //         reverseLL(newhead);
    //         return false;
    //     };
    //     slow = slow.next;
    //     back = back.next;
    // }
    // reverseLL(newhead);

    return true
};


function reverseLL(head){
    let current = head;
    let back = null;
    while(current){
        let forth = current.next;
        current.next = back;
        back = current;
        current = forth;
    }
    
    return back;
}


// console.log(isPalindrome3(arrayToLinkedList([1])));
// console.log(isPalindrome3(arrayToLinkedList([1,2,2,1])));
let temp = arrayToLinkedList([1,2,3,4,5,6,7]);
console.log(isPalindrome3(temp));
console.log(linkedListToArray(temp));
