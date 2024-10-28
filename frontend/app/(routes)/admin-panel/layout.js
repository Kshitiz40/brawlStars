// app/admin-panel/layout.js
"use client";

import React from 'react';
import AdminSidebar from './_components/AdminSidebar';

export default function AdminPanelLayout({ children }) {
    const handleClose = () =>{

    }
    return (
        <div className='flex'>
            <AdminSidebar handleClose={handleClose} />
            <div>
                {children} {/* Render nested pages here */}
            </div>
        </div>
    );
}