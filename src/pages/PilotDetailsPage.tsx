import React from "react";
import { Text } from "ink";
import { useRouter } from "../Router";
import useSelector from "../hooks/useSelector";
import { StoreState } from "../hooks/useStore";

const selectPilot = (pilotId: string) => (state: StoreState) => {};

const PilotDetailsPage: React.FC = () => {
  const { currentPage } = useRouter();
  const pilot = useSelector(selectPilot);
  return <Text>Pilot details</Text>;
};

export default PilotDetailsPage;
