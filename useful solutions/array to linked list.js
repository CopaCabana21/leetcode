function arrayToLinkedList(arr){

    let dummy = new ListNode(-1);
    let current = dummy;

    for (const ele of arr) {
        current.next = new ListNode(ele);
        current = current.next;
    }

    return dummy.next;
}




