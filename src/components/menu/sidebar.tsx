import React, { useState, createElement, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Layout, Button, Row, Col, Menu } from "antd";
import { RiMenuFoldLine, RiMenuUnfoldLine } from "react-icons/ri";

import logoSmall from "../../assets/images/logo/logo-small.svg";

import { Logo } from "./logo";
import { Footer } from "./footer";
//import MenuItem from "./item";
//import MenuMobile from "./mobile";
import { observer } from "mobx-react-lite";
import { UIContext } from "../router/contexts";
import { Home, Document, User } from "react-iconly";

const { Sider } = Layout;

export type SidebarProps = {
  visible: boolean;
  setVisible: (value: boolean) => void;
};

export const Sidebar: React.FC<SidebarProps> = observer((props) => {
  const { setVisible } = props;
  const { sidebarCollapsed, theme } = useContext(UIContext)!;

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
      style={{ minHeight: "100vh" }}
    >
      <Row
        className="da-mr-8 da-mb-8 da-ml-24 da-mt-24"
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

      <Menu mode="inline" theme={theme === "light" ? "light" : "dark"}>
        <Menu.Item key={1} icon={<Home />} onClick={() => {}}>
          <Link to={"/"}>Dashboard</Link>
        </Menu.Item>

        <Menu.Item key={2} icon={<Document />} onClick={() => {}}>
          <Link to={"/editor"}>Editor</Link>
        </Menu.Item>

        <Menu.Item key={3} icon={<User />} onClick={() => {}}>
          <Link to={"/profile"}>Profile</Link>
        </Menu.Item>
      </Menu>

      {/*<MenuItem onClose={onClose} />*/}

      <Footer onClose={onClose} collapsed={collapsed} />

      {/*<MenuMobile onClose={onClose} visible={visible} />*/}
    </Sider>
  );
});
