
// Quickselect is a selection algorithm to find the k-th smallest element in an unordered list.
// By default, Quicksort and Quickselect operate from smallest to largest, i.e., they find the kth smallest element.

// ----------------------------------------------------------------------

// split the array in lower than pivot to higher than pivot

// tc: aproximetly O(n)
// O(n^2) in the worst case
// we can safely say O(n) on average if we select a random pivot or randomize the input array 

// - pivot chosen to be the right edge
// - recursive
// - use a pointer

var quickSelect = function (arr, k) {

  // returns the position of pivot in lower to higher order
  function partition(left, right) {

    let pivot = arr[right];
    let pointer = left;

    for (let i = left; i < right; i++) {
      // should be from lower to higher than pivot
      // so if arr[i] is lower then move to left
      if (arr[i] <= pivot) {
        [arr[i], arr[pointer]] = [arr[pointer], arr[i]];
        pointer++;
      }
    }

    // insert pivot in its corresponding place
    [arr[pointer], arr[right]] = [arr[right], arr[pointer]];

    // if pointer = k, then we found the smallest k element
    // k < pointer then partition the left side
    // else partition the right side
    if (pointer === k - 1) return arr[pointer];
    else if (k - 1 < pointer) return partition(left, pointer - 1);
    else return partition(pointer + 1, right)

  }

  return partition(0, arr.length - 1);

};

// all left of pivot are lower

console.log(quickSelect([3, 2, 1, 5, 6, 2, 1, 4], 5));


// ----------------------------------------------------------------------

// same as above but iterative

// - pivot chosen to be the right edge
// - iterative
// - use a pointer

var quickSelect2 = function (arr, k) {

  function partition(arr, left, right) {

    let pivot = arr[right];
    let pointer = left;

    for (let i = left; i < right; i++) {
      if (arr[i] <= pivot) {
        [arr[i], arr[pointer]] = [arr[pointer], arr[i]];
        pointer++;
      }
    }
    [arr[pointer], arr[right]] = [arr[right], arr[pointer]];

    return pointer;
  }

  let left = 0, right = arr.length - 1;
  let pivotPos;

  while (true) {

    pivotPos = partition(arr, left, right);

    if (pivotPos === k - 1) break;
    else if (k - 1 < pivotPos) right = pivotPos - 1;
    else left = pivotPos + 1;
  }

  return arr[pivotPos];

};

// all left of pivot are lower

console.log(quickSelect2([3, 2, 1, 5, 6, 2, 1, 4], 4));

// ---------------------------------------------------------------

// randomize the pivot

var quickSelect3 = function (arr, k) {

  function partition(arr, left, right) {

    let pivot = arr[right];
    let pointer = left;

    for (let i = left; i < right; i++) {
      if (arr[i] <= pivot) {
        [arr[i], arr[pointer]] = [arr[pointer], arr[i]];
        pointer++;
      }
    }
    [arr[pointer], arr[right]] = [arr[right], arr[pointer]];

    return pointer;
  }

  function paritionRandomized(arr, left, right) {
    // this just call the same parition logic but with a random pivot
    // moved to the end.
    let randomPivot = left + Math.floor(Math.random() * (right - left + 1));
    // move the pivot to the right to reuse the logic
    [arr[right], arr[randomPivot]] = [arr[randomPivot], arr[right]];

    return partition(arr, left, right)
  }

  let left = 0, right = arr.length - 1;
  let pivotPos;

  while (true) {

    pivotPos = paritionRandomized(arr, left, right);

    if (pivotPos === k - 1) break;
    else if (k - 1 < pivotPos) right = pivotPos - 1;
    else left = pivotPos + 1;
  }

  return arr[pivotPos];

};

console.log(quickSelect3([3, 2, 1, 5, 6, 2, 1, 4], 4));
