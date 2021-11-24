import { Button, Modal } from "antd";
import growthImageDark from "assets/images/illustrations/growth-dark.svg";
import growthImage from "assets/images/illustrations/growth.svg";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { FiShare } from "react-icons/fi";
import { ModalType } from "stores/ui-store";
import { EditorContext, UIContext } from "utils/contexts";
const modalType: ModalType = "publish-hook";

export const PublishHookModal: React.FC = observer((props) => {
  const { theme, isPublishHookModalVisible, showModal, hideModal } =
    useContext(UIContext)!;
  const { publish, action } = useContext(EditorContext)!;

  const publishHook = async () => {
    await publish();
    hideModal("publish-hook");
    showModal("publish-hook-success");
  };

  return (
    <Modal
      width={416}
      visible={isPublishHookModalVisible}
      onCancel={() => hideModal(modalType)}
      footer={false}
      closable={false}
      className="popup-modal"
    >
      <div className="da-text-center">
        <img
          src={theme === "light" ? growthImage : growthImageDark}
          alt="Publish"
        />
        <h3 className="da-text-color-dark-bg">Make it public!</h3>
        <p className="da-p2-body da-text-color-danger-1">
          You can publish new versions in the future but the title, network and
          tokens cannot be changed.
        </p>
        <Button
          block
          className="da-mt-16"
          type="primary"
          icon={<FiShare className="remix-icon" />}
          onClick={publishHook}
          loading={action === "publishing"}
        >
          Publish Hook
        </Button>
      </div>
    </Modal>
  );
});
