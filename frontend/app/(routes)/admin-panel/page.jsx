"use client"

import React, {useEffect} from 'react'
import AdminSidebar from "@/app/(routes)/admin-panel/_components/AdminSidebar";
import {useDispatch, useSelector} from "react-redux";
import {getAllUsers} from "@/app/_components/State/Authentication/Action";
import {Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

const AdminPanel = () => {
    const dispatch = useDispatch()
    // const jwt = localStorage.getItem("jwt")

    useEffect(() => {
        dispatch(getAllUsers())
    }, [dispatch]);

    const users = useSelector(store => store.auth.users) // Here, we can use store => store.auth but then it only gives us auth reducer inside store...but now it gives access of all store reducers...



    return (
        <Box>
            <Box component="h2" sx={{ marginBottom: 2 }}>Welcome, Admin</Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>User ID</TableCell>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="center">Mobile</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users && users.length > 0 ? (
                            users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.id}</TableCell>
                                    <TableCell align="center">{user.name}</TableCell>
                                    <TableCell align="center">{user.email}</TableCell>
                                    <TableCell align="center">{user.mobile}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} align="center">
                                    No users found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}
export default AdminPanel
