document.getElementById('registrationForm').addEventListener('submit', function(event) {
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const dob = form.dob.value;
    const acceptTerms = form.acceptTerms.checked;

    let valid = true;
    let errorMessage = '';

    // Custom validation for name
    if (name.length < 3 || name.length > 50) {
        valid = false;
        errorMessage += 'Name must be between 3 and 50 characters long.\n';
    }

    // Custom validation for email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        valid = false;
        errorMessage += 'Please enter a valid email address.\n';
    }

    // Custom validation for password
    if (password.length < 8) {
        valid = false;
        errorMessage += 'Password must be at least 8 characters long.\n';
    }

    // Custom validation for date of birth
    if (!dob) {
        valid = false;
        errorMessage += 'Please enter your date of birth.\n';
    } else {
        const today = new Date();
        const birthDate = new Date(dob);
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        if (age < 18 || age > 55) {
            valid = false;
            errorMessage += 'Age must be between 18 and 55 years.\n';
        }
    }

    // Custom validation for accept terms
    if (!acceptTerms) {
        valid = false;
        errorMessage += 'You must accept the terms and conditions.\n';
    }

    if (!valid) {
        alert(errorMessage);
        event.preventDefault(); // Prevent form submission
    } else {
        // Save data to localStorage as JSON string
        const formData = {
            name: name,
            email: email,
            password: password,
            dob: dob,
            acceptTerms: acceptTerms
        };
        localStorage.setItem('formData', JSON.stringify(formData));

        // Add data to the table
        const table = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
        const newRow = table.insertRow();
        newRow.insertCell(0).innerText = name;
        newRow.insertCell(1).innerText = email;
        newRow.insertCell(2).innerText = password;
        newRow.insertCell(3).innerText = dob;
        newRow.insertCell(4).innerText = acceptTerms ? 'Yes' : 'No';

        event.preventDefault(); // Prevent form submission for demonstration purposes
    }
});

// Retrieve data from localStorage and populate the form
window.addEventListener('load', function() {
    const formData = JSON.parse(localStorage.getItem('formData'));

    if (formData) {
        document.getElementById('name').value = formData.name;
        document.getElementById('email').value = formData.email;
        document.getElementById('password').value = formData.password;
        document.getElementById('dob').value = formData.dob;
        document.getElementById('acceptTerms').checked = formData.acceptTerms;

        // Add data to the table
        const table = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
        const newRow = table.insertRow();
        newRow.insertCell(0).innerText = formData.name;
        newRow.insertCell(1).innerText = formData.email;
        newRow.insertCell(2).innerText = formData.password;
        newRow.insertCell(3).innerText = formData.dob;
        newRow.insertCell(4).innerText = formData.acceptTerms ? 'Yes' : 'No';
    }
});