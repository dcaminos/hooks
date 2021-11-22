import { Form, message, Modal } from "antd";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { RiCheckboxCircleLine, RiCloseFill, RiErrorWarningLine } from "react-icons/ri";
import { UIContext, UserContext } from "utils/contexts";
import { ModalType } from "stores/ui-store";
import { NewProfileForm } from "components/forms/new-profile-form/new-profile-form";
import { defaultProfile } from 'lib/config/profile';


const modalType: ModalType = "first-profile";

export type FirstProfileModalProps = {};

export const FirstProfileModal: React.FC<FirstProfileModalProps> = observer((props) => {
  const [form] = Form.useForm();
  const { addProfile, fetchingUser } = useContext(UserContext)!;

  const { isNewProfileModalVisible, hideModal } = useContext(UIContext)!;

  const modalHeader = (
    <>
      <h2>Create your first profile!</h2>
      <p>You have to connect to your wallet address before using the application</p>
    </>
  );

  const closeIcon = (
    <RiCloseFill
      className="remix-icon da-text-color-black-100 da-text-color-dark-0"
      size={24}
    />
  );

  const onModalSubmit = async (title: string, address: string) => { 
     
    addProfile ({
      ...defaultProfile,
      wallets: [{
        name: title,
        address: address,
        type: "defi"
      }]
    });

    hideModal(modalType);

    message.success({
      content: "Profile saved",
      icon: <RiCheckboxCircleLine className="remix-icon" />,
    });
  };

  const onModalCancel = () => {
    message.warning({
      content: "You have to connect to at least one wallet to use the application",
      icon: <RiErrorWarningLine className="remix-icon" />,
    });
  }

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
