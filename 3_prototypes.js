//Constructor
function Book(title, author, year) {
  this.title = title;
  this.author = author;
  this.year = year;
  // this.getSummary = function() {
  //   return `${this.title} by ${this.author}, ${this.year}`
  // };
}
// Get Summary
Book.prototype.getSummary = function() {
  return `${this.title} by ${this.author}, ${this.year}`
};

// Get Age
Book.prototype.getAge = function() {
  const years = new Date().getFullYear() - this.year;
  return `${this.title} is ${years} years old.`;
};

// Change revise years
Book.prototype.revise = function(newYear){
  this.year = newYear;
  this.revised = true;
};

const book1 = new Book('Camping grounds', 'Jhon Romero', 2000);

console.log(book1);
console.log(book1.getSummary());
console.log(book1.getAge());
book1.revise(2001);
console.log(book1);
