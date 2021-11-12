import { Button, Modal } from "antd";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { RiCloseFill } from "react-icons/ri";
import { UIContext } from "../../contexts";
import { ModalType } from "../../stores/ui-store";

const modalType: ModalType = "new-profile";
export type NewProfileModalProps = {};

export const NewProfileModal: React.FC<NewProfileModalProps> = observer( (props) => {
  const { isNewProfileModalVisible, hideModal } = useContext(UIContext)!;

  const modalHeader = () => <h1>Create your first profile!</h1>;

  const modalFooter = () => <Button>Save</Button>;

  return (
    <>
      <Modal
        title={modalHeader}
        destroyOnClose={true}
        width={1000}
        visible={isNewProfileModalVisible}
        onCancel={() => hideModal(modalType)}
        footer={modalFooter}
        closeIcon={
          <RiCloseFill
            className="remix-icon da-text-color-black-100 da-text-color-dark-0"
            size={24}
          />
        }>

            HOLA!
        </Modal>
    </>
  );
});
