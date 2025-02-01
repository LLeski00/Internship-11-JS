let title;
let price;
let genre;
let books = [];

do {
    title = prompt("Enter the name of the book (Press cancel to exit): ");

    if (title === null) {
        alert("Exiting...");
        break;
    } else if (title === "") {
        alert("The title can't be empty");
        if (confirm("Continue adding?")) continue;
        break;
    }

    price = prompt("Enter the price of the book (Press cancel to exit): ");

    if (price === null) {
        alert("Exiting...");
        break;
    } else if (!isNumberValid(price)) {
        alert("The number is not valid");
        if (confirm("Continue adding?")) continue;
        break;
    }

    genre = prompt("Enter the genre of the book (Press cancel to exit): ");

    if (genre === null) {
        alert("Exiting...");
        break;
    } else if (genre === "") {
        alert("The genre can't be empty");
        if (confirm("Continue adding?")) continue;
        break;
    }

    let newBook = { title: title, price: parseFloat(price), genre: genre };
    books.push(newBook);
} while (true);

if (books.length == 0) {
    alert("No books entered...");
} else {
    let averagePrice = getAverageBookPrice(books);
    books.sort(
        (a, b) =>
            Math.abs(b.price - averagePrice) - Math.abs(a.price - averagePrice)
    );
    alert(
        "The book with the biggest difference from the average price is " +
            books[0].title +
            " with the difference of " +
            Math.abs(books[0].price - averagePrice).toFixed(2)
    );

    console.log("Books sorted by difference from the average price:");
    console.log(books);
}

function isNumberValid(num) {
    if (num === "" || isNaN(num) || parseFloat(num) <= 0) return false;
    return true;
}

function getAverageBookPrice(books) {
    let sum = 0;
    books.forEach((book) => (sum += book.price));
    return sum / books.length;
}
