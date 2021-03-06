import { async } from "@firebase/util";
import { sendEmailVerification } from "firebase/auth";
import React, { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import {
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../../firebase.init";
import useToken from "../../../hooks/useToken";
import Loading from "../../Loading/Loading";

const Register = () => {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const nameRef = useRef("");
  const [agree, setAgree] = useState(false);
  const navigate = useNavigate();
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const [updateProfile, updating, updateError] = useUpdateProfile(auth);

  const handleRegisterSubmit = (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const name = nameRef.current.value;
    createUserWithEmailAndPassword(email, password);
    updateProfile({ displayName: name });
  };

  const [token] = useToken(user);
  let errorElement = "";
  if (error) {
    errorElement = (
      <div>
        <p className="text-danger">Error: {error.message}</p>
      </div>
    );
  }

  if (loading) {
    return <Loading></Loading>;
  }

  if (user) {
    console.log(user);

    navigate("/home");
  }
  return (
    <div className="container w-50 mx-auto border border-1 shadow mt-3 p-5">
      <h2 className="text-primary text-center">Please Register</h2>
      <Form onSubmit={handleRegisterSubmit}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            ref={nameRef}
            type="text"
            placeholder="Enter Your Name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            ref={emailRef}
            type="email"
            placeholder="Enter email"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            ref={passwordRef}
            type="password"
            placeholder="Password"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            onClick={() => setAgree(!agree)}
            type="checkbox"
            label="Accept terms and conditions"
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={!agree}>
          Register
        </Button>
        {errorElement}
      </Form>
      <p className="mt-3">
        Already Registered?{" "}
        <span className="text-primary">
          <Link to="/login" style={{ textDecoration: "none" }}>
            Please Login
          </Link>
        </span>
      </p>
    </div>
  );
};

export default Register;
