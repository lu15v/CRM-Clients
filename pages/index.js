import React from 'react';
import Layout from '../components/Layout';
import {gql, useQuery} from '@apollo/client';

const GET_CLIENTS_USER = gql`
    query getClientsVendor{
        getClientsVendor{
            id
            name
            lastName
            company
            email
        }
    }
`;


const Home = () =>{
    
    const {data, loading, error} = useQuery(GET_CLIENTS_USER);

    if(loading) return 'Loading...';

    return(
        <div>
            <Layout>
                <h1 className="text-2xl text-gray-800 font-light">Clients</h1>
                <table className="table-auto shadow-md mt-10 w-full w-lg">
                    <thead className="bg-gray-800">
                        <tr className="text-white">
                            <th className="w-1/5 py-2">Name</th>
                            <th className="w-1/5 py-2">Company</th>
                            <th className="w-1/5 py-2">Email</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {data.getClientsVendor.map( client => (
                            <tr key={client.id}>
                                <td className="boder px-4 py-2">{client.name} {client.lastName}</td>
                                <td className="boder px-4 py-2">{client.company}</td>
                                <td className="boder px-4 py-2">{client.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Layout>
        </div>
    )

    }

export default Home;