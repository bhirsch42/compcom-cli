import React from "react";
import { Text } from "ink";
import { useRouter } from "../Router";
import useSelector from "../hooks/useSelector";
import { selectPilot } from "../store/selectors/selectPilot";
import PilotDetail from "../PilotDetail";

const ERROR_MESSAGE = <Text>Could not find pilot.</Text>;

const PilotDetailsPage: React.FC = () => {
  const { currentPage } = useRouter();
  const pilotId = currentPage?.name === "pilot-details" && currentPage.pilotId;
  if (!pilotId) return ERROR_MESSAGE;
  const pilot = useSelector(selectPilot(pilotId));
  if (!pilot) return ERROR_MESSAGE;
  return <PilotDetail pilot={pilot} />;
};

export default PilotDetailsPage;
