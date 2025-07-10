
class Node {
    constructor(x){
      this.data = x;
      this.next = null;
      this.bottom = null;
    }
  }


var flatten = function(root){

    // console.log('%o', root);

    while(root.next){
        mergeSortedLists(root, root.next);
        let temp = root.next.next;
        root.next.next = null;
        root.next = temp; 
    }


    function mergeSortedLists(l1, l2){

        let dummy = new Node(-1);
        let curr = dummy;

        while(l1 && l2){
            // console.log('node\n %o', curr);

            if(l1.data <= l2.data){
                curr.bottom = l1;
                curr = l1;
                l1 = l1.bottom;
            }else{
                curr.bottom = l2;
                curr = l2;
                l2 = l2.bottom;
            }
        }

        // add leftovers
        curr.bottom = l1 || l2;
        // console.log('node\n %o', dummy.bottom);

        return dummy.bottom;
    }

    
    // console.log('%o', root);
    // console.log(JSON.stringify(root, null, 2));
    
    return root;

}

let h1 = new Node(5);
let h2 = new Node(10);

h1.next = h2;
h1.bottom = new Node(7);
h1.bottom.bottom = new Node(8);
h1.bottom.bottom.bottom = new Node(30);


h2.bottom = new Node(20)
h2.bottom.bottom = new Node(40);

h2.next = new Node(19);
h2.next.bottom = new Node(22);
h2.next.bottom.bottom = new Node(50);

console.log(JSON.stringify(flatten(h1), null, 2));