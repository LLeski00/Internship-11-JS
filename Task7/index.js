let num;

do {
    num = Number(prompt("Enter the number (Press cancel to exit): "));

    if (!isNumberValid(num)) {
        alert("Exiting...");

        if (confirm("Do you want to try again?")) continue;
        else {
            num = null;
            break;
        }
    } else break;
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

function isNumberValid(num) {
    if (!Number.isInteger(num) || num <= 0) return false;
    return true;
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
