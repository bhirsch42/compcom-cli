import { Box, Text } from "ink";
import { isNil, pluck, reject } from "ramda";
import React from "react";
import BoxWithLabel from "./BoxWithLabel";
import { MechWeapon } from "./store/selectors/selectMech/getMechWeapon";
import { Mount, WeaponSlot } from "./store/selectors/selectMech/getMount";
import Tags from "./Tags";
import { Damage } from "./types/lancer-data/Damage";
import { Range } from "./types/lancer-data/Range";

interface MechMountProps {
  mount: Mount;
  integrated?: boolean;
}

interface MechWeaponSlotProps {
  weaponSlot: WeaponSlot;
}

function getDamageDescription(damage?: Damage[]) {
  return damage && damage.map((d) => `${d.val} ${d.type}`).join(", ");
}

function getRangeDescription(range?: Range[]) {
  return range && range.map((d) => `${d.type} ${d.val}`).join(", ");
}

const MechWeaponSlot: React.FC<MechWeaponSlotProps> = ({ weaponSlot }) => {
  const { weapon } = weaponSlot;

  if (!weapon) return null;

  const damageAndRange = reject(isNil, [
    getDamageDescription(weapon.damage),
    getRangeDescription(weapon.range),
  ]).join(" // ");
  return (
    <Box paddingX={1} flexDirection="column">
      <Box flexGrow={1}>
        <Text>{weapon?.name.toUpperCase()}</Text>
        <Box flexGrow={1} />
        <Text dimColor>
          {weapon?.mount} {weapon?.type}
        </Text>
      </Box>
      <Box flexGrow={1} paddingLeft={2}>
        <Text>{damageAndRange}</Text>
        <Box flexGrow={1} />
        <Tags tags={weapon.tags} />
      </Box>
    </Box>
  );
};

const MechMount: React.FC<MechMountProps> = ({ mount, integrated }) => {
  const weaponSlots = [...mount.slots, ...mount.extra];

  return (
    <BoxWithLabel label={`${mount.mount_type.toUpperCase()} MOUNT`}>
      {weaponSlots.map((weaponSlot, i) => (
        <MechWeaponSlot weaponSlot={weaponSlot} key={i} />
      ))}
    </BoxWithLabel>
  );
};

export default MechMount;
