// Object Of Protos
const bookProtos = {
  getSummary: function() {
    return `${this.title} by ${this.author}, ${this.year}`;
  },
  getAge: function() {
    const years = new Date().getFullYear() - this.year;
    return `${this.title} is ${years} years old.`;
  }
}

// Create object
// const book1 = Object.create(bookProtos);
//
// book1.title = 'Masters of Doom';
// book1.author = 'John Carmack';
// book1.year = 2015;

const book1 = Object.create(bookProtos, {
  title: { value: 'Masters of Doom' },
  author: { value: 'John Carmack' },
  year: { value: 2015 }
});

console.log(book1);
