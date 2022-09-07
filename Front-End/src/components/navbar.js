import React from 'react'
import { useAuth } from "../auth";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router'

export function Navbarr({ children }) {

  const Navigate = useNavigate()

  const ele = useRef()

  const auth = useAuth()
  
  const [user, setUser] = useState("")

// logout function

  const logout = async () => {
    await setUser("")
    await auth.login(user)
    await Navigate("/login")
    await localStorage.removeItem("userid", "")
  }

// className change function 

  const toggle = () => {
    ele.current.className += " navlink"
  }

  // Aunthentication

  if (auth.user) {
    return <div>
      <Navbar sticky="top" className='navbarbg' collapseOnSelect expand="lg" variant="dark">

        <Container>
          <h2>Blog APP</h2>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto" style={{ marginLeft: "32%" }}>
              <Nav.Link className='navlinkblog' ref={ele} style={{ color: "black" }} as={Link} to="/AllBlog">All Blog</Nav.Link> &nbsp;&nbsp;&nbsp;&nbsp;
              <Nav.Link className='navlink' onClick={()=>toggle()} style={{ color: "black" }} as={Link} to="/Myblog">My Blog</Nav.Link> &nbsp;&nbsp;&nbsp;&nbsp;
              <Nav.Link className='navlink' onClick={()=>toggle()} style={{ color: "black" }} as={Link} to="/Addblog">Add Blog</Nav.Link> &nbsp;&nbsp;&nbsp;&nbsp;
            </Nav>
            <Nav>
              <Navbar.Brand></Navbar.Brand>
              <Nav.Link className='navlinkaresume ' style={{ color: "black" }} as={Link} to="/login" onClick={() => logout()}>Log Out</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  }

  else if (!auth.user) {
    return <div>
      <Navbar sticky="top" className='navbarbg' collapseOnSelect expand="lg" variant="dark">
        <Container>
          <h2>Blog APP</h2>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
            </Nav>
            <Nav>
              <Navbar.Brand></Navbar.Brand>
              <Nav.Link className='navlinkaresume ' style={{ color: "black" }} as={Link} to="/login" >Login</Nav.Link> &nbsp;&nbsp;
              <Nav.Link className='navlinkaresume' style={{ color: "black" }} as={Link} to="/signup" >SignUp</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  }
  return children;
}
