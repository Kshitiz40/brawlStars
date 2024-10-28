import React, {useState} from 'react'
import {Button, TextField} from "@mui/material";
import {useRouter} from "next/navigation";
import {toast} from "sonner";

const CreateCategoryForm = ({handleClose}) => {
    const [categoryName, setCategoryName] = useState("");

    const router = useRouter()
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(categoryName)
        toast("Category Created Successfully")
        handleClose()
        // router.push("/admin-panel/categories")
    }

    const handleInputChange = (e) => {
        setCategoryName(e.target.value)
    }
    return (
        <div>
            <h1 className='text-gray-400 text-center text-xl pb-10'>Create Category</h1>

            <form className='space-y-4' onSubmit={handleSubmit}>
                <TextField
                fullWidth
                id="categoryName"
                name="categoryName"
                label="Category Name"
                variant="outlined"
                onChange={handleInputChange}
                value={categoryName}
                />

                <Button variant="contained" type="submit">
                    Create Category
                </Button>
            </form>
        </div>
    )
}
export default CreateCategoryForm
