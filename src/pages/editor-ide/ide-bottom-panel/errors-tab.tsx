import { Table } from "antd";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { EditorContext } from "../../../utils/contexts";

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
        <p className="da-mb-0" style={{ marginLeft: 16 }}>
          Code
        </p>
        <p className="da-mb-0" style={{ marginLeft: 44 }}>
          Message
        </p>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          top: 68,
          overflowY: "scroll",
        }}
      >
        <Table
          showHeader={false}
          size="small"
          className="ant-table-wrapper"
          columns={columns}
          dataSource={errors}
          pagination={false}
        />
      </div>
    </>
  );
});
