import { Form, FormInstance, Input } from "antd";
import { useState } from "react";

export type NewWalletFormProps = {
  form: FormInstance;
  onSubmit: (title: string, address: string) => void;
};

export const NewWalletForm: React.FC<NewWalletFormProps> = (props) => {
  const { form, onSubmit } = props;

  const [address, setAddress] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  return (
    <Form 
      form={form} 
      layout="vertical" 
      name="new-profile-form"
      onFinish={() => onSubmit(title, address)}
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[
          {
            required: true,
            message: "Please set a title for your wallet"
          }
        ]}
      >
        <Input
          placeholder="My Metamask wallet"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Item>

      <Form.Item
        label="Address"
        name="address"
        rules={[
          {
            required: true,
            message: "This field is required"
          }
        ]}
      >
        <Input 
          placeholder="0x324DC1696F95D0Db58DcC8DF64C176406C446EAb"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

      </Form.Item>

    </Form>
  )
}