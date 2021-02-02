let booksObj = null;
var pageNumber = 0;
const itemsPerRow = 2;
const rowsPerPage = 2;

// Fetch Books
fetch("http://localhost:5500/public/Books.json", {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
})
  .then((response) => response.json())
  .then((data) => {
    booksObj = data;
    handlePageChange(1);
  })
  .catch((error) => {
    console.error("this script is having trouble :(\n" + error);
  });

// Populate Books
function handlePopulateBooks() {
  const keys = Object.keys(booksObj);

  const contentContainer = window.document.getElementById("content");
  while (contentContainer.firstChild) {
    contentContainer.removeChild(contentContainer.lastChild);
  }

  for (var i = 0; i < rowsPerPage; i++) {
    const row = window.document.createElement("div");
    row.setAttribute("class", "row d-flex flex-row justify-content-around");

    const rowStart =
      rowsPerPage * itemsPerRow * (pageNumber - 1) + i * itemsPerRow;
    for (var ii = 0; ii < itemsPerRow; ii++) {
      if (rowStart + ii < keys.length) {
        const column = window.document.createElement("div");
        column.setAttribute("class", "column book bg-custom-smoke border-shadow border-shadow-hover border-radius-xsm d-flex flex-column justify-content-center align-items-center");

        const title = column.appendChild(window.document.createElement("h1"));
        title.setAttribute("class", "book-title");
        title.innerText = booksObj[keys[rowStart + ii]].title;

        const cover = column.appendChild(window.document.createElement("img"));
        cover.setAttribute("class", "book-cover");
        cover.src = booksObj[keys[rowStart + ii]].coverURL;

        const author = column.appendChild(window.document.createElement("h2"));
        author.setAttribute("class", "book-author");
        author.innerText = booksObj[keys[rowStart + ii]].author;

        const print = column.appendChild(window.document.createElement("h5"));
        print.setAttribute("class", "book-print");
        print.innerText = booksObj[keys[rowStart + ii]].print;

        row.appendChild(column);
      }
    }
    contentContainer.appendChild(row);
  }
}

// Change Page
function handlePageChange(value, isAdditive) {
  const keys = Object.keys(booksObj);
  const itemsPerPage = itemsPerRow * rowsPerPage;
  const maxPages =
    itemsPerPage > 0 ? Math.max(1, Math.ceil(keys.length / itemsPerPage)) : 1;
  const lastPageNumber = pageNumber;

  pageNumber = isAdditive
    ? Math.max(1, Math.min(pageNumber + value, maxPages))
    : Math.max(1, Math.min(value, maxPages));

  if (pageNumber !== lastPageNumber) {
    handlePopulateBooks();
    handlePopulatePages(pageNumber, maxPages);
  }
}

// Populate Pages
function handlePopulatePages(pageNumber, maxPages) {
  const pagesContainer = window.document.getElementById("pagescontainer");

  // Remove current pages
  // (keeping pages and accessing index is an option but runs
  // into issues when accessing more pages than displayed)
  while (pagesContainer.firstChild) {
    pagesContainer.removeChild(pagesContainer.lastChild);
  }

  // Create new pages
  for (var i = 1; i <= maxPages; i++) {
    const newPageButton = window.document.createElement("btn");
    if (i === pageNumber) {
      newPageButton.setAttribute(
        "class",
        "no-user m-1 btn-custom page-number-selected"
      );
    } else {
      newPageButton.setAttribute("class", "no-user m-1 btn-custom page-number");
    }
    newPageButton.innerText = i;
    newPageButton.onclick = (e) =>
      handlePageChange(parseInt(e.target.innerText), false);
    pagesContainer.appendChild(newPageButton);
  }
}
