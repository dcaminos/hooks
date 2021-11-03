import { createContext } from "react";
import { observable } from 'mobx'
import { DirectionType } from "antd/lib/config-provider";

export class UiStore {
    @observable theme: "light" | 'dark' = 'light'
    @observable contentWidth: 'full' | 'boxed' = 'full'
    @observable sidebarCollapsed: boolean = false
    @observable sidebarCollapseButton: boolean = true
    @observable layout: 'horizontal' | 'vertical' = 'vertical'
    @observable navigationFull: DirectionType = 'ltr'
    @observable navigationBg: DirectionType = 'ltr'
    @observable direction: DirectionType = 'ltr'

}

export const UIContext = createContext<UiStore>(new UiStore())