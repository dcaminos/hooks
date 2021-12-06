import { Button, Card } from "antd";
import { HookList } from "components/hook-list/hook-list";
import {
  HookContext,
  UIContext,
  UserContext,
} from "components/router/contexts";
import { observer } from "mobx-react-lite";
import { useContext } from "react";

export const HooksCard: React.FC = observer(() => {
  const { hooks } = useContext(HookContext)!;
  const { showModal } = useContext(UIContext)!;
  const { user, action } = useContext(UserContext)!;

  if (!user) return null;

  return (
    <Card
      className="da-border-color-black-40"
      headStyle={{ borderBottom: 0 }}
      title={<h4 className="da-m-0">Hooks</h4>}
      extra={
        <Button
          className="da-mt-8"
          type="primary"
          onClick={() => showModal("new-hook")}
        >
          Create new Hook
        </Button>
      }
    >
      <HookList hooks={hooks} loading={action === "fetchUser"} />
    </Card>
  );
});
