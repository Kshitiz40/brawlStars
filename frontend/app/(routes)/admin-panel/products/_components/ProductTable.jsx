"use client"

import { Box, Button, Card, CardHeader, IconButton, ListItemSecondaryAction, Modal, Paper, Table,
    TableBody,
    TableCell, TableContainer,
    TableHead, TableRow } from '@mui/material'
import React, {useEffect, useState} from 'react'
import CreateIcon from '@mui/icons-material/Create';
import CreateProductForm from "@/app/(routes)/admin-panel/products/_components/CreateProductForm";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import EditProductForm from "@/app/(routes)/admin-panel/products/_components/EditProductForm";

// Sample orders with stock status for each product
const initialOrders = [
    { id: 1, product: "Watermelon", category: "Fruit", inStock: true },
    { id: 2, product: "Apple", category: "Fruit", inStock: false },
    { id: 3, product: "Banana", category: "Fruit", inStock: true },
    // Add more products as needed
];

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const ProductTable = () => {

    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = useState(false);

    const [orders, setOrders] = useState(initialOrders);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    const openEditProduct = () => setOpen1(true);

    const closeEditProduct = () => setOpen1(false);

    // Toggle the stock status of the specific item
    const handleStock = (id) => {
        setOrders((prevOrders) =>
            prevOrders.map((item) =>
                item.id === id ? { ...item, inStock: !item.inStock } : item
            )
        );
    };

    return (
        <Box>
            <Card className='mt-1 p-4'>
                <CardHeader
                    action={<IconButton onClick={handleOpen} aria-label='settings'>
                        <CreateIcon/>
                    </IconButton>}
                    title={"Products"}
                    sx={{pt:2,alignItems:"center"}}
                />

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 1050 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Id</TableCell>
                                <TableCell align="center">Image</TableCell>
                                <TableCell align="right">Product</TableCell>
                                <TableCell align="right">Category</TableCell>
                                <TableCell align="right">Availability</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map((item) => (
                                <TableRow
                                    key={item.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {/*{item.id}*/}
                                        {1}
                                    </TableCell>
                                    <TableCell align="center">{"Image"}</TableCell>
                                    <TableCell align="right">{item.product}</TableCell>
                                    <TableCell align="right">{item.category}</TableCell>
                                    <TableCell align="right">
                                        <Button onClick={() => handleStock(item.id)}>
                                            {/*{item.inStock?"In_Stock":"Out_of_Stock"}*/}
                                            {item.inStock? "In_Stock": "Out_of_Stock"}
                                        </Button>
                                    </TableCell>

                                    <TableCell align="right">
                                        <IconButton
                                            aria-label="edit"
                                            onClick={openEditProduct}
                                            style={{ color: 'green' }} // Green color for edit button
                                        >
                                            <EditOutlinedIcon />
                                        </IconButton>
                                        <IconButton
                                            aria-label="delete"
                                            onClick={() => {/* handle delete action */}}
                                            style={{ color: 'red' }} // Red color for delete button
                                        >
                                            <DeleteForeverOutlinedIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <CreateProductForm handleClose={handleClose}/>
                </Box>
            </Modal>

            <Modal
                open={open1}
                onClose={closeEditProduct}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <EditProductForm closeEditProduct={closeEditProduct}/>
                </Box>
            </Modal>
        </Box>
    )
}
