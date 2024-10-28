"use client"

import React, {useState} from 'react'
import {useRouter} from "next/navigation";
import {toast} from "sonner";
import Image from "next/image";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {useDispatch} from "react-redux";
import {loginAdmin} from "@/app/_components/State/Authentication/Action";

const signInAdmin = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const router = useRouter();
    const dispatch = useDispatch();

    // JWT WORK
    // useEffect(() => {
    //
    // })

    const onSignIn = (e) => {
        const formData = {
            email,
            password
        };
        console.log(formData);

        dispatch(loginAdmin({
            adminData: formData,
            router
        }))
        // toast("Login Successfully")
        // router.push('/')
    }
    return (
        <div className='flex items-baseline justify-center my-20'>
            <div className='flex flex-col items-center justify-center p-10 border-2 rounded-2xl border-gray-200'>
                <Image src='/logo.jpg' width={200} height={200} className='h-[100px] w-[100px]' alt=''/>
                <h2 className='font-bold text-3xl'>ADMIN LOGIN</h2>
                <h2 className='text-gray-500'>Enter you Email and Password to Sign In</h2>
                <div className='w-full flex flex-col gap-5 mt-7'>
                    <Input placeholder='Email'
                           onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input type='password' placeholder='Password'
                           onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button onClick={() => onSignIn()}
                            disabled={!(email || password)}
                            className='bg-green-600'
                    >Sign In</Button>
                </div>
            </div>
        </div>
    )
}
export default signInAdmin
