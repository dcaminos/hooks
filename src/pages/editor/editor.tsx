
import { Button } from "antd";
import { HookList } from "components/hook-list/hook-list";
import { UIContext, UserContext } from "components/router/contexts";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Col, Row } from "antd";


export const EditorPage: React.FC = observer(() => {
  const { showModal } = useContext(UIContext)!;
  const { userHooks } = useContext(UserContext)!;

  const openModal = () => showModal("new-hook");
  
  return (
    <Row gutter={[32, 32]} className="da-mb-32">
      <Col span={24}>
        <h1>Editor</h1>
        <Button onClick={openModal}>Create new Hook</Button>
        <HookList hooks={userHooks} page={"editor"} />
      </Col>
      <Col span={24}>
        
      </Col>
    </Row>
  );
});



