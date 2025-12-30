const myLibrary = [];

function Book (name, author, genre, pages, read) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor.")
    }

    id = null;
    this.name = name;
    this.author = author;
    this.genre = genre;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(name, author, genre, pages, read) {
    let newBook = new Book(name, author, genre, pages, read);
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

let bookShelf = document.querySelector('.content');

myLibrary.forEach(function (book){
    displayBooks(book);
})

function displayBooks(book) {
    let holderDiv = document.createElement('div');
    holderDiv.classList.add("book")
    holderDiv.style.backgroundColor = `var(--${book.genre.toLowerCase()})`;

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
                modifyButton.addEventListener('click', function(event) {
                    let currentBook = event.currentTarget.parentElement.parentElement.parentElement;
                    console.log(currentBook);
                    // dialog.showModal();
                })
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

let bookForm = document.querySelector("#new-book");

bookForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    
    addBookToLibrary(data.get("book-name"), data.get("book-author"), data.get("book-genre"), data.get("book-pages"), data.get("book-read"));
    displayBooks(myLibrary[myLibrary.length - 1]);
    dialog.close();
    bookForm.reset();
})