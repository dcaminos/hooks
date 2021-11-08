import { Link } from "react-router-dom";

import Yoda from "../../assets/images/logo/logo.svg";
import YodaDark from "../../assets/images/logo/logo-dark.svg";

import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { UIContext } from "../../stores/ui-store";

export type LogoProps = {
  onClose: React.MouseEventHandler<HTMLAnchorElement>;
};

export const Logo: React.FC<LogoProps> = observer((props) => {
  const { theme } = useContext(UIContext);

  return (
    <Link
      to="/"
      className="da-header-logo da-d-flex da-align-items-end"
      onClick={props.onClose}
    >
      {theme === "light" ? (
        <img className="da-logo" src={Yoda} alt="logo" />
      ) : (
        <img className="da-logo" src={YodaDark} alt="logo" />
      )}

      <span className="h3 d-font-weight-800 da-text-color-primary-1 da-mb-6">
        .
      </span>

      <span
        className="da-p1-body da-font-weight-500 da-text-color-black-40 da-mb-16 da-ml-4"
        style={{
          letterSpacing: -1.5,
        }}
      >
        V.1.0
      </span>
    </Link>
  );
});
