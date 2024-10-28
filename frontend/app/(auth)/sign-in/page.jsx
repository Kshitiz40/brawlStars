"use client"

import React, {useEffect, useState} from 'react'
import Image from "next/image";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import {useDispatch} from "react-redux";
import {loginUser} from "@/app/_components/State/Authentication/Action";

const SignIn = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const router = useRouter();
    const dispatch = useDispatch()

    // JWT WORK
    // useEffect(() => {
    //
    // })

    const onSignIn = (values) => {
        const formData = {
            email,
            password
        };
        console.log(formData);
        dispatch(loginUser({userData:formData,router}))
        // toast("Login Successfully")
        // router.push('/')
    }
    return (
        <div className='flex items-baseline justify-center my-20'>
            <div className='flex flex-col items-center justify-center p-10 border-2 rounded-2xl border-gray-200'>
                <Image src='/logo.jpg' width={200} height={200} className='h-[100px] w-[100px]' alt=''/>
                <h2 className='font-bold text-3xl'>Sign In to Account</h2>
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
                    <p>Don't have an account ?
                        <Link href={'/create-account'} className='text-blue-500'>
                            Click here to create
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
export default SignIn
