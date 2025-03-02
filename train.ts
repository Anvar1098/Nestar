function reduceNestedArray(arr: (number | (number | any[])[])[]): number {
    let sum = 0;

    // Loop through each element in the array
    for (let i = 0; i < arr.length; i++) {
        const currentItem = arr[i];

        // If the element is a number, add it to the sum
        if (typeof currentItem === 'number') {
            sum += currentItem;
        }
        // If the element is an array, call the function recursively
        else if (Array.isArray(currentItem)) {
            sum += reduceNestedArray(currentItem);  // Recursively sum the nested array
        }
    }

    return sum;
}


console.log(reduceNestedArray([1, [1, 2, [4]]]));  