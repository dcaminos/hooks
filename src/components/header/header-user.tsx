import { Avatar, Col, Dropdown, Menu } from "antd";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { InfoSquare, Logout, Setting, User } from "react-iconly";
import { Link } from "react-router-dom";
import avatarImg from "../../assets/images/memoji/memoji-1.png";
import { UIContext, UserContext } from "../router/contexts";

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
        <Link to="/profile">Profile</Link>
      </Menu.Item>

      <Menu.Item
        key={1}
        icon={
          <div className="remix-icon da-vertical-align-middle da-text-color-dark-0">
            <InfoSquare set="light" size={16} />
          </div>
        }
        className="da-text-color-dark-0"
      >
        <Link to="/faq">FAQ</Link>
      </Menu.Item>

      <Menu.Item
        key={2}
        icon={
          <div className="remix-icon da-vertical-align-middle da-text-color-dark-0">
            <Setting set="light" size={16} />
          </div>
        }
        className="da-text-color-dark-0"
      >
        <Link to="/account">Account</Link>
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
