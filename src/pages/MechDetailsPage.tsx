import React from "react";
import { Box, Text } from "ink";
import { useRouter } from "../Router";
import useSelector from "../hooks/useSelector";
import { selectMech } from "../store/selectors/selectMech";
import Table from "../Table";

const MechDetailsPage: React.FC = () => {
  const { currentPage } = useRouter();

  const mechId = currentPage?.name === "mech-details" && currentPage.mechId;
  const mech = (mechId && useSelector(selectMech(mechId))) || null;

  if (!mech) return <Text>Could not find mech: {mechId}</Text>;

  const mechInfoRows = [
    ["ID", mech.id],
    ["Name", mech.name],
  ];

  return (
    <Box>
      <Table rows={mechInfoRows} />
    </Box>
  );
};

export default MechDetailsPage;
