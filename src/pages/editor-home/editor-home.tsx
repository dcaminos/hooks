import { Button } from "antd";
import { HookList } from "components/hook-list/hook-list";
import { UIContext, UserContext } from "components/router/contexts";
import { observer } from "mobx-react-lite";
import { useContext } from "react";

export const EditorHome: React.FC = observer(() => {
  const { showModal } = useContext(UIContext)!;
  const { userHooks } = useContext(UserContext)!;

  const openModal = () => showModal("new-hook");

  return (
    <>
      <Button onClick={openModal}>Create new Hook</Button>
      <HookList hooks={userHooks} page={"editor"} />
    </>
  );
});
