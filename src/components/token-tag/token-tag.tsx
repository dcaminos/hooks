import { Avatar, Tag } from "antd";
import { Token } from "../../lib/token";

export type TokenTagProps = {
  className?: string;
  token: Token;
};

export const TokenTag: React.FC<TokenTagProps> = (props) => {
  const { className, token } = props;

  return (
    <Tag
      style={{
        height: 32,
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
      className={className}
      icon={<Avatar size={25} src={token.image} />}
      color="magenta"
    >
      {token.name}
    </Tag>
  );
};
