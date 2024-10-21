//!Sort array in javascript
function bubbleSort(arr) {
  for (let i = arr.length; i > 0; i--) {
    for (let j = 0; j < i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}
// Example usage:
const numbers = [5, 3, 8, 1, 9, 2];
console.log(bubbleSort(numbers)); // Output: [1, 2, 3, 5, 8, 9]
//!Find the specific string
function findString(mainString, searchString) {
  const mainLen = mainString.length,
    searchLen = searchString.length;
  for (let i = 0; i <= mainLen - searchLen; i++) {
    if (mainString.slice(i, i + searchLen) === searchString) {
      return true;
    }
  }
  return false;
}
const sentence = "Hello, welcome to JavaScript!";
const word = "welcomesw";
if (findString(sentence, word)) {
  console.log(`The word "${word}" is found.`);
} else {
  console.log(`The word "${word}" is not found.`);
}
// Output: The word "JavaScript" is found.
//!Array sum in js
function arraySum(arr) {
  let sum = 0;
  for (const num of arr) sum += num;
  return sum;
}
// Example usage:
const sum = [1, 2, 3, 4, 5];
console.log(arraySum(sum)); // Output: 15
//!Prime number in js
function isPrime(num) {
  if (num <= 1) return false;
  for (let i = 2; i * i <= num; i++) {
    if (num % i === 0) return false;
  }
  return true;
}
// Example usage:
console.log(isPrime(7)); // Output: true (7 is prime) console.log(isPrime(10)); // Output: false (10 is not prime)
//!Find the 2nd largest number in the array
function findSecondLargest(arr) {
  if (arr.length < 2) throw new Error("Array must have at least two elements");
  let max = -Infinity,
    secondMax = -Infinity;
  for (const num of arr) {
    if (num > max) {
      [secondMax, max] = [max, num];
    } else if (num > secondMax && num < max) {
      secondMax = num;
    }
  }
  return secondMax;
}
// Example usage:
const numberss = [12, 35, 1, 10, 34, 1];
console.log(findSecondLargest(numberss)); // Output: 34
