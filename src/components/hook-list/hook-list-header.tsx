//import { searchProduct, priceFilter } from '../../../../redux/ecommerce/ecommerceActions';
import { Col, Input, Row, Select, Space, Switch } from "antd";
import { HookIcon } from "components/hook-icon/hook-icon";
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
        <Input
          autoFocus
          placeholder="Search here"
          value={listProps.searchValue}
          onChange={(e) => setListProps({ searchValue: e.target.value })}
        />
      </Col>

      <Col className="da-ecommerce-app-header-select">
        <Select
          defaultValue={listProps.typeValue}
          style={{ width: 160 }}
          onChange={(e) => setListProps({ typeValue: e })}
        >
          <Option value="all">Any Type</Option>
          <Option value="token-balance">
            <Space>
              <HookIcon size={20} type="token-balance" />
              Token Balance
            </Space>
          </Option>
          <Option value="staking">
            <Space>
              <HookIcon size={20} type="staking" />
              Staking
            </Space>
          </Option>
          <Option value="yield-farming">
            <Space>
              <HookIcon size={20} type="yield-farming" />
              Yield Farming
            </Space>
          </Option>
        </Select>
      </Col>

      <Col>
        <Select
          defaultValue={listProps.statusValue}
          style={{ width: 160 }}
          onChange={(e) => setListProps({ statusValue: e })}
        >
          <Option value="all">Any State</Option>
          <Option value="on">
            <Space>
              <Switch size="small" checked={true} />
              Only On
            </Space>
          </Option>
          <Option value="off">
            <Space>
              <Switch size="small" checked={false} />
              Only Off
            </Space>
          </Option>
        </Select>
      </Col>
    </Row>
  );
};
