import {useEffect, useState} from "react";
import axios from 'axios'
import {Link, useNavigate} from "react-router-dom";
import {Form, Formik} from "formik";
import {logDOM} from "@testing-library/react";
import {useDispatch, useSelector} from "react-redux";
import {deleteProduct, getProducts} from "../../../service/productService";





export function List() {




    const dispatch = useDispatch()

    const products = useSelector(({products})=>{
        return products.list
    })

    const navigate = useNavigate();
    const [isLoad, setIsLoad] = useState(true)

    useEffect(() => {
        dispatch(getProducts());
        setIsLoad(false);
    }, [])

    return (
        <>
            {isLoad ? <>Loading......</> :
                    <>
                        <table border={1}>
                            <tr>
                                <td>Id</td>
                                <td>Name</td>
                                <td>Description</td>
                                <td>Status</td>
                                <td colSpan={2}>Action</td>
                            </tr>
                            {
                                products && products.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td><img src={item.image} style={{width: 50, height: 50}} alt=""/></td>
                                        <td>{item.name}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.category.name}</td>
                                        <td><Link to={`/home/edit/${item.id}`}>Edit</Link></td>
                                        <td><button type='submit' onClick={()=>{dispatch(deleteProduct(item.id))}}>Delete</button></td>
                                    </tr>
                                ))
                            }
                        </table>
                    </>
            }
        </>
    )





}







