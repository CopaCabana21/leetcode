function getFirstDigit(num) {
    num = Math.abs(num);
    const log = Math.floor(Math.log10(num));
    console.log('log: ', Math.log10(num), Math.floor(Math.log10(num)), log);
    return Math.floor(num / Math.pow(10, log));
  }
  
  // Example
  console.log(getFirstDigit(12345)); // 1
  console.log(getFirstDigit(100)); // 1