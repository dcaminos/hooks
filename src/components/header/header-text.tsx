import { Col } from "antd";
import { Document, Upload } from "react-iconly";

export const HeaderText: React.FC = (props) => {
  return (
    <Col xl={16} lg={14} className="da-header-left-text da-d-flex-center">
      <div className="remix-icon da-update-icon da-text-color-primary-1 da-text-color-dark-0 da-p-4 da-bg-color-primary-4 da-bg-color-dark-70">
        <Document set="light" size="large" />
      </div>

      <div className="da-header-left-text-item da-input-label da-text-color-black-100 da-text-color-dark-0 da-ml-16 da-mb-0">
        Do you know the latest update of 2021? 🎉 &nbsp;
        <span className="da-font-weight-300 da-text-color-danger-3">
          Our roadmap is alive for future updates.
        </span>
        <a
          href="https://trello.com/b/8ZRmDN5y/yoda-roadmap"
          className="da-ml-8 da-text-color-black-60"
          target="_blank"
          rel="noreferrer"
        >
          <div className="remix-icon da-text-color-dark-5">
            <Upload set="light" />
          </div>
        </a>
      </div>
    </Col>
  );
};
