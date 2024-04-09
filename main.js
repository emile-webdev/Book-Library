/* --- Global Variables --- */
const newBookBtn = document.querySelector('#new-book-btn');
const addBookBtn = document.querySelector('#new-book-form');
const newBookForm = document.querySelector('#new-book-form');

/* --- Library Array --- */
let myLibrary = [];

/* --- Object Constructor --- */
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

/* --- Add Book To Library Array --- */
function addBookToLibrary() {
    /* --- Get Input Data --- */
    let title = document.querySelector('#title').value;
    let author = document.querySelector('#author').value;
    let pages = document.querySelector('#pages').value;
    let read = document.querySelector('#read').checked;

    /* --- Add Book To Array --- */
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    updateLibrary();
}

/* --- Show Books In Library With Cards --- */
function updateLibrary() { 
    let libraryCard = document.querySelector('#library');
    libraryCard.innerHTML = '';

    /* --- Loop Through Array And Create Book-Info --- */
    for(let i = 0; i < myLibrary.length; i++) {
        let book = myLibrary[i];
        let bookInfo = document.createElement('div');
        bookInfo.setAttribute('class', 'book-info');
        bookInfo.innerHTML = 
            `
            <div class="card-header">
                <h3 class="title">${book.title}</h3>
                <h4 class="author">by ${book.author}</h4>
            </div>
            <div class="card-body">
                <p>${book.pages} pages</p>
                <p class="read-status">${book.read ? "Read" : "Not Read Yet"}</p>
                <button class="remove-btn" onclick="removeBook(${i})">Remove</button>
                <button class="toggle-read-btn" onclick="toggleRead(${i})">Toggle</button>
            </div>
            `
        libraryCard.appendChild(bookInfo);
    }
}

/* --- New Book Button & Show Form --- */
newBookBtn.addEventListener('click', function() {
    newBookForm.style.display = '';
})

/* --- Add Book Button & Close Form --- */
addBookBtn.addEventListener('submit', function(e) {
    e.preventDefault();
    addBookToLibrary();
    newBookForm.style.display = 'none';
})

/* --- Remove Book Button --- */
function removeBook(index) {
    myLibrary.splice(index, 1);
    updateLibrary();
}

/* --- Toggle Read Status --- */
Book.prototype.toggleRead = function() {
    this.read = !this.read;
}

function toggleRead(index) {
    myLibrary[index].toggleRead();
    updateLibrary();
}