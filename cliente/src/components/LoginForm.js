import React from "react";
import { Container, Button, Form, FormGroup, Input } from "reactstrap";

const LoginForm = props => {
  return (
    <Container>
      <Form
        className="my-3 p-3 border"
        onSubmit={e => props.handleLoginFormSubmit(e)}
      >
        <FormGroup>
          <Input
            type="email"
            name="email"
            id="formEmail"
            placeholder="tu-correo@something.com"
            onChange={e => props.handleChange(e)}
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="password"
            name="password"
            id="formPass"
            placeholder="Password"
            onChange={e => props.handleChange(e)}
          />
        </FormGroup>
        <Button color="success" block>
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default LoginForm;
