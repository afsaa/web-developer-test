import React from "react";
import { Container, Button, Form, FormGroup, Input } from "reactstrap";

const LoginForm = props => {
  return (
    <Container>
      <Form className="my-3 p-4 border">
        <FormGroup>
          <Input
            type="email"
            name="email"
            id="formEmail"
            placeholder="your-email@something.com"
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="password"
            name="password"
            id="formPass"
            placeholder="Password"
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
