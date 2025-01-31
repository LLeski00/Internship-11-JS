let firstName;
let lastName;
let industry;
let salary;
let industryWorkers = new Map();

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

    industry = prompt(
        "Enter the industry in which the worker is in (Press cancel to exit): "
    );

    if (isEmpty(industry)) {
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

    console.log(industryInfo);
}

function isEmpty(str) {
    if (str === null || str == "") return true;
    return false;
}

function isNumberValid(num) {
    if (isEmpty(num) || isNaN(num) || parseFloat(num) <= 0) return false;
    return true;
}

function getAverageIndustrySalaries(industryWorkers) {
    let averageIndustrySalaries = new Map();

    for (let key of industryWorkers.keys()) {
        let averageIndustrySalary =
            industryWorkers
                .get(key)
                .reduce((acc, worker) => acc + worker.salary, 0) /
            industryWorkers.get(key).length;
        averageIndustrySalaries.set(key, averageIndustrySalary);
    }

    return averageIndustrySalaries;
}
