import { HookList } from "components/hook-list/hook-list";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { UIContext, UserContext } from "utils/contexts";

export const EditorHome: React.FC = observer(() => {
  const { showModal } = useContext(UIContext)!;
  const { userHooks } = useContext(UserContext)!;
  const history = useHistory();

  const headerActions = [
    {
      label: "Create new Hook",
      onClick: () => showModal("new-hook"),
    },
  ];

  const hookActions = [
    {
      label: "Clone",
      onClick: () => {},
    },
    {
      label: "Edit",
      onClick: (hookId: string | undefined) => {
        if (hookId) {
          history.push(`/editor/${hookId}`);
        }
      },
    },
  ];
  return (
    <HookList
      hooks={userHooks}
      headerActions={headerActions}
      hookActions={hookActions}
    />
  );
});
