import React, { useContext } from "react";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { toast } from "react-toastify";

const LoginPage = () => {
    const navigate = useNavigate();
    const inputClass =
        "border border-gray-300 w-full my-2 h-10 rounded pl-4 focus:outline-none focus:ring-2 focus:ring-orange-400";

    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        password: Yup.string().min(8).required()
    });

    return (
        <div className="bg-[#e4e4e4] w-full h-screen flex justify-center items-center">
            <div className="bg-white w-[500px] p-10 rounded shadow-md">
                <h2 className="text-2xl font-semibold mb-4 text-center">Register Page</h2>
                <Formik
                    initialValues={{
                        email: "",
                        password: "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={async (values, { setSubmitting, resetForm }) => {
                        setSubmitting(true);
                        // navigate("/");
                        try {
                            await fetch('http://localhost:3000/register/', {
                                method: "POST",
                                body: JSON.stringify(values),
                                headers: {
                                    'content-type': "application/json"
                                }
                            });
                            toast.success("User Is registered Successfully!!");
                            resetForm();
                        } catch (error) {
                            console.log(error);
                            toast.error("Internal Server Error");
                        }finally {
                            setSubmitting(false);
                        }
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>

                            <Field
                                name="email"
                                type="email"
                                className={inputClass}
                                placeholder="Enter your email"
                            />
                            <ErrorMessage
                                name="email"
                                component="div"
                                className="text-red-500 text-sm"
                            />

                            <Field
                                name="password"
                                className={inputClass}
                                placeholder="Enter your password "
                            />
                            <ErrorMessage
                                name="password"
                                component="div"
                                className="text-red-500 text-sm"
                            />

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`text-white w-full py-2 px-4 rounded mt-4 transition ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                                    }`}
                                style={{
                                    background:
                                        "linear-gradient(to right, rgb(238, 119, 36), rgb(216, 54, 58), rgb(221, 54, 117), rgb(180, 69, 147))",
                                }}
                            >
                                {isSubmitting ? "Loading..." : "Submit"}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default LoginPage;
