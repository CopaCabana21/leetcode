
// `
//   |   ┌── 
//   └── 5
//       └──
// `

function ppBinaryTree(node, prefix = '', isLeft = true) {

  if (!node) return;

  ppBinaryTree(node.right, prefix + (isLeft ? "│   " : "    "), false);

  console.log(prefix + (isLeft ? "└── " : "┌── ") + node.val);

  ppBinaryTree(node.left, prefix + (isLeft ? "    " : "│   "), true);
}

function ppBinaryHeap(heap, index = 0, prefix = '', isLeft = true) {

  let arr = heap.heap;
  if (index > arr.length - 1) return;

  ppBinaryHeap(heap, 2 * index + 2, prefix + (isLeft ? "│   " : "    "), false);

  console.log(prefix + (isLeft ? "└── " : "┌── ") + arr[index]);

  ppBinaryHeap(heap, 2 * index + 1, prefix + (isLeft ? "    " : "│   "), true);
}

function ppPriorityQueue(pq, index = 0, prefix = '', isLeft = true) {

  let heap = pq.heap;
  if (index > heap.length - 1) return;

  ppPriorityQueue(pq, 2 * index + 2, prefix + (isLeft ? "│   " : "    "), false);

  console.log(prefix + (isLeft ? "└── " : "┌── ") + `${heap[index].value}[${heap[index].priority}]`);

  ppPriorityQueue(pq, 2 * index + 1, prefix + (isLeft ? "    " : "│   "), true);
}


export { ppBinaryTree, ppBinaryHeap, ppPriorityQueue }