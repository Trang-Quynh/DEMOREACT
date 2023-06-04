import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
export const signupService = createAsyncThunk(
    'user/singup',
    async(values) =>{
        console.log(values)
        let response = await axios.post('http://localhost:3001/users/signup', values);
        console.log(response.data, 111)
        return response.data
})

export const loginService = createAsyncThunk(
    'user/login',
    async(values) =>{
            let response = await axios.post('http://localhost:3001/users/login', values);
            console.log(response.data)
            return response.data
    })

