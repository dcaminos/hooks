import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  notification,
  Row,
  Spin,
} from "antd";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import {
  RiCloseFill,
  RiErrorWarningFill,
  RiFacebookFill,
} from "react-icons/ri";
import { Link, useHistory } from "react-router-dom";
import { AuthLeftContent } from "../../components/auth-left-content/auth-left-content";
import { UserContext } from "../../components/router/contexts";

export const SignIn: React.FC = observer((props) => {
  const { authReady, user, signIn, action } = useContext(UserContext)!;
  const history = useHistory();
  const [email, setEmail] = React.useState<string>("demo@demo.com");
  const [password, setPassword] = React.useState<string>("demo001");
  const [rememberMe, setRememberMe] = React.useState<boolean>(true);

  useEffect(() => {
    if (authReady && user) {
      history.push("/");
    }
  }, [history, authReady, user]);

  const onFinish = async () => {
    try {
      await signIn(email, password, rememberMe);
    } catch (error) {
      notification.open({
        message: "Error",
        description: (error as any).message,
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

  if (!authReady) {
    return (
      <Spin
        style={{ position: "fixed", top: "50%", left: "50%" }}
        spinning={true}
        size="large"
      />
    );
  }

  return (
    <Row gutter={[32, 0]} className="da-authentication-page">
      <AuthLeftContent />

      <Col lg={12} span={24} className="da-py-sm-0 da-py-md-64">
        <Row className="da-h-100" align="middle" justify="center">
          <Col
            xxl={11}
            xl={15}
            lg={20}
            md={20}
            sm={24}
            className="da-px-sm-8 da-pt-24 da-pb-48"
          >
            <h1 className="da-mb-sm-0">Login</h1>
            <p className="da-mt-sm-0 da-mt-8 da-text-color-black-60">
              Welcome back, please login to your account.
            </p>

            <Form
              layout="vertical"
              name="basic"
              initialValues={{ remember: true }}
              className="da-mt-sm-16 da-mt-32"
              onFinish={onFinish}
            >
              <Form.Item
                label="Email:"
                name="email"
                id="email"
                initialValue={"demo@demo.com"}
                className="da-mb-16"
                rules={[
                  { type: "email", validateTrigger: "onSubmit" },
                  {
                    required: true,
                    message: "Please input your email!",
                    validateTrigger: "onSubmit",
                  },
                ]}
              >
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Item>

              <Form.Item
                label="Password:"
                name="password"
                id="password"
                initialValue={"demo001"}
                className="da-mb-8"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                    validateTrigger: "onSubmit",
                  },
                  {
                    min: 5,
                    message: "Password must be minimum 5 characters.",
                    validateTrigger: "onSubmit",
                  },
                  {
                    pattern: new RegExp("(?=.*[0-9])"),
                    message: "Password should include at least one number",
                    validateTrigger: "onSubmit",
                  },
                ]}
              >
                <Input.Password
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Item>

              <Row align="middle" justify="space-between">
                <Form.Item className="da-mb-0">
                  <Checkbox
                    name="remember"
                    checked={rememberMe}
                    onClick={() => setRememberMe(!rememberMe)}
                  >
                    Remember me
                  </Checkbox>
                </Form.Item>

                <Link
                  className="da-button da-text-color-black-80 da-text-color-dark-40"
                  to="/pages/authentication/recover-password"
                >
                  Forgot Password?
                </Link>
              </Row>

              <Form.Item className="da-mt-16 da-mb-8">
                <Button
                  block
                  type="primary"
                  htmlType="submit"
                  loading={action !== undefined}
                >
                  Sign in
                </Button>
              </Form.Item>
            </Form>

            <Col className="da-form-info">
              <span className="da-text-color-black-80 da-text-color-dark-40 da-caption da-mr-4">
                Don’t you have an account?
              </span>

              <Link
                className="da-text-color-primary-1 da-text-color-dark-primary-2 da-caption"
                to="/signup"
              >
                Create an account
              </Link>
            </Col>

            <Col className="da-or-line da-text-center da-mt-32">
              <span className="da-caption da-text-color-black-80 da-text-color-dark-30 da-px-16 da-bg-color-black-0 da-bg-color-dark-100">
                Or
              </span>
            </Col>

            <Col className="da-account-buttons da-mt-32">
              <Button
                block
                icon={
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="remix-icon"
                  >
                    <path
                      d="M3.28826 8.39085L2.82415 10.1235L1.12782 10.1593C0.620865 9.21906 0.333313 8.14325 0.333313 7.00002C0.333313 5.89453 0.602167 4.85202 1.07873 3.93408H1.07909L2.5893 4.21096L3.25086 5.7121C3.1124 6.11578 3.03693 6.54911 3.03693 7.00002C3.03698 7.4894 3.12563 7.95828 3.28826 8.39085Z"
                      fill="#FBBB00"
                    />
                    <path
                      d="M13.5502 5.75455C13.6267 6.15783 13.6667 6.57431 13.6667 6.99996C13.6667 7.47726 13.6165 7.94283 13.5209 8.39192C13.1963 9.92012 12.3483 11.2545 11.1736 12.1989L11.1733 12.1985L9.27108 12.1014L9.00186 10.4208C9.78134 9.96371 10.3905 9.24832 10.7114 8.39192H7.14655V5.75455H10.7634H13.5502Z"
                      fill="#518EF8"
                    />
                    <path
                      d="M11.1732 12.1986L11.1736 12.1989C10.0311 13.1172 8.57981 13.6667 6.99997 13.6667C4.46114 13.6667 2.25382 12.2476 1.12781 10.1594L3.28825 8.39087C3.85124 9.89342 5.3007 10.963 6.99997 10.963C7.73036 10.963 8.41463 10.7656 9.00179 10.4209L11.1732 12.1986Z"
                      fill="#28B446"
                    />
                    <path
                      d="M11.2553 1.86812L9.09558 3.63624C8.4879 3.2564 7.76957 3.03697 6.99999 3.03697C5.26225 3.03697 3.78569 4.15565 3.2509 5.71208L1.0791 3.93406H1.07874C2.18827 1.79486 4.42342 0.333328 6.99999 0.333328C8.61756 0.333328 10.1007 0.909526 11.2553 1.86812Z"
                      fill="#F14336"
                    />
                  </svg>
                }
              >
                Continue with Google account
              </Button>

              <Button
                className="da-mt-16"
                block
                icon={
                  <RiFacebookFill className="remix-icon da-text-color-primary-1" />
                }
              >
                Continue with Facebook account
              </Button>
            </Col>

            <Col className="da-other-links da-mt-24">
              <a
                href="/privacy-policy"
                className="da-text-color-black-80 da-text-color-dark-40"
              >
                Privacy Policy
              </a>
              <a
                href="/terms-of-use"
                className="da-text-color-black-80 da-text-color-dark-40"
              >
                Term of use
              </a>
            </Col>
          </Col>
        </Row>
      </Col>
    </Row>
  );
});
