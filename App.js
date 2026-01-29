//  <!-- JS -->

const totalSeats = 100;
let registered = 0;

// DOM
const registeredCount = document.getElementById("registeredCount");
const remainingCount = document.getElementById("remainingCount");
const studentList = document.getElementById("studentList");
const message = document.getElementById("message");

const nameInput = document.getElementById("nameInput");
const ageInput = document.getElementById("ageInput");
const emailInput = document.getElementById("emailInput");
const phoneInput = document.getElementById("phoneInput");
const courseInput = document.getElementById("courseInput");

/* EVENTS */

// Name: letters + space only, max 15
nameInput.addEventListener("input", function () {
    let clean = "";
    for (let char of nameInput.value) {
        if (
            (char >= "A" && char <= "Z") ||
            (char >= "a" && char <= "z") ||
            char === " "
        ) {
            clean += char;
        }
    }
    nameInput.value = clean.slice(0, 15);
});

// Age: digits only
ageInput.addEventListener("input", function () {
    let clean = "";
    for (let char of ageInput.value) {
        if (char >= "0" && char <= "9") {
            clean += char;
        }
    }
    ageInput.value = clean;
});

// Phone: digits only
phoneInput.addEventListener("input", function () {
    let clean = "";
    for (let char of phoneInput.value) {
        if (char >= "0" && char <= "9") {
            clean += char;
        }
    }
    phoneInput.value = clean;
});

/* MAIN FUNCTION */
function registerStudent() {
    const name = nameInput.value.trim();
    const age = ageInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const course = courseInput.value;

    resetMessage();

    /* NAME */
    if (name.length < 3) {
        return showError("Name must be at least 3 characters.");
    }
    if (name.length > 15) {
        return showError("Name must not exceed 15 characters.");
    }

    /* AGE */
    const ageNum = Number(age);
    if (ageNum < 15 || ageNum > 60) {
        return showError("Age must be between 15 and 60.");
    }

    /* EMAIL (step by step) */
    if (email.length == 0) {
        return showError("Enter your Email")
    }
    if (!email.includes("@")) {
        return showError("Email must contain @");
    }

    const parts = email.split("@");
    if (parts.length !== 2) {
        return showError("Email must contain only one @");
    }

    const username = parts[0];
    const domain = parts[1];

    if (domain !== "gmail.com") {
        return showError("Email must end with @gmail.com.");
    }

    if (username === "") {
        return showError("Email username is required.");
    }

    for (let char of username) {
        if (
            !(char >= "A" && char <= "Z") &&
            !(char >= "a" && char <= "z") &&
            !(char >= "0" && char <= "9")
        ) {
            return showError("Email username must contain letters and digits only.");
        }
    }

    /* PHONE */
    let remaining = "";
    if (phone == 0) { return showError("Enter Your Phone Number") }
    if (phone.startsWith("061")) {
        remaining = phone.slice(3);
    } else if (phone.startsWith("61") || phone.startsWith("68") || phone.startsWith("77")) {
        remaining = phone.slice(2);
    } else {
        return showError("Phone must start with 061, 61, 68 or 77.");
    }

    if (remaining.length !== 7) {
        return showError("Phone must have exactly 7 digits after prefix.");
    }

    /* COURSE */
    if (!course) {
        return showError("Please select a course.");
    }

    if (registered >= totalSeats) {
        return showError("No remaining seats available.");
    }

    /* ADD STUDENT */
    const row = document.createElement("div");
    row.className = "grid grid-cols-4 gap-4 text-center items-center border rounded p-2 bg-white hover:bg-gray-100 transition";

    row.innerHTML = `
        <span class="font-semibold">${registered + 1}</span>
        <span class="font-semibold">${name}</span>
        <span class="font-semibold" >${course}</span>
        <button class="bg-red-500 text-white px-2 py-1 rounded font-bold">Remove</button>
      `;

    row.querySelector("button").onclick = function () {
        studentList.removeChild(row);
        registered--;
        updateStats();
        renumber();
    };

    studentList.appendChild(row);
    registered++;
    updateStats();

    showSuccess("Student registered successfully.");

    nameInput.value = "";
    ageInput.value = "";
    emailInput.value = "";
    phoneInput.value = "";
    courseInput.value = "";
}

/* HELPERS */
function updateStats() {
    registeredCount.textContent = registered;
    remainingCount.textContent = totalSeats - registered;
}

function renumber() {
    const rows = studentList.children;
    for (let i = 0; i < rows.length; i++) {
        rows[i].children[0].textContent = i + 1;
    }
}

function showError(text) {
    message.textContent = text;
    message.className = "mt-4 text-sm text-center bg-red-100 text-red-600 p-2 rounded";
}

function showSuccess(text) {
    message.textContent = text;
    message.className = "mt-4 text-sm text-center bg-green-100 text-green-700 p-2 rounded";
}

function resetMessage() {
    message.textContent = "";
    message.className = "mt-4 text-sm text-center";
}

