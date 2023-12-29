const originalArray = [1, 2, 3, 4, 3, 2, 5];

// Create a Set from the array to remove duplicates
const uniqueSet = new Set(originalArray);

// Convert the Set back to an array

console.log(uniqueSet); // Output: [1, 2, 3, 4, 5]
