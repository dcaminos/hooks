import React, { useState, createElement, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Layout, Button, Row, Col } from "antd";
import { RiMenuFoldLine, RiMenuUnfoldLine } from "react-icons/ri";

import logoSmall from "../../assets/images/logo/logo-small.svg";

import { Logo } from "./logo";
import { Footer } from "./footer";
//import MenuItem from "./item";
//import MenuMobile from "./mobile";
import { observer } from "mobx-react-lite";
import { UIContext } from "../../stores/ui-store";

const { Sider } = Layout;

export type SidebarProps = {
  visible: boolean;
  setVisible: (value: boolean) => void;
};

export const Sidebar: React.FC<SidebarProps> = observer((props) => {
  const { setVisible } = props;
  const { sidebarCollapsed } = useContext(UIContext);

  const sidebarCollapseButton = true;

  // Collapsed
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    setCollapsed(sidebarCollapsed);
  }, [sidebarCollapsed]);

  // Mobile Sidebar
  const onClose = () => {
    setVisible(false);
  };

  // Menu
  function toggle() {
    setCollapsed(!collapsed);
  }

  const trigger = createElement(collapsed ? RiMenuUnfoldLine : RiMenuFoldLine, {
    className: "trigger",
    onClick: toggle,
  });

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={256}
      className="da-sidebar da-bg-color-black-0 da-bg-color-dark-100"
    >
      <Row
        className="da-mr-12 da-ml-24 da-mt-24"
        align="bottom"
        justify="space-between"
      >
        <Col>{collapsed === false ? <Logo onClose={onClose} /> : ""}</Col>

        {sidebarCollapseButton && (
          <Col className="da-pr-0">
            <Button
              icon={trigger}
              type="text"
              className="da-float-right da-text-color-dark-0"
            ></Button>
          </Col>
        )}

        {collapsed !== false && (
          <Col className="da-mt-8">
            <Link to="/" onClick={onClose}>
              <img className="da-logo" src={logoSmall} alt="logo" />
            </Link>
          </Col>
        )}
      </Row>

      {/*<MenuItem onClose={onClose} />*/}

      <Footer onClose={onClose} collapsed={collapsed} />

      {/*<MenuMobile onClose={onClose} visible={visible} />*/}
    </Sider>
  );
});
