// Getting navBar
const allBooks = document.getElementById("allBooks");
const allWrittenByMoreThanOneAuthor = document.getElementById("writtenByMoreThanOneAuthor");
const allPublishedFrom2010ToNow = document.getElementById("publishedFrom2010ToNow");

// addClickEvents
allBooks.addEventListener("click", displayBooks);
allWrittenByMoreThanOneAuthor.addEventListener("click", showAllWrittenByMoreThanOneAuthor);

// Book container
const booksList = document.getElementById("bookList");

// Initializing data array
let data = [];

console.log("picture time")

async function getCoverImage() {
  const response = await fetch('https://picsum.photos/200');
  const blob = await response.blob();

  return URL.createObjectURL(blob);
}

//async fetch books
async function displayBooks() {
    
  const response = await fetch('https://the-dune-api.herokuapp.com/books/30');

  const data = await response.json();

  const {id, title, year, author} = data[0];

  let nbrOfAuthors = 0;
  if (typeof author == 'string') {
    nbrOfAuthors = 1;
  } else {
    nbrOfAuthors = author.length;
  }

  const bookDisplay = {
      id: `${id}`,
      title: `${title}`,
      year: `${year}`,
      author: `${author}  `,
      nbrOfAuthors: nbrOfAuthors,
      price: `${Math.floor(Math.random() * 10000)}`,
      // for the cover
      cover: getCoverImage()
  }
  console.log(bookDisplay.author)
  // add book details(including image) to data array
  addbooks(bookDisplay);       
}

// add book details(including image) to data array
function addbooks(book) {
    data.push(book);
    console.log("from addBooks " +data.author)
    updateBookDetails();
}


function showAllWrittenByMoreThanOneAuthor() {
  console.log('data before filter ')
  console.log(data)

  /*data = data.filter(function(displayBooks) { 
    displayBooks.nbrOfAuthors > 1
  });*/
  data = data.filter((book) => {book.id == 18});
  console.log('data after filter ')
  console.log(data)

  updateBookDetails(data);
}

// updating DOM interface
const updateBookDetails = (detailsToUpdate = data) => {
  booksList.innerHTML = "";

  detailsToUpdate.forEach(item => {

    const newDiv = document.createElement("div");
    newDiv.classList.add("flex", "mb-4", "pb-4", "item-start");

    const paragraph = document.createElement("p");
    paragraph.classList.add("w-full", "text-black");
    paragraph.innerHTML = `<strong>Id:</strong> ${item.id} <br/> <strong>Title:</strong> ${item.title} <br/> <strong>Published in:</strong> ${item.year} <br/><strong>Author/s:</strong> ${item.author} <br/> <strong>Price:</strong> ${item.price} <br/>`;

    let img = document.createElement("img");
    img.classList.add("h-10", "w-10", "mr-4");
    img.src = item.cover;
    
    newDiv.appendChild(img);

    newDiv.appendChild(paragraph);

    booksList.appendChild(newDiv);
    
  })
}


  