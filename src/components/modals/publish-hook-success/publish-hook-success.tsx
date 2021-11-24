import { Button, Modal, Result } from "antd";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { RiCheckboxCircleFill } from "react-icons/ri";
import { useHistory } from "react-router";
import { ModalType } from "stores/ui-store";
import { UIContext } from "utils/contexts";

const modalType: ModalType = "publish-hook-success";

export const PublishHookSuccessModal: React.FC = observer((props) => {
  const { isPublishHookSuccessModalVisible, hideModal } =
    useContext(UIContext)!;
  const history = useHistory();

  return (
    <Modal
      width={600}
      visible={isPublishHookSuccessModalVisible}
      onCancel={() => hideModal(modalType)}
      footer={false}
      closable={false}
      className="popup-modal"
    >
      <Result
        className="da-pt-8"
        status="success"
        title={
          <>
            <h3>Hook successfully published!</h3>
            <h5>
              You are subscribed to this hook now.
              <br />
              Go to the dashboard to see it in action.
            </h5>
          </>
        }
        icon={<RiCheckboxCircleFill className="remix-icon" />}
        extra={
          <>
            <Button
              type="primary"
              onClick={() => {
                hideModal(modalType);
                history.push("/");
              }}
            >
              Go to Dashboard
            </Button>

            <Button
              className="da-ml-8"
              ghost
              onClick={() => hideModal(modalType)}
            >
              Keep editing
            </Button>
          </>
        }
      />
    </Modal>
  );
});
