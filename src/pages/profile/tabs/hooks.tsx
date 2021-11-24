import { Button, Card } from "antd";
import { HookList } from "components/hook-list/hook-list";
import { Hook } from "lib/hook";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { HookContext, UserContext } from "utils/contexts";



export const HooksTab: React.FC = observer(() => {

  const { hooks, fetchHooks } = useContext(HookContext)!;
  const { user, loading, updateUser } = useContext(UserContext)!;

  if (!user) return null;
  
  const selectedHookIds: string[] = user.hookIds;

  if (hooks.length === 0) fetchHooks();

  const headerActions = () => (
    <Button>
      Create new Hook
    </Button>
  )

  const selectHook = (hookId: string | undefined) => {
    if (!hookId || loading) return
    user.hookIds.push(hookId);
    updateUser(user);
  }

  const unSelectHook = (hookId: string | undefined) => {
    if (!hookId || loading) return

    
    user.hookIds = user.hookIds.filter( id => id !== hookId);

    updateUser(user);

  }

  const hookActions = (hook: Hook) => {
    if ( isHookSelected(hook.id) ) {
      return (
        <Button type="primary" block onClick={() => unSelectHook(hook.id)}>
          Unsubscribe
        </Button>
      )
    } else {
      return (
        <Button type="default" block onClick={() => selectHook(hook.id)}>
          Subscribe
        </Button>
      )
    }
      
  }

  const isHookSelected: (hookId: string) => boolean = (hookId: string) => {
    return selectedHookIds.some( id => id === hookId );
  }

  return (
    <Card>
      <h3>Hooks</h3>
      <p>Select you preferred hooks</p>
      <HookList
        hooks={hooks}
        renderHeaderActions={headerActions}
        renderHookActions={hookActions}
        loading={loading}
      />
    </Card>
  );
});
