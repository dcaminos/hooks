//import { searchProduct, priceFilter } from '../../../../redux/ecommerce/ecommerceActions';
import { Col, Input, Row, Select } from "antd";
import React from "react";
import { HookListInternalProps } from "./hook-list";

const { Option } = Select;
export type HookListHeaderProps = {
  listProps: HookListInternalProps;
  setListProps: (value: Partial<HookListInternalProps>) => void;
};

export const HookListHeader: React.FC<HookListHeaderProps> = (props) => {
  const { listProps, setListProps } = props;

  return (
    <Row gutter={[16, 16]} className="da-ecommerce-app-header da-mb-32">
      <Col flex="1 0 0" className="da-ecommerce-app-header-search">
        <p>Name</p>
        <Input
          placeholder="Search here"
          value={listProps.searchValue}
          onChange={(e) => setListProps({ searchValue: e.target.value })}
        />
      </Col>

      <Col className="da-ecommerce-app-header-select">
        <p>Type</p>
        <Select
          defaultValue={listProps.typeValue}
          style={{ width: 150 }}
          onChange={(e) => setListProps({ typeValue: e })}
        >
          <Option value="all">All Types</Option>
          <Option value="token-balance">Token Balance</Option>
          <Option value="staking">Staking</Option>
          <Option value="yield-farming">Yield Farming</Option>
        </Select>
      </Col>

      <Col>
        <p>Status</p>
        <Select
          defaultValue={listProps.statusValue}
          style={{ width: 150 }}
          onChange={(e) => setListProps({ statusValue: e })}
        >
          <Option value="all">All</Option>
          <Option value="subscribed">Subscribed</Option>
          <Option value="unsubscribed">Unsubscribed</Option>
        </Select>
      </Col>

      <Col>
        <p>Sort by</p>
        <Select
          defaultValue={listProps.sortValue}
          style={{ width: 150 }}
          onChange={(e) => setListProps({ sortValue: e })}
        >
          <Option value="alpha">Alphabetically</Option>
          <Option value="network">By Network</Option>
          <Option value="lastUpdated">Last updated</Option>
          <Option value="newer">Newer</Option>
          <Option value="older">Older</Option>
        </Select>
      </Col>
    </Row>
  );
};
