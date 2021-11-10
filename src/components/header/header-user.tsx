import { Link } from "react-router-dom";

import { Menu, Dropdown, Col, Avatar } from "antd";
import {
  User,
  People,
  InfoSquare,
  Calendar,
  Discount,
  Logout,
} from "react-iconly";

import avatarImg from "../../assets/images/memoji/memoji-1.png";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { UIContext } from "../..";

export const HeaderUser: React.FC = observer((props) => {
  const { theme } = useContext(UIContext);

  const menu = (
    <Menu theme={theme === "light" ? "light" : "dark"}>
      <Menu.Item
        key={0}
        icon={
          <div className="remix-icon da-vertical-align-middle da-text-color-dark-0">
            <User set="light" size={16} />
          </div>
        }
        className="da-text-color-dark-0"
      >
        <Link to="/pages/profile/personel-information">Profile</Link>
      </Menu.Item>

      <Menu.Item
        key={1}
        icon={
          <div className="remix-icon da-vertical-align-middle da-text-color-dark-0">
            <People set="light" size={16} />
          </div>
        }
        className="da-text-color-dark-0"
      >
        <Link to="/apps/contact">Contact</Link>
      </Menu.Item>

      <Menu.Item
        key={2}
        icon={
          <div className="remix-icon da-vertical-align-middle da-text-color-dark-0">
            <Calendar set="light" size={16} />
          </div>
        }
        className="da-text-color-dark-0"
      >
        <Link to="/apps/calendar">Calendar</Link>
      </Menu.Item>

      <Menu.Item
        key={3}
        icon={
          <div className="remix-icon da-vertical-align-middle da-text-color-dark-0">
            <Discount set="light" size={16} />
          </div>
        }
        className="da-text-color-dark-0"
      >
        <Link to="/pages/pricing">Pricing</Link>
      </Menu.Item>

      <Menu.Item
        key={4}
        icon={
          <div className="remix-icon da-vertical-align-middle da-text-color-dark-0">
            <InfoSquare set="light" size={16} />
          </div>
        }
        className="da-text-color-dark-0"
      >
        <Link to="/pages/faq">FAQ</Link>
      </Menu.Item>

      <Menu.Item
        key={5}
        icon={
          <div className="remix-icon da-vertical-align-middle da-text-color-dark-0">
            <Logout set="light" size={16} />
          </div>
        }
        className="da-text-color-dark-0"
      >
        <Link to="/pages/authentication/login">Logout</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <Col>
      <Dropdown overlay={menu} placement="bottomLeft">
        <Col className="da-d-flex-center" onClick={(e) => e.preventDefault()}>
          <Avatar src={avatarImg} size={40} />
        </Col>
      </Dropdown>
    </Col>
  );
});
