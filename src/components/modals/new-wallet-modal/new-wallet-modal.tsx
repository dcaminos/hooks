import { Form, Modal } from "antd";
import { NewWalletForm } from "components/forms/new-wallet-form/new-wallet-form";
import { UserWallet } from "lib/user";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { RiCloseFill } from "react-icons/ri";
import { ModalType } from "stores/ui-store";
import { UIContext, UserContext } from "components/router/contexts";

const modalType: ModalType = "new-wallet";

export const NewWalletModal: React.FC = observer((props) => {
  const [form] = Form.useForm();

  const { addWalletToDefaultProfile, action } = useContext(UserContext)!;

  const { isNewWalletModalVisible, hideModal } = useContext(UIContext)!;

  const modalHeader = (
    <>
      <h2>Add wallet</h2>
      <p>Insert your wallet data here</p>
    </>
  );

  const closeIcon = (
    <RiCloseFill
      className="remix-icon da-text-color-black-100 da-text-color-dark-0"
      size={24}
    />
  );

  const onModalCancel = () => {
    hideModal(modalType);
  };

  const onModalSubmit = async (title: string, address: string) => {
    const wallet: UserWallet = {
      name: title,
      address,
      type: "defi",
    };
    await addWalletToDefaultProfile(wallet);
    form.resetFields();
    hideModal(modalType);
  };

  return (
    <Modal
      title={modalHeader}
      destroyOnClose={true}
      width={1000}
      visible={isNewWalletModalVisible}
      onCancel={onModalCancel}
      okText={"Add wallet"}
      closeIcon={closeIcon}
      confirmLoading={action !== undefined}
      onOk={form.submit}
    >
      <NewWalletForm form={form} onSubmit={onModalSubmit} />
    </Modal>
  );
});
