import { Button } from "antd";
import { useContext } from "react";
import { NewHookModal } from "../../components/modals/new-hook-modal/new-hook-modal";
import { UIContext } from "../../utils/contexts";

export const EditorHome: React.FC = () => {
  const { showModal } = useContext(UIContext)!;

  return (
    <>
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
