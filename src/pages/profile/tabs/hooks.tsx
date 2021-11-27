import { Button, Card, Radio } from "antd";
import { HookList } from "components/hook-list/hook-list";
import { HookContext, UserContext } from "components/router/contexts";
import { Hook } from "lib/hook";
import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";

export const HooksTab: React.FC = observer(() => {
  const { hooks, fetchHooks } = useContext(HookContext)!;
  const { user, loading, updateUser } = useContext(UserContext)!;

  const [filterChoice, setFilterChoice] = useState("all");

  if (!user) return null;

  const selectedHookIds: string[] = user.profiles[0].hookIds;

  if (hooks.length === 0) fetchHooks();

  const headerActions = () => <Button>Create new Hook</Button>;

  const selectHook = (hookId: string | undefined) => {
    if (!hookId || loading) return;
    user.profiles[0].hookIds.push(hookId);
    updateUser(user);
  };

  const unSelectHook = (hookId: string | undefined) => {
    if (!hookId || loading) return;
    user.profiles[0].hookIds = user.profiles[0].hookIds.filter(
      (id) => id !== hookId
    );
    updateUser(user);
  };

  const hookActions = (hook: Hook) => {
    if (isHookSubscribed(hook.id)) {
      return (
        <Button type="default" block onClick={() => unSelectHook(hook.id)}>
          Unsubscribe
        </Button>
      );
    } else {
      return (
        <Button type="primary" block onClick={() => selectHook(hook.id)}>
          Subscribe
        </Button>
      );
    }
  };

  const isHookSubscribed: (hookId: string) => boolean = (hookId: string) => {
    return selectedHookIds.some((id) => id === hookId);
  };

  const handleFilterChange = (e: any) => setFilterChoice(e.target.value);

  const FiltersChoices = (
    <Radio.Group
      size="middle"
      value={filterChoice}
      onChange={handleFilterChange}
      className="da-mb-8"
    >
      <Radio.Button value="all">All</Radio.Button>
      <Radio.Button value="subs">Subscribed</Radio.Button>
      <Radio.Button value="unsubs">Unsubscribed</Radio.Button>
    </Radio.Group>
  );

  let filteredHooks: Hook[] = [];

  switch (filterChoice) {
    case "all":
      filteredHooks = hooks;
      break;
    case "subs":
      filteredHooks = hooks.filter((hook) => !isHookSubscribed(hook.id));
      break;
    case "unsubs":
      filteredHooks = hooks.filter((hook) => isHookSubscribed(hook.id));
      break;
  }

  return (
    <Card>
      <h3>Hooks</h3>
      <p>Select you preferred hooks</p>
      <HookList
        hooks={filteredHooks}
        renderHeaderActions={headerActions}
        renderHookActions={hookActions}
        loading={loading}
        afterHeaderRender={FiltersChoices}
      />
    </Card>
  );
});
