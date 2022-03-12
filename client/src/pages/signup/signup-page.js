import React from "react";
import { Form, Button, Container } from "react-bootstrap";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const navigate = useNavigate();

  const submitUser = (e) => {
    e.preventDefault();
    console.log("submit user");
  };

  const navigateToLogin = () => {
    navigate("/login");
  };

  return (
    <S.FormContainer>
      <Form onSubmit={submitUser}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="email" placeholder="Enter name" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <S.LoginText onClick={navigateToLogin}>
          {" "}
          Already Registered? Login Here
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
