// https://www.geeksforgeeks.org/problems/add-1-to-a-number-represented-as-linked-list/1?utm_source=youtube&utm_medium=collab_striver_ytdescription&utm_campaign=add-1-to-a-number-represented-as-linked-list

import { arrayToLinkedList } from "../utility/linked list.js";

function addOne(node) {

    if(!node) return node;

    let curr = node;
    while(curr.next){
        curr = curr.next;
    }
    
    curr.val += 1;

    return node;
}

console.log(JSON.stringify(addOne(arrayToLinkedList([4,5,6,7]))));