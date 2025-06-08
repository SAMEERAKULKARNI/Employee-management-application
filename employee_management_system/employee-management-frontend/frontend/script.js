let token = "";

async function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("http://localhost:8080/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            const data = await response.json();
            token = data.token;
            alert("Login Successful");
            document.getElementById("login-section").style.display = "none";
            document.getElementById("employee-section").style.display = "block";
            getEmployees();
        } else {
            alert("Invalid credentials");
        }
    } catch (err) {
        alert("Error: " + err);
    }
}

async function getEmployees() {
    const response = await fetch("http://localhost:8080/employees", {
        headers: { "Authorization": "Bearer " + token }
    });
    const employees = await response.json();
    const tableBody = document.querySelector("#employee-table tbody");
    tableBody.innerHTML = "";

    employees.forEach(emp => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${emp.id}</td>
            <td>${emp.firstName}</td>
            <td>${emp.lastName}</td>
            <td>${emp.email}</td>
            <td>${emp.department}</td>
            <td>
                <button onclick="editEmployee(${emp.id}, '${emp.firstName}', '${emp.lastName}', '${emp.email}', '${emp.department}')">Edit</button>
                <button onclick="deleteEmployee(${emp.id})">Delete</button>
            </td>`;
        tableBody.appendChild(row);
    });
}

function editEmployee(id, firstName, lastName, email, department) {
    document.getElementById("empId").value = id;
    document.getElementById("firstName").value = firstName;
    document.getElementById("lastName").value = lastName;
    document.getElementById("email").value = email;
    document.getElementById("department").value = department;
}

async function saveEmployee() {
    const id = document.getElementById("empId").value;
    const employee = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        email: document.getElementById("email").value,
        department: document.getElementById("department").value
    };

    let url = "http://localhost:8080/employees";
    let method = "POST";

    if (id) {
        url += `/${id}`;
        method = "PUT";
    }

    const response = await fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify(employee)
    });

    if (response.ok) {
        alert("Employee saved successfully");
        clearForm();
        getEmployees();
    } else {
        alert("Failed to save employee");
    }
}

async function deleteEmployee(id) {
    const response = await fetch(`http://localhost:8080/employees/${id}`, {
        method: "DELETE",
        headers: { "Authorization": "Bearer " + token }
    });

    if (response.ok) {
        alert("Employee deleted successfully");
        getEmployees();
    } else {
        alert("Failed to delete employee");
    }
}

function clearForm() {
    document.getElementById("empId").value = "";
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("email").value = "";
    document.getElementById("department").value = "";
}
