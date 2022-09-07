import React, { useState, useEffect } from "react";
import '../index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik } from "formik";
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

// Function for new user registration

export function SignUp() {

    const Navigate = useNavigate();

    // to disable browser back button function

    useEffect(() => {
        window.history.pushState(null, document.title, window.location.href);
        window.addEventListener('popstate', function (event) {
            window.history.pushState(null, document.title, window.location.href);
        })
    }, []);

    // formik initial values

    const [formvalue, setformvalue] = useState({
        First_Name: "",
        E_mail: "",
        Password: ""
    })

    // Formik Error Validation

    const validate = (formData) => {
        var errors = {};
        if (formData.First_Name == "") errors.First_Name = "First Name is Required";
        if (formData.E_mail == "") errors.E_mail = "E_mail is Required";
        if (formData.Password == "") errors.Password = "Password is Required";
        return errors;
    }

    // On Submit Function

    var Register = async (formData) => {
        var response = await axios.post("http://localhost:5000/api/user/signup", {
            name: formData.First_Name,
            email: formData.E_mail,
            password: formData.Password,
        })

        await setformvalue({ First_Name: "", E_mail: "", Password: "" })

        if (response.statusText === "Created") {
            alert("Registered Successfully")
            Navigate('/login', { replace: true })
        }

        else if (response.data.message === "User Already Exists! Login Instead") {
            alert("User Already Exist. Please Login")
            setformvalue({ First_Name: "", E_mail: "", Password: "" })
            Navigate('/login', { replace: true })
        }
    }

    return (
        <>
            <section>
                <div class="container-fluid">
                    <div class="row mt-5 mb-5 ">
                        <div class="col-lg-5 col-md-5 col-sm-12 text-center mx-auto  mt-5 mt-lg-5 mt-md-3 mt-sm-3 ">

                            <Card >
                                <Card.Body>
                                    <Card.Title><h2>Sign Up</h2></Card.Title>
                                    <div class="container register">
                                        <Formik
                                            initialValues={formvalue}
                                            validate={(formData) => validate(formData)}
                                            onSubmit={(formData) => Register(formData)}
                                        >
                                            {({
                                                values,
                                                errors,
                                                touched,
                                                handleChange,
                                                handleBlur,
                                                handleSubmit,
                                                isSubmitting,
                                                /* and other goodies */
                                            }) => (
                                                <form onSubmit={handleSubmit}>

                                                    {/* Name Input */}

                                                    <div class="row mt-4 rowheight ">

                                                        <div class="col-lg-12 col-md-12 col-sm-12 text-center mt-lg-0 mt-md-5 mt-sm-5">
                                                            <InputGroup className="mb-3">
                                                                <InputGroup.Text id="basic-addon1"

                                                                >Name</InputGroup.Text>
                                                                <Form.Control
                                                                    placeholder="Enter Your First_Name"
                                                                    type="text"
                                                                    name="First_Name"
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    value={values.First_Name}
                                                                />
                                                            </InputGroup>
                                                        </div>

                                                    </div>

                                                    <div class="row errorrowht">
                                                        <div className="errors text-center">{errors.First_Name && touched.First_Name && errors.First_Name}</div>
                                                    </div>

                                                    {/* Email Input */}

                                                    <div class="row mt-4 rowheight">

                                                        <div class="col-lg-12 col-md-12 col-sm-12 text-center mt-lg-0 mt-md-5 mt-sm-5 ">
                                                            <InputGroup className="mb-3">
                                                                <InputGroup.Text id="basic-addon1"

                                                                >E-mail</InputGroup.Text>
                                                                <Form.Control
                                                                    placeholder="Enter Your E_mail"
                                                                    type="email"
                                                                    name="E_mail"
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    value={values.E_mail}
                                                                />
                                                            </InputGroup>
                                                        </div>
                                                    </div>
                                                    <div class="row errorrowht">
                                                        <div className="errors text-center">  {errors.E_mail && touched.E_mail && errors.E_mail}</div>
                                                    </div>

                                                    {/* Password Input */}

                                                    <div class="row mt-4 rowheight ">
                                                        <div class="col-lg-12 col-md-12 col-sm-12 text-center mt-lg-0 mt-md-5 mt-sm-5 ">
                                                            <InputGroup className="mb-3">
                                                                <InputGroup.Text id="basic-addon1"
                                                                >Password</InputGroup.Text>
                                                                <Form.Control
                                                                    placeholder="Enter Your Password"
                                                                    type="password"
                                                                    name="Password"
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    value={values.Password}
                                                                />
                                                            </InputGroup> </div>
                                                    </div>
                                                    <div class="row errorrowht">
                                                        <div className="errors text-center"> {errors.Password && touched.Password && errors.Password}</div>
                                                    </div>

                                                    {/* Register Button */}

                                                    <div class="row mt-4">
                                                        <div class="col-md-12 d-flex justify-content-center">
                                                            <button class="btn btn-info" type="submit" disabled={isSubmitting}>
                                                                Register
                                                            </button>
                                                        </div>
                                                    </div>
                                                </form>
                                            )}
                                        </Formik>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
