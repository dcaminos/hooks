import { Avatar, Badge, Col, Menu } from "antd";
import avatar from "assets/images/memoji/memoji-1.png";
import menuImg from "assets/images/pages/profile/menu-img.svg";
import React, { useContext } from "react";
import { Password, User } from "react-iconly";
import { Link, useLocation } from "react-router-dom";
import { UIContext } from "components/router/contexts";

export const MenuProfile = (props: any) => {
  //const menuIconClass: string = "remix-icon da-mr-8";

  const customise = useContext(UIContext)!;

  function menuFooterItem() {
    if (props.footer !== "none") {
      return (
        <div className="da-profile-menu-footer">
          <img src={menuImg} alt="Profile" />
        </div>
      );
    }
  }

  function moreBtn() {
    if (props.moreBtnCheck !== "none") {
      return (
        <Col className="da-menu-header-btn da-pr-16 da-mb-12 da-text-right">
          {props.moreBtn()}
        </Col>
      );
    }
  }

  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");

  return (
    <Col flex="240px" className="da-profile-menu da-py-24">
      <div className="da-w-100">
        <div className="da-profile-menu-header da-mt-md-16 da-text-center">
          {moreBtn()}

          <Badge count={12}>
            <Avatar size={80} src={avatar} />
          </Badge>

          <h3 className="da-mt-24 da-mb-4">Dolores Bianca</h3>
          <a href="mailto:dolores@yoda.com" className="da-p1-body">
            dolores@yoda.com
          </a>
        </div>

        <Menu
          mode="inline"
          className="da-w-100 da-profile-menu-body"
          theme={customise.theme === "light" ? "light" : "dark"}
        >
          <Menu.Item
            key="1"
            icon={<User set="bold" /* className={menuIconClass} */ />}
            className={`
              da-mb-16 da-pl-24 da-pr-32
              ${
                splitLocation[splitLocation.length - 1] ===
                "personel-information"
                  ? "ant-menu-item-selected"
                  : "ant-menu-item-selected-in-active"
              }
            `}
            onClick={props.onCloseDrawer}
          >
            <Link to="/account">Personal Information</Link>
          </Menu.Item>

          <Menu.Item
            key="5"
            icon={<Password set="bold" /* className={menuIconClass} */ />}
            className={`
              da-mb-16 da-pl-24 da-pr-32
              ${
                splitLocation[splitLocation.length - 1] === "password-change"
                  ? "ant-menu-item-selected"
                  : "ant-menu-item-selected-in-active"
              }
            `}
            onClick={props.onCloseDrawer}
          >
            <Link to="/account/password-change">Password Change</Link>
          </Menu.Item>
        </Menu>
      </div>

      {menuFooterItem()}
    </Col>
  );
};
