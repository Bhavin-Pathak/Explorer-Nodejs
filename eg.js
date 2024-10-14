//Sort Array
function bubblesort(arr) {
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}
//Examples
const number = [5, 8, 7, 6, 4, 9, 12, 90, 80, 50, 40, 70, 66, 55, 22, 10];
console.log(
  `Here is Your Ans Of BubbleSort Array Methods ${bubblesort(number)}`
);

//Sum Of Arrays
function sumArray(arra) {
  let sum = 0;

  for (let i = 0; i < arra.length; i++) {
    sum += arra[i];
  }
  return sum;
}
//Examples
const numbers = [100, 50, 100, 500, 5000, 600];
console.log(`Here is Your Answere Of SumOfArrays ${sumArray(numbers)}`);

//Find SecondLargest
function findSecondLargest(arr) {
  if (arr.length < 2) {
    throw Error("Array Have Minimum 2 Elments");
  }

  let max = -Infinity;
  let secondMx = -Infinity;
  for (const numb of arr) {
    if (numb > max) {
      secondMx = max;
      max = numb;
    } else if (numb > secondMx && numb !== max) {
      secondMx = numb;
    }
  }
  return secondMx;
}
//Example
const arr = [10, 20, 30, 40, 50];
console.log(`Here is Your Ans Of SecondLargest ${findSecondLargest(arr)}`);
