import { Button, Col, Modal, notification, Row, Space } from "antd";
import Charts from "assets/images/pages/knowledgebase/analyse.png";
import Callcenter from "assets/images/pages/knowledgebase/contact.png";
import Logistic from "assets/images/pages/knowledgebase/location.png";
import Mailing from "assets/images/pages/knowledgebase/newsletter.png";
import Finance from "assets/images/pages/knowledgebase/save-money.png";
import Seo from "assets/images/pages/knowledgebase/seo.png";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { RiCloseFill, RiErrorWarningFill } from "react-icons/ri";
import { ModalType } from "stores/ui-store";
import { UIContext } from "components/router/contexts";

const modalType: ModalType = "new-hook";

export const NewHookModal: React.FC = observer((props) => {
  const { isNewHookModalVisible, showModal, hideModal } =
    useContext(UIContext)!;

  const options = [
    {
      title: "Token Balcance",
      description: "Get the balance of a custom token in one o more networks",
      image: Finance,
      onSelect: () => {
        hideModal(modalType);
        showModal("new-token-balance");
      },
    },
    {
      title: "Staking",
      description: "Read the rewards and staked amount from a smart contract",
      image: Logistic,
      onSelect: () => {
        hideModal(modalType);
        showModal("new-staking");
      },
    },
    {
      title: "Yield Farming",
      description: "Read the current position from a farming smart contract",
      image: Charts,
      onSelect: () => {
        hideModal(modalType);
        showModal("new-yield-farming");
      },
    },
    {
      title: "Leveraged Yield Farming",
      description:
        "Get the rewards, stake amount and lending status for a leverage farming",
      image: Seo,
      onSelect: () => {
        notification.open({
          message: "Coming soon!",
          description:
            "Leveraged Yield Farming hooks are not implemented yet...",
          icon: <RiErrorWarningFill style={{ color: "#1BE7FF" }} />,
          closeIcon: (
            <RiCloseFill
              className="remix-icon da-text-color-black-80"
              size={24}
            />
          ),
        });
      },
    },
    {
      title: "Yield Agreggator",
      description: "Get the balance of a custom token in one o more networks",
      image: Callcenter,
      onSelect: () => {
        notification.open({
          message: "Coming soon!",
          description: "Yield Agreggator hooks are not implemented yet...",
          icon: <RiErrorWarningFill style={{ color: "#1BE7FF" }} />,
          closeIcon: (
            <RiCloseFill
              className="remix-icon da-text-color-black-80"
              size={24}
            />
          ),
        });
      },
    },
    {
      title: "Lending Protocol",
      description:
        "Get the colareal, borrowed and liquidation limit from a protocol ",
      image: Mailing,
      onSelect: () => {
        notification.open({
          message: "Coming soon!",
          description: "Lending Protocol hooks are not implemented yet...",
          icon: <RiErrorWarningFill style={{ color: "#1BE7FF" }} />,
          closeIcon: (
            <RiCloseFill
              className="remix-icon da-text-color-black-80"
              size={24}
            />
          ),
        });
      },
    },
  ];

  return (
    <Modal
      destroyOnClose={true}
      width={1000}
      visible={isNewHookModalVisible}
      onCancel={() => hideModal(modalType)}
      footer={null}
    >
      <h4 className="da-text-center da-mb-32">
        What kind of Hook do you want to create?
      </h4>
      <Row gutter={[32, 32]}>
        {options.map((option) => {
          return (
            <Col key={`option-${option.title}`} xl={8} md={12} xs={24}>
              <Button
                type="default"
                className="da-text-center"
                onClick={option.onSelect}
              >
                <Space direction="vertical">
                  <img src={option.image} alt={option.title} />
                  <h4>{option.title}</h4>
                  <p className="da-p1-body da-mb-0">{option.description}</p>
                </Space>
              </Button>
            </Col>
          );
        })}
      </Row>
    </Modal>
  );
});
