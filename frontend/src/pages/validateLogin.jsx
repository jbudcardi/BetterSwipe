function validateLogin(values) {
    let errors = {};
    // Regular expression for simple email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Email validation
    if (!values.email) {
        errors.email = "Email address is required";
    } else if (!emailPattern.test(values.email)) {
        errors.email = "Email address is invalid";
    }

    // Password validation
    if (!values.password) {
        errors.password = "Password is required";
    } else if (values.password.length < 8) { // Example: Minimum password length
        errors.password = "Password must be at least 8 characters long";
    }

    return errors;
}

export default validateLogin;
