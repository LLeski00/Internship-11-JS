let plantName;
let color;
let calories;
let plants = new Map();

do {
    plantName = prompt("Enter the name of the plant (Press cancel to exit): ");

    if (isEmpty(plantName)) {
        alert("Exiting...");
        break;
    }

    color = prompt("Enter the color of the plant (Press cancel to exit): ");

    if (isEmpty(color)) {
        alert("Exiting...");
        break;
    }

    calories = prompt(
        "Enter the number of calories of the plant (Press cancel to exit): "
    );

    if (!isNumberValid(calories)) {
        alert("Exiting...");
        break;
    }

    let newPlant = {
        plantName: plantName,
        calories: parseFloat(calories),
    };

    if (plants.has(color)) plants.get(color).push(newPlant);
    else plants.set(color, [newPlant]);
} while (true);

if (plants.length == 0) {
    alert("No plants entered...");
} else {
    let totalCaloriesByColor = getTotalCaloriesByColor(plants);
    console.log("Total calories by color:");
    console.log(totalCaloriesByColor);

    sortedPlants = new Map([...plants].sort((a, b) => a[0] - b[0]));
    console.log("Sorted by color name:");
    console.log(plants);

    let topColorsByCalories = [...totalCaloriesByColor].sort(
        (a, b) => b[1] - a[1]
    );
    topColorsByCalories = topColorsByCalories.slice(0, 3);

    console.log("Top three colors by calories:");
    console.log(topColorsByCalories);
}

function isEmpty(str) {
    if (str === null || str == "") return true;
    return false;
}

function isNumberValid(num) {
    if (isEmpty(num) || isNaN(num) || parseFloat(num) <= 0) return false;
    return true;
}

function getTotalCaloriesByColor(plants) {
    let getTotalCaloriesByColor = new Map();

    for (const color of plants.keys()) {
        let colorTotalCalories = plants
            .get(color)
            .reduce((acc, plant) => acc + plant.calories, 0);
        getTotalCaloriesByColor.set(color, colorTotalCalories);
    }

    return getTotalCaloriesByColor;
}
