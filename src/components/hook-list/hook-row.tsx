import { List, Switch } from "antd";
import { HookIcon } from "components/hook-icon/hook-icon";
import React, { useState } from "react";
import { Hook } from "../../lib/hook";

export type HookRowProps = {
  hook: Hook;
  subscribed: boolean;
  setSubscription: (hookId: string, value: boolean) => Promise<void>;
};

export const HookRow: React.FC<HookRowProps> = (props) => {
  const { hook, subscribed, setSubscription } = props;
  const [loading, setLoading] = useState(false);

  const onChange = async (value: boolean) => {
    setLoading(true);
    await setSubscription(hook.id, value);
    setLoading(false);
  };

  return (
    <List.Item
      className="hook-list-item"
      actions={[
        <Switch checked={subscribed} loading={loading} onChange={onChange} />,
      ]}
    >
      <List.Item.Meta
        avatar={<HookIcon type={hook.type} />}
        title={hook.title}
        style={{ alignItems: "center" }}
      />
    </List.Item>
  );
};
