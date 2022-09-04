import { TagData, TagRef } from "../../../types/lancer-data/Tag";
import { find, propEq } from "ramda";
import lancerData from "../../../types/lancer-data";

export type Tag = TagData;

function renderTagAttr(attr: string, val?: number): string {
  return attr.replaceAll("{VAL}", val?.toString() || "");
}

export function getTag(tagRef: TagRef): Tag {
  const tagData = find(propEq("id", tagRef.id), lancerData.tags);

  if (!tagData) throw new Error(`Could not find tag: ${tagRef.id}`);

  return {
    ...tagData,
    name: renderTagAttr(tagData.name, tagRef.val),
    description: renderTagAttr(tagData.description, tagRef.val),
  };
}
