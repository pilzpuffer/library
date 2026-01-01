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
    console.log(newBook);
}

const addButton = document.querySelector("#add");
const closeButton = document.querySelector("#close");
let deleteButton = document.querySelector("#delete");
let updateButton = document.querySelector("#update");
const dialog = document.querySelector("dialog");
let bookForm = document.querySelector("#new-book");

addButton.addEventListener('click', () => {
    if (!deleteButton.classList.contains("removed") 
    && !updateButton.classList.contains("removed")) {
        deleteButton.classList.add("removed");
        updateButton.classList.add("removed");
    }
    bookForm.reset();
    dialog.showModal();
}) 

closeButton.addEventListener('click', () => {
    dialog.close();

    if (!deleteButton.classList.contains("removed") 
        && !updateButton.classList.contains("removed")) {
            deleteButton.classList.add("removed");
            updateButton.classList.add("removed");
    }
})

let bookShelf = document.querySelector('.content');
myLibrary.forEach(function (book){
    displayBooks(book);
})

function displayBooks(book) {
    let holderDiv = document.createElement('div');
    holderDiv.classList.add("book")
    holderDiv.style.backgroundColor = `var(--${book.genre.toLowerCase()})`;
    if (holderDiv.dataset.id == undefined) {
       holderDiv.dataset.id = book.id; 
    }  

    let topDiv = document.createElement('div');
    topDiv.classList.add('top-part')
        let titleDiv = document.createElement('div');
        titleDiv.textContent = book.name;

        let buttonDiv = document.createElement('div');
        buttonDiv.classList.add('book-controls');
            let readButton = document.createElement('button');
            book.read == null ? readButton.classList.add('unread') : readButton.classList.add('read');
            let modifyButton = document.createElement('button');
            modifyButton.classList.add('modify');
                modifyButton.addEventListener('click', function(event) {
                    let currentBook = event.currentTarget.parentElement.parentElement.parentElement;
                    console.log(currentBook);

                    deleteButton.classList.remove("removed");
                    updateButton.classList.remove("removed");

                    dialog.showModal();

                    let currentBookObject = myLibrary.find((book) => book.id === currentBook.dataset.id);

                    for (let i = 0; i < bookForm.length; i++) {
                         if (bookForm.elements[i].type !== 'submit') {
                            bookForm.elements[i].value = currentBookObject[`${bookForm.elements[i].name.split("-")[1]}`];
                        } 
                    }

                    updateButton.addEventListener('click', function(event) {
                        event.preventDefault();
                        
                    })
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

bookForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    
    addBookToLibrary(data.get("book-name"), data.get("book-author"), data.get("book-genre"), data.get("book-pages"), data.get("book-read"));
    displayBooks(myLibrary[myLibrary.length - 1]);
    dialog.close();
    bookForm.reset();
    deleteButton.classList.remove("removed");
    updateButton.classList.remove("removed");
});