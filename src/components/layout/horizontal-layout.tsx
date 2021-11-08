import React, { useState } from "react";

import { Layout, Row, Col } from "antd";
import { HeaderHorizontal } from "../header/header-horizontal";

const { Content } = Layout;

export const HorizontalLayout: React.FC = (props) => {
  const { children } = props;

  const [showMenu, setShowMenu] = useState(false);

  return (
    <Layout className={`da-app-layout da-bg-color-dark-90`}>
      <HeaderHorizontal showMenu={showMenu} setShowMenu={setShowMenu} />

      <Content className="da-content-main">
        <Row justify="center">
          <Col span={24}>{children}</Col>
        </Row>
      </Content>
    </Layout>
  );
};

/*
 <MenuFooter />

            <CustomiseTheme />

            <ScrollTop />
*/
