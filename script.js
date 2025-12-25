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

const add = document.querySelector("#add");
const close = document.querySelector("#close");
const dialog = document.querySelector("dialog");

add.addEventListener('click', () => {
    dialog.showModal();
}) 

close.addEventListener('click', () => {
    dialog.close();
})