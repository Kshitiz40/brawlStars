"use client"

import { Box, Button, Card, CardHeader, IconButton, ListItemSecondaryAction, Modal, Paper, Table,
    TableBody,
    TableCell, TableContainer,
    TableHead, TableRow } from '@mui/material'
import React, { useEffect } from 'react'
import CreateIcon from '@mui/icons-material/Create';
import CreateCategoryForm from "@/app/(routes)/admin-panel/categories/_components/CreateCategoryForm";

const orders = [1,1,1,1,1,1,1,1,1,1,1]

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

export const CategoryTable = () => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Box>
            <Card className='mt-1 p-4'>
                <CardHeader
                    action={<IconButton onClick={handleOpen} aria-label='settings'>
                        <CreateIcon/>
                    </IconButton>}
                    title={"Categories"}
                    sx={{pt:2,alignItems:"center"}}
                />

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 1050 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Id</TableCell>
                                <TableCell align="center">Category</TableCell>
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
                                    <TableCell align="center">{"Fruit"}</TableCell>
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
                    <CreateCategoryForm handleClose={handleClose}/>
                </Box>
            </Modal>
        </Box>
    )
}
