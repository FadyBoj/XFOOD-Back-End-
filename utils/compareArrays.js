const compareArrays = (arr1,arr2) =>{

    const sortedArray1 = JSON.stringify(arr1.sort())
    const sortedArray2 = JSON.stringify(arr2.sort());

    return sortedArray1 === sortedArray2 ? true : false    
}

module.exports = compareArrays;