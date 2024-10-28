"use client"

import React from 'react'
import {LayoutDashboard, LogOutIcon} from "lucide-react";
import CategoryIcon from '@mui/icons-material/Category';
import CakeIcon from '@mui/icons-material/Cake';
import {Divider, Drawer, useMediaQuery} from "@mui/material";
import {useRouter} from "next/navigation";

const menu = [
    {title: "Dashboard",icon:<LayoutDashboard/>,path:"/"},
    {title: "Categories",icon:<CategoryIcon/>,path:"/categories"},
    {title: "Products",icon:<CakeIcon/>,path: "/products"},
    {title:"Logout",icon:<LogOutIcon/>,path: "/"}
]
const AdminSidebar = ({handleClose}) => {
    const isSmallScreen = useMediaQuery("(max-width:1080px)")

    const router = useRouter();

    const handleNavigate = (item) => {
        if(item.title === "Logout"){
            router.push("/")
            handleClose()
        }

        router.push(`/admin-panel/${item.path}`)
    }
    return (
        <div className='w-[350px]'>
            <>
                <Drawer onClose={handleClose}
                        variant={isSmallScreen?"temporary":"permanent"}
                    // variant="permanent"
                        open={true} anchor='left'
                        sx={{zIndex:1}}>
                    <div className='w-[70vw] lg:w-[20vw] h-screen flex flex-col justify-center text-xl space-y-[1.65rem]'>
                        {
                            menu.map((item,i) =>
                            <>
                                <div onClick={() => handleNavigate(item)}
                                    className='px-5 flex items-center gap-5 cursor-pointer'>
                                    {item.icon}
                                    <span>{item.title}</span>
                                </div>
                                {i !== menu.length-1 && <Divider/>}
                            </>
                            )
                        }
                    </div>
                </Drawer>
            </>
        </div>
    )
}
export default AdminSidebar
