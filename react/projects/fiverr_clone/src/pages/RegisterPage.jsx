import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useContext } from 'react'
import { BiLock } from 'react-icons/bi';
import { MdEmail, MdPassword } from 'react-icons/md';
import * as yup from 'yup';
import { DataContext } from '../context';
import { useNavigate } from 'react-router-dom';


const RegisterPage = () => {
    const { setUsers } = useContext(DataContext);
    const navigate = useNavigate();
    return (
        <>
            <div className='h-[86vh] bg-gray-300 flex justify-center items-center'>
                <div className='w-[50vw] bg-white h-auto p-20 rounded flex flex-col items-center'>
                    <div>
                        <img
                            className='h-[50px]'
                            src="https://it.ifda.in/assets/logo-DWCdMfMg.png" alt="" />
                    </div>
                    <div>
                        <h1 className='text-xl text-gray-700 font-bold'>Login To Your Account</h1>
                    </div>
                    <Formik
                        initialValues={{
                            name: "",
                            email: "",
                            phone: "",
                            message: ""
                        }}
                        validationSchema={yup.object({
                            name: yup.string().required("Name is required"),
                            email: yup.string().email("Invaid Email").required("Email is required"),
                            phone: yup.number().required("Phone number is required"),
                            message: yup.string().required("Message is required"),
                        })}
                        onSubmit={(values, { resetForm, setSubmitting }) => {
                            // console.log(values);
                            fetch("https://munnapassword.pythonanywhere.com/contact/", {
                                method: "POST",
                                body: JSON.stringify(values),
                                headers: {
                                    'content-type': "application/json"
                                }
                            }).then((res) => {
                                return res.json();
                            }).then((res) => {
                                setUsers("user");
                                navigate("/");
                            })
                        }}>
                        <Form className='w-full py-10'>
                            <div className='w-full relative'>
                                <MdEmail size={21} className='top-2 left-3 absolute text-gray-800' />
                                <Field className="w-full font-semibold h-[2.3rem] pl-10 border border-gray-400  rounded outline-none"
                                    placeholder="Enter your email"
                                    name="email" />
                            </div>
                            <div className='w-full mt-4 relative'>
                                <BiLock size={21} className='top-2 left-3 absolute text-gray-800' />
                                <Field className="w-full font-semibold h-[2.3rem] pl-10 border border-gray-400  rounded outline-none"
                                    placeholder="Enter your name"
                                    name="name" />
                            </div>
                            <div className='w-full mt-4 relative'>
                                <BiLock size={21} className='top-2 left-3 absolute text-gray-800' />
                                <Field className="w-full font-semibold h-[2.3rem] pl-10 border border-gray-400  rounded outline-none"
                                    placeholder="Enter your Phone"
                                    name="phone" />
                            </div>
                            <div className='w-full mt-4 relative'>
                                <BiLock size={21} className='top-2 left-3 absolute text-gray-800' />
                                <Field className="w-full font-semibold h-[2.3rem] pl-10 border border-gray-400  rounded outline-none"
                                    placeholder="Enter your Message"
                                    name="message" />
                            </div>

                            <div className='mt-3'>
                                <button
                                    className='w-full text-white py-2 font-bold rounded'
                                    style={
                                        {
                                            background: "linear-gradient(to right, rgb(238, 119, 36), rgb(216, 54, 58), rgb(221, 54, 117), rgb(180, 69, 147))"
                                        }
                                    }>Login</button>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
            {/* <div className='w-[400px] mx-auto p-8'>
            <Formik
                initialValues={{
                    name: "",
                    email: "",
                    phone: "",
                    message: ""
                }}
                validationSchema={yup.object({
                    name: yup.string().required("Name is required"),
                    email: yup.string().email("Invaid Email").required("Email is required"),
                    phone: yup.number().required("Phone number is required"),
                    message: yup.string().required("Message is required"),
                })}
                onSubmit={(values, { resetForm, setSubmitting }) => {
                    // console.log(values);
                    fetch("http://localhost:5000/contact/", {
                        method : "POST",
                        body : JSON.stringify(values),
                        headers : {
                            'content-type' : "application/json"
                        }
                    } )
                }}>

                <Form className='flex flex-col gap-6'>
                    <div>
                        <Field name="name" className="border rounded w-full h-10 text-gray-700" placeholder="Please Enter this Field...."/><br />
                        <div className='text-red-500'>

                            <ErrorMessage name='name' />
                        </div>
                    </div>
                    <div>

                        <Field name="email" className="border rounded w-full h-10 text-gray-700" placeholder="Please Enter this Field...." /><br />
                        <div className='text-red-500'>
                            <ErrorMessage name='email' className='text-red-500' />
                        </div>
                    </div>
                    <div>
                        <Field name="phone" className="border rounded w-full h-10 text-gray-700" placeholder="Please Enter this Field...." />
                        <br />
                        <div className='text-red-500'>
                            <ErrorMessage name='phone' className='text-red-500' />
                        </div>
                    </div>
                    <div>

                        <Field name="message" className="border rounded w-full h-10 text-gray-700" placeholder="Please Enter this Field...." /><br />
                        <div className='text-red-500'>
                            <ErrorMessage name='message' className='text-red-500' />
                        </div>
                    </div>
                    <button>Submit</button>
                </Form>
            </Formik>
            </div> */}
        </>
    )
}

export default RegisterPage;