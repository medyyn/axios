const endpoint = "http://localhost:3000/"
const cardContainer = document.querySelector("#books")
const categoriesContainer = document.querySelector("#categories")
const form = document.querySelector("#form")
const titleInp = document.querySelector("#titleInp")
const authorInp = document.querySelector("#authorInp")
const priceInp = document.querySelector("#priceInp")
const cSelect = document.querySelector("#cSelect")

const showBooks = (arr) => {
    cardContainer.innerHTML = "";
    if (arr.length > 0) {
        arr.forEach(({ title, author, price, id }) => {
            cardContainer.innerHTML += `
            <div class="card">
                <h3><a href = "./booksDetail.html?book=${id}">${title}</a></h3>
                <h2>${author}</h2>
                <p>${price}$</p>
                <button onclick="deleteBook('${id}')" class = "delete-button">delete</button>
            </div>
            `
        })
    } else {
        cardContainer.innerHTML = "<p>data yoxdur</p>"
    }
}
const showCategories = (arr) => {
    categoriesContainer.innerHTML = ""
    arr.forEach(c => {
        categoriesContainer.innerHTML +=
            `<button class = "category-button">${c.name}</button>`
    })
}
const deleteBook = (id) => {
    const isAgree = confirm("are you sure?")
    if (isAgree) {
        axios.delete(endpoint + "books/" + id).then((res) => {
            if (res.status === 200 && res.statusText === "OK") {
                getBooks()
            }
        })
    }
}
const getBooks = () => {
    axios.get(endpoint + "books").then((res) => {
        if (res.status === 200 && res.statusText === "OK") {
            showBooks(res.data)
        }
    })
}
getBooks()
axios.get(endpoint + "categories").then((res) => {
    if (res.status === 200 && res.statusText === "OK") {
        showCategories(res.data)
        res.data
            .slice(1)
            .forEach(
                (cat) => (cSelect.innerHTML += `<option>${cat.name}</option>`)
            )
    }
})
form.addEventListener("submit", (e) => {
    e.preventDefault()
    const obj = {
        title: titleInp.value,
        author: authorInp.value,
        category: cSelect.value,
        price: priceInp.value
    }
    axios.post(endpoint + "books", obj).then((res) => {
        if (res.status === 201 && res.statusText === "Created") {
            alert("succes")
            getBooks()
        }
    })
})


document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.querySelector("#search");
    const cardContainer = document.querySelector("#books");
    let books = [];


    function fetchBooks() {
        fetch("http://localhost:3000/books")
            .then(response => response.json())
            .then(data => {
                books = data;
                showBooks(books);
            })
            .catch(error => console.error("Error fetching books:", error));
    }

    function searchBooks() {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredBooks = books.filter(book =>
            book.title.toLowerCase().includes(searchTerm) ||
            book.author.toLowerCase().includes(searchTerm)
        );
        showBooks(filteredBooks);
    }


    searchInput.addEventListener("input", searchBooks);


    fetchBooks();
});
