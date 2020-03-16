import React, { useState, useEffect } from "react";
import { Button, Form } from "semantic-ui-react";

export default function LoginPage() {
  return (
    <div className="formsGroup">
      <Form className="authForms loginForm">
        <Form.Field>
          <label>Email or Username</label>
          <input placeholder="Email or Username" />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input placeholder="Password" />
        </Form.Field>
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
}
