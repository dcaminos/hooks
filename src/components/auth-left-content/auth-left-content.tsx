import React from "react";

import { Row, Col } from "antd";

import bg from "../../assets/images/pages/authentication/authentication-bg.svg";
import bgDark from "../../assets/images/pages/authentication/authentication-bg-dark.svg";
import logo from "../../assets/images/logo/logo-vector-blue.svg";
import logoDark from "../../assets/images/logo/logo-vector.svg";
import { useContext } from "react";
import { UIContext } from "../router/contexts";

export const AuthLeftContent: React.FC = (props) => {
  const { theme } = useContext(UIContext)!;

  return (
    <Col
      lg={12}
      span={24}
      className="da-bg-color-primary-4 da-bg-color-dark-90 da-position-relative"
    >
      <Row className="da-image-row da-h-100 da-px-sm-8 da-px-md-16 da-pb-sm-32 da-pt-md-96 da-pt-md-32">
        <Col className="da-logo-item da-m-sm-16 da-m-md-32 da-m-64">
          <img src={theme === "light" ? logo : logoDark} alt="Logo" />
        </Col>

        <Col span={24}>
          <Row align="middle" justify="center" className="da-h-100">
            <Col
              md={20}
              span={24}
              className="da-bg-item da-text-center da-mb-md-32"
            >
              <img src={theme === "light" ? bg : bgDark} alt="Background" />
            </Col>

            <Col xl={18} span={24} className="da-text-item da-text-center">
              <h2 className="da-text-color-primary-1 da-text-color-dark-0 da-mx-lg-16 da-mb-16">
                Your main dashboard for all DEFI world
              </h2>

              <p className="da-mb-0 da-text-color-black-80 da-text-color-dark-30">
              Subscribe to any smart contract and bring all your data. No mathers what network!<br/>
              If the contract is not in our platform, you can develop your own HOOK in our online editor.
              </p>
            </Col>
          </Row>
        </Col>
      </Row>
    </Col>
  );
};
