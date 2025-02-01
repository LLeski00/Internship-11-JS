let title;
let price;
let genre;
let books = [];

do {
    title = tryReadText("Enter the name of the book (Press cancel to exit): ");

    if (!title) {
        if (confirm("Do you want to continue?")) continue;
        break;
    }

    price = tryReadPrice(
        "Enter the price of the book (Press cancel to exit): "
    );

    if (!price) {
        if (confirm("Do you want to continue?")) continue;
        break;
    }

    genre = tryReadText("Enter the genre of the book (Press cancel to exit): ");

    if (!genre) {
        if (confirm("Do you want to continue?")) continue;
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

function tryReadText(msg) {
    let str = prompt(msg);

    if (str === null) {
        alert("Exiting...");
        return false;
    } else if (str === "") {
        alert("This can't be empty!");
        return false;
    }

    return str;
}

function tryReadPrice(msg) {
    let price = prompt(msg);

    if (price === null) {
        alert("Exiting...");
        return false;
    } else if (price === "" || isNaN(price) || parseFloat(price) <= 0) {
        alert("Invalid price!");
        return false;
    }

    return price;
}

function getAverageBookPrice(books) {
    let sum = 0;
    books.forEach((book) => (sum += book.price));
    return sum / books.length;
}
