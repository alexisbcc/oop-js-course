// // Factories
// class Dog {
//   constructor(name, age) {
//     this.name = name;
//     this.age = age;
//   }
//
//   talk(){
//     console.log(`${this.name} says woof!`);
//     //return `${this.name} says woof!`;
//   }
// }
//
// const perro1 = new Dog('Pepino', 1);
//
// //console.log(perro1.talk());
// //console.log(document);
// //document.getElementById("dogTalk").onclick = perro1.talk;
// document.getElementById("dogTalk").onclick = _ => perro1.talk();

// Factories

const dog = (dogName) => {
  const name = dogName;
  return {
    talk: () => console.log(`${name} says woof!`)
  };
}

const choco = dog('Chocolate');

document.getElementById("dogTalk").onclick = choco.talk;
