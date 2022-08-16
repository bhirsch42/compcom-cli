import React, { useEffect } from "react";
import TypeyText from "./TypeyText";
import art from "ascii-art";
import { Box, Text } from "ink";
import useIsMounted from "./hooks/useIsMounted";

type HeaderFont = "big" | "colossal" | "basic" | "o8";

interface HeaderProps {
  text: string;
  font?: HeaderFont;
  color?: Parameters<typeof TypeyText>[0]["color"];
  dimColor?: Parameters<typeof TypeyText>[0]["dimColor"];
}

// Mostly necessary because art promise won't resolve unless
// it's the component instance's first time rendering.
// Not sure why that's the case.
const ART_CACHE = new Map<string, string>();

function buildKey(text: string, font: string) {
  return `${text}-${font}`;
}

const Header: React.FC<HeaderProps> = ({
  text,
  font = "big",
  color,
  dimColor,
}) => {
  const isMounted = useIsMounted();
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
        isMounted() && setHeader(sanitizedArt);
      });
  }

  return header ? (
    <Box>
      <TypeyText color={color} dimColor={dimColor}>
        {header}
      </TypeyText>
    </Box>
  ) : null;
};

export default Header;
