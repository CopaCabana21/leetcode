function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}


import { arrayToLinkedList } from "./utility/linked list.js";

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var sortList = function(head) {

    let current1 = head, current2;
    let min;
    let dummy = new ListNode();
    let prevMin, last = dummy, prev = head;

    while(current1){

        min = current1;
        current2 = current1.next;
        prev = current1;

        while(current2){
            if(current2.val <= min.val){
                min = current2;
                prevMin = prev;
            }

            prev = current2;
            current2 = current2.next;
        }
        
        if(current1 !== min){

            prevMin.next = prevMin.next.next;
        }else{
            current1 = current1.next;
        }
            last.next = min;
            last = min;


    }

    return dummy.next
};

// tc: O(n**2)
// sc: O(1)

// console.log(JSON.stringify(sortList(arrayToLinkedList([4,2,1,3]))));
console.log(JSON.stringify(sortList(arrayToLinkedList([4]))));
console.log(JSON.stringify(sortList(arrayToLinkedList([2,3,4,5,6,1]))));
console.log(JSON.stringify(sortList(arrayToLinkedList([2,2,2,2,2]))));
console.log(JSON.stringify(sortList(arrayToLinkedList([1,4,5,6,1,8,9,2,10,11,2,3,3]))));


// this works for small arrays, but for large inputs in leetcode I get a 'Time Limit Exceeded



// ----------------------------------------------------------------

// merge sort

var sortList2 = function(head){

    let slow = head, fast = head, prev;
    if(!head || !head.next) return head;

    // reach the middle
    while(fast && fast.next){
        prev = slow;
        slow = slow.next;
        fast = fast.next.next;
    }

    // cut the list in half
    prev.next = null;

    // recurse the left and right half
    let left = sortList2(head);
    let right = sortList2(slow);

    return merge(left, right);

}

function merge(left, right){

    let dummy = new ListNode();
    let curr = dummy;

    while(left && right){

        if(left.val <= right.val){
            curr.next = left;
            left = left.next;
        }else{
            curr.next = right;
            right = right.next;   
        }

        curr = curr.next;
    }


    // attach the remaining
    curr.next = left || right;

    return dummy.next;

}

// tc: O(nlogn)
// sc: O(1)

// console.log(JSON.stringify(sortList2(arrayToLinkedList([4,2,1,3]))));
// console.log(JSON.stringify(sortList2(arrayToLinkedList([4]))));
// console.log(JSON.stringify(sortList2(arrayToLinkedList([2,3,4,5,6,1]))));
