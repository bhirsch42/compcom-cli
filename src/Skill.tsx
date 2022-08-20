import { Box } from "ink";
import React from "react";
import { PilotSkill } from "./types/Skill";
import { find, propEq } from "ramda";
import TypeyText from "./TypeyText";
import lancerData from "./types/lancer-data";

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
      <TypeyText>
        (+{skill.rank * 2}) {skillInfo.name}
      </TypeyText>
      {skillInfo.description ? (
        <TypeyText dimColor>
          {"  "}
          {skillInfo.description}
        </TypeyText>
      ) : null}
      {/* <TypeyText>{skillInfo.detail}</TypeyText> */}
    </Box>
  );
};

export default Skill;
