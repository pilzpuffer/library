const myLibrary = [];

function Book (name, author, pages, read) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor.")
    }
    id = null;
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(name, author, pages, read) {
    let newBook = new Book(name, author, pages, read);
    newBook.id = crypto.randomUUID();

    myLibrary.push(newBook);
}