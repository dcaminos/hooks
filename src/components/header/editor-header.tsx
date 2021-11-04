import React, { useContext, useEffect, useRef, useState } from "react";

import { Layout, Button, Row, Col } from "antd";
import { RiCloseLine, RiMenuFill } from "react-icons/ri";
import { Search } from "react-iconly";

import { HeaderSearch } from './header-search'
import { HeaderUser } from "./header-user";
import { HeaderNotifications } from "./header-notifications";
import { observer } from "mobx-react-lite";
import { UIContext } from "../../stores/ui-store";

import { Logo } from "../menu/logo";
import { Mobile } from "../menu/mobile";

const { Header } = Layout;

export type EditorHeaderProps = {
  visible: boolean
  setVisible: (value: boolean) => void
}

export const EditorHeader: React.FC<EditorHeaderProps> = observer(props => {
  const { visible, setVisible } = props;
  const { contentWidth, navigationBg, navigationFull } = useContext(UIContext)
  
  const [searchHeader, setSearchHeader] = useState(false);
  const [searchActive, setSearchActive] = useState(false);


  // Header Class
  const [headerClass, setHeaderClass] = useState<string>()

  useEffect(() => {
    if (navigationFull) {
      setHeaderClass(" da-header-full");
    } else if (navigationBg) {
      setHeaderClass(" da-header-bg");
    } else {
      setHeaderClass("");
    }
  }, [navigationFull, navigationBg])

  // Mobile Sidebar
  const onClose = () => {
    setVisible(false);
  };

  // Focus
  const inputFocusRef = useRef(null);
  const inputFocusProp = {
    ref: inputFocusRef,
  };

  // Search Active
  setTimeout(() => setSearchActive(searchHeader), 100);

  const searchClick = () => {
    setSearchHeader(true)

    setTimeout(() => {
      if(inputFocusRef !== null && inputFocusRef.current !== null) {
        (inputFocusRef.current as any).focus({
          cursor: 'start',
        });
      }
    }, 200);
  }

  // Mobile Sidebar
  const showDrawer = () => {
    setVisible(true);
    setSearchHeader(false);
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

          <Col className="da-mobile-sidebar-button">
            <Button
              className="da-mobile-sidebar-button"
              type="text"
              onClick={showDrawer}
              icon={
                <RiMenuFill
                  size={24}
                  className="remix-icon da-text-color-black-80"
                />
              }
            />
          </Col>
        </Col>


        <Col
          flex="1"
          style={{ display: !searchHeader ? 'none' : 'block' }}
          className={`da-pl-md-0 da-pr-md-0 da-pl-32 da-pr-16 da-header-search ${searchActive && "da-header-search-active"}`}
        >
          <HeaderSearch inputFocusProp={inputFocusProp} setSearchHeader={setSearchHeader} />
        </Col>

        <Col>
          <Row align="middle">
            <Col className="da-d-flex-center da-mr-4">
              {!searchHeader ? (
                <Button
                  type="text"
                  icon={
                    <div className="da-text-color-black-60">
                    <Search
                      set="light"
                    />
                    </div>
                  }
                  onClick={() => searchClick()}
                />
              ) : (
                <Button
                  type="text"
                  icon={
                    <RiCloseLine
                      size={24}
                      className="da-text-color-black-60"
                    />
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
    )
  }

  return (
    <Header
      className={'da-header-horizontal' + headerClass}
    >
      <Row justify="center" className="da-w-100">
        {
          contentWidth === "full" && (
            <Col span={24}>
              {headerChildren()}
            </Col>
          )
        }

        {
          contentWidth === "boxed" && (
            <Col xxl={20} xl={22} span={24}>
              {headerChildren()}
            </Col>
          )
        }
      </Row>

      <Mobile onClose={onClose} visible={visible} />
    </Header>
  );
});