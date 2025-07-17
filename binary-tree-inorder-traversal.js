function TreeNode(val, left, right) {
  this.val = (val === undefined ? 0 : val)
  this.left = (left === undefined ? null : left)
  this.right = (right === undefined ? null : right)
}

// in order goes left->root->right

var inorderTraversal = function (root) {
  let node = root;
  let parents = [];
  let res = [];
  while (node || parents.length > 0) {
    if (node) {
      parents.push(node);
      node = node.left;
    } else {
      node = parents.pop();
      res.push(node.val);
      node = node.right;
    }
  }
  return res;
};

// let root = new TreeNode(1, new TreeNode(2, new TreeNode(3), null), null)
let root = new TreeNode(1, new TreeNode(2, new TreeNode(4), new TreeNode(5, new TreeNode(6), new TreeNode(7))), new TreeNode(3, null, new TreeNode(8, new TreeNode(9), null)));
// let root = null;
console.log(postorderTraversal(root));


// tc: 3 × O(1) per node ⇒ O(1) per node still, because constants are dropped in Big O.
// Total operations across all n nodes: O(n)

// sc: the input doesnt count
// is the stack that takes the space
// at a parent change you pop before using the next one
// you only hold one branch at a time in the stack
// Worst case (skewed): O(n)
// Best case (balanced): O(log n)