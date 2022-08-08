import { readFile } from "fs/promises";
import { find, propEq } from "ramda";
import { parsePilots, Pilot } from "./types/Pilot";

const COMPCON_FILENAMES = [
  "user.config",
  "active_missions_v2.json",
  "missions_v2.json",
  "encounters_v2.json",
  "pilots_v2.json",
  "npcs_v2.json",
  "extra_content.json",
  "pilot_groups_v2.json",
] as const;

type CompconFile = {
  filename: typeof COMPCON_FILENAMES[number];
  data: string | null;
};

export type CompconData = {
  pilots: Pilot[];
};

export async function importCompconFile(
  filename: string
): Promise<CompconData> {
  const file = await readFile(filename);
  const compconFiles = JSON.parse(file.toString()) as CompconFile[];
  const pilotFile = find(propEq("filename", "pilots_v2.json"), compconFiles);

  if (!pilotFile || !pilotFile.data) {
    throw new Error("Could not find pilot data");
  }

  const pilots = parsePilots(pilotFile.data);

  return {
    pilots,
  };
}
