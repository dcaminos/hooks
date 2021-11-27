import { Console } from "console-feed";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { EditorContext, UIContext } from "../../../components/router/contexts";

export const ConsoleTab: React.FC = observer((props) => {
  const { logs } = useContext(EditorContext)!;
  const { theme } = useContext(UIContext)!;

  return (
    <div
      style={{
        position: "absolute",

        top: 38,
        left: 0,
        right: 0,
        bottom: 0,
        overflowY: "scroll",
        backgroundColor: theme === "dark" ? "#242424" : "white",
      }}
    >
      <Console
        logs={logs}
        variant={theme}
        styles={
          theme === "dark"
            ? {
                BASE_LINE_HEIGHT: 1.2,
                BASE_FONT_FAMILY: "menlo, monospace",
                BASE_FONT_SIZE: "11px",
                LOG_ICON_WIDTH: 11,
                LOG_ICON_HEIGHT: 12,
              }
            : {
                BASE_LINE_HEIGHT: 1.2,
                BASE_FONT_FAMILY: "menlo, monospace",
                BASE_FONT_SIZE: "11px",
                LOG_ICON_WIDTH: 11,
                LOG_ICON_HEIGHT: 12,
                // Light mode override since the variant doesn't seem to do anything
                LOG_COLOR: "rgba(0,0,0,0.9)",
                LOG_BORDER: "rgb(240, 240, 240)",
                LOG_WARN_BACKGROUND: "hsl(50deg 100% 95%)",
                LOG_WARN_BORDER: "hsl(50deg 100% 88%)",
                LOG_WARN_COLOR: "hsl(39deg 100% 18%)",
                LOG_ERROR_BACKGROUND: "hsl(0deg 100% 97%)",
                LOG_ERROR_BORDER: "rgb(0deg 100% 92%)",
                LOG_ERROR_COLOR: "#f00",
                LOG_AMOUNT_COLOR: "#fff",
              }
        }
      />
    </div>
  );
});
