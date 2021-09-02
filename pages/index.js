import React, {useEffect, useState} from 'react';
import Layout from '../components/Layout';
import {gql, useQuery} from '@apollo/client';
import {useRouter} from 'next/router';
import Redirect from '../components/Redirect';
import Link from 'next/link';


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
    const router = useRouter();
    const [data, setData] = useState(null);

    const {loading, refetch}= useQuery(GET_CLIENTS_USER);

    const gettingData = async() =>{
        const userData = await refetch();
        return userData;
    }

    useEffect(() => {
       const dataPromise = gettingData();
       dataPromise.then(response => {
              setData(response.data);
       });
    }, [data])


    if(loading) return '...Loading';

    if(!data || !data.getClientsVendor){
        return(
            <Redirect redTime={4} redFun={() => router.push('login')}/>   
        )
    }

    if(data && data.getClientsVendor){
        return(
            <div>
                <Layout>
                    <h1 className="text-2xl text-gray-800 font-light">Clients</h1>
                    <Link href="/newClient">
                        <a className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold">New Client</a>
                    </Link>
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
}

export default Home;