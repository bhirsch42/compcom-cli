import { Box, Text } from "ink";
import React from "react";
import lancerData from "lancer-data";
import { find, propEq } from "ramda";
import { PilotGear } from "./types/PilotGear";

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
      <Text>{pilotGearRule.name}</Text>
      {pilotGearRule.damage && (
        <Text>
          {"  "}
          Damage:{" "}
          {pilotGearRule.damage
            .map((damage) => `${damage.type} (${damage.val})`)
            ?.join(", ")}
        </Text>
      )}
      {pilotGearRule.range && (
        <Text>
          {"  "}
          Range:{" "}
          {pilotGearRule.range.map((range) => `${range.val}`)?.join(", ")}
        </Text>
      )}
    </Box>
  );
};

export default PilotGear;
