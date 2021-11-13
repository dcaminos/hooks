import { Spin } from "antd";
import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { UserContext } from "../../utils/contexts";

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

  return <>{children}</>;
});
