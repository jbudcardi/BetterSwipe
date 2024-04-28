function Validation(values){
    let error = {}
    const email_pattern= /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    const password_pattern = /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{10}$/
    const phoneNumber_pattern = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im



    if (values.firstName === ""){
        error.firstName = "First Name should not be empty"
    }else{
        error.firstName = " "
    }

    if (values.lastName === ""){
        error.lastName = "Last Name should not be empty"
    }else{
        error.lastName = " "
    }

        //Phone Number validation 
    if (values.phoneNumber === ""){
        error.phoneNumber = "Phone Number should not be empty"
    } else if(!phoneNumber_pattern.test(values.phoneNumber)){
        error.phoneNumber = "Incorrect format"
    } else{
        error.email = " "
    }
            ///Email Validation 
    if (values.email === ""){
        error.email = "Email should not be empty"
    } else if(!email_pattern.test(values.email)){
        error.email = "Email Didnt Match"
    } else{
        error.email = " "
    }

        //password validation 
   /* if(values.password === ""){
        error.password = "Password can not be empty"
    }else if(!password_pattern.test(values.password)){
        error.password = "Password should 10 characters that consist of: \n 2 uppercase letters \n one special case letter \n two number digit \n three lowercase letters \n  "
    } else {
        error.password = " "
    }*/

    if(values.confirmPassword === ""){
        error.confirmPassword = "Password didn't match"
    }
    else if(!password_pattern.test(values.password)){
        error.confirmPassword = "Password didn't match"
    } else {
        error.confirmPassword = " "
    }
    return error;

}
export default Validation;