import { Button } from "antd";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { RiArrowLeftLine, RiSave3Line } from "react-icons/ri";
import { NetworkTag } from "../../components/network-tag/network-tag";
import { TokenTag } from "../../components/token-tag/token-tag";
import { networks } from "../../lib/config/networks";
import { tokens } from "../../lib/config/tokens";
import { Hook } from "../../lib/hook";
import { EditorContext } from "../../utils/contexts";
import "./editor-ide.css";

export type HookTitleProps = {
  hook: Hook;
};

export const HookTitle: React.FC<HookTitleProps> = (props) => {
  const { hook } = props;
  const network = networks.find((n) => n.id === hook.networkId);
  const tokenTags = hook.tokenIds
    .map((tid) => tokens.find((t) => t.id === tid))
    .map((t) => t && <TokenTag token={t} />);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <h4 className="da-mb-0 da-mr-16">{hook.title}</h4>
      {network && <NetworkTag network={network} />}
      {tokenTags}
    </div>
  );
};

export const IdeTopBar: React.FC = observer((props) => {
  //const { theme } = useContext(UIContext)!;
  const { currentHook, code, savingChanges, saveChanges } =
    useContext(EditorContext)!;
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 60,
        width: "calc(100vw - 60px)",
        height: 60,
        borderBottom: "1px solid #dfe6e9",
        display: "flex",
        padding: 16,
        alignItems: "center",
      }}
    >
      <Button
        icon={<RiArrowLeftLine className="trigger" />}
        type="text"
        className="da-text-color-dark-0"
        onClick={() => {}}
      ></Button>
      <div style={{ flexGrow: 1 }}>
        {currentHook && <HookTitle hook={currentHook} />}
      </div>
      <Button
        type="primary"
        size="small"
        className="da-mr-8"
        onClick={() => {}}
      >
        <i className="ri-edit-fill" />
      </Button>
      <Button
        type="primary"
        size="small"
        icon={<RiSave3Line className="remix-icon" />}
        disabled={currentHook?.code === code}
        loading={savingChanges}
        onClick={saveChanges}
      >
        Save Changes
      </Button>
    </div>
  );
});
