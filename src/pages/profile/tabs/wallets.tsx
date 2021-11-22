import { Card, List, Avatar, Button, Row } from "antd";
import { useContext } from "react";
import { UIContext, UserContext } from "utils/contexts";

import generic from "assets/images/memoji/memoji-1.png";
import { observable, runInAction } from "mobx";
import { observer } from "mobx-react-lite";

export const WalletsTab: React.FC = observer(() => {
  
  const {user, updateUser, loading} = useContext(UserContext)!;

  const {showModal} = useContext(UIContext)!;
  
  if (!user || user.profiles.length === 0) return null;

  const { wallets } = user.profiles[0];

  const editWallet = (index: number) => {
    const newUser = {...user}

    newUser.profiles[0].wallets[index].name = "Metamask";

    updateUser(newUser);
  }

  const deleteWallet = (index: number) => {
    if (loading) return;
    const newUser = {...user}
    newUser.profiles[0].wallets.splice(index,1);
    updateUser(newUser)
  }


  return (
    <Card>
      <h4>Wallets</h4>
      <Row justify="end">
        <Button type="primary" className="da-mr-sm-8 da-mr-16" onClick={() => showModal("new-wallet")}>
          Add new
        </Button>

      </Row>
      <List
        itemLayout="horizontal"
        dataSource={wallets}
        renderItem={(item, index) => (
          <List.Item
            actions={[
              <a onClick={() => editWallet(index)}>edit</a>,
              <a onClick={() => deleteWallet(index)} style={{color:'red'}}>delete</a>,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src={generic} />}
              title={<a href="#">{item.name}</a>}
              description={item.address}
              
            />
          </List.Item>
        )}
      >
      </List>

    </Card>
  )
});
