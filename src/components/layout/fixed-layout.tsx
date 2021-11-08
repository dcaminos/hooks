import React from "react";

import { Layout, Row, Col } from "antd";
import { HeaderFixed } from "../header/header-fixed";
//import MenuFooter from "./components/footer";
//import CustomiseTheme from "./components/customise";
//import ScrollTop from "./components/scroll-to-top";

const { Content } = Layout;

export const FixedLayout: React.FC = (props) => {
  const { children } = props;

  return (
    <Layout
      className={`da-app-layout da-bg-color-dark-90`}
      style={{ height: "100vh" }}
    >
      <HeaderFixed />

      <Content className="da-content-main">
        <Row justify="center">
          <Col span={24}>{children}</Col>
        </Row>
      </Content>

      {/*<MenuFooter />*/}

      {/*<CustomiseTheme />*/}

      {/*<ScrollTop />*/}
    </Layout>
  );
};
