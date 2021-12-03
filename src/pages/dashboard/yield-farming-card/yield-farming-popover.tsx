import { Popover, Table } from "antd";
import BigNumber from "bignumber.js";
import {
  YieldFarmingFactory,
  YieldFarmingResult,
} from "lib/sdk/yield-farming/factory";
import React from "react";
import "./yield-farming-card.less";

export type YieldFarmingPopoverProps = {
  data: YieldFarmingResult;
  positionValue: BigNumber;
};

export const YieldFarmingPopover: React.FC<YieldFarmingPopoverProps> = (
  props
) => {
  const { children, data, positionValue } = props;

  const columns = YieldFarmingFactory.getPopoverColumns();
  const popoverData = YieldFarmingFactory.getPopoverData(data, positionValue);

  return (
    <Popover
      placement="left"
      overlayClassName="yield-farming-popover"
      content={
        <Table
          showHeader={false}
          columns={columns}
          dataSource={popoverData}
          pagination={false}
        />
      }
      trigger="click"
    >
      {children}
    </Popover>
  );
};
