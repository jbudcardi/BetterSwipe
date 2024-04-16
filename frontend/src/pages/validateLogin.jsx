function validateLogin(values) {
    let errors = {};
    // Regular expression for simple email validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    // Trim inputs
    const email = values.email.trim();
    const password = values.password.trim();

    // Email validation
    if (!email) {
        errors.email = "Email address is required";
    } else if (!emailPattern.test(email)) {
        errors.email = "Email address is invalid";
    }

    // Password validation
    if (!password) {
        errors.password = "Password is required";
    } else if (password.length < 8) { // Example: Minimum password length
        errors.password = "Password must be at least 8 characters long";
        if (!/\d/.test(password)) {
            errors.password = (errors.password || '') + " Must include a number.";
        }
        if (!/[A-Z]/.test(password)) {
            errors.password = (errors.password || '') + " Must include an uppercase letter.";
        }
        if (!/[a-z]/.test(password)) {
            errors.password = (errors.password || '') + " Must include a lowercase letter.";
        }
        if (!/[^A-Za-z0-9]/.test(password)) {
            errors.password = (errors.password || '') + " Must include a special character.";
        } // end if
    }

    return errors;
}

export default validateLogin;
