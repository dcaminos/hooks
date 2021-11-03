
import { Router } from "./router";
import { ConfigProvider } from 'antd';
import { useContext } from "react";
import { UIContext } from "./stores/ui-store";
import { observer } from "mobx-react-lite";

export const App: React.FC = observer(props => {
  const { direction } = useContext(UIContext)

  return (
    <ConfigProvider direction={direction}>
      <Router />
    </ConfigProvider>
  );
})
