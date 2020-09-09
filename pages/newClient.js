import React from 'react';
import Layout from '../components/Layout';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {gql, useMutation} from '@apollo/client';
import {useRouter} from 'next/router';



const NEW_CLIENT = gql`
    mutation newClient($input: ClientInput){
        newClient(input: $input){
            id
            name
            lastName
            company
            email
            phone
    }
    }
`;


const newClient = () =>{

    const [newClient] = useMutation(NEW_CLIENT);
    
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            name: '',
            surname: '',
            email:'',
            company: '',
            phone: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required('The name cannot be empty'),
            surname: Yup.string().required('The surname cannot be empty'),
            email: Yup.string().email('Invalid email format').required('Email cannot be empty'),
            company: Yup.string().required('The company cannot be empty')
        }),
        onSubmit: async values =>{
                 const {name, surname, company, email, phone} = values;

                try{
                    const {data} = await newClient({
                        variables:{
                          input:{
                            name: name,
                            lastName: surname,
                            company: company,
                            email: email,
                            phone: phone
                          }
                        }
                    });
                    router.push('/')
                }catch(error){
                    console.log(error)
                }
            }
    })

    return(
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">New Client</h1>

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    <form className="bg-whtie shadow-md px-8 pt-6 pb-8 mb-4" onSubmit={formik.handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name:</label>
                            <input className="shadow apperanace-none border rounded w-full py-2 px-3 text-gray-700 leading-tight 
                            focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="name account"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name} />
                        </div>
                        { formik.touched.name && formik.errors.name ? 
                                    <div className="bg-red-200 mt-2">
                                        <p className="font-bold text-red-500">{formik.errors.name}</p>
                                    </div>
                                    : null}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="surname">Surname:</label>
                            <input className="shadow apperanace-none border rounded w-full py-2 px-3 text-gray-700 leading-tight 
                            focus:outline-none focus:shadow-outline" id="surname" type="text" placeholder="surname account"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.surname} />
                        </div>
                        { formik.touched.surname && formik.errors.surname ? 
                                    <div className="bg-red-200 mt-2">
                                        <p className="font-bold text-red-500">{formik.errors.surname}</p>
                                    </div>
                                    : null}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="company">Company:</label>
                            <input className="shadow apperanace-none border rounded w-full py-2 px-3 text-gray-700 leading-tight 
                            focus:outline-none focus:shadow-outline" id="company" type="text" placeholder="company account"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.company} />
                        </div>
                        { formik.touched.company && formik.errors.company ? 
                                    <div className="bg-red-200 mt-2">
                                        <p className="font-bold text-red-500">{formik.errors.company}</p>
                                    </div>
                                    : null}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email:</label>
                            <input className="shadow apperanace-none border rounded w-full py-2 px-3 text-gray-700 leading-tight 
                            focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="email account"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email} />
                        </div>
                        { formik.touched.email && formik.errors.email ? 
                                    <div className="bg-red-200 mt-2">
                                        <p className="font-bold text-red-500">{formik.errors.email}</p>
                                    </div>
                                    : null}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">Phone:</label>
                            <input className="shadow apperanace-none border rounded w-full py-2 px-3 text-gray-700 leading-tight 
                            focus:outline-none focus:shadow-outline" id="phone" type="tel" placeholder="phone account"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.phone} />
                        </div>

                        <input type="submit" className="bg-gray-800 w-full mt-5 pt-2 pb-2 text-white uppercase font-bold hover:bg-gray-900" value="Register Client"/>
                    </form>
                </div>
            </div>
        </Layout>
    );
}


export default newClient;
