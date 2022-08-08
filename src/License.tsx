import { License } from "./types/Pilot";
import lancerData from "lancer-data";
import { find, propEq } from "ramda";
import React from "react";
import { Box, Text } from "ink";
import { romanize } from "romans";

const { frames } = lancerData;

const License: React.FC<{ license: License }> = ({ license }) => {
  const frame = find(propEq("id", license.id), frames);

  if (!frame) throw new Error(`Could not look up frame ${license.id}`);

  return (
    <Box paddingLeft={1}>
      <Text>
        {frame.source} {frame.name} {romanize(license.rank)}
      </Text>
    </Box>
  );
};

export default License;
