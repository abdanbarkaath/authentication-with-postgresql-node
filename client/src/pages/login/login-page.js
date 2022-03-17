import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { basePath } from "../../ui.config";

export default function LoginPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const submitUser = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(`${basePath}/auth/login`, user);
      if (response.data) {
        localStorage.setItem("auth", response.data.token);
        navigate("/");
      }
    } catch (err) {
      alert(err);
    }
  };

  const navigateToSignup = () => {
    navigate("/signup");
  };

  const updateUser = (type, event) => {
    event.preventDefault();
    setUser((prev) => {
      return { ...prev, [type]: event.target.value };
    });
  };

  return (
    <S.FormContainer>
      <Form onSubmit={submitUser}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => updateUser("email", e)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => updateUser("password", e)}
          />
        </Form.Group>
        <S.LoginText onClick={navigateToSignup}>
          {" "}
          New User? Signup Here
        </S.LoginText>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </S.FormContainer>
  );
}

const S = {
  FormContainer: styled.div`
    display: flex;
    justify-content: center;
    @media screen(max-width:1000px) {
      display: block;
    }
  `,
  LoginText: styled.div`
    margin-block: 1rem;
    font-weight: 500;
    &:hover {
      color: blue;
      text-decoration: underline;
      cursor: pointer;
    }
  `,
};
