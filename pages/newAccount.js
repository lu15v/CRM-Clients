import React, {useState} from 'react';
import Layout from '../components/Layout';
import {useFormik} from 'formik';
import * as yup from 'yup';
import {useMutation, gql} from '@apollo/client';

const NEW_ACCOUNT = gql`
    mutation newUser($input: UserInput){
        newUser(input: $input){
        id
        name
        lastName
        email
    }
    }
`;

const NewAccount = () => {

    //react state for handling messages
    const [message, setMessage] = useState(null);
    
    //mutation for new user
    const [newUser, {loading} ] = useMutation(NEW_ACCOUNT);

    const formik = useFormik({
        initialValues:{
            name: '',
            surname: '',
            email: '',
            password: ''
        },
        validationSchema: yup.object({
            name: yup.string().required('The name is required'),
            surname: yup.string().required('The surname is required'),
            email: yup.string().email('Invalid email format').required('The email is required'),
            password: yup.string().required('The password should not be empty').min(8, 'password should be at least 8 characters')
        }),
        onSubmit: async values =>{
            const {name, surname, email, password} = values;
            try{
                const {data} = await newUser({
                    variables:{
                        input:{
                            name: name,
                            lastName: surname,
                            email: email,
                            password: password
                        }
                    }
                })
            }catch(error){
                setMessage(error.message);
                setTimeout(() =>{
                    setMessage(null);
                }, 3000);
            }
        }
    });

    const showMessage = () =>{
        return(
            <div className="bg-red-200 w-full text-center">
                <p className="font-bold text-red-500">{message}</p>
            </div>
        );
    }

    return(
        <>
        <Layout>
            <div className="bg-gray-700 rounded pt-10 pb-10 mt-0 mb-0 ml-40 mr-40 ">
                <h1 className="text-center text-2xl text-white font-light">Create your account</h1>
                <div className="flex justify-center mt-5">
                    <div className="w-full max-w-sm">
                        <form className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4" onSubmit={formik.handleSubmit}>
                            {
                                message && showMessage(message)
                            }
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Name:</label>
                                <input className="shadow apperanace-none border rounded w-full py-2 px-3 text-gray-700 leading-tight 
                                focus:outline-none focus:shadow-outline" id="name" type="name" placeholder="User's name" value={formik.values.name} 
                                onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                                 { formik.touched.name && formik.errors.name ? 
                                    <div className="bg-red-200 mt-2">
                                        <p className="font-bold text-red-500">{formik.errors.name}</p>
                                    </div>
                                    : null}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Surname:</label>
                                <input className="shadow apperanace-none border rounded w-full py-2 px-3 text-gray-700 leading-tight 
                                focus:outline-none focus:shadow-outline" id="surname" type="nsurname" placeholder="User's Surname" value={formik.values.surname} onChange={formik.handleChange}/>
                                { formik.touched.surname && formik.errors.surname ? 
                                    <div className="bg-red-200 mt-2">
                                        <p className="font-bold text-red-500">{formik.errors.surname}</p>
                                    </div>
                                    : null}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email:</label>
                                <input className="shadow apperanace-none border rounded w-full py-2 px-3 text-gray-700 leading-tight 
                                focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email account" value={formik.values.email} onChange={formik.handleChange}/>
                                { formik.touched.email && formik.errors.email ? 
                                    <div className="bg-red-200 mt-2">
                                        <p className="font-bold text-red-500">{formik.errors.email}</p>
                                    </div>
                                    : null}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Password:</label>
                                <input className="shadow apperanace-none border rounded w-full py-2 px-3 text-gray-700 leading-tight 
                                focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Password account" value={formik.values.password} onChange={formik.handleChange}/>
                                { formik.touched.password && formik.errors.password ? 
                                    <div className="bg-red-200 mt-2">
                                        <p className="font-bold text-red-500">{formik.errors.password}</p>
                                    </div>
                                    : null}
                            </div>
                            <input type="submit" className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-500 cursor-pointer"
                            value="Create account"/>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    </>
    );
}


export default NewAccount;