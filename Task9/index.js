const button = document.querySelector("#csv");
button.addEventListener("click", handleClick);

let cityName;
let cities = [];
let csvContent;

do {
    cityName = tryReadText("Enter the city (Press cancel to exit): ");

    if (!cityName) {
        if (confirm("Do you want to continue?")) continue;
        break;
    }

    cities.push(cityName);
} while (true);

if (cities.length !== 0) {
    cities.sort();
    console.log("Sorted cities:");
    console.log(cities);
    console.log("Filtered cities:");
    let filteredCities = cities.filter((city) => city.length >= 5);
    console.log(filteredCities);
    csvContent = "data:text/csv;charset=utf-8," + cities.join("\n");
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

function handleClick() {
    let encodedUri = encodeURI(csvContent);
    let link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "my_data.csv");
    document.body.appendChild(link);

    link.click();
}
