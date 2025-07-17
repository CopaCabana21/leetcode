function TreeNode(val, left, right) {
  this.val = (val === undefined ? 0 : val)
  this.left = (left === undefined ? null : left)
  this.right = (right === undefined ? null : right)
}
/**
 * @param {TreeNode} root
 * @return {number[]}
 */

// post order goes: left->right->root

var postorderTraversal = function (root) {
  let last = root;
  let parents = [root];
  let res = [];
  let done = new Set();
  let c = 0;
  while (root && parents.length > 0) {
    if (last.left && !done.has(last.left)) {
      last = last.left;
      parents.push(last);
    } else if (last.right && !done.has(last.right)) {
      last = last.right;
      parents.push(last);
    } else {
      res.push(last.val);
      done.add(last)
      parents.pop();
      last = parents.at(-1)
    }
  }
  return res;
};


// let root = new TreeNode(1, new TreeNode(2, new TreeNode(3), null), null)
let root = new TreeNode(1, new TreeNode(2, new TreeNode(4), new TreeNode(5, new TreeNode(6), new TreeNode(7))), new TreeNode(3, null, new TreeNode(8, new TreeNode(9), null)));
// let root = null;
// console.log(postorderTraversal(root));

// -------------------------------------------


var postorderTraversal2 = function (root) {
  let node = root;
  let parents = [];
  let res = [];
  while (node || parents.length > 0) {
    if (node) {
      res.push(node.val);
      parents.push(node);
      node = node.right;
    } else {
      node = parents.pop();
      node = node.left;
    }
  }
  return res.reverse();
};

// let root2 = new TreeNode(1, new TreeNode(2, new TreeNode(4), new TreeNode(5, new TreeNode(6), new TreeNode(7))), new TreeNode(3, null, new TreeNode(8, new TreeNode(9), null)));
// console.log(postorderTraversal2(root));


// tc: O(3n + n) -> O(n)
// sc: O(n) at worst, O(logn) at best

// -----------------------------------------------
//* two stacks

// similar process to previous solution
// post order goes: left->right->root
// we add to second stack in reverse order: root->right->left

var postorderTraversal3 = function (root) {
  if(!root) return [];
  let stack1 = [root];
  let stack2 = [];
  let res = [];

  // each node is processed once here with constant O(1) operations, so it is O(n)
  while (stack1.length > 0) {
    let node = stack1.pop();
    stack2.push(node);
    if (node.left) stack1.push(node.left);
    if (node.right) stack1.push(node.right);
  }

  while (stack2.length > 0) {
    res.push(stack2.pop().val);
  }
  return res;
};

let root2 = new TreeNode(1, new TreeNode(2, new TreeNode(4), new TreeNode(5, new TreeNode(6), new TreeNode(7))), new TreeNode(3, null, new TreeNode(8, new TreeNode(9), null)));
console.log(postorderTraversal3(root));

// tc: at worst skewed: O(2n + n) -> O(n)
// sc: O(n) at worst, O(logn) at best