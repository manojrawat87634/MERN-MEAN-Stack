import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function App() {
  const [users, setUser] = useState([]);
  const [isEditing] = useState(false);
    // Yup Schema

    useEffect(()=>{
      fetch('http://localhost:3000/user/').then((res)=> res.json()).then((res)=>{
        // console.log(res);
        setUser(res);
        

      }).catch((err)=>{
        console.log(err)
      })
    }, [])
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, "Name must be at least 2 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    age: Yup.number()
      .typeError("Age must be a number")
      .positive("Age must be positive")
      .integer("Age must be an integer")
      .nullable(),
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-lg p-6">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            User Management CRUD
          </h1>
        </div>

        {/* Form Section */}
        <div className="bg-gray-50 border rounded-lg p-5 mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            {isEditing ? "Update User" : "Create User"}
          </h2>

          <Formik
            initialValues={{
              name: "",
              email: "",
              age: "",
            }}
            validationSchema={validationSchema}
            onSubmit={ async (values, { resetForm, setSubmitting }) => {
              setSubmitting(true);
              await fetch('http://localhost:3000/user', {
                method : "POST", 
                headers : {
                  'content-type' : "application/json"
                },
                body : JSON.stringify(values)
              }).then((res)=> res.json()).then((res)=>{}).catch((err)=>{
                console.log(err)
              })
              // console.log("Form Data:", values);
              resetForm();
            }}
          >
            {({ errors, touched }) => (
              <Form className="grid grid-cols-1 md:grid-cols-4 gap-4">
                
                {/* Name */}
                <div>
                  <Field
                    name="name"
                    type="text"
                    placeholder="Full Name"
                    className={`w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 ${
                      errors.name && touched.name
                        ? "border-red-500 focus:ring-red-400"
                        : "focus:ring-blue-400"
                    }`}
                  />
                  <ErrorMessage
                    name="name"
                    component="p"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Email */}
                <div>
                  <Field
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    className={`w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 ${
                      errors.email && touched.email
                        ? "border-red-500 focus:ring-red-400"
                        : "focus:ring-blue-400"
                    }`}
                  />
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Age */}
                <div>
                  <Field
                    name="age"
                    type="number"
                    placeholder="Age"
                    className={`w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 ${
                      errors.age && touched.age
                        ? "border-red-500 focus:ring-red-400"
                        : "focus:ring-blue-400"
                    }`}
                  />
                  <ErrorMessage
                    name="age"
                    component="p"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Submit Button */}
                <div className="flex items-start">
                  <button
                    type="submit"
                    className={`w-full text-white rounded-lg px-4 py-2 transition ${
                      isEditing
                        ? "bg-yellow-500 hover:bg-yellow-600"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    {isEditing ? "Update" : "Save"}
                  </button>
                </div>

              </Form>
            )}
          </Formik>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-700 text-sm uppercase text-left">
                <th className="p-3">ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Age</th>
                <th className="p-3">Created</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
             {users.map((e, i)=>{
              return  <tr className="border-b hover:bg-gray-50">
                <td className="p-3 text-sm text-gray-600">
                  {e._id}
                </td>
                <td className="p-3">{e.name}</td>
                <td className="p-3">{e.email}</td>
                <td className="p-3">—</td>
                <td className="p-3 text-sm text-gray-500">
                  
                </td>
                <td className="p-3 flex justify-center gap-3">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 text-sm">
                    Edit
                  </button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 text-sm">
                    Delete
                  </button>
                </td>
              </tr>
             })}

              {users.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center p-6 text-gray-500">
                    No users available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

export default App;