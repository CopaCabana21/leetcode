function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}


import { arrayToLinkedList } from "./utility/linked list.js";

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var oddEvenList = function(head) {
    
    if(!head || !head.next) return head;

    let currentEven = head.next, currentOdd = head, current = head.next.next;
    let evenHead = head.next;
    let count = 2, back = head.next;

    while(current){
        if(count % 2 === 0){
            currentOdd.next = current;
            currentOdd = current;
        }else{
            currentEven.next = current;
            currentEven = current;
        }
        if(current.next){
            back = current
        }

        current = current.next;
        count++;
    }

    // fix second to last node
    back.next = null;

    console.log(JSON.stringify(head)); // odd head
    console.log(JSON.stringify(evenHead)); // even head

    currentOdd.next = evenHead;
    return head

};


// tc: O(n)
// sc: O(1)

// oddEvenList(arrayToLinkedList([1,2,3,4,5,6,7]));
// console.log(JSON.stringify(oddEvenList(arrayToLinkedList([1,2,3,4,5,6]))));;
// console.log(oddEvenList(arrayToLinkedList([1,2,3,4,5])));;
// console.log(oddEvenList(arrayToLinkedList([1])));;
console.log(oddEvenList(arrayToLinkedList([1,2,3])));;