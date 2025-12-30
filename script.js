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

addBookToLibrary('testBook', 'testAuthor', 3, false);
addBookToLibrary('testBook2', 'testAuthor2', 55, true);

let bookShelf = document.querySelector('.content');

myLibrary.forEach(function (book){
    displayBooks(book);
})

function displayBooks(book) {
    let holderDiv = document.createElement('div');
    holderDiv.classList.add("book")

    let topDiv = document.createElement('div');
    topDiv.classList.add('top-part')
        let titleDiv = document.createElement('div');
        titleDiv.textContent = book.name;

        let buttonDiv = document.createElement('div');
        buttonDiv.classList.add('book-controls');
            let readButton = document.createElement('button');
            book.read ? readButton.classList.add('read') : readButton.classList.add('unread');
            let modifyButton = document.createElement('button');
            modifyButton.classList.add('modify');
            buttonDiv.appendChild(readButton);
            buttonDiv.appendChild(modifyButton);

    topDiv.appendChild(titleDiv);
    topDiv.appendChild(buttonDiv);

    let bottomDiv = document.createElement('div');
    bottomDiv.classList.add('bottom-part');
        let authorDiv = document.createElement('div');
        authorDiv.textContent = book.author;
        let pagesDiv = document.createElement('div');
        pagesDiv.textContent = book.pages;

    bottomDiv.appendChild(authorDiv);
    bottomDiv.appendChild(pagesDiv);

    holderDiv.appendChild(topDiv);
    holderDiv.appendChild(bottomDiv);

    bookShelf.appendChild(holderDiv);
}