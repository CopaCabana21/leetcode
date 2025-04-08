// length of a loop

// https://www.geeksforgeeks.org/problems/find-length-of-loop/1?utm_source=youtube&utm_medium=collab_striver_ytdescription&utm_campaign=find-length-of-loop

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

// tc: O(n)
// sc: O(1)

// console.log(arrayToLinkedList([3,2,0,-4]));
let head = arrayToLinkedList([3,2,0,-4]);
// console.log(nodeAt(head,3));
nodeAt(head,3).next = nodeAt(head,1);
// console.log(nodeAt(head,3));

console.log(countNodesinLoop(head));