import React, { useContext } from "react";
import { DataContext } from "../../context";
import { Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {

  const { isLogin, setIsLogin } = useContext(DataContext);
  const cl = "border border-gray-300 w-full my-2 h-10 rounded pl-4";
  const navigate = useNavigate();

  return <>
    <div className='bg-[#e4e4e4] w-full h-[100vh] flex justify-center items-center'>
      <div className='bg-white w-[500px] p-10 rounded'>
        <Formik initialValues={{
          email: "",
          password: "",
        }} onSubmit={(v, { resetForm, setSubmitting }) => {
          //   console.log(v);
          // setSubmitting(true);
          // setIsLogin(true);

          fetch("http://localhost:3000/register/", {
            headers: {
              'content-type': "application/json"
            },
            body: JSON.stringify(v),
            method: "POST"
          }).then((e)=>{}).then((e)=>{}).catch((err)=>{
            console.log(err);
          })
        }}>
          {({ isSubmitting, }) => (
            <Form>
              <Field name="email" className={cl} placeholder="Enter your email" />
              <br />
              <Field name="password" className={cl} placeholder="Enter your Password" />
              <button
                className='text-white w-full py-2 px-4 rounded mt-2'
                style={{
                  background: "linear-gradient(to right, rgb(238, 119, 36), rgb(216, 54, 58), rgb(221, 54, 117), rgb(180, 69, 147))"
                }}>{isSubmitting ? "Loading... " : "Submit"}</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  </>
}


export default LoginPage;