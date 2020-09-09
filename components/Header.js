import React from 'react';
import {useQuery, gql} from '@apollo/client';
import {useRouter} from 'next/router';

const GET_USER = gql`
    query getUser{
        getUser{
            name
        }
    }
`;

const Header = () => {

    const router = useRouter();

    const  {data, loading ,error} = useQuery(GET_USER);
    
    if(loading) return null;

    if(!data){
        return router.push('/login');
    }
    const logout = () =>{
        localStorage.removeItem('token');
        router.push('/login');
    }

    return(
        <div className="flex justify-between mb-5">
            <p className="mr-2">{`Welcome ${data.getUser.name}`}</p>
            <button onClick={() => logout()} className="bg-red-800 w-full sm:w-auto font-bold uppercase text-xs rounded text-white py-1 px-2 shadow-md" type="button">
                Logout
            </button>
        </div>
    )
};


export default Header;