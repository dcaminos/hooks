import { Col, List } from "antd";
import { ReactNode, useState } from "react";
import { HookListHeader } from "../../components/hook-list/hook-list-header";
import { Hook } from "../../lib/hook";
import { HookCard } from "./hook-card";

export type HookListInternalProps = {
  listType: "list" | "card";
  searchValue: string;
  sortValue: "updatedAt" | "createdAt" | "title";
};

const defaultHookListInternalProps: HookListInternalProps = {
  listType: "list",
  searchValue: "",
  sortValue: "updatedAt",
};

export type HookListProps = {
  hooks: Hook[];
  renderHookActions: (hook: Hook) => ReactNode;
  renderHeaderActions: () => ReactNode;
  loading?: boolean;
};

export const HookList: React.FC<HookListProps> = (props) => {
  const { hooks, renderHeaderActions, renderHookActions, loading } = props;
  const [listProps, setListProps] = useState(defaultHookListInternalProps);

  const setPartialListProps = (value: Partial<HookListInternalProps>) =>
    setListProps({ ...listProps, ...value });

  const hooksFilters = hooks.filter((item) => {
    return (
      item.title.toLowerCase().indexOf(listProps.searchValue.toLowerCase()) !==
      -1
    );
  });

  hooksFilters.sort((a: Hook, b: Hook) => {
    return -1;
  });

  const pagiCheck = hooksFilters.length <= 8 ? undefined : { pageSize: 8 };
  const pagiCheckLarge = hooksFilters.length <= 8 ? undefined : { pageSize: 8 };

  return (
    <Col flex="1 0 0" className="da-ecommerce-app-content">
      <HookListHeader
        listProps={listProps}
        setListProps={setPartialListProps}
        actionsRender={renderHeaderActions}
      />
      {listProps.listType === "card" ? (
        <List<Hook>
          loading={loading || false}
          pagination={pagiCheck}
          dataSource={hooksFilters}
          renderItem={(value) => (
            <HookCard hook={value} actionsRender={renderHookActions} />
          )}
        />
      ) : (
        <List
          loading={(loading || false)}
          pagination={pagiCheckLarge}
          dataSource={hooksFilters}
          renderItem={(value) => (
            <HookCard hook={value} actionsRender={renderHookActions} />
          )}
        />
      )}
    </Col>
  );
};
