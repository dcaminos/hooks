import React from "react";

import { Drawer } from "antd";
import { RiCloseFill } from "react-icons/ri";

import { Logo } from "./logo";
import { Footer } from "./footer";
import { observer } from "mobx-react-lite";

export type MobileProps = {
  visible: boolean;
  onClose: () => void;
};

export const Mobile: React.FC<MobileProps> = observer((props) => {
  const { onClose, visible } = props;

  return (
    <Drawer
      title={<Logo onClose={onClose} />}
      className="da-mobile-sidebar"
      placement="left"
      closable={true}
      onClose={onClose}
      visible={visible}
      closeIcon={
        <RiCloseFill className="remix-icon da-text-color-black-80" size={24} />
      }
    >
      {/*<MenuItem onClose={onClose} />*/}

      <Footer onClose={onClose} collapsed={false} />
    </Drawer>
  );
});
