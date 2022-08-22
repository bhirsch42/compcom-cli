import {
  filter,
  find,
  includes,
  map,
  prop,
  propEq,
  reject,
  isNil,
} from "ramda";
import lancerData from "../../../types/lancer-data";
import { PilotData } from "../../../types/lancer-data/pilot/Pilot";
import {
  TalentData,
  TalentRankData,
} from "../../../types/lancer-data/pilot/Talent";

const { talents } = lancerData;

export type Talent = TalentData & {
  activeRanks: TalentRankData[];
};

export function getPilotTalents(pilotData: PilotData): Talent[] {
  return reject(
    isNil,
    map((talentRank) => {
      const talent = find(propEq("id", talentRank.id), talents);
      return talent
        ? {
            ...talent,
            activeRanks: talent.ranks.slice(0, talentRank.rank),
          }
        : null;
    }, pilotData.talents)
  );
}
