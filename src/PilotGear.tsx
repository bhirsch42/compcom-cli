import { Box, Text } from "ink";
import React from "react";
import { find, propEq } from "ramda";
import { PilotGear } from "./types/PilotGear";
import TypeyText from "./TypeyText";
import lancerData from "./types/lancer-data";

const { pilot_gear } = lancerData;

function getPilotGearRule(pilotGear: PilotGear) {
  const pilotGearRule = find(propEq("id", pilotGear.id), pilot_gear);

  if (!pilotGearRule) {
    throw new Error(`Couldn't look up pilot gear: ${pilotGear.id}`);
  }

  return pilotGearRule;
}

const PilotGear: React.FC<{ pilotGear: PilotGear | null }> = ({
  pilotGear,
}) => {
  if (!pilotGear) {
    return (
      <Box paddingX={1} flexDirection="column">
        <Text italic dimColor>
          Empty Slot
        </Text>
      </Box>
    );
  }

  const pilotGearRule = getPilotGearRule(pilotGear);

  return (
    <Box paddingX={1} flexDirection="column">
      <TypeyText>{pilotGearRule.name}</TypeyText>
      {pilotGearRule.damage && (
        <TypeyText>
          {"  "}
          Damage:{" "}
          {pilotGearRule.damage
            .map((damage) => `${damage.type} (${damage.val})`)
            ?.join(", ")}
        </TypeyText>
      )}
      {pilotGearRule.range && (
        <TypeyText>
          {"  "}
          Range:{" "}
          {pilotGearRule.range.map((range) => `${range.val}`)?.join(", ")}
        </TypeyText>
      )}
    </Box>
  );
};

export default PilotGear;
