import { Col, List } from "antd";
import { ReactNode, useState } from "react";
import { HookListHeader } from "../../components/hook-list/hook-list-header";
import { Hook } from "../../lib/hook";
import { HookCard } from "./hook-card";
import { HookCardRow } from "./hook-row";

export type HookListInternalProps = {
  listType: "list" | "card";
  searchValue: string;
  sortValue: "alpha" | "network" | "lastUpdated" | "newer" | "older";
};

const defaultHookListInternalProps: HookListInternalProps = {
  listType: "list",
  searchValue: "",
  sortValue: "lastUpdated",
};

export type HookListProps = {
  hooks: Hook[];
  renderHookActions: (hook: Hook) => ReactNode;
  renderHeaderActions: () => ReactNode;
  loading?: boolean;
  afterHeaderRender?: ReactNode;
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
    switch (listProps.sortValue) {
      case "alpha":
        if(a.title.toLowerCase() < b.title.toLowerCase()) { return -1; }
        if(a.title.toLowerCase() > b.title.toLowerCase()) { return 1; }
        return 0;
      case "network":
        if(a.networkId?.toLowerCase() < b.networkId?.toLowerCase()) { return -1; }
        if(a.networkId?.toLowerCase() > b.networkId?.toLowerCase()) { return 1; }
        return 0;
      case "lastUpdated":
        if(a.updatedAt > b.updatedAt) { return -1; }
        if(a.updatedAt < b.updatedAt) { return 1; }
        return 0;
      case "newer":
        if(a.createdAt > b.createdAt) { return -1; }
        if(a.createdAt < b.createdAt) { return 1; }
        return 0;
      case "older":
        if(a.createdAt < b.createdAt) { return -1; }
        if(a.createdAt > b.createdAt) { return 1; }
        return 0;
      default: 
        return -1;
    }

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
      {props.afterHeaderRender ? props.afterHeaderRender : null}
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
            <HookCardRow hook={value} actionsRender={renderHookActions} />
          )}
        />
      )}
    </Col>
  );
};
