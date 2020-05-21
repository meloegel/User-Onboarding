import * as yup from 'yup'


const formSchema = yup.object().shape({
    fName: yup.string()
        .trim()
        .min(3, 'First name must be at least three characters long')
        .required('Name is a required field'),
    lName: yup.string()
        .trim()
        .min(3, 'Last name must be at least three characters long')
        .required('Name is a required field'),
    email: yup.string()
        .email('The email must be a valid email address')
        .required('Email is a required field'),
    password: yup.string()
        .trim()
        .min(5, 'Password must be at least five characters long')
        .required('Password is a required field'),
    terms: yup.string().required('Please Accept the terms to submit'),
})

export default formSchema