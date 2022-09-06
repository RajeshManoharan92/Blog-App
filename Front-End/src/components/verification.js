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

export function Emailverification() {

    const Navigate = useNavigate();

    // formik initial values

    const [formvalue, setformvalue] = useState({
        E_mail: "",
    })

    // to avoid browser back button function

    useEffect(() => {
        window.history.pushState(null, document.title, window.location.href);
        window.addEventListener('popstate', function (event) {
            window.history.pushState(null, document.title, window.location.href);
        })
    }, []);

    //  Formik Error Validation

    const validate = (formData) => {
        var errors = {};
        if (formData.E_mail == "") errors.E_mail = "E_mail is Required";
        return errors;
    }

    // On submit Function

    var Verification = async (formData) => {
        var response = await axios.post("http://localhost:5000/api/user/verification", {
            email: formData.E_mail,
        })

        if (response.data.message === "Sorry Email does not Exist!") {
            alert("Sorry Email does not Exist!")
        }

        if (response.data === "mail_sent") {

            alert("mail sent")
            Navigate('/forgotpassword', { replace: true })
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
                                    <Card.Title><h2>E-mail Verification</h2></Card.Title>
                                    <div class=" mt-4 register">
                                        <Formik
                                            initialValues={formvalue}
                                            validate={(formData) => validate(formData)}
                                            onSubmit={(formData) => Verification(formData)}
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

                                                    {/* Email Input */}

                                                    <div class="row mt-5 rowheight">
                                                        <div class="col-lg-12 col-md-12 col-sm-12 text-center mt-lg-0 mt-md-5 mt-sm-5">
                                                            <InputGroup className="mb-3">
                                                                <InputGroup.Text id="basic-addon1"
                                                                >E-mail Id</InputGroup.Text>
                                                                <Form.Control
                                                                    placeholder="Enter Your E_mail"
                                                                    type="email"
                                                                    name="E_mail"
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    value={values.E_mail}
                                                                />
                                                            </InputGroup> &nbsp; &nbsp;
                                                        </div>
                                                        <div class="row errorrowht">
                                                            <div className="errors">  {errors.E_mail && touched.E_mail && errors.E_mail}</div> </div>
                                                    </div>

                                                    {/* Send Verification E-mail button */}

                                                    <div class="row mt-3">
                                                        <div class="col-lg-12 col-md-12 col-sm-12 text-center mt-lg-0 mt-md-5 mt-sm-5">
                                                            <button class="btn btn-info vbtn" type="submit" disabled={isSubmitting}>
                                                                Send Verification E-mail
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <span class="verifymail mt-4">* Click the link sent to your registered mail to create New Password</span>
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
