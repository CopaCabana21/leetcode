function TreeNode(val, left, right) {
  this.val = (val === undefined ? 0 : val)
  this.left = (left === undefined ? null : left)
  this.right = (right === undefined ? null : right)
}
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
  if (!root) return [];
  let currentLevel = [root];
  let res = [];
  while (currentLevel.length > 0) {
    let nextLevel = [];
    for (const node of currentLevel) {
      if (node.left) nextLevel.push(node.left);
      if (node.right) nextLevel.push(node.right);
    }
    res.push(currentLevel.map(node => node.val))
    currentLevel = nextLevel;
  }

  return res;
};

let root = new TreeNode(3, new TreeNode(9), new TreeNode(20, new TreeNode(15), new TreeNode(7)));

console.log(levelOrder(root));

// tc: O(n)
// sc: O(n/2) at worst -> O(n)