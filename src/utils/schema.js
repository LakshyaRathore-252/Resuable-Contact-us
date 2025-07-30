import * as Yup from 'yup';


export const schema = Yup.object({
    fullName: Yup.string()
        .matches(/^[A-Za-z\s]+$/, 'Name cannot contain numbers or special characters')
        .min(3, 'Full name must be at least 3 characters')
        .required('Full name is required'),

    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    phone: Yup.string()
        .matches(/^[0-9]{10}$/, 'Phone must be 10 digits')
        .required('Phone number is required'),
    message: Yup.string()
        .min(10, 'Message must be at least 10 characters')
        .required('Message is required')
});