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
// function rotateArray<T>(arr: T[], index: number): T[] {
//   // Handle edge cases
//   if (arr.length === 0 || index <= 0) return arr;

//   // Ensure the index is within the array bounds
//   const validIndex = index % arr.length;

//   // Slice the array into two parts and concatenate
//   const firstPart = arr.slice(0, validIndex);
//   const secondPart = arr.slice(validIndex);

//   return secondPart.concat(firstPart);
// }


// const result = rotateArray([1, 2, 3, 4, 5, 6], 3);
// console.log(rotateArray([], 3));               
// console.log(rotateArray([1], 5));              
// console.log(rotateArray([1, 2, 3], 0));        
// console.log(rotateArray([1, 2, 3, 4], 5));     
// console.log(rotateArray(['a', 'b', 'c'], 2)); 
// console.log(result); 

//--------------------------------------------------------------------------------------------------------------------

// function areParenthesesBalanced(str: string): boolean {
//   let balance = 0;

//   for (const char of str) {
//     if (char === "(") balance++;
//     else if (char === ")") balance--;

//     // If closing parentheses come before opening ones
//     if (balance < 0) return false;
//   }

//   return balance === 0;
// }

// console.log(areParenthesesBalanced("string()inside(parentheses)count()balanced")); 
// console.log(areParenthesesBalanced("(()))("));

//------------------------------------------------------------------------------------------------------------------------

// function areArraysEqual(arr1: number[], arr2: number[]): boolean {
//   return arr1.sort().toString() === arr2.sort().toString();
// }

// console.log(areArraysEqual([1, 2, 3], [3, 1, 2]));
// console.log(areArraysEqual([1, 2, 3], [3, 1, 2, 1]));
// console.log(areArraysEqual([1, 2, 3], [4, 1, 2]));  

//---------------------------------------------------------------------------------------------------------------------------

// function findDuplicates(arr: number[]): number[] {
//   const counts: Record<number, number> = {};
//   const duplicates: Set<number> = new Set();

//   for (const num of arr) {
//     counts[num] = (counts[num] || 0) + 1;
//     if (counts[num] === 2) {
//       duplicates.add(num);
//     }
//   }

//   return Array.from(duplicates);
// }


// console.log(findDuplicates([1, 2, 3, 4, 5, 4, 3, 4])); 
// console.log(findDuplicates([7, 8, 8, 9, 7, 7]));       
// console.log(findDuplicates([1, 2, 3, 4, 5]));        

//--------------------------------------------------------------------------------------------------------------

// function countNumberAndLetters(str: string): { number: number; letter: number } {
//   let result = { number: 0, letter: 0 };

//   for (let i = 0; i < str.length; i++) {
//       let char = str[i];

//       if (char >= '0' && char <= '9') {
//           result.number++;
//       } else if ((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z')) {
//           result.letter++;
//       }
//   }

//   return result;
// }


// console.log(countNumberAndLetters("string152%\¥"));

//--------------------------------------------------------------------------------------------------------

// function singleNumber(nums: number[]): number {
//     let freq: Record<number, number> = {}; // Object to store frequency

//     for (let num of nums) {
//         freq[num] = (freq[num] || 0) + 1; // Count occurrences
//     }

//     for (let key in freq) {
//         if (freq[key] === 1) return Number(key); // Return the unique number
//     }

//     throw new Error("No unique number found"); // Handle edge case
// }


// console.log(singleNumber([4, 2, 1, 2, 1])); 

//------------------------------------------------------------------------------------------------------------

function firstUniqueCharIndex(s: string): number {
    const charCount: Record<string, number> = {};

    // Count occurrences of each character
    for (const char of s) {
        charCount[char] = (charCount[char] || 0) + 1;
    }

    // Find the index of the first unique character
    for (let i = 0; i < s.length; i++) {
        if (charCount[s[i]] === 1) {
            return i;
        }
    }

    return -1; // Return -1 if no unique character exists
}

// Test cases
console.log(firstUniqueCharIndex("stamp"));  
console.log(firstUniqueCharIndex("swiss"));  
console.log(firstUniqueCharIndex("aabbcc")); 

