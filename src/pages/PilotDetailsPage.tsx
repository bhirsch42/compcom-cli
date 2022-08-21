import React from "react";
import { Text } from "ink";
import { useRouter } from "../Router";
import useSelector from "../hooks/useSelector";
import { selectPilot } from "../store/selectors/selectPilot";
import PilotDetail from "../PilotDetail";
import useRegisterCommands from "../hooks/useRegisterCommands";
import { find } from "ramda";
import { CommandHandler } from "../hooks/useCommandManager";

const PilotDetailsPage: React.FC = () => {
  const { currentPage, goTo } = useRouter();

  const pilotId = currentPage?.name === "pilot-details" && currentPage.pilotId;
  const pilot = (pilotId && useSelector(selectPilot(pilotId))) || null;

  const customCompletions = pilot?.mechs.map((mech) => mech.name) || [];

  const commandHandler: CommandHandler = (token: string, { logger }) => {
    const matchingMech = find(
      (mech) => mech.name === token,
      pilot?.mechs || []
    );

    if (matchingMech) {
      logger.info(`Loading [MECH // ${matchingMech.name.toUpperCase()}]`);
      goTo([{ name: "mech-details", mechId: matchingMech.id }]);
      return true;
    }

    return false;
  };

  useRegisterCommands({ commandHandler, customCompletions });

  return pilot ? (
    <PilotDetail pilot={pilot} />
  ) : (
    <Text>Could not find pilot.</Text>
  );
};

export default PilotDetailsPage;
