const formEl = document.querySelector(".form");
const equipmentName = document.querySelector("#equipmentName");
const equipmentPrice = document.querySelector("#price");
const ratio = document.querySelector(".ratio");
const ul = document.querySelector(".output");
const equipment = new Map();
equipment.set("available", []);
equipment.set("unavailable", []);

formEl.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
    event.preventDefault();

    const name = equipmentName.value.trim();
    const price = parseFloat(equipmentPrice.value.trim());
    const availability = document.querySelector(
        'input[name="equipmentStatus"]:checked'
    ).value;
    if (!name || !price || price < 0 || !availability) {
        alert("Invalid input!");
        return;
    }

    appendNewValue(name, price, availability);
    formEl.reset();
    equipmentName.focus();
}

function appendNewValue(name, price, availability) {
    if (availability === "available") {
        equipment
            .get("available")
            .push({ name: name, price: price, availability: availability });
    } else {
        equipment
            .get("unavailable")
            .push({ name: name, price: price, availability: availability });
    }

    ul.innerHTML = "";
    for (const availability of equipment.keys()) {
        if (equipment.get(availability).length > 1) {
            equipment
                .get(availability)
                .sort((a, b) => a.name.localeCompare(b.name));
        }

        for (const li of equipment.get(availability)) {
            const newLi = document.createElement("li");
            newLi.innerHTML = `${li.name} price: ${li.price}`;
            newLi.style.color =
                li.availability === "available" ? "green" : "red";
            ul.appendChild(newLi);
        }
    }

    let availableEquipmentCount = equipment.get("available").length;
    let unavailableEquipmentCount = equipment.get("unavailable").length;
    let totalEquipmentCount =
        availableEquipmentCount + unavailableEquipmentCount;
    ratio.innerHTML =
        "Available equipment: " +
        ((availableEquipmentCount / totalEquipmentCount) * 100).toFixed(2) +
        "%";
}
