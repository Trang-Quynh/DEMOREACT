import {Field, Form, Formik} from "formik";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {loginService} from "../../service/userService";

export function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const submit = (user) => {
        dispatch(loginService(user)).then((data) => {
            console.log(data)
            if(data.payload === 'Username is not exits'){
                alert('Username is not exits')
                localStorage.clear();
                navigate('/login')
            }else if(data.payload === 'Password is wrong'){
                alert('Password is wrong')
                navigate('/login')
            }else{
                navigate('/home');
            }

        });
    }
    return (
        <>
            <center>
                <h3>Login</h3>
                <Formik
                    initialValues={{
                        username: '',
                        password: ''
                    }}
                    onSubmit={values => {
                        submit(values);
                    }}
                >
                    <Form>
                        <Field type="text" placeholder={'Username'} name={'username'}/><br/>
                        <Field type="text" placeholder={'Password'} name={'password'}/><br/>
                        <Link to={'/signup'}>Signup</Link>
                        <button type={'submit'}>Login</button>
                    </Form>
                </Formik>
            </center>
        </>
    )
}