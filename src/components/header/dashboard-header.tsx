import React, { useContext, useRef, useState } from "react";


import { Layout, Button, Row, Col, Input } from "antd";
import { RiCloseLine, RiMenuFill } from "react-icons/ri";
import { Search } from "react-iconly";

import { HeaderSearch } from './header-search'
import { HeaderUser } from "./header-user";
import { HeaderNotifications } from "./header-notifications";
import { HeaderText } from "./header-text";
import { observer } from "mobx-react-lite";
import { UIContext } from "../../stores/ui-store";

export type DashboardHeaderProps = {
  setVisible: (value: boolean) => void
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = observer(props => {
  const { setVisible } = props;
  const { contentWidth } = useContext(UIContext)

  const [searchHeader, setSearchHeader] = useState(false);
  const [searchActive, setSearchActive] = useState(false);

  // Focus
  const inputFocusRef = useRef(null);
  const inputFocusProp : { ref: React.LegacyRef<Input> | undefined} = {
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
        <Col className="da-mobile-sidebar-button da-mr-24">
          <Button
            className="da-mobile-sidebar-button"
            type="text"
            onClick={showDrawer}
            icon={
              <RiMenuFill
                size={24}
                className="remix-icon da-text-color-black-80 da-text-color-dark-30"
              />
            }
          />
        </Col>

        <Col
          flex="1"
          style={{ display: !searchHeader ? 'none' : 'block' }}
          className={`da-pr-md-0 da-pr-16 da-header-search ${searchActive && "da-header-search-active"}`}
        >
          <HeaderSearch inputFocusProp={inputFocusProp} setSearchHeader={setSearchHeader} />
        </Col>

        {!searchHeader && (
          <HeaderText />
        )}

        <Col>
          <Row align="middle">
            <Col className="da-d-flex-center da-mr-4">
              {!searchHeader ? (
                <Button
                  type="text"
                  icon={
                    <div className="da-text-color-black-60">
                      <Search set="light"/>
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
    <Layout.Header>
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
    </Layout.Header>
  );
});