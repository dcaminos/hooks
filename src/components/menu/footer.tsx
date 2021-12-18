import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { Divider, Avatar, Row, Col } from "antd";
import { RiSettings3Line } from "react-icons/ri";

import avatar from "../../assets/images/memoji/memoji-1.png";
import { observer } from "mobx-react-lite";
import { UserContext } from "components/router/contexts";

export type FooterProps = {
  collapsed: boolean;
  onClose: React.MouseEventHandler<HTMLAnchorElement>;
};

export const Footer: React.FC<FooterProps> = observer((props) => {
  const { user } = useContext(UserContext)!;

  return props.collapsed === false ? (
    <Row
      className="da-sidebar-footer da-pb-24 da-px-24 da-bg-color-dark-100"
      align="middle"
      justify="space-between"
      style={{ position: "absolute", bottom: 0, width: "100%" }}
    >
      <Divider className="da-border-color-black-20 da-border-color-dark-70 da-mt-0" />

      <Col>
        <Row align="middle">
          <Avatar size={36} src={avatar} className="da-mr-8" />

          <div>
            <span className="da-d-block da-text-color-black-100 da-text-color-dark-0 da-p1-body">
              {user ? user.email?.substring(0, user.email.indexOf("@")) : ""}
            </span>

            <Link
              to="/profile"
              className="da-badge-text da-text-color-dark-30"
              onClick={props.onClose}
            >
              View Profile
            </Link>
          </div>
        </Row>
      </Col>

      <Col>
        <Link to="/account" onClick={props.onClose}>
          <RiSettings3Line
            className="remix-icon da-text-color-black-100 da-text-color-dark-0"
            size={24}
          />
        </Link>
      </Col>
    </Row>
  ) : (
    <Row
      className="da-sidebar-footer da-pt-16 da-mb-16 da-bg-color-dark-100"
      align="middle"
      justify="center"
    >
      <Col>
        <Link to="/account" onClick={props.onClose}>
          <Avatar size={36} src={avatar} />
        </Link>
      </Col>
    </Row>
  );
});
