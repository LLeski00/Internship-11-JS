const button = document.querySelector("#csv");
button.addEventListener("click", handleClick);

let cityName;
let cities = [];
let csvContent;

do {
    cityName = prompt("Enter the city (Press cancel to exit): ");

    if (isEmpty(cityName)) {
        alert("Exiting...");

        if (confirm("Do you want to try again?")) continue;
        else break;
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
    console.log(csvContent);
}

function isEmpty(str) {
    if (str === null || str === "") return true;
    return false;
}

function handleClick() {
    let encodedUri = encodeURI(csvContent);
    let link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "my_data.csv");
    document.body.appendChild(link);

    link.click();
}
