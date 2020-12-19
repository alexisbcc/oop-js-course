
const book1 = {
  title: 'Lock chamber',
  author: 'Estego',
  year: 2020,
  getSummary: function() {
    return `${this.title} by ${this.author}, ${this.year}`
  }
}

console.log(book1.getSummary());
