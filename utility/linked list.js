
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

function noteAt(head, index){

    let current = head;
    let count = 0;

    while(current.next){
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

function nodeAt(head, index){

    let current = head;
    let count = 0;

    while(current.next){
        if(count == index) return current;
    }

    return -1;
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

export {arrayToLinkedList, nodeAt, linkedListToArray};



