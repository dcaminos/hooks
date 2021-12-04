import { Button, Card, Col, Radio, Row } from "antd";
import { HookList } from "components/hook-list/hook-list";
import { HookContext, UserContext } from "components/router/contexts";
import { Hook } from "lib/hook";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";

export const HooksTab: React.FC = observer(() => {
  const { hooks } = useContext(HookContext)!;
  const { user, loading, updateUser } = useContext(UserContext)!;

  const [subsFilterChoice, setSubsFilterChoice] = useState("all");
  const [typeFilterChoice, setTypeFilterChoice] = useState("all");


  if (!user) return null;

  const selectedHookIds: string[] = user.profiles[0].hookIds;

  const headerActions = () => <Button>Create new Hook</Button>;

  const selectHook = (hookId: string | undefined) => {
    if (!hookId || loading) return;
    runInAction(() => {
      user.profiles[0].hookIds.push(hookId);
    })
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

  const handleSubsFilterChange = (e: any) => setSubsFilterChoice(e.target.value);

  const handleHookTypeFilterChange = (e: any) => setTypeFilterChoice(e.target.value);

  const FiltersChoices = (
    <Row >
      <Col span={12}>
        <Radio.Group
          buttonStyle="solid"
          size="middle"
          value={subsFilterChoice}
          onChange={handleSubsFilterChange}
          className="da-mb-8"
          >
          <Radio.Button value="all">All</Radio.Button>
          <Radio.Button value="subs">Subscribed</Radio.Button>
          <Radio.Button value="unsubs">Unsubscribed</Radio.Button>
        </Radio.Group>
      </Col>
      <Col span={12}>
        <Row justify="end">
          <Radio.Group 
            size="middle"
            value={typeFilterChoice}
            onChange={handleHookTypeFilterChange}
            className="da-mb-8"
            >
            <Radio.Button value="all">All</Radio.Button>
            <Radio.Button value="balance">Balance</Radio.Button>
            <Radio.Button value="staking">Staking</Radio.Button>
            <Radio.Button value="farming">Farming</Radio.Button>
          </Radio.Group>
        </Row>
      </Col>
    </Row>
  );

  let filteredHooks: Hook[] = [];

  switch (subsFilterChoice) {
    case "all":
      filteredHooks = hooks;
      break;
    case "subs":
      filteredHooks = hooks.filter((hook) => isHookSubscribed(hook.id));
      break;
    case "unsubs":
      filteredHooks = hooks.filter((hook) => !isHookSubscribed(hook.id));
      break;
  }

  switch (typeFilterChoice) {
    case "all":
      break;
    case "balance":
      filteredHooks = filteredHooks.filter((hook => hook.type === "token-balance"));
      break;
    case "staking":
      filteredHooks = filteredHooks.filter((hook => hook.type === "staking"));
      break;
    case "farming":
      filteredHooks = filteredHooks.filter((hook => hook.type === "yield-farming"));
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
