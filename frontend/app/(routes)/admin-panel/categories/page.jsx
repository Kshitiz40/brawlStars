import React from 'react'
import Grid from '@mui/material/Grid2';
import {CategoryTable} from "@/app/(routes)/admin-panel/categories/_components/CategoryTable";

const Page = () => {
    return (
        <div className='lg:flex mt-6 border-2 rounded-xl'>
            <CategoryTable/>
        </div>
    )
}
export default Page
