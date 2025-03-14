// function reduceNestedArray(arr: (number | (number | any[])[])[]): number {
//     let sum = 0;

//     // Loop through each element in the array
//     for (let i = 0; i < arr.length; i++) {
//         const currentItem = arr[i];

//         // If the element is a number, add it to the sum
//         if (typeof currentItem === 'number') {
//             sum += currentItem;
//         }
//         // If the element is an array, call the function recursively
//         else if (Array.isArray(currentItem)) {
//             sum += reduceNestedArray(currentItem);  // Recursively sum the nested array
//         }
//     }
//     console.log('sum:', sum);
//     return sum;
// }


// console.log(reduceNestedArray([1, [1, 2, [4]]]));

//------------------------------------------------------------------------------------------------------------------

// function printNumbers(): void {
//     let num: number = 1;
//     const interval: NodeJS.Timeout = setInterval(() => {
//       console.log(num);
//       if (num === 5) {
//         clearInterval(interval);
//       }
//       num++;
//     }, 1000);
//   }
  
//   printNumbers();

//------------------------------------------------------------------------------------------------------------------------

// function stringToKebab(str: string): string {
//   return str
//       .toLowerCase()         // Convert to lowercase
//       .replace(/\s+/g, '-'); // Replace spaces with hyphens
// }

// console.log(stringToKebab("I love Kebab")); 

//-----------------------------------------------------------------------------------------------------------------------

// function reverseInteger(num: number): number {
//   let strNum: string = num.toString(); // Convert number to string
//   let reversedStr: string = ''; 

//   // Loop through the string in reverse order
//   for (let i = strNum.length - 1; i >= 0; i--) {
//     reversedStr += strNum[i];
//   }

//   return parseInt(reversedStr) * Math.sign(num); // Convert back to number & keep sign
// }

// console.log(reverseInteger(123456789)); 
// console.log(reverseInteger(100));       
// console.log(reverseInteger(-9876));

//----------------------------------------------------------------------------------------------------------------

// Function to rotate array based on the given index
function rotateArray<T>(arr: T[], index: number): T[] {
  // Handle edge cases
  if (arr.length === 0 || index <= 0) return arr;

  // Ensure the index is within the array bounds
  const validIndex = index % arr.length;

  // Slice the array into two parts and concatenate
  const firstPart = arr.slice(0, validIndex);
  const secondPart = arr.slice(validIndex);

  return secondPart.concat(firstPart);
}


const result = rotateArray([1, 2, 3, 4, 5, 6], 3);
console.log(rotateArray([], 3));               
console.log(rotateArray([1], 5));              
console.log(rotateArray([1, 2, 3], 0));        
console.log(rotateArray([1, 2, 3, 4], 5));     
console.log(rotateArray(['a', 'b', 'c'], 2)); 
console.log(result); 
