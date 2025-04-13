
// https://www.geeksforgeeks.org/problems/given-a-linked-list-of-0s-1s-and-2s-sort-it/1?utm_source=youtube&utm_medium=collab_striver_ytdescription&utm_campaign=given-a-linked-list-of-0s-1s-and-2s-sort-it

import { arrayToLinkedList } from "../utility/linked list.js";

function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}


function segregate(head) {

    
    let pos = head, curr = head;

    while(curr){
        if(curr.val === 0){
            let temp = pos.val;
            pos.val = curr.val;
            curr.val = temp;
            pos = pos.next;
        }
        curr = curr.next;
    }

    curr = pos;

    while(curr){
        if(curr.val === 1){
            let temp = pos.val;
            pos.val = curr.val;
            curr.val = temp;
            pos = pos.next;
        }
        curr = curr.next;
    }

    return head;
}

// tc: O(2n) ->O(n)
// sc: O(1)

// console.log(JSON.stringify(segregate(arrayToLinkedList([1,2,1,0,1,2,0]))));


// ---------------------------------------------------------

function segregate2(head) {

    let dummy0 = new ListNode(-1);
    let dummy1 = new ListNode(-1);
    let dummy2 = new ListNode(-1);


    let zero = dummy0;
    let one = dummy1;
    let two = dummy2;

    let curr = head;

    while(curr){

        let temp = curr.next;

        if(curr.val === 0){
            zero.next = curr;
            zero = curr;

        }else if(curr.val === 1){
            one.next = curr;
            one = curr;
        }else{
            two.next = curr;
            two = curr;
        }
        curr = temp;
    }

    // console.log(JSON.stringify(one));
    zero.next = dummy1.next || dummy2.next;
    one.next = dummy2.next;
    two.next = null;

    return dummy0.next;
}

// tc: O(n)
// sc: O(1)

// console.log(JSON.stringify(segregate2(arrayToLinkedList([1,2,1,1,2]))));
console.log(JSON.stringify(segregate2(arrayToLinkedList([0]))));
console.log(JSON.stringify(segregate2(arrayToLinkedList([1,2,2,1,2,0,2,2]))));
