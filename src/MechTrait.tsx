import { Box, Text } from "ink";
import React from "react";
import { FrameTraitData } from "./types/lancer-data/mech/frame/Trait";
import TypeyText from "./TypeyText";
import { Synergy } from "./types/lancer-data/Synergy";

const MechSynergy: React.FC<{ synergy: Synergy }> = ({ synergy }) => {
  return (
    <TypeyText dimColor>
      <Text color="magenta">SYNERGY</Text>: {synergy.detail}
    </TypeyText>
  );
};

const MechTrait: React.FC<{
  trait: FrameTraitData;
  showSynergies?: boolean;
}> = ({ trait, showSynergies = false }) => {
  return (
    <>
      <TypeyText>{trait.name}</TypeyText>
      <Box marginLeft={2} flexDirection="column">
        <TypeyText dimColor>{trait.description}</TypeyText>
        {showSynergies &&
          trait.synergies?.map((synergy) => (
            <MechSynergy synergy={synergy} key={synergy.detail} />
          ))}
      </Box>
    </>
  );
};

export default MechTrait;
