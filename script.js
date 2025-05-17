const library = [];

function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  library.push(book);
  displayBooks();
}

function removeBook(id) {
  const index = library.findIndex(book => book.id === id);
  if (index !== -1) {
    library.splice(index, 1);
    displayBooks();
  }
}

function toggleRead(id) {
  const book = library.find(book => book.id === id);
  if (book) {
    book.toggleRead();
    displayBooks();
  }
}

function displayBooks() {
  const bookList = document.getElementById('bookList');
  bookList.innerHTML = '';

  library.forEach(book => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.pages}</td>
      <td>${book.read ? 'Yes' : 'No'}</td>
    `;

    const actionsCell = document.createElement('td');

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.addEventListener('click', () => removeBook(book.id));

    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = 'Toggle Read';
    toggleBtn.addEventListener('click', () => toggleRead(book.id));

    actionsCell.appendChild(removeBtn);
    actionsCell.appendChild(toggleBtn);

    row.appendChild(actionsCell);
    bookList.appendChild(row);
  });
}

document.getElementById('bookForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const title = document.getElementById('title').value.trim();
  const author = document.getElementById('author').value.trim();
  const pages = document.getElementById('pages').value;
  const read = document.getElementById('read').checked;

  if (title && author && pages) {
    addBookToLibrary(title, author, pages, read);
    this.reset();
  }
});
