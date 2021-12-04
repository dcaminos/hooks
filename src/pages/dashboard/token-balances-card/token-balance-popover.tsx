import { Popover, Table } from "antd";
import BigNumber from "bignumber.js";
import { NetworkContext } from "components/router/contexts";
import {
  TokenBalanceFactory,
  TokenBalanceResult,
} from "lib/sdk/token-balance/factory";
import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import "./token-balance-card.less";

export type TokenBalancePopoverProps = {
  data: TokenBalanceResult;
  positionValue: BigNumber;
};

export const TokenBalancePopover: React.FC<TokenBalancePopoverProps> = observer(
  (props) => {
    const { networks } = useContext(NetworkContext)!;
    const { children, data, positionValue } = props;
    const columns = TokenBalanceFactory.getPopoverColumns();
    const popoverData = TokenBalanceFactory.getPopoverData(
      data,
      positionValue,
      networks
    );

    return (
      <Popover
        placement="left"
        overlayClassName="token-balance-popover"
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
  }
);
