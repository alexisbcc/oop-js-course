class Book {
  constructor(title, author, year) {
    this.title = title;
    this.author = author;
    this.year = year;
  }

  getSummary(){
    return `${this.title} by ${this.author}, ${this.year}`;
  }

}

// Inheritance
class Magazine extends Book {
  constructor(title, author, year, month){
    super(title, author, year);
    this.month = month;
  }
}

const mag1 = new Magazine('Lorax', 'Human OH', 2020, 'March');

console.log(mag1);
console.log(mag1.getSummary());
