import { Form, message, Modal } from "antd";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
<<<<<<< HEAD:src/components/modals/first-profile-modal/first-profile-modal.tsx
import { RiCheckboxCircleLine, RiCloseFill, RiErrorWarningLine } from "react-icons/ri";
import { UIContext, UserContext } from "utils/contexts";
import { ModalType } from "stores/ui-store";
import { NewProfileForm } from "components/forms/new-profile-form/new-profile-form";
import { defaultProfile } from 'lib/config/profile';

=======
import {
  RiCheckboxCircleLine,
  RiCloseFill,
  RiErrorWarningLine,
} from "react-icons/ri";
import { UIContext, UserContext } from "../../utils/contexts";
import { ModalType } from "../../stores/ui-store";
import { NewProfileForm } from "../new-profile-form/new-profile-form";
import { defaultProfile } from "../../lib/config/profile";
>>>>>>> 01e389d0c1b86e467afabb9a8f6e23810734a39d:src/components/new-profile-modal/new-profile-modal.tsx

const modalType: ModalType = "first-profile";

export type FirstProfileModalProps = {};

<<<<<<< HEAD:src/components/modals/first-profile-modal/first-profile-modal.tsx
export const FirstProfileModal: React.FC<FirstProfileModalProps> = observer((props) => {
  const [form] = Form.useForm();
  const { addProfile, fetchingUser } = useContext(UserContext)!;
=======
export const NewProfileModal: React.FC<NewProfileModalProps> = observer(
  (props) => {
    const [form] = Form.useForm();
    const { addProfile } = useContext(UserContext)!;
>>>>>>> 01e389d0c1b86e467afabb9a8f6e23810734a39d:src/components/new-profile-modal/new-profile-modal.tsx

    const { isNewProfileModalVisible, hideModal } = useContext(UIContext)!;

    const modalHeader = (
      <>
        <h2>Create your first profile!</h2>
        <p>
          You have to connect to your wallet address before using the
          application
        </p>
      </>
    );

    const closeIcon = (
      <RiCloseFill
        className="remix-icon da-text-color-black-100 da-text-color-dark-0"
        size={24}
      />
    );

<<<<<<< HEAD:src/components/modals/first-profile-modal/first-profile-modal.tsx
  const onModalSubmit = async (title: string, address: string) => { 
     
    addProfile ({
      ...defaultProfile,
      wallets: [{
        name: title,
        address: address,
        type: "defi"
      }]
    });
=======
    const submit = async (title: string, address: string) => {
      addProfile({
        ...defaultProfile,
        wallets: [
          {
            name: title,
            address: address,
            type: "defi",
          },
        ],
      });
>>>>>>> 01e389d0c1b86e467afabb9a8f6e23810734a39d:src/components/new-profile-modal/new-profile-modal.tsx

      hideModal(modalType);

      message.success({
        content: "Profile saved",
        icon: <RiCheckboxCircleLine className="remix-icon" />,
      });
    };

    const onModalCancel = () => {
      message.warning({
        content:
          "You have to connect to at least one wallet to use the application",
        icon: <RiErrorWarningLine className="remix-icon" />,
      });
    };

<<<<<<< HEAD:src/components/modals/first-profile-modal/first-profile-modal.tsx
  return (
    <Modal
      title={modalHeader}
      destroyOnClose={true}
      width={1000}
      visible={isNewProfileModalVisible}
      onCancel={onModalCancel}
      okText={"Create Profile"}
      closeIcon={closeIcon}
      confirmLoading={fetchingUser}
      onOk={form.submit}
    >
      <NewProfileForm form={form} onSubmit={onModalSubmit} />
    </Modal>
  );
});
=======
    return (
      <Modal
        title={modalHeader}
        destroyOnClose={true}
        width={1000}
        visible={isNewProfileModalVisible}
        onCancel={onModalCancel}
        okText={"Create Profile"}
        closeIcon={closeIcon}
        //confirmLoading={fetchingUser}
        onOk={form.submit}
      >
        <NewProfileForm form={form} onSubmit={submit} />
      </Modal>
    );
  }
);
>>>>>>> 01e389d0c1b86e467afabb9a8f6e23810734a39d:src/components/new-profile-modal/new-profile-modal.tsx
