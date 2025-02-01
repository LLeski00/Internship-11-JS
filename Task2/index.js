let firstName;
let lastName;
let industry;
let salary;
let industryWorkers = new Map();

do {
    firstName = prompt(
        "Enter the first name of the worker (Press cancel to exit): "
    );

    if (firstName === null) {
        alert("Exiting...");
        break;
    } else if (firstName === "") {
        alert("The first name can't be empty!");
        if (confirm("Do you want to continue?")) continue;
        break;
    }

    lastName = prompt(
        "Enter the last name of the worker (Press cancel to exit): "
    );

    if (lastName === null) {
        alert("Exiting...");
        break;
    } else if (lastName === "") {
        alert("The last name can't be empty!");
        if (confirm("Do you want to continue?")) continue;
        break;
    }

    industry = prompt(
        "Enter the industry in which the worker is in (Press cancel to exit): "
    );

    if (industry === null) {
        alert("Exiting...");
        break;
    } else if (industry === "") {
        alert("The industry can't be empty!");
        if (confirm("Do you want to continue?")) continue;
        break;
    }

    salary = prompt("Enter the salary of the worker (Press cancel to exit): ");

    if (salary === null) {
        alert("Exiting...");
        break;
    } else if (!isNumberValid(salary)) {
        alert("The salary is not valid!");
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

function isNumberValid(num) {
    if (num === "" || isNaN(num) || parseFloat(num) <= 0) return false;
    return true;
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
