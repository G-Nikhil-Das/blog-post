import React from 'react'
import { Formik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// Creating schema
const schema = Yup.object().shape({
    name: Yup.string()
      .required("Name is a required field"),
    email: Yup.string()
      .required("Email is a required field")
      .email("Invalid email format"),
    password: Yup.string()
      .required("Password is a required field")
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: Yup.string()
      .required("Password is a required field")
      .oneOf([Yup.ref('password'), null], "Does not match with password!")
});

const Register = () => {
    const navigate = useNavigate();
    async function onSubmitHandler(values) {
        console.log(values)
        const {name, email, password} = values
        // console.log(JSON.stringify({name, email, password}))
        const response = await fetch('http://localhost:5000/user/register', {
            method: 'POST',
            body: JSON.stringify({name, email, password}),
            headers: {'Content-Type':'application/json'}
        })
        // await axios.post("http://localhost:5000/user/register",JSON.stringify({email, password}))
        // .then(function (response) {
        //     console.log(response);
        //   })
        // const response = await axios.post("http://localhost:5000/user/register",JSON.stringify({email, password}))
        // console.log(response)
        if(response.status === 200) {
            navigate("/login")
        } else {
            alert('Registration failed.')
        }
    }

    return (
        <>
        {/* Wrapping form inside formik tag and passing our schema to validationSchema prop */}
        <Formik
            validationSchema={schema}
            initialValues={{ name: "", email: "", password: "", confirmPassword: "" }}
            onSubmit={(values) => {
                onSubmitHandler(values)
            }}
        >
            {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            }) => (
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-0 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Create a new account</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" noValidate onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Full Name</label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.name}
                                    placeholder="Enter full name"
                                    className="form-control inp_text block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    id="name"
                                />
                                {/* If validation is not passed show errors */}
                                <p className="error">
                                    {errors.name && touched.name && errors.name}
                                </p>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                            <div className="mt-2">
                                <input
                                    type="email"
                                    name="email"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                    placeholder="Enter email id"
                                    className="form-control inp_text block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    id="email"
                                />
                                {/* If validation is not passed show errors */}
                                <p className="error">
                                    {errors.email && touched.email && errors.email}
                                </p>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                            </div>
                            <div className="mt-2">
                                <input
                                    type="password"
                                    name="password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                    placeholder="Enter password"
                                    className="form-control block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    id="password"
                                />
                                <p className="error">
                                    {errors.password && touched.password && errors.password}
                                </p>
                            </div>
                        </div>
                    
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">Confirm Password</label>
                            </div>
                            <div className="mt-2">
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.confirmPassword}
                                    placeholder="Enter password to confirm"
                                    className="form-control block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    id="confirmPassword"
                                />
                                <p className="error">
                                    {errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}
                                </p>
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign up</button>
                        </div>
                    </form>

                    <p className="mt-5 text-center text-sm text-gray-500">Already a member{"  "}
                        <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Sign In</Link>
                    </p>
                </div>
            </div>
            )}
        </Formik>
        </>
    )
}

export default Register