import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { HookList } from "../../components/hook-list/hook-list";
import { NewHookModal } from "../../components/new-hook-modal/new-hook-modal";
import { Hook } from "../../lib/hook";
import { HookContext, UIContext, UserContext } from "../../utils/contexts";

export const EditorHome: React.FC = () => {
  const { showModal } = useContext(UIContext)!;
  const { user } = useContext(UserContext)!;
  const { hooks } = useContext(HookContext)!;
  const history = useHistory();
  const [userHooks, setUserHooks] = useState<Hook[]>([]);

  useEffect(() => {
    const hookIds = user?.createdHookIds;
    if (hookIds === undefined || hookIds.length === 0) {
      setUserHooks([]);
      return;
    }

    setUserHooks(hooks.filter((h) => hookIds.includes(h.id)));
  }, [hooks, user?.createdHookIds]);

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
    <>
      <NewHookModal />
      <HookList
        hooks={userHooks}
        headerActions={headerActions}
        hookActions={hookActions}
      />
    </>
  );
};
