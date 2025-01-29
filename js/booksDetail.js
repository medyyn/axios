const urlParams = new URLSearchParams(window.location.search);
const bookId = urlParams.get("book");
const endpoint = "http://localhost:3000/"

axios.get(endpoint + "books/" + bookId).then((res) => {
    if (res.status === 200 && res.statusText === "OK") {
        document.body.innerHTML =
            `
                <nav>
        <div class="container">
            <a href="#" class="logo">Books</a>
            <div class="nav-links">
                <a href="#">Home</a>
                <a href="#">About</a>
                <a href="#">Services</a>
                <a href="#">Portfolio</a>
                <a href="#">Contact</a>
            </div>
        </div>
    </nav>
            <button class = "return"><a href = "./index.html">return</a></button>
        <div class = "center">
            <div class="card">
            <div class = "text">
            <h3>${res.data.title}</h3>
            <h2>${res.data.author}</h2>
            <p>${res.data.price}$</p>
            </div>
        </div>
        </div>

        `
    }
})