import { Button } from "antd";
import { HookList } from "components/hook-list/hook-list";
import { Hook } from "lib/hook";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { UIContext, UserContext } from "utils/contexts";

export const EditorHome: React.FC = observer(() => {
  const { showModal } = useContext(UIContext)!;
  const { userHooks } = useContext(UserContext)!;
  const history = useHistory();

  const openModal = () => showModal("new-hook");

  const headerActions = () => (
    <Button onClick={openModal}>
      Create new Hook
    </Button>
  )
  
  const redirectToEditHook = (hookId: string) => {
    if (hookId) {
      history.push(`/editor/${hookId}`);
    }
  }

  const hookActions = (hook: Hook) => (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Button type="primary" className="da-ml-8" >Clone</Button>
      <Button type="primary" className="da-ml-8" onClick={ () => redirectToEditHook(hook.id)}>Edit</Button>
    </div>
  )

  return (
    <HookList
      hooks={userHooks}
      renderHeaderActions={headerActions}
      renderHookActions={hookActions}
    />
  ); 
});
