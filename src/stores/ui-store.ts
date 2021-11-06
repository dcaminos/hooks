import { createContext } from "react";
import { action, observable } from 'mobx'
import { DirectionType } from "antd/lib/config-provider";

export class UiStore {
    @observable theme: "light" | 'dark' = 'dark'
    @observable contentWidth: 'full' | 'boxed' = 'full'
    @observable sidebarCollapsed: boolean = false
    @observable sidebarCollapseButton: boolean = true
    @observable layout: 'horizontal' | 'vertical' = 'vertical'
    @observable navigationFull: boolean = false
    @observable navigationBg: boolean =  false
    @observable direction: DirectionType = 'ltr'

    @action
    changeTheme =  () => {
        this.theme = 'dark'
    }
}

export const UIContext = createContext<UiStore>(new UiStore())