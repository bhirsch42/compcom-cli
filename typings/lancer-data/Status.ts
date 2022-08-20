export type Status = {
  name: string;
  icon: string;
  type: "Condition" | "Status";
  terse: string;
  exclusive?: "Mech" | "Pilot";
  effects: string;
};
