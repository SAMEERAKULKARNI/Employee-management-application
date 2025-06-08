document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.getElementById("loginBtn");

    loginBtn.addEventListener("click", async () => {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        try {
            const response = await fetch("http://localhost:8080/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (data.success) {
                alert(data.message);
                document.getElementById("login-section").style.display = "none";
                document.getElementById("employee-section").style.display = "block";
                getEmployees();  // load employee data after login
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert("Error during login. Please check console.");
        }
    });
});
