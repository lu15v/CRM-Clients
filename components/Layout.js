import React from 'react'
import Head from 'next/head'
import Sidebar from '../components/Sidebar';

const Layout = ({children}) => {
    return (
        <>
            <Head>
                <title>CRM ADMIN</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.css" integrity="sha512-oHDEc8Xed4hiW6CxD7qjbnI+B07vDdX7hEPTvn9pSZO1bcRqHp8mj9pyr+8RVC2GmtEfI2Bi9Ke9Ass0as+zpg==" crossorigin="anonymous" />
                <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet"/>
            </Head>
            <Sidebar/>
            {children}
        </>
    );
}


export default Layout;