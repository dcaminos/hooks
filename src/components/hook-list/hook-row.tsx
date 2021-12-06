import { List, Switch } from "antd";
import React, { useState } from "react";
import { FaCompactDisc } from "react-icons/fa";
import { GiDoubled } from "react-icons/gi";
import { MdDonutSmall } from "react-icons/md";
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

  //lending IoGitCompare
  // leverage farming MdCompare
  // yield agregator MdFlipCameraAndroid

  let Icon = MdDonutSmall;
  let description = "";
  switch (hook.type) {
    case "token-balance":
      Icon = MdDonutSmall;
      description = "Token Balance";
      break;
    case "staking":
      Icon = FaCompactDisc;
      description = "Staking";
      break;
    case "yield-farming":
      Icon = GiDoubled;
      description = "Yield Farming";
      break;
    default:
      break;
  }

  return (
    <List.Item
      actions={[
        <Switch checked={subscribed} loading={loading} onChange={onChange} />,
      ]}
    >
      <List.Item.Meta
        //avatar={<Avatar src={stakingImage} />}
        avatar={<Icon size={30} className="da-text-color-primary-1" />}
        title={hook.title}
        description={description}
      />
    </List.Item>
  );
};
