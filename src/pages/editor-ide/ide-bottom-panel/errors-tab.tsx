import { Table } from "antd";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { EditorContext } from "../../../components/router/contexts";
import { AlignType } from "rc-table/lib/interface";

export const ErrorsTab: React.FC = observer((props) => {
  const { errors } = useContext(EditorContext)!;

  if (errors.length === 0) {
    return null;
  }

  const columns = [
    {
      title: "Code",
      dataIndex: "code",
      width: 80,
      align: "center" as AlignType,
    },
    {
      title: "Line",
      dataIndex: "line",
      width: 100,
      align: "center" as AlignType,
    },
    {
      title: "Message",
      dataIndex: "message",
    },
  ];

  return (
    <>
      <div
        style={{
          display: "flex",
          paddingTop: 4,
          height: "30px",
          width: "100%",
          backgroundColor: "#f7fafc",
          borderBottom: "1px solid grey",
        }}
      >
        <p className="da-mb-0" style={{ width: 80, textAlign: "center" }}>
          Code
        </p>
        <p className="da-mb-0" style={{ width: 100, textAlign: "center" }}>
          Line
        </p>
        <p className="da-mb-0" style={{ paddingLeft: 16 }}>
          Message
        </p>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          top: 68,
          left: 0,
          right: 0,
          overflowY: "scroll",
        }}
      >
        <Table
          showHeader={false}
          size="small"
          className="da-w-100 da-p-0"
          columns={columns}
          dataSource={errors}
          pagination={false}
        />
      </div>
    </>
  );
});
