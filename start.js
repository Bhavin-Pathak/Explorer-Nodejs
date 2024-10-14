let a = 121;
let b = ++a;
console.log(a);
console.log(b);

let x = 112;
let y = x++;
console.log(x);
console.log(y);

let v = 10n;
console.log("type of v is : " + typeof v);

const res = a > x ? "A is greater then X" : "A is Smaller Then X";
console.log(res);

//!Sort array in javascript
function bubbleSort(arr) {
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        // Swap the elements
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
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
  let mainLen = mainString.length;
  let searchLen = searchString.length;

  for (let i = 0; i <= mainLen - searchLen; i++) {
    let found = true;
    for (let j = 0; j < searchLen; j++) {
      if (mainString[i + j] !== searchString[j]) {
        found = false;
        break;
      }
    }
    if (found) {
      return true; // String is found +
    }
  }
  return false; // String is not found
}
const sentence = "Hello, welcome to JavaScript!";
const word = "JavaScript";
if (findString(sentence, word)) {
  console.log(`The word "${word}" is found.`);
} else {
  console.log(`The word "${word}" is not found.`);
}
// Output: The word "JavaScript" is found.

//!Array sum in js
function arraySum(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}
// Example usage:
const sum = [1, 2, 3, 4, 5];
console.log(arraySum(sum)); // Output: 15

//!Prime number in js
function isPrime(num) {
  if (num <= 1) {
    return false; // Numbers less than or equal to 1 are not prime
  }
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      return false; // If divisible by any number other than 1 and itself, it's not prime
    }
  }
  return true; // The number is prime
}
// Example usage:
console.log(isPrime(7)); // Output: true (7 is prime) console.log(isPrime(10)); // Output: false (10 is not prime)

//!Find the 2nd largest number in the array
function findSecondLargest(arr) {
  if (arr.length < 2) {
    throw new Error("Array must have at least two elements");
  }
  let max = -Infinity;
  let secondMax = -Infinity;
  for (const num of arr) {
    if (num > max) {
      secondMax = max;
      max = num;
    } else if (num > secondMax && num !== max) {
      secondMax = num;
    }
  }
  return secondMax;
}

// Example usage:
const numberss = [12, 35, 1, 10, 34, 1];
console.log(findSecondLargest(numberss)); // Output: 34
