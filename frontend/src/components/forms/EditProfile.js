import { Formik, Form } from "formik";
import TextInput from './form-components/TextInput';
import * as Yup from 'yup';
import SelectInput from "./form-components/SelectInput";
import { useNavigate } from "react-router-dom";
import TextAreaInput from "./form-components/TextAreaInput";
import { useEffect, useState } from "react";

const EditProfile = () => {

    const navigate = useNavigate(null);
    const [image, setImage] = useState('');

    useEffect(() => {
        if (!localStorage.getItem('authToken'))
            navigate('/');
        // eslint-disable-next-line
    }, [])

    const handleSubmit = async (values) => {

        let confirmation = window.prompt("Once submitted, no further changes to the form can be made. Do you want to submit?(Yes/No)");
        if (!(confirmation.toUpperCase() === 'yes'.toUpperCase()))
            return;
        let formData = new FormData();

        formData.append('image', image);
        formData.append('category', values.category);
        formData.append('shopName', values.shopName);
        formData.append('openingTime', values.openingTime);
        formData.append('closingTime', values.closingTime);
        formData.append('coupon', values.coupon);
        formData.append('status', values.status);
        formData.append('services', values.services);
        formData.append('state', values.state);
        formData.append('address', values.address);
        formData.append('district', values.district);
        formData.append('city', values.city);
        formData.append('locality', values.locality);
        formData.append('pincode', values.pincode);
        formData.append('latitude', values.latitude);
        formData.append('longitude', values.longitude);


        const response = await fetch(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/save-data/save-shop-data`, {
            method: 'POST',
            headers: {
                'authToken': localStorage.getItem('authToken'),
            },
            body: formData
        })

        const json = await response.json();

        alert(json.message);

        if (json.success) {
            navigate('/ed/pr');
        }
    }

    const handleImageSelection = (e) => {
        const acceptedImageTypes = ['image/jpg', 'image/jpeg', 'image/png'];

        if (e.target.files[0].size < 10000 || e.target.files[0].size > 500000) {
            alert('Photo size must be greater than 10kb and less than 500kb');
            e.target.value = null;
            return;
        }
        if (!acceptedImageTypes.includes(e.target.files[0].type)) {
            alert('Uploaded file must be in JPG/JPEG/PNG format');
            e.target.value = null;
            return;
        }

        setImage(e.target.files[0])
    }

    return (
        <div className="px-4 md:px-0">
            <div className="py-8 flex flex-col justify-center md:px-40">
                <Formik
                    initialValues={{
                        category: '',
                        shopName: '',
                        openingTime: '',
                        closingTime: '',
                        coupon: 'No',
                        status: 'Active',
                        services: '',
                        state: '',
                        address: '',
                        district: '',
                        city: '',
                        locality: '',
                        pincode: '',
                        latitude: '',
                        longitude: ''
                    }}
                    validationSchema={Yup.object({
                        category: Yup.string()
                            // .max(15, 'Must be 15 characters or less')
                            .required('Required'),
                        shopName: Yup.string()
                            .min(3, 'Must be 3 characters or more')
                            .required('Required'),
                        openingTime: Yup.string()
                            .required('Required'),
                        closingTime: Yup.string()
                            .required('Required'),
                        coupon: Yup.string()
                            .required('Required'),
                        status: Yup.string()
                            .required('Required'),
                        services: Yup.string()
                            .required('Required'),
                        state: Yup.string()
                            .required('Required'),
                        address: Yup.string()
                            .required('Required'),
                        district: Yup.string()
                            .required('Required'),
                        city: Yup.string()
                            .required('Required'),
                        locality: Yup.string()
                            .required('Required'),
                        pincode: Yup.string()
                            .required('Required'),
                        latitude: Yup.string()
                            .required('Required'),
                        longitude: Yup.string()
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
                    <Form className="w-full mx-auto rounded-lg bg-gray-700 p-8">
                        <h2 className='text-lg md:text-3xl font-bold text-center text-white'>ENTER SHOP DETAILS</h2>

                        <h2 className='md:ml-5 text-base md:text-2xl underline font-bold text-white'>Basic Information:-</h2>

                        <div className="flex flex-col md:flex-row justify-around">
                            <div className="w-full md:w-1/2 md:px-4 flex flex-col">
                                <div className="flex flex-col text-gray-400 py-2">
                                    <TextInput
                                        label="Shop Category"
                                        id="category"
                                        name="category"
                                        type="text"
                                        width='md:w-full'
                                    />
                                </div>

                                <div className="flex flex-col md:flex-row justify-between">
                                    <div className="flex flex-col text-gray-400 py-2">
                                        <TextInput
                                            label="Opening Time"
                                            id="openingTime"
                                            name="openingTime"
                                            type="text"
                                            width='md:w-36'
                                        />
                                    </div>

                                    <div className="flex flex-col text-gray-400 py-2">
                                        <TextInput
                                            label="Closing Time"
                                            id="closingTime"
                                            name="closingTime"
                                            type="text"
                                            width='md:w-36'
                                        />
                                    </div>

                                    <div className="flex flex-col text-gray-400 py-2">
                                        <SelectInput
                                            label="Can Create Coupon"
                                            id="coupon"
                                            name="coupon"
                                            type="text"
                                            options={["No", "Yes"]}
                                            width='md:w-36'
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="w-full md:w-1/2 md:px-4 flex flex-col">

                                <div className="flex flex-col text-gray-400 py-2">
                                    <TextInput
                                        label="Shop Name"
                                        id="shopName"
                                        name="shopName"
                                        type="text"
                                        width='md:w-full'
                                    />
                                </div>

                                <div className="flex flex-col md:flex-row justify-start">
                                    <div className="flex flex-col text-gray-400 py-2">
                                        <SelectInput
                                            label="Status"
                                            id="status"
                                            name="status"
                                            type="text"
                                            options={["Active", "Not Active"]}
                                        />
                                    </div>

                                    <div className="md:ml-12 flex flex-col text-gray-400 py-2">
                                        <label htmlFor='image' className="text-xs md:text-base">Image</label>
                                        <input name="image" id="image" className="rounded-lg w-32 md:w-60 text-xs md:text-base mt-2 p-2 focus:border-blue-500" type="file" onChange={handleImageSelection} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full md:px-4 flex flex-col text-gray-400 py-2">
                            <TextInput
                                label="Services"
                                id="services"
                                name="services"
                                type="text"
                                width='md:w-full'
                            />
                        </div>

                        <h2 className='md:ml-5 text-base md:text-2xl underline font-bold text-white'>Address:-</h2>

                        <div className="flex flex-col md:flex-row justify-around">
                            <div className="w-full md:w-1/2 md:px-4 flex flex-col">
                                <div className="flex flex-col text-gray-400 py-2">
                                    <TextInput
                                        label="State"
                                        id="state"
                                        name="state"
                                        type="text"
                                        width='md:w-full'
                                    />
                                </div>

                                <div className="flex flex-row justify-between">
                                    <div className="flex flex-col text-gray-400 py-2">
                                        <TextInput
                                            label="District"
                                            id="district"
                                            name="district"
                                            type="text"
                                            width='md:w-52'
                                        />
                                    </div>

                                    <div className="flex flex-col text-gray-400 py-2">
                                        <TextInput
                                            label="City"
                                            id="city"
                                            name="city"
                                            type="text"
                                            width='md:w-52'
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-row justify-between">
                                    <div className="flex flex-col text-gray-400 py-2">
                                        <TextInput
                                            label="Locality"
                                            id="locality"
                                            name="locality"
                                            type="text"
                                            width='md:w-52'
                                        />
                                    </div>

                                    <div className="flex flex-col text-gray-400 py-2">
                                        <TextInput
                                            label="Pin Code"
                                            id="pincode"
                                            name="pincode"
                                            type="text"
                                            width='md:w-52'
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="w-full md:w-1/2 md:px-4 flex flex-col">

                                <div className="flex flex-col text-gray-400 py-2">
                                    <TextAreaInput
                                        label="Address"
                                        id="address"
                                        name="address"
                                        type="text"
                                    />
                                </div>

                                <div className="flex flex-row justify-start">
                                    <div className="flex flex-col text-gray-400 py-2">
                                        <TextInput
                                            label="Latitude"
                                            id="latitude"
                                            name="latitude"
                                            type="text"
                                        />
                                    </div>

                                    <div className="md:ml-12 flex flex-col text-gray-400 py-2">
                                        <TextInput
                                            label="Longitude"
                                            id="longitude"
                                            name="longitude"
                                            type="text"
                                        />
                                    </div>
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

export default EditProfile;