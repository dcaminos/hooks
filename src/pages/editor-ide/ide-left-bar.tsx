import { Avatar } from "antd";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { RiSettings3Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import cardImgDark from "../../assets/images/dasboard/left-bar-dark.png";
import cardImg from "../../assets/images/dasboard/left-bar.png";
import logoSmall from "../../assets/images/logo/logo-small.svg";
import avatar from "../../assets/images/memoji/memoji-1.png";
import { UIContext } from "../../utils/contexts";
import "./editor-ide.css";

export const IdeLeftBar: React.FC = observer((props) => {
  const { theme } = useContext(UIContext)!;
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 60,
        height: "100vh",
        backgroundImage: `url(${theme === "dark" ? cardImgDark : cardImg})`,
        backgroundSize: "cover",
        borderRight: "1px solid #dfe6e9",
        //backgroundColor: "#0010f7",

        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        padding: 10,
      }}
    >
      <Link to="/" onClick={() => {}}>
        <img className="da-logo" src={logoSmall} alt="logo" />
      </Link>
      <div style={{ flexGrow: 1 }}></div>

      <Avatar
        size={36}
        className="da-mb-16"
        style={{ backgroundColor: "#0010f7", color: "white" }}
        src={<RiSettings3Line className="remix-icon" size={24} />}
      />
      <Avatar size={36} src={avatar} />
    </div>
  );
});
