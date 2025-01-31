let firstName;
let lastName;
let points;
let students = [];

do {
    firstName = prompt(
        "Enter the first name of the student (Press cancel to exit): "
    );

    if (isEmpty(firstName)) {
        alert("Exiting...");
        break;
    }

    lastName = prompt(
        "Enter the last name of the student (Press cancel to exit): "
    );

    if (isEmpty(lastName)) {
        alert("Exiting...");
        break;
    }

    points = prompt(
        "Enter the number of points of the student (0-100) (Press cancel to exit): "
    );

    if (!arePointsValid(points)) {
        alert("Exiting...");
        break;
    }

    let newStudent = {
        firstName: firstName,
        lastName: lastName,
        points: parseFloat(points),
    };

    students.push(newStudent);
} while (true);

if (students.length == 0) {
    alert("No students entered...");
} else {
    let studentsFilteredByPoints = getCategorizedStudents(students);
    let averagePointsPerCategory = getAveragePointsPerCategory(
        studentsFilteredByPoints
    );
    displayStudentsByCategory(studentsFilteredByPoints);
    console.log("Average points per category");
    console.log(averagePointsPerCategory);
}

function isEmpty(str) {
    if (str === null || str == "") return true;
    return false;
}

function arePointsValid(num) {
    if (
        isEmpty(num) ||
        isNaN(num) ||
        parseFloat(num) < 0 ||
        parseFloat(num) > 100
    )
        return false;
    return true;
}

function getCategorizedStudents(students) {
    let studentsFilteredByPoints = new Map();
    studentsFilteredByPoints.set("0-25", []);
    studentsFilteredByPoints.set("25-50", []);
    studentsFilteredByPoints.set("50-75", []);
    studentsFilteredByPoints.set("75-100", []);

    students.forEach((student) => {
        if (student.points < 25)
            studentsFilteredByPoints.get("0-25").push(student);
        else if (student.points < 50)
            studentsFilteredByPoints.get("25-50").push(student);
        else if (student.points < 75)
            studentsFilteredByPoints.get("50-75").push(student);
        else studentsFilteredByPoints.get("75-100").push(student);
    });

    return studentsFilteredByPoints;
}

function getAveragePointsPerCategory(studentsFilteredByPoints) {
    let averagePointsPerCategory = new Map();

    for (const category of studentsFilteredByPoints.keys()) {
        let students = studentsFilteredByPoints.get(category);

        if (students.length === 0) continue;

        averagePoints =
            students.reduce((acc, student) => acc + student.points, 0) /
            students.length;

        averagePointsPerCategory.set(category, averagePoints);
    }

    return averagePointsPerCategory;
}

function displayStudentsByCategory(studentsFilteredByPoints) {
    for (const category of studentsFilteredByPoints.keys()) {
        let students = studentsFilteredByPoints.get(category);
        students.sort((a, b) => a.lastName.localeCompare(b.lastName));
        console.log("Category: " + category);
        console.log(students);
        displayStudents(students);
    }
}

function displayStudents(students) {
    students.forEach((student) => {
        console.log(student.lastName + " " + student.firstName);
    });
}
