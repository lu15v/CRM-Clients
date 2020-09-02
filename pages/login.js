import React,{useState} from 'react';
import {useRouter} from 'next/router';
import Layout from '../components/Layout';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {gql, useMutation} from '@apollo/client';


const AUTH_USER = gql`
    mutation authUser($input: AuthInput){
        authUser(input: $input){
            token
        }
    }
`;

const Login = () => {

    const [message, setMessage] = useState(null);
    const [authUser, {loading}] = useMutation(AUTH_USER);
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email format').required('Email cannot be empty'),
            password: Yup.string().required('The password should not be empty')
        }),
        onSubmit: async values =>{
            try{
                const {email, password} = values;

                const {data} = await authUser({
                    variables:{
                        input:{
                            email,
                            password
                        }
                    }
                })
                //save token
                const {token} = data.authUser;
                localStorage.setItem('token', token);

                //redirect to main page
                router.push('/');
            }catch(error){
                setMessage(error.message);
                setTimeout(() =>{
                    setMessage(null);
                }, 3000);
            }
        }
    })

    const showMessage = (isErrorMessage, customMessage) =>{
        let isAnError = isErrorMessage || false;
        let currentMessage = customMessage || message
        return(
            <div className={`w-full text-center ${isAnError ?  "bg-red-200": "bg-green-200" }`}>
                <p className={`font-bold ${isAnError ? "text-red-500" : "text-green-500"}`}>{currentMessage}</p>
            </div>
        );
    }
    
    return(
        <>
            <Layout>
                <div className="bg-gray-700 rounded pt-10 pb-10 mt-0 mb-0 ml-40 mr-40 ">
                    <h1 className="text-center text-2xl text-white font-light">Welcome to the CRM</h1>
                    <div className="flex justify-center mt-5">
                        <div className="w-full max-w-sm">
                            <form className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                                  onSubmit={formik.handleSubmit}>
                                {
                                    message && showMessage(true)
                                }
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email:</label>
                                    <input className="shadow apperanace-none border rounded w-full py-2 px-3 text-gray-700 leading-tight 
                                    focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email account"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}/>
                                </div>
                                { formik.touched.email && formik.errors.email ? 
                                    <div className="bg-red-200 mt-2">
                                        <p className="font-bold text-red-500">{formik.errors.email}</p>
                                    </div>
                                    : null}
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Password:</label>
                                    <input className="shadow apperanace-none border rounded w-full py-2 px-3 text-gray-700 leading-tight 
                                    focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Password account"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password}/>
                                </div>
                                { formik.touched.password && formik.errors.password ? 
                                    <div className="bg-red-200 mt-2">
                                        <p className="font-bold text-red-500">{formik.errors.password}</p>
                                    </div>
                                    : null}
                                <input type="submit" className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-500 cursor-pointer"
                                value="Login"/>
                            </form>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}


export default Login;