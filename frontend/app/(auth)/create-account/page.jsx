"use client"

import React, {useState} from 'react'
import Image from "next/image";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {toast} from "sonner";
import {useDispatch} from "react-redux";
import {registerUser} from "@/app/_components/State/Authentication/Action";

const CreateAccount = () => {
    const [username, setUsername] = useState();
    const [contact, setContact] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const router = useRouter();
    const dispatch = useDispatch();

    const onCreateAccount=(e) => {
        const formData = {
            username,
            contact,
            email,
            password
        };
        console.log(formData); // Log all form data in one statement
        dispatch(registerUser({userData:formData,router}))

        // toast("You are successfully registered.")
        // router.push('/')
    }
    return (
        <div className='flex items-baseline justify-center my-20'>
            <div className='flex flex-col items-center justify-center p-10 border-2 rounded-2xl border-gray-200'>
                <Image src='/logo.jpg' width={200} height={200} className='h-[100px] w-[100px]' alt=''/>
                <h2 className='font-bold text-3xl'>Create an Account</h2>
                <h2 className='text-gray-500'>Enter you email and password to create account:</h2>
                <div className='w-full flex flex-col gap-5 mt-7'>
                    <Input placeholder='Full Name'
                    onChange={(e) => setUsername(e.target.value)}
                    />
                    <Input placeholder='Contact'
                    onChange={(e) => setContact(e.target.value)}/>
                    <Input placeholder='Email'
                           onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input type='password' placeholder='Password'
                           onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button onClick={() => onCreateAccount()}
                    disabled={!(username||email||password)}
                    className='bg-green-600'>Create an Account</Button>
                    <p>Already have an account?
                        <Link href={'/sign-in'} className='text-blue-500'>
                            Click here to Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
export default CreateAccount
