/**
 * @param {number[]} height
 * @return {number}
 */

// tc: O(n + n) -> O(n)
// sc: O(n)

var trap = function (height) {

  let left = [0];
  let sum = 0;

  for (let i = 1; i < height.length; i++) {
    // console.log(`i(${i})`, `H(${height[i]})`, left, sum);

    if (left.length == 1 && height[i] >= height[left[left.length - 1]]) {
      left.pop();
      left.push(i);
      continue;
    }

    while (left.length && height[i] > height[left[left.length - 1]]) {
      let bottom = left.pop();
      while (height[bottom] == height[left[left.length - 1]]) {
        left.pop();
      }
      let depth;
      let leftHeight = height[left[left.length - 1]];
      let topHeight = (height[i] >= leftHeight) ? leftHeight : height[i];

      depth = topHeight - height[bottom];
      sum += (i - left[left.length - 1] - 1) * depth;

      if (left.length == 1 && height[left[left.length - 1]] <= height[i]) {
        left.pop();
      }
      // console.log('h', sum, `left(${left})`, height[i]);
    }

    left.push(i);
  }

  return sum;
};

// console.log(trap([0, 1, 0, 1]));
// console.log(trap([0, 1, 2, 3]));
// console.log(trap([0, 3,2,1,2]));
// console.log(trap([0, 5, 1, 1, 6]));
// console.log(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]));
// console.log(trap([4, 2, 0, 3, 2, 5]));
// console.log(trap([4, 2, 0, 5, 2, 5]));

/*

     |
|    |
|  | |
|| |||
||_|||

*/


// left to right wall method

// if left > right, then inevitably the water will be filled until the top right. The trick is to know if there's a right wall were we can't go up further, but the water will be filled nevertheless.
// We compute the water volume of width 1 in each step.
// If there's a higher right wall we update the max right.

// We do the same process if left < right

var trap2 = function (height) {

  let maxHeightLeft = 0, maxHeightRight = 0;
  let left = 0, right = height.length - 1;
  let sum = 0;

  while (left <= right) {
    if (height[left] <= height[right]) {
      if (height[left] <= maxHeightLeft) {
        sum += maxHeightLeft - height[left];
      } else {
        maxHeightLeft = height[left];
      }
      left++;
    } else {
      if (height[right] <= maxHeightRight) {
        sum += maxHeightRight - height[right];
      } else {
        maxHeightRight = height[right];
      }
      right--;
    }
  }

  return sum;
};

console.log(trap2([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]
));
