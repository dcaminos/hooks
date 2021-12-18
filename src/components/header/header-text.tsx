import { Col } from "antd";
import { Upload } from "react-iconly";

export const HeaderText: React.FC = (props) => {
  return (
    <Col xl={16} lg={14} className="da-header-left-text da-d-flex-center">
      <div className="da-header-left-text-item da-input-label da-text-color-black-100 da-text-color-dark-0 da-mb-0">
        <span className="da-font-weight-300 da-text-color-danger-3">
          Our roadmap is alive for future updates.
        </span>
        <a href="/roadmap" className="da-ml-8 da-text-color-black-60">
          <div className="remix-icon da-text-color-dark-5">
            <Upload set="light" />
          </div>
        </a>
      </div>
    </Col>
  );
};
