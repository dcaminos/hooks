import { Avatar, Button, Card, Col, List, Row } from "antd";
import generic from "assets/images/memoji/memoji-1.png";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { UIContext, UserContext } from "utils/contexts";

export const WalletsTab: React.FC = observer(() => {
  const { user, updateUser, loading } = useContext(UserContext)!;

  const { showModal } = useContext(UIContext)!;

  if (!user || user.profiles.length === 0) return null;

  const { wallets } = user.profiles[0];

  const editWallet = (index: number) => {
    const newUser = { ...user };

    newUser.profiles[0].wallets[index].name = "Metamask";

    updateUser(newUser);
  };

  const deleteWallet = (index: number) => {
    if (loading) return;
    const newUser = { ...user };
    newUser.profiles[0].wallets.splice(index, 1);
    updateUser(newUser);
  };

  return (
    <Card>
      <Row justify="end">
        <Col span={12}>
          <h4>Wallets</h4>
        </Col>
        <Col span={12} >
          <Row justify="end">

            <Button type="primary" size="small" className="da-mr-sm-8 da-mr-16" onClick={() => showModal("new-wallet")}>
              Add new
            </Button>
          </Row>
        </Col>
      </Row>
      <List
        itemLayout="horizontal"
        dataSource={wallets}
        renderItem={(item, index) => (
          <List.Item
            actions={[
              <div
                onClick={() => editWallet(index)}
                style={{ color: "primary" }}
              >
                edit
              </div>,
              <div onClick={() => deleteWallet(index)} style={{ color: "red" }}>
                delete
              </div>,

            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src={generic} />}
              title={item.name}

              description={item.address}
            />
          </List.Item>
        )}
      ></List>
    </Card>
  );
});
