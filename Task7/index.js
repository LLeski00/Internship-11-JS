let num;

do {
    num = Number(tryReadNumber("Enter the number (Press cancel to exit): "));

    if (!num) {
        if (confirm("Do you want to continue?")) continue;
        break;
    }

    break;
} while (true);

if (num != null) {
    let squares = Array(num)
        .fill(0)
        .map((_, i) => (i + 1) ** 2);

    let totalSum = squares.reduce((acc, num) => acc + num, 0);

    console.log("Sum: " + totalSum);
    console.log("Average: " + (parseFloat(totalSum) / num).toFixed(2));
    console.log("Median: " + getMedian(squares));
}

function tryReadNumber(msg) {
    let number = Number(prompt(msg));

    if (number === null) {
        alert("Exiting...");
        return false;
    } else if (number === "" || isNaN(number) || parseInt(number) <= 0) {
        alert("Invalid number!");
        return false;
    }

    return number;
}

function getMedian(squares) {
    if (squares.length % 2 === 1)
        return squares[Math.floor(squares.length / 2)];
    else {
        let num1 = squares[Math.floor(squares.length / 2)];
        let num2 = squares[Math.floor(squares.length / 2) - 1];
        return parseFloat(num1 + num2) / 2;
    }
}
