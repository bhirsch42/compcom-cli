import { Box, Text } from "ink";
import { isNil, pluck, reject } from "ramda";
import React from "react";
import { MechSystem } from "./store/selectors/selectMech/getMechSystem";
import { MechWeapon } from "./store/selectors/selectMech/getMechWeapon";
import { Mount, WeaponSlot } from "./store/selectors/selectMech/getMount";
import Tags from "./Tags";
import { Damage } from "./types/lancer-data/Damage";
import { Range } from "./types/lancer-data/Range";

interface MechSystemProps {
  system: MechSystem;
  integrated?: boolean;
}

const MechSystem: React.FC<MechSystemProps> = ({ system, integrated }) => {
  return (
    <Box paddingX={1} flexDirection="column">
      <Box flexGrow={1}>
        <Text>{system?.name.toUpperCase()}</Text>
        <Box flexGrow={1} />
        <Text dimColor>System</Text>
      </Box>
      <Box flexGrow={1} paddingLeft={2}>
        <Box flexGrow={1} />
        <Tags tags={system.tags} />
      </Box>
    </Box>
  );
};

export default MechSystem;
