import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "../../api/axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const submitUser = (e) => {
    e.preventDefault();
    axios.post("auth/register", user).then((res) => {
      if (res.data?.errors?.length > 0) {
        alert(res.data.errors[0].message);
      } else {
        console.log(res.data);
        if (res.data.success) {
          navigate("/login");
        }
      }
    });
  };

  const navigateToLogin = () => {
    navigate("/login");
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
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter name"
            required
            onChange={(e) => updateUser("name", e)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            required
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
            required
            onChange={(e) => updateUser("password", e)}
          />
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
