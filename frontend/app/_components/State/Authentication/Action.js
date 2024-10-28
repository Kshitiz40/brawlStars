import {
    GET_USER_FAILURE,
    GET_USER_REQUEST, GET_USER_SUCCESS, GET_USERS_FAILURE, GET_USERS_REQUEST, GET_USERS_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS
} from "@/app/_components/State/Authentication/ActionType";
import axios from "axios";
import {api, API_URL} from "@/app/_components/Config/api";

export const registerUser=(reqData)=> async(dispatch)=>{
    dispatch({type:REGISTER_REQUEST})
    try {
        const {data} = await axios.post(`${API_URL}/auth/signup`,reqData.userData)
        if(data.jwt){
            localStorage.setItem("jwt",data.jwt);
        }

        // if(data.role === "ADMIN"){
        //     await reqData.navigate("/admin-panel")
        // }

        // else{
            await reqData.router.push("/")
        // }

        dispatch({type:REGISTER_SUCCESS,payload:data.jwt})
        console.log("Register Success ",data)
    }

    catch (error){
        console.log("Register Error: ",error)
        dispatch({type:REGISTER_FAILURE,payload:error})
    }
}

export const loginUser=(reqData)=> async(dispatch)=>{
    dispatch({type:LOGIN_REQUEST})
    try {
        const {data} = await axios.post(`${API_URL}/auth/signin`,reqData.userData)
        if(data.jwt){
            localStorage.setItem("jwt",data.jwt);
        }

        // if(data.role === "ADMIN"){
        //     await reqData.navigate("/admin-panel")
        // }

        // else{
            await reqData.router.push("/")
        // }

        dispatch({type:LOGIN_SUCCESS,payload:data.jwt})
        console.log("Login Success ",data)
    }

    catch (error){
        console.log("Login Error: ",error)
        dispatch({type:LOGIN_FAILURE,payload:error})
    }
}

export const registerAdmin=(reqData)=> async(dispatch)=>{
    dispatch({type:REGISTER_REQUEST})
    try {
        const {data} = await axios.post(`${API_URL}/auth/admin/signup`,reqData.adminData)
        if(data.jwt){
            localStorage.setItem("jwt",data.jwt);
        }

        await reqData.router.push("/admin-panel")

        dispatch({type:REGISTER_SUCCESS,payload:data.jwt})
        console.log("Admin Register Success ",data)
    }

    catch (error){
        console.log("Admin Register Error: ",error)
        dispatch({type:REGISTER_FAILURE,payload:error})
    }
}

export const loginAdmin=(reqData)=> async(dispatch)=>{
    dispatch({type:LOGIN_REQUEST})
    try {
        const {data} = await axios.post(`${API_URL}/auth/admin/signin`,reqData.adminData)
        if(data.jwt){
            localStorage.setItem("jwt",data.jwt);
        }

            await reqData.router.push("/admin-panel")

        dispatch({type:LOGIN_SUCCESS,payload:data.jwt})
        console.log("Admin Login Success ",data)
    }

    catch (error){
        console.log("Admin Login Error: ",error)
        dispatch({type:LOGIN_FAILURE,payload:error})
    }
}

export const getUser=(jwt)=> async(dispatch)=>{
    dispatch({type:GET_USER_REQUEST})
    try {
        const {data} = await api.get(`/auth/signup`,
            {
                headers:{
                    Authorization:`Bearer ${jwt}`
                }
            })
        dispatch({type:GET_USER_SUCCESS,payload:data})
        console.log("User Profile: ",data)
    }

    catch (error){
        console.log("Get User Error: ",error)
        dispatch({type:GET_USER_FAILURE,payload:error})
    }
}

export const getAllUsers = () => async(dispatch) => {
    dispatch({type:GET_USERS_REQUEST})
    try {
        const {data} = await axios.get(`/getUsers`)
        dispatch({type:GET_USERS_SUCCESS,payload:data})
        console.log("All Users: ",data)
    }

    catch (error){
        console.log("Get all Users Error: ",error)
        dispatch({type:GET_USERS_FAILURE,payload:error})
    }
}

export const logOut = () => async(dispatch)=>{
    try {
        localStorage.clear()
        dispatch({type:LOGOUT})
        console.log("Logout Success...")
    }

    catch (error){
        console.log("Logout Error",error)
    }
}