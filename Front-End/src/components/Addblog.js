import React, { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import { useNavigate } from 'react-router';
import axios from "axios";
import { Formik } from "formik";
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import "../index.css"
import { useAuth } from "../auth";

export function Addblog() {

    const Navigate = useNavigate();

    const auth = useAuth()

    const userid = localStorage.getItem("userid")

    // to disable browser back button function

    useEffect(() => {
        window.history.pushState(null, document.title, window.location.href);
        window.addEventListener('popstate', function (event) {
            window.history.pushState(null, document.title, window.location.href);
        })
    }, []);

    // initial state for formik

    const [inputs, setInputs] = useState({
        title: "",
        description: "",
        imageURL: "",
    });

    // Formik Error Validation

    const validate = (formData) => {
        var errors = {};
        if (formData.title == "") errors.title = "Title is Required";
        if (formData.description == "") errors.description = "Description is Required";
        if (formData.imageURL == "") errors.imageURL = "Image-URL is Required";
        return errors;
    }

    // to get current date time

    var d = new Date();
    var utcDate = d.toLocaleString();

    // on submit function

    const submit = async (formData) => {
        const res = await axios
            .post("http://localhost:5000/api/blog/add", {
                title: formData.title,
                description: formData.description,
                image: formData.imageURL,
                user: userid,
                date: utcDate
            })

            if(res){
                alert("Post Created")
                Navigate("/AllBlog")
            }

        setInputs({ title: "", description: "", imageURL: "" })
    };


    return (
        <>
        <section>
            {
                auth.user ? <>
                    <div class="container-fluid">
                        <div class="row mt-4  justify-content-center">
                            <div class="col-lg-5 col-md-5 mb-5 col-sm-12 text-center  mt-4 mt-lg-4 mt-md-3 mt-sm-3 ">
                                <Card >
                                    <Card.Body>
                                        <Card.Title>Post Your Blog</Card.Title>
                                        <Formik
                                            enableReinitialize
                                            initialValues={inputs}
                                            validate={(formData) => validate(formData)}
                                            onSubmit={(formData) => submit(formData)}
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

                                                    {/* title Input */}

                                                    <div class="row mt-4 rowht ">
                                                        <div class="col-lg-12 col-md-12 col-sm-12 text-center  align-self-center  ">
                                                            <InputGroup className="mb-3">
                                                                <InputGroup.Text id="basic-addon1"
                                                                >Title</InputGroup.Text>
                                                                <Form.Control
                                                                    placeholder="Enter Your title"
                                                                    aria-label="Username"
                                                                    aria-describedby="basic-addon1"
                                                                    type="text"
                                                                    name="title"
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    value={values.title}
                                                                />
                                                            </InputGroup>
                                                        </div>
                                                    </div>
                                                    <div class="row  errorrowht">
                                                        <div class=" col-12 text-center     ">
                                                            <div className="errors text-center">{errors.title && touched.title && errors.title}</div>
                                                        </div>
                                                    </div>

                                                    {/* description Input */}

                                                    <div class="row mt-4 rowht">
                                                        <div class="col-lg-12 col-md-12 col-sm-12 text-center   align-self-center  ">
                                                            <InputGroup className="mb-3">
                                                                <InputGroup.Text id="basic-addon1"
                                                                >Description</InputGroup.Text>
                                                                <Form.Control
                                                                    placeholder="Enter Your description"
                                                                    aria-label="Username"
                                                                    aria-describedby="basic-addon1"
                                                                    name="description"
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    value={values.description}
                                                                    as="textarea"
                                                                    style={{ height: '100px' }}
                                                                />
                                                            </InputGroup>
                                                        </div>
                                                    </div>
                                                    <div class="row  errorrowht">
                                                        <div class=" col-12 text-center   ">
                                                            <div className="errors text-center">  {errors.description && touched.description && errors.description}</div>
                                                        </div>
                                                    </div>

                                                    {/* imageURL Input */}

                                                    <div class="row mt-4 rowht">
                                                        <div class="col-lg-12 col-md-12 col-sm-12 text-center align-self-center  ">
                                                            <InputGroup className="mb-3">
                                                                <InputGroup.Text id="basic-addon1"
                                                                >Image-URL</InputGroup.Text>
                                                                <Form.Control
                                                                    placeholder="Enter Your imageURL"
                                                                    aria-label="Username"
                                                                    aria-describedby="basic-addon1"
                                                                    type="imageURL"
                                                                    name="imageURL"
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    value={values.imageURL}
                                                                />
                                                            </InputGroup>
                                                        </div>
                                                    </div>
                                                    <div class="row errorrowht">
                                                        <div class="col-12 text-center   ">
                                                            <div className="errors">  {errors.imageURL && touched.imageURL && errors.imageURL}</div>
                                                        </div>
                                                    </div>

                                                    {/* Post Button */}

                                                    <div class="row mt-3">
                                                        <div class="col-lg-12 col-md-12 col-sm-12 text-center mb-4 mt-3 mt-lg-0 mt-md-0 mt-sm-3  text-lg-center text-md-center text-sm-center">
                                                            <button class="btn btn-outline-light" style={{ backgroundColor: "rgb(79, 6, 79)" }} type="submit" disabled={isSubmitting}>
                                                                Post
                                                            </button>
                                                        </div>
                                                    </div>
                                                </form>
                                            )}
                                        </Formik>
                                    </Card.Body>
                                </Card>
                            </div>
                        </div>
                    </div>

                </> : <> {Navigate("/login")}</>
            }
            </section>
        </>
    )
}
