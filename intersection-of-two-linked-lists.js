/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function(headA, headB) {
    
    const check = new Set();
    let curr = headA;

    while(curr){
        check.add(curr);
        curr = curr.next;
    }

    curr = headB;
    while(curr){
        if(check.has(curr)) return curr;
        curr = curr.next;
    }

    return null;

};


// tc: O(n)
// the hash table lookup is O(1)

// sc: O(1)


// -----------------------------------------------------

// instead of calculating the length, use the node difference of the list
// if they are k nodes apart, once headA reaches the end then headB will be k nodes from null

// now reset the headA to the head of B (interchange) and let headB reach the end. Then headA will have moved k nodes.
// Now if you put headB to A (interchange). Both of the nodes will be at the same distance from the 
// intersection node if it exist. Let them keep moving and they eventually meet;

// If it doesn't they will both reach the end and return null

var getIntersectionNode2 = function(headA, headB) {

    if(!headA || !headB) return null;

    let a = headA, b = headB;

    while(a !== b){

        if(!a){
            a = headB;
        }else{
            a = a.next;
        }
        
        if(!b){
            b = headA;
        }else{
            b = b.next;
        }

    }

    return a;

};