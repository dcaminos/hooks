import { Button, Col, Form, Input, notification, Row } from "antd";
import { ValidateStatus } from "antd/lib/form/FormItem";
import React, { SyntheticEvent, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { AuthLeftContent } from "../../components/auth-left-content/auth-left-content";

import { useContext } from "react";
import { RiCloseFill, RiErrorWarningFill } from "react-icons/ri";
import { UserContext } from "../../contexts";

export type FormItemState = {
  value: string;
  isValid: ValidateStatus;
  help: string;
};

export type SignUpFormState = {
  email: FormItemState;
  password: FormItemState;
  password2: FormItemState;
};

export const SingUp: React.FC = (props) => {
  const userStore = useContext(UserContext)!;

  const [redirect, setRedirect] = useState(false);

  const [formState, setFormState] = React.useState<SignUpFormState>({
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

  const handleSubmit = async (e: SyntheticEvent) => {
    // validate email

    const EMAIL_REGEX =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!EMAIL_REGEX.test(formState.email.value)) {
      setFormState({
        ...formState,
        email: {
          value: formState.email.value,
          isValid: "error",
          help: "Enter a valid email",
        },
      });
      return;
    }

    // validate password

    const PWD_REGEX =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{10,100}$/;

    if (!PWD_REGEX.test(formState.password.value)) {
      setFormState({
        ...formState,
        password: {
          value: formState.password.value,
          isValid: "error",
          help: "Password is not valid. Use at least 10 characters from numbers, letters and special symbols [!@#$%^&*]",
        },
      });
      return;
    }

    // check for password confirmation

    if (formState.password.value !== formState.password2.value) {
      setFormState({
        ...formState,
        password2: {
          value: formState.password2.value,
          isValid: "error",
          help: "Passwords doesn't match",
        },
      });
      return;
    }

    // submit user creation request

    let result = await userStore.signUpUser(
      formState.email.value,
      formState.password.value
    );

    if (result.success) {
      setRedirect(true);
    } else {
      notification.open({
        message: "Error",
        description: result.error,
        icon: <RiErrorWarningFill style={{ color: "#FF0022" }} />,
        closeIcon: (
          <RiCloseFill
            className="remix-icon da-text-color-black-80 da-text-color-dark-30"
            size={24}
          />
        ),
      });
    }
  };

  return (
    <Row gutter={[32, 0]} className="da-authentication-page">
      {redirect ? <Redirect to="/" /> : null}

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
                label="E-mail:"
                validateStatus={formState.email.isValid}
                help={formState.email.help}
                hasFeedback={formState.email.help !== ""}
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
                help={formState.password.help}
                hasFeedback={formState.password.help !== ""}
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
                help={formState.password2.help}
                hasFeedback={formState.password2.help !== ""}
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
                to="/signin"
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
