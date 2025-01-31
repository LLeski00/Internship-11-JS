let firstName;
let lastName;
let sector;
let salary;
let sectors = new Map();

do {
    firstName = prompt(
        "Enter the first of the worker (Press cancel to exit): "
    );

    if (isEmpty(firstName)) {
        alert("Exiting...");
        break;
    }

    lastName = prompt(
        "Enter the last name of the worker (Press cancel to exit): "
    );

    if (isEmpty(lastName)) {
        alert("Exiting...");
        break;
    }

    sector = prompt(
        "Enter the sector in which the worker is in (Press cancel to exit): "
    );

    if (isEmpty(sector)) {
        alert("Exiting...");
        break;
    }

    salary = prompt("Enter the salary of the worker (Press cancel to exit): ");

    if (!isNumberValid(salary)) {
        alert("Exiting...");
        break;
    }

    let newWorker = {
        firstName: firstName,
        lastName: lastName,
        salary: parseFloat(salary),
    };

    if (sectors.has(sector)) sectors.get(sector).push(newWorker);
    else sectors.set(sector, [newWorker]);
} while (true);

if (sectors.length == 0) {
    alert("No workers entered...");
} else {
    let sectorTotalSalaries = getSectorTotalSalaries(sectors);

    let totalSalary = [...sectorTotalSalaries.values()].reduce(
        (acc, salary) => acc + salary,
        0
    );

    let sectorContribution = new Map();

    for (const sector of sectorTotalSalaries.keys()) {
        sectorContribution.set(
            sector,
            (sectorTotalSalaries.get(sector) / totalSalary) * 100
        );
    }

    console.log("Total salary: " + totalSalary);
    console.log(sectorContribution);
}

function isEmpty(str) {
    if (str === null || str == "") return true;
    return false;
}

function isNumberValid(num) {
    if (isEmpty(num) || isNaN(num) || parseFloat(num) <= 0) return false;
    return true;
}

function getSectorTotalSalaries(sectors) {
    let sectorTotalSalaries = new Map();

    for (const sector of sectors.keys()) {
        let sectorTotalSalary = sectors
            .get(sector)
            .reduce((acc, worker) => acc + worker.salary, 0);
        sectorTotalSalaries.set(sector, sectorTotalSalary);
    }

    return sectorTotalSalaries;
}
