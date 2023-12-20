function areObjectsEqual(obj1, obj2) {
    const keys1 = JSON.stringify(Object.keys(obj1).sort());
    const keys2 = JSON.stringify(Object.keys(obj2).sort());

    console.log(keys1)
    console.log(keys2)

    return keys1 === keys2 ? true : false
  }


  const obj1 = {
    name:"Fady",
    age:19,
    tomatos:3,

  }

  const obj2 = {
    tomatos:3,
    age:19,
    name:"Fady",
    tomatos:3,
    tomatdos:3,
    tomatos:3,


  }
  
  console.log(areObjectsEqual(obj1,obj2))