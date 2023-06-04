import {Footer} from '../../components/Footer';
import {Header} from '../../components/Header';
import {Link, Outlet, useNavigate} from 'react-router-dom';
import {Field, Form, Formik} from "formik";


export function Home() {


    return (
        <>
            <Header/>
            <Outlet/>
            <Footer/>
        </>
    )
}


//
// <Formik
//     initialValues={{
//         search: '',
//     }}
// >
//     {({values}) => (
//         <Form>
//             <Field type="text" name={'search'} placeholder={'Search...'}/>
//             <button type='submit'><Link to={`/home/search?search=${values.search}`}>Find</Link></button>
//         </Form>
//     )}
// </Formik>


