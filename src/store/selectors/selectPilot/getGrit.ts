import { PilotData } from "../../../types/lancer-data/pilot/Pilot";

export function getGrit(pilotData: PilotData): number {
  return Math.ceil(pilotData.level / 2);
}
