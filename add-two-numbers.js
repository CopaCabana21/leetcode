/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */

function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}


var addTwoNumbers = function(l1, l2) {

    let sum, carry = 0;
    let dummy = new ListNode(-1);
    let current = dummy;

    
    while(l1 || l2 || carry){

        // resolve when on linked list reaches the end
        const val1 = l1? l1.val : 0;
        const val2 = l2? l2.val : 0;

        sum = val1 + val2 + carry;
        current.next = new ListNode(sum%10);
        carry = Math.floor(sum / 10);

        current = current.next;
        l1 = l1? l1.next : l1;
        l2 = l2? l2.next : l2;
    }

    return dummy.next;
};

// ------------------------------

function arrayToLinkedList(arr){

    let dummy = new ListNode(-1);
    let current = dummy;

    for (const ele of arr) {
        current.next = new ListNode(ele);
        current = current.next;
    }

    return dummy.next;
}


const l1 = arrayToLinkedList([9,9,9,9,9,9,9]);
const l2 = arrayToLinkedList([9,9,9,9]);

console.log(JSON.stringify(addTwoNumbers(l1,l2)));
// console.log(linkedListToArray(addTwoNumbers(l1,l2)));



// --------------------------------------------------------------

var addTwoNumbersAgain = function(l1, l2) {
    
    let dummy = new ListNode(-1);
    let curr = dummy, sum, carry = 0;
    
    while(l1 || l2 || carry){

        let val1 = l1? l1.val : 0;
        let val2 = l2? l2.val : 0;

        sum = val1 + val2 + carry;
        carry = Math.floor(sum / 10);
        sum = sum % 10;
        
        let newNode = new ListNode(sum);

        curr.next = newNode;
        curr = curr.next;

        l1 = l1? l1.next : l1;
        l2 = l2? l2.next : l2;

    }

    return dummy.next;

}

console.log('-'.repeat(70));

addTwoNumbersAgain(arrayToLinkedList([2,4,3]),arrayToLinkedList([5,6,4]))
