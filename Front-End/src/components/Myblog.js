import React from 'react'
import Card from 'react-bootstrap/Card'
import { useEffect, useState } from "react";
import "../index.css"
import axios from "axios";
import { Formik } from "formik";
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { BrowserRouter, Route, Routes, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth";


export function Myblog() {

    const Navigate = useNavigate()

    const [blogs, setBlogs] = useState([]);

    const [counter, setcounter] = useState(0);

    const [userId, setuserId] = useState(false)

    const [updateid, setupdateid] = useState()

    const auth = useAuth()

    const userid = localStorage.getItem("userid")

    const arraylength = localStorage.getItem("arraylength")

    const [inputs, setinputs] = useState({
        title: "",
        description: "",
        imageURL: ""
    })

    // Formik Error Validation

    const validate = (formData) => {
        var errors = {};
        if (formData.title == "") errors.title = "Title is Required";
        if (formData.description == "") errors.description = "Description is Required";
        if (formData.imageURL == "") errors.imageURL = "Image-URL is Required";

        return errors;
    }

    useEffect(() => {
        window.history.pushState(null, document.title, window.location.href);
        window.addEventListener('popstate', function (event) {
            window.history.pushState(null, document.title, window.location.href);
        })
    }, []);

    // to get data on page load

    useEffect(() => {
        sendRequest();
    }, [counter]);


    const sendRequest = async () => {
        const res = await axios.get(`http://localhost:5000/api/blog/user/${userid}`)
        const data = await res.data.user.blogs;
        setBlogs(data)
    };

    // Delete function

    const deleteRequest = async (id) => {

        var result = window.confirm("Are you sure to delete?");
        if (result) {
            const res = await axios
                .delete(`http://localhost:5000/api/blog/${id}`)

            if (res.data.message == "Successfully Delete") {
                alert("Post deleted")
                setcounter(counter + 1)
            }
        }
    };

    // Edit function

    const Edit = async (id) => {
        setuserId(true)
        setupdateid(id)

        //Edit Button - Populating Data on Input Field

        var selectedData = await blogs.filter((row) => row._id == id)[0]
        await setinputs({
            title: selectedData.title,
            description: selectedData.description,
            imageURL: selectedData.image,
        })
    }

    // to get current date and time

    var d = new Date();
    var utcDate = d.toLocaleString();

    // update funtion

    const update = async (formData) => {
        const res = await axios
            .put(`http://localhost:5000/api/blog/update/${updateid}`, {
                title: formData.title,
                description: formData.description,
                image: formData.imageURL,
                date: utcDate
            })
        if (res) {
            alert("Post updated")
        }
        setuserId(false)
        setcounter(counter + 1)
        setinputs({ title: "", description: "", imageURL: "" })
    }

    return (
        <>
            <section>
                {
                    arraylength && blogs != 0 ? <>

                        {
                            auth.user ? <>

                                <div class="container-fluid">
                                    {
                                        userId ?
                                            <>

                                                {/* Blog Edit card */}

                                                <div class="row mt-4 ">
                                                    <div class="col-lg-5 col-md-5 col-sm-12 text-center mx-auto mb-4 mt-4 mt-lg-4 mt-md-3 mt-sm-3 ">
                                                        <Card >
                                                            <Card.Body>
                                                                <Card.Title>Edit Your Blog</Card.Title>
                                                                <Formik
                                                                    enableReinitialize
                                                                    initialValues={inputs}
                                                                    validate={(formData) => validate(formData)}
                                                                    onSubmit={(formData) => update(formData)}
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

                                                                            {/* Title Input */}

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
                                                                                            as="textarea"
                                                                                            name="description"
                                                                                            onChange={handleChange}
                                                                                            onBlur={handleBlur}
                                                                                            value={values.description}
                                                                                            style={{height:"100px"}}
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

                                                                            {/* Update Button */}

                                                                            <div class="row mt-3">

                                                                                <div class="col-lg-12 col-md-12 col-sm-12 text-center mb-4 mt-3 mt-lg-0 mt-md-0 mt-sm-3  text-lg-center text-md-center text-sm-center">
                                                                                    <button class="btn btn-outline-light" style={{ backgroundColor: "rgb(79, 6, 79)" }} type="submit" disabled={isSubmitting}>
                                                                                        Update
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
                                            </> : <>
                                                {/* my blog card */}

                                                <div class="row  ">
                                                    <div class="col-lg-5 col-md-5 col-sm-12 mb-5 mx-auto mt-3 mt-lg-3 mt-md-3 mt-sm-3">
                                                        {blogs.map((row) => (
                                                            <Card style={{ marginTop: "25px" }}>
                                                                <Card.Body>
                                                                    <Card.Title> {row.title}
                                                                    </Card.Title>
                                                                    <Card.Subtitle style={{ color: "grey" }}> Posted on {row.date}</Card.Subtitle>
                                                                    <img class="mt-2 mb-3" src={row.image}></img>
                                                                    <Card.Text >
                                                                        {row.description}
                                                                    </Card.Text>
                                                                    <img src="editicon.jpg" class="editbtn " onClick={() => Edit(row._id)}></img>  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;
                                                                    <img src="delete.webp" className="deletebtn" onClick={() => deleteRequest(row._id)}></img>
                                                                </Card.Body>
                                                            </Card>
                                                        ))}
                                                    </div>
                                                </div>
                                            </>
                                    }
                                </div>
                            </> : <>{Navigate("/login")}</>
                        }


                    </> : <>
                        <div class="row  ">
                            <div class="col-lg-5 col-md-5 col-sm-12 mb-5 text-center mx-auto mt-3 mt-lg-3 mt-md-3 mt-sm-3">
                                <Card style={{ marginTop: "25px" }}>
                                    <Card.Body>
                                        <Card.Title><h2>Create and Add your post to view it</h2>
                                        </Card.Title>

                                    </Card.Body>
                                </Card>
                            </div>
                        </div>

                    </>
                }

            </section>
        </>
    )
}
