export const checkValidData = (email,password) =>{

    // const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // const phoneRegex = /^[0-9]{10}$/;
    const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    const isPasswordValid = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{6,20}$/.test(password);

    if(!isEmailValid) return "Email-Id is Not Valid ";
    if(!isPasswordValid) return "Password is Not Valid";

    return null;

}

