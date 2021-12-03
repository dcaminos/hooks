import { Popover, Table } from "antd";
import BigNumber from "bignumber.js";
import { StakingFactory, StakingResult } from "lib/sdk/staking/factory";
import React from "react";
import "./staking-card.less";

export type StakingPopoverProps = {
  data: StakingResult;
  positionValue: BigNumber;
};

export const StakingPopover: React.FC<StakingPopoverProps> = (props) => {
  const { children, data, positionValue } = props;
  const columns = StakingFactory.getPopoverColumns();
  const popoverData = StakingFactory.getPopoverData(data, positionValue);

  return (
    <Popover
      placement="left"
      overlayClassName="staking-popover"
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
