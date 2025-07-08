import React from 'react';
import Navbar from '../Pages/Sheard/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Pages/Sheard/Footer';

const Root = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            {/* <Footer></Footer> */}
        </div>
    );
};

export default Root;