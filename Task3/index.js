let firstName;
let lastName;
let sector;
let salary;
let sectors = new Map();

do {
    firstName = tryReadText(
        "Enter the first name of the worker (Press cancel to exit): "
    );

    if (!firstName) {
        if (confirm("Do you want to continue?")) continue;
        break;
    }

    lastName = tryReadText(
        "Enter the last name of the worker (Press cancel to exit): "
    );

    if (!lastName) {
        if (confirm("Do you want to continue?")) continue;
        break;
    }

    sector = tryReadText(
        "Enter the sector in which the worker is in (Press cancel to exit): "
    );

    if (!sector) {
        if (confirm("Do you want to continue?")) continue;
        break;
    }

    salary = tryReadSalary(
        "Enter the salary of the worker (Press cancel to exit): "
    );

    if (!salary) {
        if (confirm("Do you want to continue?")) continue;
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
            ((sectorTotalSalaries.get(sector) / totalSalary) * 100).toFixed(2) +
                "%"
        );
    }

    console.log("Total salary: " + totalSalary);
    console.log("Sector contribution:");
    console.log(sectorContribution);
    displayWorkerContribution(sectors, sectorTotalSalaries);
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

function tryReadSalary(msg) {
    let salary = prompt(msg);

    if (salary === null) {
        alert("Exiting...");
        return false;
    } else if (salary === "" || isNaN(salary) || parseFloat(salary) <= 0) {
        alert("Invalid salary!");
        return false;
    }

    return salary;
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

function displayWorkerContribution(sectors, sectorTotalSalaries) {
    console.log("Contributions of the workers for their sector:");
    sectors.forEach((workers, sector) => {
        workers.sort((a, b) => a.salary - b.salary);
        workers.forEach((worker) => {
            let contribution =
                (worker.salary / sectorTotalSalaries.get(sector)) * 100;
            console.log(
                `${worker.firstName} ${
                    worker.lastName
                } - Contribution: ${contribution.toFixed(2)}%`
            );
        });
    });
}
