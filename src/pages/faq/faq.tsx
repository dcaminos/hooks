import { Col, Collapse, Row } from "antd";
import { AuthLeftContent } from "components/auth-left-content/auth-left-content";

const { Panel } = Collapse;

export const FaqPage: React.FC = (props) => {
  let item = "1234".split("");

  return (
    <Row gutter={[32, 32]} className="da-authentication-page">
      <AuthLeftContent />
      <Col lg={12} span={24} className="da-py-sm-0 da-py-md-64">
        <Row className="da-h-100" align="middle" justify="center">
          <Col>
            <h2>Frequently Asked Questions</h2>
            <Collapse accordion>
              {item.map((item, index) => (
                <Panel
                  header={
                    <p className="da-d-flex-center da-p1-body da-mb-0">
                      Question N° {item}
                    </p>
                  }
                  key={index}
                  showArrow={true}
                >
                  Answer to the question {item}
                </Panel>
              ))}
            </Collapse>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
