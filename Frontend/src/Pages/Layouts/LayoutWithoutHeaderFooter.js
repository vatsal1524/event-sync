/* author: Mehulkumar Bhunsadiya */
import React from 'react';
import { Outlet } from 'react-router-dom';

function LayoutWithoutHeaderFooter() {
    return (
        <>
           <Outlet />
        </>
    );
}

export default LayoutWithoutHeaderFooter;