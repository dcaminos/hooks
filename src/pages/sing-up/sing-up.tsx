import { Button, Col, Form, Input, Row } from "antd";
import { ValidateStatus } from "antd/lib/form/FormItem";
import React from "react";
import { Link } from "react-router-dom";
import { AuthLeftContent } from "../../components/auth-left-content/auth-left-content";

export type FormItemState = {
  value: string;
  isValid: ValidateStatus;
  help: string;
};

export type SignUpFormState = {
  username: FormItemState;
  email: FormItemState;
  password: FormItemState;
  password2: FormItemState;
};

export const SingUp: React.FC = (props) => {
  const [formState, setFormState] = React.useState<SignUpFormState>({
    username: {
      value: "",
      isValid: "validating",
      help: "",
    },
    email: {
      value: "",
      isValid: "validating",
      help: "",
    },
    password: {
      value: "",
      isValid: "validating",
      help: "",
    },
    password2: {
      value: "",
      isValid: "validating",
      help: "",
    },
  });

  function handleInput(e: any) {
    setFormState({
      ...formState,
      [e.target.name]: {
        value: e?.target.value,
        isValid: "validating",
        help: "",
      },
    });
  }

  function handleSubmit(e: any) {
    // validate username
    let username = formState.username.value;
    let isValid = true;
    let error = "";

    if (username === "") {
      isValid = false;
      error = "Choose your <b>username</b>";
    }

    if (username.length < 6) {
      isValid = false;
      error = "Name too short, try something longer";
    }

    // TODO: add some regex test to validate username

    setFormState({
      ...formState,
      username: {
        value: formState.username.value,
        isValid: isValid ? "success" : "error",
        help: error,
      },
    });
  }

  return (
    <Row gutter={[32, 0]} className="da-authentication-page">
      <AuthLeftContent />

      <Col md={12}>
        <Row className="da-h-100" align="middle" justify="center">
          <Col
            xxl={11}
            xl={15}
            lg={20}
            md={20}
            sm={24}
            className="da-px-sm-8 da-pt-24 da-pb-48"
          >
            <h1>Create Account</h1>
            <p className="da-mt-8 da-text-color-black-60">
              Please sign up to your personal account if you want to use all our
              premium products.
            </p>

            <Form
              layout="vertical"
              name="basic"
              className="da-mt-sm-16 da-mt-32"
            >
              <Form.Item
                label="Username:"
                validateStatus={formState.username.isValid}
                help={formState.username.help}
                hasFeedback={formState.username.isValid !== "validating"}
              >
                <Input
                  id="username"
                  name="username"
                  value={formState.username.value}
                  onChange={handleInput}
                />
              </Form.Item>

              <Form.Item
                label="E-mail:"
                validateStatus={formState.email.isValid}
              >
                <Input
                  id="email"
                  name="email"
                  value={formState.email.value}
                  onChange={handleInput}
                />
              </Form.Item>

              <Form.Item
                label="Password:"
                validateStatus={formState.password.isValid}
              >
                <Input.Password
                  id="password"
                  name="password"
                  value={formState.password.value}
                  onChange={handleInput}
                />
              </Form.Item>

              <Form.Item
                label="Confirm Password:"
                validateStatus={formState.password2.isValid}
              >
                <Input.Password
                  id="password2"
                  name="password2"
                  value={formState.password2.value}
                  onChange={handleInput}
                />
              </Form.Item>

              <Form.Item className="da-mt-16 da-mb-8">
                <Button
                  block
                  type="primary"
                  htmlType="submit"
                  onClick={handleSubmit}
                >
                  Sign up
                </Button>
              </Form.Item>
            </Form>

            <div className="da-form-info">
              <span className="da-text-color-black-80 da-text-color-dark-40 da-caption da-mr-4">
                Already have an account?
              </span>

              <Link
                to="/pages/authentication/login"
                className="da-text-color-primary-1 da-text-color-dark-primary-2 da-caption"
              >
                Login
              </Link>
            </div>

            <div className="da-other-links da-mt-24">
              {
                // TODO: add privacy policy page
                /*
                <a href="#" className="da-text-color-black-80 da-text-color-dark-40">
                  Privacy Policy
                </a>
                */
              }
              {
                // TODO: add privacy policy page
                /*
                <a href="#" className="da-text-color-black-80 da-text-color-dark-40">
                  Term of use
                </a>
                */
              }
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
