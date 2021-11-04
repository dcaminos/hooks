import React, { useContext, useState } from "react";

import { Layout, Row, Col } from "antd";

import { EditorHeader } from "../header/editor-header";
import { UIContext } from "../../stores/ui-store";
import { observer } from "mobx-react-lite";
//import MenuFooter from "./components/footer";
//import CustomiseTheme from "./components/customise";
//import ScrollTop from "./components/scroll-to-top";

const { Content } = Layout;

export const EditorLayout: React.FC = observer(props => {
    const { children } = props;
    const { contentWidth, navigationBg } = useContext(UIContext)
    const [visible, setVisible] = useState(false);

    return (
        <Layout className={`da-app-layout da-bg-color-dark-90 ${navigationBg && 'da-app-layout-bg'}`}>
            <EditorHeader visible={visible} setVisible={setVisible} />

            <Content className="da-content-main">
                <Row justify="center">
                    {
                        contentWidth === "full" && (
                            <Col span={24}>
                                {children}
                            </Col>
                        )
                    }

                    {
                        contentWidth === "boxed" && (
                            <Col xxl={20} xl={22} span={24}>
                                {children}
                            </Col>
                        )
                    }
                </Row>
            </Content>

            {/*<MenuFooter />*/}

            {/*<CustomiseTheme />*/}

            {/*<ScrollTop />*/}
        </Layout>
    );
});