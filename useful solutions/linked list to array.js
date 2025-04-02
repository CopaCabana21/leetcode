function linkedListToArray(head){

    let current = head;
    let arr = [];

    while(current){
        arr.push(current.val);
        current = current.next;
    }

    return arr;
}