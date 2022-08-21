import { find, propEq } from "ramda";
import React from "react";
import { Box } from "ink";
import { romanize } from "romans";
import TypeyText from "./TypeyText";
import lancerData from "./types/lancer-data";
import { RankedData } from "./types/lancer-data/pilot/Ranked";

const { frames } = lancerData;

const License: React.FC<{ license: RankedData }> = ({ license }) => {
  const frame = find(propEq("id", license.id), frames);

  if (!frame) throw new Error(`Could not look up frame ${license.id}`);

  return (
    <Box paddingLeft={1}>
      <TypeyText>
        {frame.source} {frame.name} {romanize(license.rank)}
      </TypeyText>
    </Box>
  );
};

export default License;
