import { Spin } from "antd";
import { NewHookModal } from "components/modals/new-hook-modal/new-hook-modal";
import { FirstProfileModal } from "components/modals/first-profile-modal/first-profile-modal";
import { NewWalletModal } from "components/modals/new-wallet-modal/new-wallet-modal";
import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { UserContext } from "./contexts";
import { PublishHookModal } from "components/modals/publish-hook-modal/publish-hook-modal";
import { PublishHookSuccessModal } from "components/modals/publish-hook-success/publish-hook-success";
import { NewTokenBalanceModal } from "components/modals/new-token-balance-modal/new-token-balance-modal";
import { NewStakingModal } from "components/modals/new-staking-modal/new-staking-modal";

export const PrivatePage: React.FC = observer((props) => {
  const { children } = props;
  const { authReady, user } = useContext(UserContext)!;
  const [loading, setLoading] = useState<boolean>(true);
  const history = useHistory();

  useEffect(() => {
    if (authReady) {
      if (!user) {
        history.push("signin");
      }
      setLoading(false);
    }
  }, [authReady, user, history]);

  if (loading) {
    return (
      <Spin
        style={{ position: "fixed", top: "50%", left: "50%" }}
        spinning={true}
        size="large"
      />
    );
  }

  return (
    <>
      <FirstProfileModal />
      <NewHookModal />
      <NewTokenBalanceModal />
      <NewStakingModal />
      <NewWalletModal />
      <PublishHookModal />
      <PublishHookSuccessModal />
      {children}
    </>
  );
});
