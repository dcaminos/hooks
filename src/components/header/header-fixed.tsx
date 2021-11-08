import React, { useRef, useState } from "react";

import { Layout, Button, Row, Col } from "antd";
import { RiCloseLine } from "react-icons/ri";
import { Search } from "react-iconly";

import { HeaderSearch } from "./header-search";
import { HeaderUser } from "./header-user";
import { HeaderNotifications } from "./header-notifications";

import { Logo } from "../menu/logo";

const { Header } = Layout;

export const HeaderFixed: React.FC = (props) => {
  const [searchHeader, setSearchHeader] = useState(false);
  const [searchActive, setSearchActive] = useState(false);

  // Header Class
  /*const [headerClass, setHeaderClass] = useState<string>()

  useEffect(() => {
    if (navigationFull) {
      setHeaderClass(" da-header-full");
    } else if (navigationBg) {
      setHeaderClass(" da-header-bg");
    } else {
      setHeaderClass("");
    }
  }, [navigationFull, navigationBg])*/

  // Focus
  const inputFocusRef = useRef(null);
  const inputFocusProp = {
    ref: inputFocusRef,
  };

  // Search Active
  setTimeout(() => setSearchActive(searchHeader), 100);

  const searchClick = () => {
    setSearchHeader(true);

    setTimeout(() => {
      if (inputFocusRef !== null && inputFocusRef.current !== null) {
        (inputFocusRef.current as any).focus({
          cursor: "start",
        });
      }
    }, 200);
  };

  // Children
  const headerChildren = () => {
    return (
      <Row
        className="da-w-100 da-position-relative"
        align="middle"
        justify="space-between"
      >
        <Col>
          <Logo onClose={() => {}} />
        </Col>

        <Col
          flex="1"
          style={{ display: !searchHeader ? "none" : "block" }}
          className={`da-pl-md-0 da-pr-md-0 da-pl-32 da-pr-16 da-header-search ${
            searchActive && "da-header-search-active"
          }`}
        >
          <HeaderSearch
            inputFocusProp={inputFocusProp}
            setSearchHeader={setSearchHeader}
          />
        </Col>

        <Col>
          <Row align="middle">
            <Col className="da-d-flex-center da-mr-4">
              {!searchHeader ? (
                <Button
                  type="text"
                  icon={
                    <div className="da-text-color-black-60">
                      <Search set="light" />
                    </div>
                  }
                  onClick={() => searchClick()}
                />
              ) : (
                <Button
                  type="text"
                  icon={
                    <RiCloseLine size={24} className="da-text-color-black-60" />
                  }
                  onClick={() => setSearchHeader(false)}
                />
              )}
            </Col>

            <HeaderNotifications />

            <HeaderUser />
          </Row>
        </Col>
      </Row>
    );
  };

  return (
    <Header className={"da-header-horizontal"}>
      <Row justify="center" className="da-w-100">
        <Col span={24}>{headerChildren()}</Col>
      </Row>
    </Header>
  );
};
