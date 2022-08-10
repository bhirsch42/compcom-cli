import React, { useEffect } from "react";
import TypeyText from "./TypeyText";
import art from "ascii-art";
import { Box, Text } from "ink";

type HeaderFont = "big" | "colossal" | "basic" | "o8";

interface HeaderProps {
  text: string;
  font?: HeaderFont;
  color?: Parameters<typeof TypeyText>[0]["color"];
}

// Mostly necessary because art promise won't resolve unless
// it's the component instance's first time rendering.
// Not sure why that's the case.
const ART_CACHE = new Map<string, string>();

function buildKey(text: string, font: string) {
  return `${text}-${font}`;
}

const Header: React.FC<HeaderProps> = ({ text, font = "big", color }) => {
  const key = buildKey(text, font);

  const [header, setHeader] = React.useState<string | null>(
    ART_CACHE.get(key) || null
  );

  if (!header) {
    art
      .font(text, font)
      .toPromise()
      .then((art) => {
        const sanitizedArt = art.trimEnd();
        ART_CACHE.set(key, sanitizedArt);
        return setHeader(sanitizedArt);
      });
  }

  return header ? (
    <Box>
      <TypeyText color={color}>{header}</TypeyText>
    </Box>
  ) : null;
};

export default Header;
