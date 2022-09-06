import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import Card from 'react-bootstrap/Card'
import "../index.css"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth";


export function AllBlog() {

  const Navigate = useNavigate()

  // array to store datas

  const [blogs, setBlogs] = useState([]);

  var revarray = [...blogs].reverse();

  const auth = useAuth()

  // to disable browser back button function

  useEffect(() => {
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener('popstate', function (event) {
      window.history.pushState(null, document.title, window.location.href);
    })
  }, []);

  // to get all blogs on page load

  useEffect(() => {
    sendRequest();
  }, []);

  // on submit function

  const sendRequest = async () => {
    const res = await axios.get("http://localhost:5000/api/blog")
    const data = await res.data;
    setBlogs(data.blogs)
  };

  return (
    <>
      <section>
        {
          auth.user ? <>
            <div class="container-fluid">
              <div class="row mt-3  ">
                <div class="col-lg-5 col-md-5 col-sm-12  mx-auto mb-5 mt-1 mt-lg-1 mt-md-3 mt-sm-3  ">
                  {revarray.map((row) => (
                    <Card style={{ marginTop: "25px" }}>
                      <Card.Body>
                        <Card.Title> {row.title} </Card.Title>
                        <Card.Subtitle style={{ color: "grey" }}>Posted on {row.date}</Card.Subtitle>
                        <img class="mt-2 mb-4" src={row.image}></img>
                        <Card.Text >
                          {row.description}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </> : <> {Navigate("/login")}</>
        }
      </section>
    </>
  )
}
