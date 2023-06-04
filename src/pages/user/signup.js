import {Link, useNavigate} from "react-router-dom";
import {Field, Form, Formik} from "formik";
import {useDispatch} from "react-redux";
import {signupService} from "../../service/userService";
export function Signup() {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const submit = (user) => {
        dispatch(signupService(user)).then(() => {
            navigate('/login');
        });
    }
    return (
        <>
            <center>
                <h3>Signup</h3>
                <Formik
                    initialValues={{
                        username: '',
                        password: '',
                        role: 'user'
                    }}
                    onSubmit={values => {
                        submit(values);
                    }}
                >
                    <Form>
                        <Field type="text" placeholder={'Username'} name={'username'}/><br/>
                        <Field type="text" placeholder={'Password'} name={'password'}/><br/>
                        <Field type="text" placeholder={'Role'} name={'role'}/><br/>
                        <Link to={'/login'}>Login</Link>
                        <button type={'submit'}>Signup</button>
                    </Form>
                </Formik>
            </center>
        </>
    )
}