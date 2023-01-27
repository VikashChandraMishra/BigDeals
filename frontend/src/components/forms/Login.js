import { Formik, Form } from "formik";
import TextInput from './form-components/TextInput';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import logo from "../../images/Gplus.png"

const Login = () => {

    const navigate = useNavigate(null);

    const handleSubmit = async (values) => {
        const response = await fetch(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })

        const json = await response.json();


        if (json.success) {
            localStorage.setItem('authToken', json.authToken);
            navigate('/v/tc');
        } else alert(json.message);

    }


    return (
        <div className="h-screen">
            <div className="py-8 flex flex-col justify-center md:px-40">
                <img src={logo} alt="unavailable" className="w-32 h-16 md:w-40 md:h-16 mx-auto mb-4 md:mb-8" />
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    validationSchema={Yup.object({
                        email: Yup.string()
                            .email('Invalid email')
                            .required('Required'),
                        password: Yup.string()
                            .max(20, 'Must be 20 characters or less')
                            .required('Required'),
                    })}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        handleSubmit(values)
                            .then(() => {
                                setSubmitting(false);
                                resetForm({ values: '' })
                            });
                    }}
                >
                    <Form className="w-3/4 md:w-96 mx-auto rounded-lg bg-gray-700 p-8">
                        <h2 className='text-lg md:text-3xl font-bold text-center text-white'>LOGIN</h2>

                        <div className="flex flex-col text-slate-50 py-2 md:ml-16">
                            <TextInput
                                label="Email"
                                id="email"
                                name="email"
                                type="email"
                                width='md:w-3/4 text-gray-600'
                            />
                        </div>

                        <div className="flex flex-col text-slate-50 py-2 md:ml-16">
                            <TextInput
                                label="Password"
                                id="password"
                                name="password"
                                type="password"
                                width='md:w-3/4 text-gray-600'
                            />
                        </div>

                        <div className="text-center">
                            <button className="text-xs md:text-base w-28 md:w-44 my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg" type="submit">Submit</button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}

export default Login;