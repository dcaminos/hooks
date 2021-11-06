import React, { useState } from "react";

import { Layout, Row, Col } from "antd";

import { Sidebar } from "../menu/sidebar";
//import { Header } from "./header/header";
//import { MenuFooter } from "./footer";
//import { CustomiseTheme } from "./customise";
//import { ScrollTop } from "./scroll-to-top";
import { Header } from "../header/header";

const { Content } = Layout;

export const VerticalLayout: React.FC = (props) => {
  const { children } = props;
  const [visible, setVisible] = useState(false);

  return (
    <Layout className="da-app-layout">
      <Sidebar visible={visible} setVisible={setVisible} />

      <Layout className="da-bg-color-dark-90">
        <Header setVisible={setVisible} />

        <Content className="da-content-main">
          <Row justify="center">
            <Col span={24}>{children}</Col>
          </Row>
        </Content>

        {/*<MenuFooter />*/}
      </Layout>

      {/*<CustomiseTheme />*/}

      {/*<ScrollTop />*/}
    </Layout>
  );
};
