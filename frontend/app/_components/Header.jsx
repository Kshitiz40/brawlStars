"use client"

import React, {useEffect, useState} from 'react'
import Image from "next/image";
import {CircleUserRound, LayoutGrid, Search, ShoppingBag, ShoppingCart} from "lucide-react";
import {Button} from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link";
import {useRouter} from "next/navigation";
import GlobalApi from "@/app/_utils/GlobalApi";

const dummyData = [
    {
        name: "Vegetable",
        image: 'https://images.unsplash.com/photo-1467825487722-2a7c4cd62e75?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGdyb2Nlcmllc3xlbnwwfHwwfHx8MA%3D%3D',
        attribute: "Spinach"
    },
    {
        name: "Vegetable",
        image: 'https://images.unsplash.com/photo-1607309089576-358db307bf89?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Z3JvY2VyaWVzfGVufDB8fDB8fHww',
        attribute: "Carrot"
    },
    {
        name: "Fruit",
        image: 'https://images.unsplash.com/photo-1569254631271-fb470f53fa85?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGdyb2Nlcmllc3xlbnwwfHwwfHx8MA%3D%3D',
        attribute: "Banana"
    }
]

function Header() {

    useEffect(() => {
        getCategoryList()
    }, []);

    const router = useRouter()

    const [isLogin, setIsLogin] = useState(true);

    const onSignOut = () => {
        setIsLogin(false);
        router.push('/sign-in')
    }

    // Get Category List...
    const getCategoryList = () => {
        GlobalApi.getCategory().then(resp => {
            console.log("Category List: ",resp.data)
        })
    }
    return (
        <div className='p-5 shadow-sm flex justify-between'>
            <div className='flex items-center gap-8'>
                <Image src='/logo.jpg' alt='Logo'
                       width={100} height={70}
                />


                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <h2 className='md:flex hidden gap-2 items-center h-12
                        border rounded-full px-8  bg-slate-200 cursor-pointer
                    '>
                            <LayoutGrid className='h-5 w-5'/>
                            Category</h2>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Browse Category</DropdownMenuLabel>
                        <DropdownMenuSeparator/>
                        {
                            dummyData.map((category,index) => (
                                <Link key={index}
                                    href={'/products-category/'+category.name}>
                                    <DropdownMenuItem className='flex gap-2 items-center cursor-pointer'>
                                        <Image src={category.image} alt='' width={15} height={15}/>
                                        <h1 className='ml-4 mb-2'>{category.name}</h1>
                                    </DropdownMenuItem>
                                </Link>
                            ))
                        }
                    </DropdownMenuContent>
                </DropdownMenu>


                <div className='md:flex gap-3 items-center border rounded-full p-2 px-5 hidden'>
                    <Search/>
                    <input type='text' placeholder='Search' className='outline-none'/>

                </div>
            </div>
            <div className='flex gap-5 items-center'>
                <h2 className='flex gap-2 items-center text-lg'> <ShoppingCart/> 0</h2>
                {
                    !isLogin ?
                        <Link href={'/sign-in'}>
                            <Button>Login</Button>
                        </Link> :
                        <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <CircleUserRound className='h-12 w-12 bg-green-100 text-primary
                            p-2 rounded-full cursor-pointer'/>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>My Orders</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onSignOut()}>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                        </DropdownMenu>
                }
            </div>
        </div>
    )
}

export default Header
