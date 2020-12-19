class Book {
  constructor(title, author, year) {
    this.title = title;
    this.author = author;
    this.year = year;
  }

  getSummary(){
    return `${this.title} by ${this.author}, ${this.year}`;
  }

  // Get Age
  getAge() {
    const years = new Date().getFullYear() - this.year;
    return `${this.title} is ${years} years old.`;
  }

  // Change revise years
  revise(newYear){
    this.year = newYear;
    this.revised = true;
  }

  // Static methods
  static topBook(){
    return 'LORD Of THE RINGS!'
  }
}



const book1 = new Book('Lorax', 'Human OH', 2020);

console.log(book1);
book1.revise(2021)
console.log(book1);
// Call with class instead of instance
console.log(Book.topBook());
