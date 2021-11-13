import { Avatar, Col, Dropdown, Menu } from "antd";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import {
  Calendar,
  Discount,
  InfoSquare,
  Logout,
  People,
  User,
} from "react-iconly";
import { Link } from "react-router-dom";
import avatarImg from "../../assets/images/memoji/memoji-1.png";
import { UIContext, UserContext } from "../../utils/contexts";

export const HeaderUser: React.FC = observer((props) => {
  const { theme } = useContext(UIContext)!;
  const { signOut } = useContext(UserContext)!;

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
        onClick={signOut}
      >
        Logout
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
