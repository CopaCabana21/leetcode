function TreeNode(val, left, right) {
  this.val = (val === undefined ? 0 : val)
  this.left = (left === undefined ? null : left)
  this.right = (right === undefined ? null : right)
}

// preorder is root->left->right

var preorderTraversal = function (root) {
  let res = [];
  let stack = [];
  let node = root;

  while (node || stack.length > 0) {
    if (node) {
      res.push(node.val);
      stack.push(node);
      node = node.left;
    } else {
      node = stack.pop() // get parent
      node = node.right;
    }
  }

  return res;
};

// let root = new TreeNode(1, new TreeNode(2, new TreeNode(3), null), null)
let root = new TreeNode(1, new TreeNode(2, new TreeNode(4), new TreeNode(5, new TreeNode(6), new TreeNode(7))), new TreeNode(3, null, new TreeNode(8, new TreeNode(9), null)));
// let root = null;
console.log(preorderTraversal(root));


