let plantName;
let color;
let calories;
let plants = new Map();

do {
    plantName = tryReadText(
        "Enter the name of the plant (Press cancel to exit): "
    );

    if (!plantName) {
        if (confirm("Do you want to continue?")) continue;
        break;
    }

    color = tryReadText(
        "Enter the color of the plant (Press cancel to exit): "
    );

    if (!color) {
        if (confirm("Do you want to continue?")) continue;
        break;
    }

    calories = tryReadCalories(
        "Enter the number of calories of the plant (Press cancel to exit): "
    );

    if (!calories) {
        if (confirm("Do you want to continue?")) continue;
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

function tryReadCalories(msg) {
    let calories = prompt(msg);

    if (calories === null) {
        alert("Exiting...");
        return false;
    } else if (
        calories === "" ||
        isNaN(calories) ||
        parseFloat(calories) <= 0
    ) {
        alert("Invalid calories!");
        return false;
    }

    return calories;
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
