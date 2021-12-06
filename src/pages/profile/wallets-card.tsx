import { Button, Card, List } from "antd";
import { UIContext, UserContext } from "components/router/contexts";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { RiWallet3Fill } from "react-icons/ri";
import { Link } from "react-router-dom";

export const WalletsCard: React.FC = observer(() => {
  const { user, updateUser, action } = useContext(UserContext)!;

  const { showModal } = useContext(UIContext)!;

  if (!user || user.profiles.length === 0) return null;

  const { wallets } = user.profiles[0];

  const deleteWallet = (index: number) => {
    if (action !== undefined) return;
    const newUser = { ...user };
    newUser.profiles[0].wallets.splice(index, 1);
    updateUser(newUser);
  };

  return (
    <Card
      className="da-border-color-black-40"
      headStyle={{ borderBottom: 0 }}
      title={<h4 className="da-m-0">Wallets</h4>}
      extra={
        <Button
          className="da-mt-8"
          type="primary"
          onClick={() => showModal("new-wallet")}
        >
          Add Wallet
        </Button>
      }
    >
      <List
        itemLayout="horizontal"
        dataSource={wallets}
        renderItem={(item, index) => (
          <List.Item
            actions={[
              <Link
                to="#"
                onClick={() => deleteWallet(index)}
                style={{ color: "#FF0022", fontSize: 20 }}
              >
                <i className="ri-delete-bin-6-line" />
              </Link>,
            ]}
          >
            <List.Item.Meta
              avatar={
                <RiWallet3Fill size={30} className="da-text-color-primary-1" />
              }
              title={item.name}
              description={item.address}
            />
          </List.Item>
        )}
      ></List>
    </Card>
  );
});
