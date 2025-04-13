function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}

/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function(list1, list2) {

    if(!list1 || !list2){
        return list1 || list2;
    }

    const dummy = new ListNode(-1);
    let curr = dummy, leftover;
    
    while(list1 || list2){

        if(list1 && list2){
            if(list1.val <= list2.val){
                curr.next = list1;
                list1 = list1.next;
            }else{
                curr.next = list2;
                list2 = list2.next;
            }

            curr = curr.next;
        }else{
            
            if(list1){
                curr.next = list1;
                list1 = list1.next;
            }else{
                curr.next = list2;
                list2 = list2.next;
            }

            curr = curr.next;

        }

    }


    return dummy.next;
};

// tc: O(n+m) -> O(n)
// sc: O(1)

import { arrayToLinkedList } from "./utility/linked list.js";

// console.log(mergeTwoLists(arrayToLinkedList([1,2,3]),arrayToLinkedList([4,5,6])));
// console.log(mergeTwoLists(arrayToLinkedList([1,2,3]),arrayToLinkedList([])));



// ------------------------------------------------------

// recursive

var mergeTwoLists = function(list1, list2) {


    if(!list1) return list2;
    if(!list2) return list1;

    if(list1.val <= list2.val){
        list1.next = mergeTwoLists(list1.next, list2);
        return list1;
    }else{
        list2.next = mergeTwoLists(list2.next, list1);
        return list2;
    }

};




console.log(mergeTwoLists(arrayToLinkedList([1,2,5,6]),arrayToLinkedList([3,4,7])));