let title;
let price;
let genre;
let books = [];

do {
    title = prompt("Enter the name of the book (Press cancel to exit): ");

    if (isEmpty(title)) {
        alert("Exiting...");
        break;
    }

    price = prompt("Enter the price of the book (Press cancel to exit): ");

    if (!isNumberValid(price)) {
        alert("Exiting...");
        break;
    }

    genre = prompt("Enter the genre of the book (Press cancel to exit): ");

    if (isEmpty(genre)) {
        alert("Exiting...");
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
            Math.abs(books[0].price - averagePrice)
    );
}

function isEmpty(str) {
    if (str === null || str == "") return true;
    return false;
}

function isNumberValid(num) {
    if (isEmpty(num) || isNaN(num) || parseFloat(num) <= 0) return false;
    return true;
}

function getAverageBookPrice(books) {
    let sum = 0;
    books.forEach((book) => (sum += book.price));
    return sum / books.length;
}
