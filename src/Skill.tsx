import { Box, Text } from "ink";
import React from "react";
import { PilotSkill } from "./types/Skill";
import lancerData from "lancer-data";
import { find, propEq } from "ramda";

const { skills } = lancerData;

type SkillInfo = {
  name: string;
  rank: number;
  description?: string;
  detail?: string;
};

function getSkillInfo(skill: PilotSkill): SkillInfo {
  if (skill.custom) {
    return {
      name: skill.id,
      rank: skill.rank,
      detail: skill.custom_detail,
      description: skill.custom_desc,
    };
  }

  const skillRule = find(propEq("id", skill.id), skills);

  if (!skillRule) {
    throw new Error(`Failed to look up skill: ${skill.id}`);
  }

  return {
    ...skillRule,
    rank: skill.rank,
  };
}

const Skill: React.FC<{ skill: PilotSkill }> = ({ skill }) => {
  const skillInfo = getSkillInfo(skill);

  return (
    <Box paddingX={1} flexDirection="column">
      <Text>
        (+{skill.rank * 2}) {skillInfo.name}
      </Text>
      {skillInfo.description ? (
        <Text dimColor>
          {"  "}
          {skillInfo.description}
        </Text>
      ) : null}
      {/* <Text>{skillInfo.detail}</Text> */}
    </Box>
  );
};

export default Skill;
