// export const checkValidData = (email,password) =>{

//     // const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//     // const phoneRegex = /^[0-9]{10}$/;
//     const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
//     const isPasswordValid = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{6,20}$/.test(password);

//     if(!isEmailValid) return "Email-Id is Not Valid ";
//     if(!isPasswordValid) return "Password is Not Valid";

//     return null;

// }

export const checkValidSignInFrom = (email, password) => {
    // valid email and return different different values depending----------
    const isEmailValid = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(
        email
    );
    const isPasswordValid =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^((0-9)|(a-z)|(A-Z)|\s)]).{8,}$/.test(
            password
        );
    if (!isEmailValid) return "Error: Email does not exist. Please try again.";
    if (!isPasswordValid) return "Error: Incorrect password. Please try again.";
    return null;
};
export const checkValidSignUpFrom = (name, email, password) => {
    const isNameValid = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/.test(name);
    const isEmailValid = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(
        email
    );
    if (!isNameValid) return "Please enter a valid Name";
    if (!isEmailValid) return "Please enter a valid Email";
    if (password.length < 8)
        return "Password must be at least 8 characters long.";
    if (!/[a-z]/.test(password))
        return "Password must contain at least 1 lowercase letter.";
    if (!/[A-Z]/.test(password))
        return "Password must contain at least 1 uppercase letter.";
    if (!/\d/.test(password)) return "Password must contain at least 1 number.";
    if (!/[^((0-9)|(a-z)|(A-Z)|\s)]/.test(password))
        return "Password must contain at least 1 special characters.";
    return null;
};
