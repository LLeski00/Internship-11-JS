let firstName;
let lastName;
let industry;
let salary;
let industryWorkers = new Map();

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

    industry = tryReadText(
        "Enter the industry in which the worker is in (Press cancel to exit): "
    );

    if (!industry) {
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

    if (industryWorkers.has(industry))
        industryWorkers.get(industry).push(newWorker);
    else industryWorkers.set(industry, [newWorker]);
} while (true);

if (industryWorkers.length == 0) {
    alert("No workers entered...");
} else {
    let averageIndustrySalaries = getAverageIndustrySalaries(industryWorkers);
    averageIndustrySalaries = [...averageIndustrySalaries].sort(
        (a, b) => a.values - b.values
    );
    console.log("Average salary per industry:");
    console.log(averageIndustrySalaries);

    let industryInfo = new Map();
    for (let [industry, salary] of averageIndustrySalaries) {
        let numOfWorkers = industryWorkers.get(industry).length;

        if (numOfWorkers < 2) continue;

        industryInfo.set(industry, {
            salary: salary,
            numOfWorkers: numOfWorkers,
        });
    }

    console.log("Sorted industry info:");
    console.log(industryInfo);
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

function getAverageIndustrySalaries(industryWorkers) {
    let averageIndustrySalaries = new Map();

    for (let key of industryWorkers.keys()) {
        let currentIndustry = industryWorkers.get(key);
        let averageIndustrySalary =
            currentIndustry.reduce((acc, worker) => acc + worker.salary, 0) /
            currentIndustry.length;
        averageIndustrySalaries.set(key, averageIndustrySalary);
    }

    return averageIndustrySalaries;
}
