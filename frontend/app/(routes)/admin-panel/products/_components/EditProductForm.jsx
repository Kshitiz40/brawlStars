import React, {useState} from 'react'
import {Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {useRouter} from "next/navigation";
import {toast} from "sonner";

const EditProductForm = ({closeEditProduct}) => {
    const [formData, setFormData] = useState({
        productName: "",
        categoryName: "",
    });

    const router = useRouter()
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log()
        toast("Product Edited Successfully")
        closeEditProduct()
        // router.push("/admin-panel/categories")
    }

    const handleInputChange = (e) => {
        const {name,value} = e.target;
        // setFormData(e.target.value)
        setFormData({
            ...formData,
            [name]: value,
        })
    }
    return (
        <div>
            <h1 className='text-gray-400 text-center text-xl pb-10'>Edit Product</h1>

            <form className='space-y-4' onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    id="productName"
                    name="productName"
                    label="Product Name"
                    variant="outlined"
                    onChange={handleInputChange}
                    value={formData.productName}
                />

                <FormControl fullWidth>
                    <InputLabel id="category">Category</InputLabel>
                    <Select
                        labelId="category"
                        id="categoryName"
                        value={formData.categoryName}
                        label="Category"
                        onChange={handleInputChange}
                        name="categoryName"
                    >
                        <MenuItem value='Mango'>Mango</MenuItem>
                        <MenuItem value="Paneer">Paneer</MenuItem>
                        <MenuItem value="Coriander">Coriander</MenuItem>
                    </Select>
                </FormControl>

                <Button variant="contained" type="submit">
                    Edit Product
                </Button>
            </form>
        </div>
    )
}
export default EditProductForm
