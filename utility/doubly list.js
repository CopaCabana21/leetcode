function arrayToDoubly(arr){


    let head = new Node(arr[0]);
    let current = head;
    let parent = null;

    for (let i=1; i<arr.length; i++) {
        let newNode = new Node(arr[i]);

        current.next = newNode;
        current.prev = parent;
        parent = current;
        current = newNode;
    }


    // we exist here with current being the last node but without prev property
    // update it here
    current.prev = parent;

    return head;

}


class Node{
    constructor(val){
        this.val = val;
        this.prev = null;
        this.next = null;
    }
}


function doublyToArray(head){

    let current = head;
    let arr = [];

    while(current){
        arr.push(current.val);
        current = current.next;
    }

    return arr;

}

function reverseDLL(head) {
    

    let current = head;
    let forward;

    while(current){
        // console.log('h');
        forward = current.next;
        current.next = current.prev;
        current.prev = forward;

        // OR thanks to JS use destructuring
        // [current.prev, current.next] = [current.next, current.prev];

        head = current;
        current = forward;
    }

    return head;
}

console.log(doublyToArray(arrayToDoubly([1,2,3,4])));
console.log(reverseDLL(arrayToDoubly([1,2,3,4])));
console.log(doublyToArray(reverseDLL(arrayToDoubly([1,2,3,4]))));


// export {arrayToDoubly, doublyToArray}