import React from 'react';
import Layout from '../components/Layout';
import {useFormik} from 'formik';
import * as yup from 'yup';

const NewAccount = () => {

    const formik = useFormik({
        initialValues:{
            name: '',
            surname: '',
            email: '',
            password: ''
        },
        onSubmit: values =>{
            console.log(values);
        }
    });

    return(
        <>
        <Layout>
            <div className="bg-gray-700 rounded pt-10 pb-10 mt-0 mb-0 ml-40 mr-40 ">
                <h1 className="text-center text-2xl text-white font-light">Create your account</h1>
                <div className="flex justify-center mt-5">
                    <div className="w-full max-w-sm">
                        <form className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4" onSubmit={formik.handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email:</label>
                                <input className="shadow apperanace-none border rounded w-full py-2 px-3 text-gray-700 leading-tight 
                                focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email account" value={formik.values.email} onChange={formik.handleChange}/>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Name:</label>
                                <input className="shadow apperanace-none border rounded w-full py-2 px-3 text-gray-700 leading-tight 
                                focus:outline-none focus:shadow-outline" id="name" type="name" placeholder="User's name" value={formik.values.name} onChange={formik.handleChange}/>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Surname:</label>
                                <input className="shadow apperanace-none border rounded w-full py-2 px-3 text-gray-700 leading-tight 
                                focus:outline-none focus:shadow-outline" id="surname" type="nsurname" placeholder="User's Surname" value={formik.values.surname} onChange={formik.handleChange}/>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Password:</label>
                                <input className="shadow apperanace-none border rounded w-full py-2 px-3 text-gray-700 leading-tight 
                                focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Password account" value={formik.values.password} onChange={formik.handleChange}/>
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