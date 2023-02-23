import { Formik, Form } from "formik";
import TextInput from './form-components/TextInput';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";

const Register = () => {

    const navigate = useNavigate(null);

    const handleSubmit = async (values) => {
        const response = await fetch(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/save-data/register-shop`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values)
        })

        const json = await response.json();

        alert(json.message);

        if (json.success) {
            navigate('/');
        }
    }

    return (
        <div className="px-10 md:px-0">
            <div className="py-8 flex flex-col justify-center md:px-40">
                <Formik
                    initialValues={{
                        personName: '',
                        primaryMobile: '',
                        email: '',
                        password: '',
                    }}
                    validationSchema={Yup.object({
                        personName: Yup.string()
                            .min(3, 'Must be 3 characters or more')
                            .required('Required'),
                        primaryMobile: Yup.number()
                            .positive("Mobile number can't start with a minus")
                            .min(6000000000, 'Must be 10 digits')
                            .max(10000000000, 'Must be 10 digits')
                            .required('Required'),
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
                    <Form className="bg-gray-700 w-3/4 mx-auto rounded-lg p-8">
                        <h2 className='text-lg md:text-3xl font-bold text-center text-white'>REGISTER</h2>

                        <div className="flex flex-col md:flex-row justify-around">
                            <div className="w-full md:w-1/2 md:px-4 flex flex-col">
                                <div className="flex flex-col text-gray-400 py-2">
                                    <TextInput
                                        label="Contact Person Name"
                                        id="personName"
                                        name="personName"
                                        type="text"
                                        width='md:w-full'
                                    />
                                </div>

                                <div className="flex flex-col text-gray-400 py-2">
                                    <TextInput
                                        label="Primary Mobile"
                                        id="primaryMobile"
                                        name="primaryMobile"
                                        type="number"
                                        width='md:w-full'
                                    />
                                </div>
                            </div>

                            <div className="w-full md:w-1/2 md:px-4 flex flex-col">
                                <div className="flex flex-col text-gray-400 py-2">
                                    <TextInput
                                        label="Email"
                                        id="email"
                                        name="email"
                                        type="email"
                                        width='md:w-full'
                                    />
                                </div>


                                <div className="flex flex-col text-gray-400 py-2">
                                    <TextInput
                                        label="Password"
                                        id="password"
                                        name="password"
                                        type="password"
                                        width='md:w-full'
                                    />
                                </div>
                            </div>
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

export default Register;