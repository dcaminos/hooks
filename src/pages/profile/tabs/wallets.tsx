import { Card, List, Avatar, Button, Row, Col } from "antd";
import { useContext } from "react";
import { UIContext, UserContext } from "utils/contexts";

import generic from "assets/images/memoji/memoji-1.png";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

export const WalletsTab: React.FC = observer(() => {
  
  const {user, updateUser, loading} = useContext(UserContext)!;

  const {showModal} = useContext(UIContext)!;
  
  if (!user || user.profiles.length === 0) return null;

  const { wallets } = user.profiles[0];


  const deleteWallet = (index: number) => {
    if (loading) return;
    const newUser = {...user}
    newUser.profiles[0].wallets.splice(index,1);
    updateUser(newUser)
  }


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
              <Link to="#" onClick={() => deleteWallet(index)} >delete</Link>,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src={generic} />}
              title={<b>{item.name}</b>}
              description={item.address}
              
            />
          </List.Item>
        )}
      >
      </List>

    </Card>
  )
});
