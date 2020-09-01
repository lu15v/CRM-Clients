import React from 'react';
import Layout from '../components/Layout';

const NewAccount = () => {
    return(
        <>
        <Layout>
            <div className="bg-gray-700 rounded pt-10 pb-10 mt-0 mb-0 ml-40 mr-40 ">
                <h1 className="text-center text-2xl text-white font-light">Create your account</h1>
                <div className="flex justify-center mt-5">
                    <div className="w-full max-w-sm">
                        <form className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4">
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email:</label>
                                <input className="shadow apperanace-none border rounded w-full py-2 px-3 text-gray-700 leading-tight 
                                focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email account"/>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Name:</label>
                                <input className="shadow apperanace-none border rounded w-full py-2 px-3 text-gray-700 leading-tight 
                                focus:outline-none focus:shadow-outline" id="name" type="name" placeholder="User's name"/>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Surname:</label>
                                <input className="shadow apperanace-none border rounded w-full py-2 px-3 text-gray-700 leading-tight 
                                focus:outline-none focus:shadow-outline" id="surname" type="nsurname" placeholder="User's Surname"/>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Password:</label>
                                <input className="shadow apperanace-none border rounded w-full py-2 px-3 text-gray-700 leading-tight 
                                focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Password account"/>
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