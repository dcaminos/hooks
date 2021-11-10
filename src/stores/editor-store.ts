import { action, observable } from "mobx";
import { Hook } from "../lib/hook";

export class EditorStore {
  @observable tsCode: string = "";
  @observable jsCode: string = "";

  @action
  updateCode = async (tsCode: string) => {
    const hook = new Hook(
      "live",
      "test",
      "binance-smart-chain",
      tsCode,
      this.jsCode
    );

    await hook.compile();
    const hookResponse = await hook.run(
      "0x90EDd5D14d02AC84c71dE67D863274b04022BeC1"
    );
    console.log(hookResponse);
  };

  @action
  test = async (walletAddress: string) => {};
}
