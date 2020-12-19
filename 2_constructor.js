//Constructor
function Book(title, author, year) {
  this.title = title;
  this.author = author;
  this.year = year;
  this.getSummary = function() {
    return `${this.title} by ${this.author}, ${this.year}`
  };
}

// Book.prototype.getSummary = function() {
//   return `${this.title} by ${this.author}, ${this.year}`
// }

const book1 = new Book('Camping grounds', 'Jhon Romero', 2000);

console.log(book1);
console.log(book1.getSummary());
