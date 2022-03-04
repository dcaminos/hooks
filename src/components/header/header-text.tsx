import { Col } from "antd";
import { Upload } from "react-iconly";

export const HeaderText: React.FC = (props) => {
  return (
    <Col xl={16} lg={14} className="da-header-left-text da-d-flex-center">
      <div className="da-header-left-text-item da-input-label da-text-color-black-100 da-text-color-dark-0 da-mb-0">
        <span className="da-font-weight-300 da-text-color-danger-3">
          Developed by
        </span>
        <a target="_blank" rel="noreferrer" href="https://www.toptal.com/resume/daniel-caminos" className="da-ml-8">
        Daniel Caminos
        </a>
      </div>
    </Col>
  );
};
