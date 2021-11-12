import { Card, Col, Divider, Row } from "antd";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { EditorSandbox } from "../editor-sandbox";
import { HookInfo } from "./hook-info";

export const EditorDetails: React.FC = () => {
  const dividerClass = "da-border-color-black-40 da-border-color-dark-80";

  return (
    <Card>
      <HookInfo />
      <Divider className={dividerClass} />
    </Card>
  );
};
