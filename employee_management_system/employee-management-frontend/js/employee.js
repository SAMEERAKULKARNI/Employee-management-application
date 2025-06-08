async function getEmployees() {
    try {
        const response = await fetch("http://localhost:8080/employees");
        const employees = await response.json();

        const tableBody = document.querySelector("#employee-table tbody");
        tableBody.innerHTML = "";

        employees.forEach(employee => {
            const row = tableBody.insertRow();
            row.insertCell(0).innerText = employee.id;
            row.insertCell(1).innerText = employee.firstName;
            row.insertCell(2).innerText = employee.lastName;
            row.insertCell(3).innerText = employee.email;
            row.insertCell(4).innerText = employee.department;
        });

    } catch (error) {
        console.error("Error fetching employees:", error);
    }
}

async function saveEmployee() {
    const employee = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        email: document.getElementById("email").value,
        department: document.getElementById("department").value
    };

    try {
        const response = await fetch("http://localhost:8080/employees", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(employee)
        });

        if (response.ok) {
            alert("Employee saved successfully!");
            getEmployees();
        } else {
            alert("Failed to save employee");
        }
    } catch (error) {
        console.error("Error saving employee:", error);
        alert("Error occurred while saving employee.");
    }
}
