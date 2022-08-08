import React from "react";
import { Box, render } from "ink";
import { CompconData } from "./importCompconFile";
import Pilot from "./Pilot";
import { Page, Route, Routes } from "./Router";
import Compendium from "./Compendium";

const App: React.FC<{ compconData: CompconData; route: Page[] }> = ({
  compconData,
  route,
}) => {
  return (
    <Routes initRoute={route}>
      <Route path="pilots">
        <Box>
          {compconData.pilots.map((pilot) => (
            <Pilot pilot={pilot} key={pilot.id} />
          ))}
        </Box>
      </Route>
      <Route path="compendium">
        <Compendium />
      </Route>
    </Routes>
  );
};

export default function runApp(compconData: CompconData, route: Page[]) {
  render(<App compconData={compconData} route={route} />);
}
