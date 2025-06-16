
// Manacher's algorithm

var longestPalindrome = function (s) {

  // Use a modified string
  // #a#b#c#b#a#b#b#g
  // so that the even palindromes expand from #. i.e 'b#b'
  // odd and even 
  s = '#' + [...s].join('#') + '#';

  let n = s.length;
  let palins = Array(n).fill(0);
  let max = '';

  // right most palindrome
  let l = 0, r = 0;

  function checkAtRange(left, right) {
    while (left > 0 && right < n - 1 && s[left - 1] === s[right + 1]) {
      left -= 1;
      right += 1;
    }
    // let res = s.slice(left, right + 1);
    // return max.length < res.length ? res : max;
    return (right - left) / 2;
  }

  for (let i = 0; i < n; i++) {

    // console.log(i, s[i]);

    // reuse palindromes with:

    // .....(l.....o.....r)
    // ...............i...
    // ..(lj...j..rj)......

    if (i < r) {
      palins[i] = Math.min(r - i, palins[l + r - i]);
    }

    // expand method
    palins[i] = checkAtRange(i - palins[i], i + palins[i]);

    if (r <= i + palins[i]) {
      l = i - palins[i];
      r = i + palins[i];
    }

    if (max.length < (2 * palins[i] + 1)) {
      max = s.slice(i - palins[i], i + palins[i] + 1)
    }

    // console.log(palins[i], l, r);
  }

  // console.log(palins);

  let maxPalindrome = max.replaceAll('#', '');
  console.log(maxPalindrome);

  // to get actual palindromes
  let res = palins.map((val, i) => {
    let palin = s.slice(i - val, i + val + 1);
    palin = palin.replaceAll('#', '');
    return palin
  });

  res = res.filter(s => s.length > 1)

  return res;
};


console.log(longestPalindrome('abcbaoabcbaabbv'));
// console.log(longestPalindrome('abbv'));



// Time complexity for longest palindromic substring
// in the worst case by reusing the palindrome each element
// we get a constant time check of at most 3 checks.

// last longest palindrome
// aaaaaaaaaaaaaaaa
// |.....^.....|
// for the char we use the symetry, and we only expand 2 times.
// aaaaaaaaaaaaaaaaa
// ..|...^*.....|

// The tc is O(n*3) -> O(n)
// sc: O(n)
