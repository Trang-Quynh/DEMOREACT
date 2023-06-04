import {createAsyncThunk} from "@reduxjs/toolkit";
import customAPI from "./customAPI";
import axios from "axios";



export const getProducts = createAsyncThunk(
    'products/getProducts',
    async () =>{
        // let response = await customAPI.get('products');
        let response = await axios.get('http://localhost:3001/products')
        console.log(response.data)
        return response.data.listProduct;
    }
)
export const getSearchProducts = createAsyncThunk(
    'products/getSearchProducts',
    async (keyword) =>{
        console.log(keyword, 111)
        let response = await customAPI.get(`products/search?search=${keyword}`);
        console.log(response.data)
        return response.data
    }
)


export const addProduct = createAsyncThunk(
    'products/addProduct',
    async (values) =>{
        await customAPI.post('products', values);
        return values;
    }
)

export const deleteProduct = createAsyncThunk(
    'products/deleteProduct',
    async (id) =>{
        let response = await customAPI.delete(`products/${id}`)
        return response.data.id;
    }
)


export const getOneProduct = createAsyncThunk(
    'products/getProduct',
    async (id) =>{
        let response = await customAPI.get(`products/${id}`)
        return response.data
    }
)

export const updateOneProduct = createAsyncThunk(
    'products/updateProduct',
    async (values) =>{
        let response = await customAPI.put(`products/${values.id}`, values)
        return response.data
    }
)





