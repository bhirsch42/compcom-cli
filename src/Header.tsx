import React from "react";
import TypeyText from "./TypeyText";
import { Box } from "ink";
import renderAsciiFont from "./lib/renderAsciiFont";
import { Fonts } from "figlet";

interface HeaderProps {
  text: string;
  font?: Fonts;
  color?: Parameters<typeof TypeyText>[0]["color"];
  dimColor?: Parameters<typeof TypeyText>[0]["dimColor"];
}

const Header: React.FC<HeaderProps> = ({
  text,
  font = "Big",
  color,
  dimColor,
}) => {
  return (
    <Box>
      <TypeyText color={color} dimColor={dimColor}>
        {renderAsciiFont(text, font)}
      </TypeyText>
    </Box>
  );
};

export default Header;
