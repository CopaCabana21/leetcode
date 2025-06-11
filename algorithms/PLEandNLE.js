

function getPLEIndex(arr) {

  const n = arr.length;
  let indexes = Array(n).fill(-1);
  let stack = [];

  for (let i = n-1; i >= 0; i--) {
    while (stack.length && arr[i] < arr[stack[stack.length - 1]]) {
      let top = stack.pop();
      indexes[top] = i;
    }
    stack.push(i);
  }

  return indexes;
}

console.log(getPLEIndex([3, 1, 2]));

function getNLEIndex(arr) {

  let indexes = Array(arr.length).fill(arr.length);
  let stack = [];

  for (let i = 0; i < arr.length; i++) {

    while (stack.length && arr[i] < arr[stack[stack.length - 1]]) {
      let top = stack.pop();
      indexes[top] = i;
    }
    stack.push(i);
  }

  return indexes;
}

console.log(getNLEIndex([3, 1, 2]));

// -----------------------------------------------------------------------

// PLE using NLE

function getPLEIndex2(arr) {

  let indexes = Array(arr.length).fill(-1);
  let stack = [];

  for (let i = 0; i < arr.length; i++) {
    while (stack.length && arr[i] < arr[stack[stack.length - 1]]) {
      stack.pop();
    }
    if (stack.length) {
      indexes[i] = stack[stack.length - 1]
    }

    stack.push(i)
  }

  return indexes;
}

console.log(getPLEIndex2([3, 1, 2]));
