import { Button } from "antd";
import { useContext } from "react";
import { NewHookModal } from "../../components/new-hook-modal/new-hook-modal";
import { UIContext } from "../../contexts";

export const EditorHome: React.FC = () => {
  const { showModal } = useContext(UIContext)!;

  return (
    <>
      <NewHookModal />
      <Button
        className="da-mb-16 da-mr-16"
        type="primary"
        ghost
        onClick={() => showModal("new-hook")}
      >
        Create new Hook
      </Button>
    </>
  );
};