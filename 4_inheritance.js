// Constructor
function Book(title, author, year) {
  this.title = title;
  this.author = author;
  this.year = year;
}
// Get Summary
Book.prototype.getSummary = function() {
  return `${this.title} by ${this.author}, ${this.year}`;
};

// Magazine
function Magazine(title, author, year, month){
  Book.call(this, title, author, year);
  this.month = month;
}

// Inherit methods
Magazine.prototype = Object.create(Book.prototype);
// Use Magazine Constructor
Magazine.prototype.constructor = Magazine

const magazine1 = new Magazine('Pesadilla', 'Samael', 2020, 'Frebruary');

console.log(magazine1);
