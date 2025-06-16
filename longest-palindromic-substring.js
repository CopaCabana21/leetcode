/**
 * @param {string} s
 * @return {string}
 */


// expand method
var longestPalindrome = function (s) {

  let max = '';

  function checkAtRange(left, right) {
    while (left > 0 && right < s.length - 1 && s[left - 1] === s[right + 1]) {
      left -= 1;
      right += 1;
    }

    let res = s.slice(left, right + 1);

    return max.length < res.length ? res : max;
  }

  for (let i = 0; i < s.length; i++) {
    // check odd
    max = checkAtRange(i, i);

    if (s[i + 1] === s[i]) {
      // check even
      max = checkAtRange(i, i + 1);
    }
  }

  return max;
};

// tc: O(
//  even: 2 * (n/2)(n/2+1)/2 + 
// odd: (2 * (n/2)(n/2+1)/2) + (n+1)/2
// ) -> O(n^2)
// sc: O(1)



// console.log(longestPalindrome('abcbaoabcba'));
// console.log(longestPalindrome3('abbdef'));


// -------------------------------------------------------------------
// expand method, without condition checking also tc: O(n^2)

var longestPalindrome2 = function (s) {

  let max = '';

  function checkAtIndex2(left, right) {

    while (left >= 0 && right < s.length && s[left] === s[right]) {
      left--;
      right++;
    }
    console.log(left + 1, right, s.slice(left + 1, right));
    return s.slice(left + 1, right);
  }

  for (let i = 0; i < s.length; i++) {
    let odd = checkAtIndex2(i, i);
    let even = checkAtIndex2(i, i + 1);

    if (odd.length > max.length) {
      max = odd;
    }

    if (even.length > max.length) {
      max = even;
    }
  }

  return max;
};


// console.log(longestPalindrome2('bb'));


// ------------------------------------------------------------------------
// Manacher's algorithm in algorithms folder !!

var longestPalindrome3 = function (s) {

  // Use a modified string
  // #a#b#c#b#a#b#b#g
  // so that the even palindromes expand from #. i.e 'b#b'
  // odd and even diameters are added by 1
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
    return (right - left) / 2;
  }

  for (let i = 0; i < n; i++) {

    // reuse palindromes with:

    // .....(l.....o.....r)
    // ...............i...
    // ..(lj...j..rj)......

    if (i < r) {
      palins[i] = Math.min(r - i, palins[l + r - i]);
    }

    // expand from center
    palins[i] = checkAtRange(i - palins[i], i + palins[i]);

    if (r <= i + palins[i]) {
      l = i - palins[i];
      r = i + palins[i];
    }

    if (max.length < (2 * palins[i] + 1)) {
      max = s.slice(i - palins[i], i + palins[i] + 1)
    }

  }
  // odd and even diameters are added by 1
  console.log(palins);
  
  return max.replaceAll('#', '');
};

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

console.log(longestPalindrome3('abcbaoabcba'));
// it also works for even palindromes
console.log(longestPalindrome3('abbv'));
console.log(longestPalindrome3('abbbvdfd'));
