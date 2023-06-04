import {ErrorMessage, Field, Form, Formik} from "formik";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import storage from "../../../firebase/storage";
import * as Yup from "yup";
import {getOneProduct, updateOneProduct} from "../../../service/productService";

const SchemaError = Yup.object().shape({
    // id: Yup.number()
    //     .min(2, "Too Short!")
    //     .required("Required"),
    name: Yup.string()
        .min(2, "Quá ngắn")
        .required("Required"),
    description: Yup.string()
        .min(2, "Quá ngắn")
        .required("Required")
});



export function Edit() {
    const [file, setFile] = useState("");
    const navigate = useNavigate();
    let { id } = useParams();
    const dispatch = useDispatch()
    const currentProduct = useSelector(({products})=>{
        return products.currentproduct;
    })
    useEffect(() => {
        dispatch(getOneProduct(id));
    }, [dispatch,id]);

    const handleChange = (event, setFieldValue) =>{
        console.log(event.target.files[0])
        setFile(event.target.files[0]);
        handleUpload(event.target.files[0], setFieldValue);
    }

    const handleUpload = (file, setFieldValue) => {
        if (!file) {
            alert("Please upload an image first!");
        }
        const storageRef = ref(storage, `/files/${file.name}`)
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
            "state_changed",
            (err) => console.log(err),
            () => {
                // download url
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    console.log(url);
                    setFieldValue('image', url);
                });
            }
        );
    };

    return (
        <>
            {currentProduct && id == currentProduct.id && (
                <Formik
                    initialValues={{
                        id: currentProduct.id,
                        name: currentProduct.name,
                        description: currentProduct.description,
                        action: currentProduct.action
                    }}
                    validationSchema={SchemaError}
                    onSubmit={(values) => {
                        console.log(values)
                        dispatch(updateOneProduct(values)).then(() => {
                            navigate('/home/list');
                        });
                    }}
                >
                    {({values, setFieldValue}) => (
                        <Form>
                            <Field
                                type="text"
                                name="id"
                                value={values.id}
                                onChange={(e) => setFieldValue("id", e.target.value)}
                            />
                            <p style={{color: "red"}}>
                                <ErrorMessage name="id"/>
                            </p>
                            <Field
                                type="text"
                                name="name"
                                value={values.name}
                                onChange={(e) => setFieldValue("name", e.target.value)}
                            />
                            <p style={{color: "red"}}>
                                <ErrorMessage name="name"/>
                            </p>
                            <Field
                                type="text"
                                name="description"
                                value={values.description}
                                onChange={(e) =>
                                    setFieldValue("description", e.target.value)
                                }
                            />
                            <p style={{color: "red"}}>
                                <ErrorMessage name="description"/>
                            </p>
                            <Field as="select" name="action" placeholder="Description">
                                <option value="Xem xét">Xem xét</option>
                                <option value="Đạt">Đạt</option>
                                <option value="Tốt">Tốt</option>
                            </Field>
                            <Field type="file" name={'myImage'}  onChange={(e) =>{handleChange(e, setFieldValue)}} accept="/image/*" />
                            <Field type="text" name="image" />
                            <button type="submit">Edit</button>
                        </Form>
                    )}
                </Formik>
            )}
        </>
    );

}
//https://firebasestorage.googleapis.com/v0/b/crud-8…=media&token=84d7ec0d-2e05-45d3-b52e-4bbc75c48515
//https://firebasestorage.googleapis.com/v0/b/crud-8adf5.appspot.com/o/files%2Fninniku.jpg?alt=media&token=84d7ec0d-2e05-45d3-b52e-4bbc75c48515


// 1. components: navbar
// 2. pages:
// - home: - folder product: create, list/ home.js
// - user: - login/ -register
// 3. redux: - folder product: productSlice, categorySlice
//        - user: userSlice
//        - store

// 4. service: productService
//             userService
