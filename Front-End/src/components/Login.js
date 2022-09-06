import React, { useState, useEffect } from "react";
import '../index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, } from "react-router-dom";
import axios from "axios";
import { Formik } from "formik";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from "../auth";
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
// function used for step-1 verification log-in

export function Login() {

    const Navigate = useNavigate();

    // formik initial values

    const [formvalue, setformvalue] = useState({
        E_mail: "",
        Password: ""
    })

    const [user, setUser] = useState("")

    const auth = useAuth()

    // to disable browser back button function

    useEffect(() => {
        window.history.pushState(null, document.title, window.location.href);
        window.addEventListener('popstate', function (event) {
            window.history.pushState(null, document.title, window.location.href);
        })
    }, []);

    // Formik error validation

    const validate = (formData) => {
        var errors = {};
        if (formData.E_mail == "") errors.E_mail = "E_mail is Required";
        if (formData.Password == "") errors.Password = "Password is Required";
        return errors;
    }

    // On Submit Function

    const Login = async (formData) => {
        var response = await axios.post("http://localhost:5000/api/user/login", {
            email: formData.E_mail,
            password: formData.Password,
        })

        if (response.data.message === "Login Successfull") {
            auth.login(user)
            await localStorage.setItem("userid", response.data.user._id)
            await localStorage.setItem("arraylength", response.data.user.blogs.length)
            alert(" Verification Success")
            Navigate('/AllBlog', { replace: true })
        }

        if (response.data.message === "Incorrect Password") {
            alert("Incorrect Password")
        }

        if (response.data.message === "Couldnt Find User By This Email") {
            alert("Invalid E-mail")
        }
    }

    return (
        <>
            <section>
                <div class="container-fluid" >
                    <div class="row mt-5 ">
                        <div class="col-lg-5 col-md-5 col-sm-12 text-center self-align-center mx-auto mt-5 mt-lg-5 mt-md-3 mt-sm-3 ">
                            <Card >
                                <Card.Body>
                                    <Card.Title><h2>Log In</h2> </Card.Title>
                                    <Formik
                                        initialValues={formvalue}
                                        validate={(formData) => validate(formData)}
                                        onSubmit={(formData) => Login(formData)}
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

                                                {/* E-mail Input */}

                                                <div class="row mt-5 rowheight">
                                                    <div class="col-lg-12 col-md-12 col-sm-12 text-center mt-lg-0 mt-md-5 mt-sm-5">
                                                        <InputGroup className="mb-3">
                                                            <InputGroup.Text id="basic-addon1"

                                                            >E-mail Id</InputGroup.Text>
                                                            <Form.Control
                                                                placeholder="Enter Your Email-Id"
                                                                type="email"
                                                                name="E_mail"
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.E_mail}
                                                                onKeyUp={(e) => setUser(e.target.value)}
                                                            />
                                                        </InputGroup>
                                                    </div>
                                                    <div class="row errorrowht">
                                                        <div className="errors ">{errors.E_mail && touched.E_mail && errors.E_mail}</div>  </div>
                                                </div>

                                                {/* Password Input */}

                                                <div class="row mt-4 rowheight">
                                                    <div class="col-lg-12 col-md-12 col-sm-12 text-center mt-lg-0 mt-md-5 mt-sm-5">
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
                                                        </InputGroup>
                                                    </div>
                                                    <div class="row errorrowht">
                                                        <div className="errors">{errors.Password && touched.Password && errors.Password}</div>   </div>
                                                </div>

                                                {/* Login &  Forgot Password Button */}

                                                <div class="row mt-4 mb-3 rowheight">

                                                    <div class="col-lg-6 col-md-6 col-sm-12 mt-3 mt-lg-0 mt-sm-3 mt-md-0 d-flex justify-content-center d-flex align-self-lg-center mt-lg-0 mt-md-3 mt-sm-5 ">
                                                        <button class="btn btn-info  " type="submit" disabled={isSubmitting}>
                                                            Log In
                                                        </button>
                                                    </div> <br></br>
                                                    <div class="col-lg-6 col-md-6 col-sm-12 mt-3 mt-lg-0 mt-sm-3 mt-md-0 d-flex justify-content-center d-flex align-self-lg-center mt-lg-0 mt-md-3 mt-sm-5 ">
                                                        <button class="btn btn-secondary" type="button" onClick={() => Navigate('/verification', { replace: true })} disabled={isSubmitting}>
                                                            Forgot password
                                                        </button>
                                                    </div>
                                                </div>
                                                {/* <input type="text" onChange={(e)=>setUser(e.target.value)}></input> */}
                                            </form>
                                        )}
                                    </Formik>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}