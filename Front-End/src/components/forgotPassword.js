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

export function Forgotpassword() {

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
        E_mail: "",
        New_Password: ""
    })

    // Formik Error Validation

    const validate = (formData) => {
        var errors = {};
        if (formData.E_mail == "") errors.E_mail = "E_mail is Required";
        if (formData.New_Password == "") errors.New_Password = "New_Password is Required";
        return errors;
    }

    // Onsubmit Function

    var Forgotpassword = async (formData) => {
        var response = await axios.post("http://localhost:5000/api/user/setnewpassword", {
            email: formData.E_mail,
            password: formData.New_Password
        })

        if (response.data.message === "Sorry Email does not Exist!") {
            alert("Not a user, Please Sign Up")
            Navigate('/signup', { replace: true })
            return;
        }

        else if (response.data.message === "Password changed") {
            alert('Password changed successfully')
            Navigate('/login', { replace: true })
            return;
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
                                    <Card.Title><h2>Set New Password</h2></Card.Title>
                                    <div class=" mt-4 register">
                                        <Formik
                                            initialValues={formvalue}
                                            validate={(formData) => validate(formData)}
                                            onSubmit={(formData) => Forgotpassword(formData)}
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

                                                    <div class="row rowheight">
                                                        <div class="col-lg-12 col-md-12 col-sm-12 text-center">
                                                            <InputGroup className="mb-3">
                                                                <InputGroup.Text id="basic-addon1"
                                                                >Name</InputGroup.Text>
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
                                                        <div class="row  errorrowht">
                                                            <div className="errors">  {errors.E_mail && touched.E_mail && errors.E_mail} </div></div>
                                                    </div>

                                                    {/* Password Input */}

                                                    <div class="row mt-3 rowheight">
                                                        <div class="col-lg-12 col-md-12 col-sm-12 text-center">
                                                            <InputGroup className="mb-3">
                                                                <InputGroup.Text id="basic-addon1"
                                                                >Password</InputGroup.Text>
                                                                <Form.Control
                                                                    placeholder="Enter Your New_Password"
                                                                    type="password"
                                                                    name="New_Password"
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    value={values.New_Password}
                                                                />
                                                            </InputGroup>
                                                        </div>
                                                    </div>
                                                    <div class="row errorrowht">
                                                        <div className="errors">  {errors.New_Password && touched.New_Password && errors.New_Password}</div>
                                                    </div>

                                                    {/* Change password Button */}

                                                    <div class="row mb-3 mt-3">
                                                        <div class="col-lg-12 col-md-12 col-sm-12 text-center mt-lg-0 mt-md-5 mt-sm-5">
                                                            <button class="btn btn-info vbtn" type="submit" disabled={isSubmitting}>
                                                                Change password
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
