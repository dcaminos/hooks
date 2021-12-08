import { Col, List, Row } from "antd";
import { UserContext } from "components/router/contexts";
import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { HookListHeader } from "../../components/hook-list/hook-list-header";
import { Hook } from "../../lib/hook";
import { HookRow } from "./hook-row";
import "./hook-list.less";

export type HookListInternalProps = {
  searchValue: string;
  typeValue: "all" | "token-balance" | "staking" | "yield-farming";
  statusValue: "all" | "on" | "off";
  sortValue: "alpha" | "network" | "lastUpdated" | "newer" | "older";
};

const defaultHookListInternalProps: HookListInternalProps = {
  searchValue: "",
  typeValue: "all",
  statusValue: "all",
  sortValue: "lastUpdated",
};

export type HookListProps = {
  hooks: Hook[];
  page: "dashboard" | "editor";
  loading?: boolean;
};

export const HookList: React.FC<HookListProps> = observer((props) => {
  const { hooks, page, loading } = props;
  const [listProps, setListProps] = useState(defaultHookListInternalProps);
  const { user, updateUser } = useContext(UserContext)!;
  const userHooks: string[] = user?.profiles[0].hookIds ?? [];

  const setPartialListProps = (value: Partial<HookListInternalProps>) =>
    setListProps({ ...listProps, ...value });

  const searchFilter = (item: Hook) =>
    listProps.searchValue.length === 0
      ? true
      : item.title
          .toLowerCase()
          .indexOf(listProps.searchValue.toLowerCase()) !== -1;
  const typeFilter = (item: Hook) =>
    listProps.typeValue === "all" ? true : item.type === listProps.typeValue;
  const statusFilter = (item: Hook) => {
    return listProps.statusValue === "all"
      ? true
      : (listProps.statusValue === "on" && userHooks.includes(item.id)) ||
          (listProps.statusValue === "off" && !userHooks.includes(item.id));
  };
  /*const sortBy = (a: Hook, b: Hook) => {
    switch (listProps.sortValue) {
      case "alpha":
        if (a.title.toLowerCase() < b.title.toLowerCase()) {
          return -1;
        }
        if (a.title.toLowerCase() > b.title.toLowerCase()) {
          return 1;
        }
        return 0;
      case "network":
        // not implemented
        return 0;
      case "lastUpdated":
        if (a.updatedAt > b.updatedAt) {
          return -1;
        }
        if (a.updatedAt < b.updatedAt) {
          return 1;
        }
        return 0;
      case "newer":
        if (a.createdAt > b.createdAt) {
          return -1;
        }
        if (a.createdAt < b.createdAt) {
          return 1;
        }
        return 0;
      case "older":
        if (a.createdAt < b.createdAt) {
          return -1;
        }
        if (a.createdAt > b.createdAt) {
          return 1;
        }
        return 0;
      default:
        return -1;
    }
  };*/

  const hooksFilters = hooks
    .filter(searchFilter)
    .filter(typeFilter)
    .filter(statusFilter);
  //.sort(sortBy);
  const pagiCheck =
    hooksFilters.length <= 10
      ? undefined
      : { pageSize: 10, showSizeChanger: false };

  const setSubscription = async (hookId: string, value: boolean) => {
    if (!user) return;

    let userHooks = [...user.profiles[0].hookIds];
    let needUpdate = false;
    if (value && !userHooks.includes(hookId)) {
      userHooks.push(hookId);
      user.profiles[0].hookIds = userHooks;
      needUpdate = true;
    } else if (!value && userHooks.includes(hookId)) {
      userHooks = userHooks.filter((id) => id !== hookId);
      user.profiles[0].hookIds = userHooks;
      needUpdate = true;
    }

    if (needUpdate) {
      await updateUser(user);
    }
  };

  return (
    <Row>
      <Col span={24}>
        <HookListHeader
          listProps={listProps}
          setListProps={setPartialListProps}
        />
      </Col>
      <Col span={24}>
        <List
          loading={loading || false}
          pagination={pagiCheck}
          dataSource={hooksFilters}
          renderItem={(hook) => (
            <HookRow
              hook={hook}
              page={page}
              subscribed={userHooks.includes(hook.id)}
              setSubscription={setSubscription}
            />
          )}
        />
      </Col>
    </Row>
  );
});
