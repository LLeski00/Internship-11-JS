let equipmentName;
let equipmentStatus;
let price;
let equipment = [];

do {
    equipmentName = tryReadText(
        "Enter the name of the equipment (Press cancel to exit): "
    );

    if (!equipmentName) {
        if (confirm("Do you want to continue?")) continue;
        break;
    }

    equipmentStatus = confirm(
        "Is this equipment available? (Press cancel for no): "
    );

    price = tryReadPrice(
        "Enter the price of the equipment (Press cancel to exit): "
    );

    if (!price) {
        if (confirm("Do you want to continue?")) continue;
        break;
    }

    let newEquipment = {
        equipmentName: equipmentName,
        equipmentStatus: equipmentStatus,
        price: parseFloat(price),
    };

    equipment.push(newEquipment);
} while (true);

if (equipment.length == 0) {
    alert("No equipment entered...");
} else {
    displayUnavailableIndexes(equipment);
    let availableEquipment = equipment.filter(
        (element) => element.equipmentStatus
    );
    let unavailableEquipment = equipment.filter(
        (element) => !element.equipmentStatus
    );
    availableEquipment.sort((a, b) => {
        if (a.price !== b.price) return a.price - b.price;
        return a.equipmentName.localeCompare(b.equipmentName);
    });
    console.log("Available equipment sorted:");
    console.log(availableEquipment);

    let totalValue = equipment.reduce((acc, element) => acc + element.price, 0);
    let unavailableTotalValue = unavailableEquipment.reduce(
        (acc, element) => acc + element.price,
        0
    );
    console.log(
        "Percentage of the total value that unavailable equipment takes up:" +
            Math.round((unavailableTotalValue / totalValue) * 100) +
            "%"
    );
    groupedAvailableEquipment = getGroupedEquipment(availableEquipment);
    console.log("Grouped available equipment:");
    console.log(groupedAvailableEquipment);
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

function displayUnavailableIndexes(equipment) {
    console.log("Unavailable equipment indexes: ");

    equipment.forEach((element, i) => {
        if (!element.equipmentStatus) console.log(i);
    });
}

function getGroupedEquipment(equipment) {
    let groupedEquipment = new Map();
    groupedEquipment.set("Cheap", []);
    groupedEquipment.set("Medium", []);
    groupedEquipment.set("Expensive", []);

    equipment.forEach((element) => {
        if (element.price < 100) groupedEquipment.get("Cheap").push(element);
        else if (element.price < 500)
            groupedEquipment.get("Medium").push(element);
        else groupedEquipment.get("Expensive").push(element);
    });

    return groupedEquipment;
}
