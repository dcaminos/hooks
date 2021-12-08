import React from "react";
import { FaCompactDisc } from "react-icons/fa";
import { GiDoubled } from "react-icons/gi";
import { MdDonutSmall } from "react-icons/md";
import { HookType } from "../../lib/hook";

export type HookIconProps = {
  type: HookType;
  size?: number;
};

export const HookIcon: React.FC<HookIconProps> = (props) => {
  const { type, size = 30 } = props;

  //lending IoGitCompare
  // leverage farming MdCompare
  // yield agregator MdFlipCameraAndroid

  let Icon = MdDonutSmall;
  switch (type) {
    case "token-balance":
      Icon = MdDonutSmall;
      break;
    case "staking":
      Icon = FaCompactDisc;
      break;
    case "yield-farming":
      Icon = GiDoubled;
      break;
    default:
      break;
  }

  return (
    <Icon
      style={{ display: "flex" }}
      size={size}
      className="da-text-color-primary-1"
    />
  );
};
