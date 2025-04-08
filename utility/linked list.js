
function ListNode(val) {
    this.val = val;
    this.next = null;
}

// array to linked list

function arrayToLinkedList(arr){

    let dummy = new ListNode(-1);
    let current = dummy;

    for (const ele of arr) {
        current.next = new ListNode(ele);
        current = current.next;
    }

    return dummy.next;
}


// node at index

function nodeAt(head, index){

    let current = head;
    let count = 0;

    while(current){
        if(count === index) return current;
        current = current.next;
        count++;
    }

    return -1;
}

// linked list to array

function linkedListToArray(head){

    let current = head;
    let arr = [];

    while(current){
        arr.push(current.val);
        current = current.next;
    }

    return arr;
}

var reverseList = function(head) {

    if(!head) return head;
    
    let current = head;
    let back = null, forward;

    while(current){

        forward = current.next;
        current.next = back;
        back = current;
        current = forward;
    }
    

    return back;

};

// ---------------------------------------------------------------------------

// length of a loop

function countNodesinLoop(head) {

    let slow = head, fast = head;
    
    while(fast && fast.next){

        slow = slow.next;
        fast = fast.next.next;

        if(slow === fast) break;
    }

    if(!(fast && fast.next)) return 0;


    let count = 1;
    slow = slow.next;
    while(slow !== fast){
        slow = slow.next;
        count++;
    }

    return count;
}

// console.log(arrayToLinkedList([3,2,0,-4]));
let head = arrayToLinkedList([3,2,0,-4]);
// console.log(nodeAt(head,3));
nodeAt(head,3).next = nodeAt(head,1);
// console.log(nodeAt(head,3));

console.log(countNodesinLoop(head));

// ---------------------------------------------------------------------------


export {arrayToLinkedList, nodeAt, linkedListToArray};



